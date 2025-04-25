import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import styles from './NotificationItem.module.css';

const NotificationItem = ({ notification }) => {
  const timeAgo = () => {
    const now = new Date();
    const past = notification.timestamp?.toDate 
      ? new Date(notification.timestamp.toDate()) 
      : new Date(notification.timestamp || Date.now());
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return past.toLocaleDateString();
    }
  };

  return (
    <div className={styles.notificationItem}>
      <FontAwesomeIcon icon={faBell} className={styles.icon} />
      <p className={styles.message}>{notification.message}</p>
      <small className={styles.timestamp}>{timeAgo()}</small>
      {/* Optional: Dismiss button */}
      {/* <button className={styles.dismissButton}>Dismiss</button> */}
    </div>
  );
};

export default NotificationItem;