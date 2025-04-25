import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faEnvelope, faPhone, faCar, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './ProfileInfo.module.css';

const ProfileInfo = ({ profile }) => {
  return (
    <div className={`${styles.profileInfoCard} card`}>
      <h3 className={styles.cardTitle}>Profile Information</h3>
      <div className={styles.profileItem}>
        <FontAwesomeIcon icon={faUserCircle} className={styles.icon} />
        <p className={styles.label}>Name:</p>
        <p className={styles.value}>{profile?.displayName || 'N/A'}</p>
      </div>
      <div className={styles.profileItem}>
        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
        <p className={styles.label}>Email:</p>
        <p className={styles.value}>{profile?.email || 'N/A'}</p>
      </div>
      {profile?.phoneNumber && (
        <div className={styles.profileItem}>
          <FontAwesomeIcon icon={faPhone} className={styles.icon} />
          <p className={styles.label}>Phone:</p>
          <p className={styles.value}>{profile.phoneNumber}</p>
        </div>
      )}
      {profile?.vehicleMake && profile?.vehicleModel && (
        <div className={styles.profileItem}>
          <FontAwesomeIcon icon={faCar} className={styles.icon} />
          <p className={styles.label}>Vehicle:</p>
          <p className={styles.value}>{profile.vehicleMake} {profile.vehicleModel}</p>
        </div>
      )}
      <button className={styles.editProfileButton}>
        <FontAwesomeIcon icon={faEdit} className={styles.editIcon} /> Edit Profile
      </button>
    </div>
  );
};

export default ProfileInfo;