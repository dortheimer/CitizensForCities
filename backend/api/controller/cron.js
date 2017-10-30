'use strict';
const Controller = require("../controller/controller");
const Router = require('express').Router();
const _ = require('lodash');
const Log = require('../service/log');
const iplanApi = require('../service/iplanApi');
const Alert = require('../model/alert');
const Plan = require('../model/plan');
const Email = require('../service/email');
const Promise = require("bluebird");
const Schedule = require('node-schedule');
const Config = require('../service/config');

class CronController extends Controller {

  iplan(req, res, next) {
    Log.info("Running iplan fetcher");
    // the server is limited to 1000 results, we we get these by fragements
    return iplanApi.getPlanningCouncils().then(councils => {
      return Promise.mapSeries(councils.features, council => {
        Log.debug("Fetching", council.attributes.MT_Heb);
        return iplanApi.getBlueLines("PLAN_AREA_CODE=" + council.attributes.CodeMT);
      });
    });
    // let now = new Date();
    // let parts = [
    //   String(now.getFullYear()),
    //   String(now.getMonth()),
    //   // String(now.getDate())
    // ];
    // // add a 0
    // parts=parts.map(e=>e.length<2?"0"+e:e);
    // // return iplanApi.getBlueLines("LAST_UPDATE like '" +(parts.join(""))+"%'");
    //
    // return iplanApi.getBlueLines("LAST_UPDATE like '" +(parts.join(""))+"%'");

  }

  send_planning_alerts(req, res, next) {
    // var unsentPlans;
    Log.info("Running send planning alert");
    return Plan.getUnsentPlans().then(unsentPlans => {
      Log.debug("Got", unsentPlans.models.length, "Plans");
      return Promise.mapSeries(unsentPlans.models, unsentPlan => {
        return Alert.getUsersByGeometry(unsentPlan.get("id")).then(users => {
          Log.debug("Got", users.length, "users for plan", unsentPlan.get("id"));
          if (!users || !users.length) {
            return {"plan_id": unsentPlan.get("id"), "users": 0};
          }

          //reduce double users
          return Promise.mapSeries(users.models, user => {
            return Email.newPlanAlert(user, unsentPlan).then(success => {
              return true;
            });
          }).then(success=> {
            return {"plan_id": unsentPlan.get("id"), "users": users.length};
          });
        });
      });
    }).then(successArray => {
      let id_array = [];
      successArray.reduce((pv, cv) => id_array.push(cv.plan_id), 0);
      if (id_array.length) {
        Plan.maekPlansAsSent(id_array);
        Log.info("Processed", id_array);
      }
      return successArray.reduce((pv, cv) => pv.users + cv.users, 0);
    });
  }
}

const controller = new CronController();
const scheduleConfig = Config.get("services.schedule");

// set up schedule tasks
if (scheduleConfig.iplan){
  Schedule.scheduleJob(scheduleConfig.iplan, _.bind(controller.iplan, controller));
}
if (scheduleConfig.iplan){
  Schedule.scheduleJob(scheduleConfig.send_planning_alerts,_.bind(controller.send_planning_alerts, controller));
}

Router.get('/iplan', (req, res, next) => {
  controller.wrap(_.bind(controller.iplan, controller))(req, res, next);
});
Router.get('/send_planning_alerts', (req, res, next) => {
  controller.wrap(_.bind(controller.send_planning_alerts, controller))(req, res, next);
});

module.exports = Router;
