import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapPin, faArrowRight, faCoins, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './TripHistoryItem.module.css';

const TripHistoryItem = ({ trip }) => {
  const endDate = trip.endTime?.toDate() || trip.startTime?.toDate();
  return (
    <div className={styles.tripHistoryItem}>
      <div className={styles.dateAndTime}>
        <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
        <p className={styles.date}>{endDate?.toLocaleDateString()}</p>
        <p className={styles.time}>{endDate?.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
      </div>
      <div className={styles.route}>
        <FontAwesomeIcon icon={faMapPin} className={`${styles.icon} ${styles.from}`} />
        <p className={styles.location}>{trip.pickupLocation || 'N/A'}</p>
        <FontAwesomeIcon icon={faArrowRight} className={`${styles.icon} ${styles.arrow}`} />
        <FontAwesomeIcon icon={faMapPin} className={`${styles.icon} ${styles.to}`} />
        <p className={styles.location}>{trip.destination || 'N/A'}</p>
      </div>
      <div className={styles.earnings}>
        <FontAwesomeIcon icon={faCoins} className={styles.icon} />
        <p className={styles.fare}>${trip.fare?.toFixed(2) || 'N/A'}</p>
      </div>
      <div className={styles.status}>
        <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} />
        <p className={styles.statusText}>{trip.status || 'Completed'}</p>
      </div>
    </div>
  );
};

export default TripHistoryItem;