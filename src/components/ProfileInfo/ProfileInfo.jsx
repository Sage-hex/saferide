// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserCircle, faEnvelope, faPhone, faCar, faEdit } from '@fortawesome/free-solid-svg-icons';
// import styles from './ProfileInfo.module.css';

// const ProfileInfo = ({ profile }) => {
//   return (
//     <div className={`${styles.profileInfoCard} card`}>
//       <h3 className={styles.cardTitle}>Profile Information</h3>
//       <div className={styles.profileItem}>
//         <FontAwesomeIcon icon={faUserCircle} className={styles.icon} />
//         <p className={styles.label}>Name:</p>
//         <p className={styles.value}>{profile?.displayName || 'N/A'}</p>
//       </div>
//       <div className={styles.profileItem}>
//         <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
//         <p className={styles.label}>Email:</p>
//         <p className={styles.value}>{profile?.email || 'N/A'}</p>
//       </div>
//       {profile?.phoneNumber && (
//         <div className={styles.profileItem}>
//           <FontAwesomeIcon icon={faPhone} className={styles.icon} />
//           <p className={styles.label}>Phone:</p>
//           <p className={styles.value}>{profile.phoneNumber}</p>
//         </div>
//       )}
//       {profile?.vehicleMake && profile?.vehicleModel && (
//         <div className={styles.profileItem}>
//           <FontAwesomeIcon icon={faCar} className={styles.icon} />
//           <p className={styles.label}>Vehicle:</p>
//           <p className={styles.value}>{profile.vehicleMake} {profile.vehicleModel}</p>
//         </div>
//       )}
//       <button className={styles.editProfileButton}>
//         <FontAwesomeIcon icon={faEdit} className={styles.editIcon} /> Edit Profile
//       </button>
//     </div>
//   );
// };

// export default ProfileInfo;



import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserCircle, 
  faEnvelope, 
  faPhone, 
  faCar, 
  faEdit,
  faIdCard,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import styles from './ProfileInfo.module.css';

const ProfileInfo = ({ profile, onEdit }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className={styles.starFilled} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className={styles.starHalf} />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className={styles.starEmpty} />);
      }
    }
    
    return (
      <div className={styles.ratingContainer}>
        {stars}
        <span className={styles.ratingText}>{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className={`${styles.profileInfoCard} card`}>
      <h3 className={styles.cardTitle}>Driver Profile</h3>
      
      {profile?.rating && (
        <div className={styles.profileItem}>
          {renderStars(profile.rating)}
        </div>
      )}
      
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
      
      {profile?.licenseNumber && (
        <div className={styles.profileItem}>
          <FontAwesomeIcon icon={faIdCard} className={styles.icon} />
          <p className={styles.label}>License:</p>
          <p className={styles.value}>{profile.licenseNumber}</p>
        </div>
      )}
      
      {profile?.vehicleMake && profile?.vehicleModel && (
        <div className={styles.profileItem}>
          <FontAwesomeIcon icon={faCar} className={styles.icon} />
          <p className={styles.label}>Vehicle:</p>
          <p className={styles.value}>
            {profile.vehicleMake} {profile.vehicleModel} {profile.vehicleYear && `(${profile.vehicleYear})`}
          </p>
        </div>
      )}
      
      {profile?.vehiclePlate && (
        <div className={styles.profileItem}>
          <FontAwesomeIcon icon={faCar} className={styles.icon} />
          <p className={styles.label}>Plate:</p>
          <p className={styles.value}>{profile.vehiclePlate}</p>
        </div>
      )}
      
      <button 
        className={styles.editProfileButton}
        onClick={onEdit}
      >
        <FontAwesomeIcon icon={faEdit} className={styles.editIcon} /> Edit Profile
      </button>
    </div>
  );
};

export default ProfileInfo;