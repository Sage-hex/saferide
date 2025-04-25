// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-solid-svg-icons';
// import styles from './NotificationItem.module.css';

// const NotificationItem = ({ notification }) => {
//   const timeAgo = () => {
//     const now = new Date();
//     const past = notification.timestamp?.toDate 
//       ? new Date(notification.timestamp.toDate()) 
//       : new Date(notification.timestamp || Date.now());
//     const diffInSeconds = Math.floor((now - past) / 1000);

//     if (diffInSeconds < 60) {
//       return `${diffInSeconds} seconds ago`;
//     } else if (diffInSeconds < 3600) {
//       return `${Math.floor(diffInSeconds / 60)} minutes ago`;
//     } else if (diffInSeconds < 86400) {
//       return `${Math.floor(diffInSeconds / 3600)} hours ago`;
//     } else {
//       return past.toLocaleDateString();
//     }
//   };

//   return (
//     <div className={styles.notificationItem}>
//       <FontAwesomeIcon icon={faBell} className={styles.icon} />
//       <p className={styles.message}>{notification.message}</p>
//       <small className={styles.timestamp}>{timeAgo()}</small>
//       {/* Optional: Dismiss button */}
//       {/* <button className={styles.dismissButton}>Dismiss</button> */}
//     </div>
//   );
// };

// export default NotificationItem;


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import styles from './NotificationItem.module.css';

const NotificationItem = ({ notification, onDismiss }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <FontAwesomeIcon icon={faCheckCircle} className={styles.successIcon} />;
      case 'warning':
        return <FontAwesomeIcon icon={faExclamationTriangle} className={styles.warningIcon} />;
      case 'error':
        return <FontAwesomeIcon icon={faExclamationTriangle} className={styles.errorIcon} />;
      default:
        return <FontAwesomeIcon icon={faInfoCircle} className={styles.infoIcon} />;
    }
  };

  const timeAgo = () => {
    if (!notification.timestamp) return 'Just now';
    
    const now = new Date();
    const past = notification.timestamp?.toDate 
      ? notification.timestamp.toDate() 
      : new Date(notification.timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return past.toLocaleDateString();
  };

  return (
    <div className={`${styles.notificationItem} ${styles[notification.type]}`}>
      <div className={styles.iconContainer}>
        {getIcon()}
      </div>
      <div className={styles.content}>
        <p className={styles.message}>{notification.message}</p>
        <small className={styles.timestamp}>{timeAgo()}</small>
      </div>
      {onDismiss && (
        <button 
          className={styles.dismissButton}
          onClick={() => onDismiss(notification.id)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </div>
  );
};

export default NotificationItem;