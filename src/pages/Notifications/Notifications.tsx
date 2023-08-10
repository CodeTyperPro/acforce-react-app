import React from 'react';
import './Notifications.css';
import CardNotification from './CardNotification';
import NotificationList from '../NotificationList/NotificationList';

function Notifications() {
  return (
    <div className="notifications">
      <div className="title">
        <span>Recent notifications</span>
      </div>
      <div className="card-notif">
        <CardNotification />
      </div>

      <div className="list">
        <NotificationList/>
      </div>
    </div>
  )
}

export default Notifications