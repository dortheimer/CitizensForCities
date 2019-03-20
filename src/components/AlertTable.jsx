import React, { Component } from 'react';
import t from '../locale/he_IL';


function AlertTable(props) {
    const { alerts } = props;
    return <table id="alertTable">
      <thead>
        <tr>
          <th>כתובת</th>
          <th>רדיוס</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {alerts.map(alert => (
          <tr>
            <td>{alert.address}</td>
            <td>{alert.radius+" "+t.km}</td>
            <td><button className="delete" title="מחק התראה" onClick={() => props.onDelete(alert.id)}></button></td>
          </tr>)
        )}
      </tbody>
    </table>
  }

  export default AlertTable;