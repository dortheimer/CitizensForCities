import React, {Component} from 'react';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Comments from '../components/Comments';
import Mapa from '../components/Mapa';
import UnsafeRender from '../components/UnsafeRender'

import api from '../services/api';
import '../assets/bootstrap.css';

import Moment from 'react-moment'

import t from '../locale/he_IL';

class SinglePlan extends Component {
    state = {
        plan: {}
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.setState({planId:id})
        return api
            .get('/plan/' + id)
            .then(plan => this.setState({plan:plan.data}))
            .catch(error => this.setState({error}))
    }

    render() {
        const {plan} = this.state;
        const {me} = this.props;

        return <React.Fragment>
            <Navigation me={me}/>
            <div className="container" className="container">
                {plan.PL_NAME && <div className="container">
                    <h1>{plan.PL_NAME}</h1>
                    <div className="row">
                        <div className="col">
                            <div className="rectangle">
                                <h4>מטרות התוכנית</h4>
                                <UnsafeRender html={plan.goals_from_mavat}></UnsafeRender>

                            </div>
                            <div className="rectangle">
                                <h4>תיאור התוכנית</h4>
                                <UnsafeRender html={plan.main_details_from_mavat}></UnsafeRender>
                            </div>

                            <div className="rectangle">
                                <h4>תגובות</h4>
                                <div id="comments"></div>
                                <Comments planId={this.state.planId} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="rectangle">
                                <h4>מיקום</h4>
                                <div className="map-container" style={{height: '300px'}}>
                                  <Mapa geom={plan.geom} />
                                </div>
                            </div>
                            <div className="rectangle">
                                <h4>נתוני התוכנית</h4>
                                <ul>
                                    <li>מספר תוכנית: {plan.data.PL_NUMBER}</li>
                                    <li>סוג תוכנית: {plan.data.ENTITY_SUBTYPE_DESC}</li>
                                    {plan.jurisdiction && <li>מוסד התכנון המוסמך להפקיד את התכנית: {plan.jurisdiction}</li>}
                                    <li>תאריך הפקדה:  <Moment format="DD/MM/YYYY">
                                    {plan.data.DEPOSITING_DATE}
                                     </Moment>
                                     </li> 
                                    <li>שימוש קרקע: {plan.data.PL_LANDUSE_STRING}</li>
                                    <li>סטטוס: {plan.data.STATION_DESC}</li>
                                    <li>עדכון אחרון:  <Moment parse="YYYYMMDDHHmm" format="DD/MM/YYYY HH:mm">
                                    {plan.data.LAST_UPDATE}
                                </Moment>
                                     </li> 
                                    <li>
                                        <a target="_blank" href={plan.plan_url}>מסמכי התוכנית באתר משרד האוצר</a>
                                    </li>
                                </ul>
                                {plan.notCredible && <div className="note">
                                    שימו לב! זוהי תכנית המופקדת בסמכות מקומית. מכיוון שהוועדות המקומיות לא מדווחות
                                    בצורה אחידה אודות הסטטוס של התכניות בסמכותן אנחנו ממליצים לא להסתמך על סטטוס
                                    התכניות (גם לא כמו שמופיע באתר "תכנון זמין"). התכנית עברה "תנאי סף" וכנראה שהיא
                                    בהפקדה או תכף מופקדת
                                </div>}

                            </div>
                        </div>
                    </div>
                </div>}
            </div>
            <Footer/>
        </React.Fragment>
    }
}

export default SinglePlan;