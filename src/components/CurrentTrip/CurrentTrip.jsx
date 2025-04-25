import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapMarkerAlt, faRoute, faClock, faPhone, faLocationArrow, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import styles from './CurrentTrip.module.css'; // Import the CSS module

const CurrentTrip = ({ trip }) => {
  if (!trip) {
    return <div className={styles.currentTripEmpty}>No active trip.</div>;
  }

  return (
    <div className={styles.currentTripCard}>
      <h3 className={styles.currentTripTitle}>Current Trip</h3>
      <div className={styles.passengerInfo}>
        <FontAwesomeIcon icon={faUser} className={`${styles.icon} ${styles.passengerIcon}`} />
        <p className={styles.passengerName}>{trip.passengerName || 'Loading...'}</p>
        {trip.passengerPhone && (
          <p className={styles.passengerContact}>
            <FontAwesomeIcon icon={faPhone} className={`${styles.icon} ${styles.phoneIcon}`} /> {trip.passengerPhone}
          </p>
        )}
      </div>
      <div className={styles.locationDetails}>
        <div className={`${styles.locationItem} ${styles.pickupLocation}`}>
          <FontAwesomeIcon icon={faMapMarkerAlt} className={`${styles.icon} ${styles.pickupIcon}`} />
          <p className={styles.locationText}><strong>Pickup:</strong> {trip.pickupLocation || 'Loading...'}</p>
        </div>
        <div className={`${styles.locationItem} ${styles.destinationLocation}`}>
          <FontAwesomeIcon icon={faRoute} className={`${styles.icon} ${styles.destinationIcon}`} />
          <p className={styles.locationText}><strong>Destination:</strong> {trip.destination || 'Loading...'}</p>
        </div>
      </div>
      <div className={styles.tripStatus}>
        <FontAwesomeIcon icon={faClock} className={`${styles.icon} ${styles.clockIcon}`} />
        <p className={styles.statusText}>Status: <span className={styles.statusValue}>{trip.status || 'Ongoing'}</span></p>
        {trip.eta && <p className={styles.etaText}>ETA: {trip.eta}</p>}
      </div>
      <div className={styles.currentTripActions}>
        <button className={styles.navigationButton}>
          <FontAwesomeIcon icon={faLocationArrow} /> Navigation
        </button>
        <button className={styles.completeButton}>
          <FontAwesomeIcon icon={faCheckDouble} /> Complete Trip
        </button>
      </div>
    </div>
  );
};

export default CurrentTrip;
