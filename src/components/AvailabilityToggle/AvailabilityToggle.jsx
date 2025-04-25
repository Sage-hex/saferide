import React from 'react';
import styles from './AvailabilityToggle.module.css';

const AvailabilityToggle = ({ isAvailable, onToggle }) => {
  return (
    <div className={styles.availabilityToggle}>
      <label className={styles.label}>Availability:</label>
      <label className={styles.switch}>
        <input type="checkbox" checked={isAvailable} onChange={(e) => onToggle(e.target.checked)} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
};

export default AvailabilityToggle;