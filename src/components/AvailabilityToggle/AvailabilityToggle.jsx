// import React from 'react';
// import styles from './AvailabilityToggle.module.css';

// const AvailabilityToggle = ({ isAvailable, onToggle }) => {
//   return (
//     <div className={styles.availabilityToggle}>
//       <label className={styles.label}>Availability:</label>
//       <label className={styles.switch}>
//         <input type="checkbox" checked={isAvailable} onChange={(e) => onToggle(e.target.checked)} />
//         <span className={`${styles.slider} ${styles.round}`}></span>
//       </label>
//     </div>
//   );
// };

// export default AvailabilityToggle;



import React, { useState } from 'react';
import styles from './AvailabilityToggle.module.css';

const AvailabilityToggle = ({ isAvailable, onToggle }) => {
  const [loading, setLoading] = useState(false);

  const handleToggle = async (checked) => {
    setLoading(true);
    try {
      await onToggle(checked);
    } catch (error) {
      console.error("Error toggling availability:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.availabilityToggle}>
      <label className={styles.label}>Driver Availability:</label>
      <label className={styles.switch}>
        <input 
          type="checkbox" 
          checked={isAvailable} 
          onChange={(e) => handleToggle(e.target.checked)}
          disabled={loading}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      <div className={styles.statusContainer}>
        {loading ? (
          <span className={styles.loadingText}>Updating...</span>
        ) : (
          <span className={styles.statusText}>
            {isAvailable ? 'You are available' : 'You are unavailable'}
          </span>
        )}
      </div>
    </div>
  );
};

export default AvailabilityToggle;