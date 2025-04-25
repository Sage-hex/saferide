// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
// import styles from './EarningsSummary.module.css';

// const EarningsSummary = ({ earnings }) => {
//   return (
//     <div className={`${styles.earningsSummaryCard} card`}>
//       <h3 className={styles.cardTitle}>Earnings</h3>
//       <div className={styles.earningsItem}>
//         <p className={styles.label}>Today</p>
//         <p className={styles.amount}>${earnings?.today?.toFixed(2) || '0.00'}</p>
//       </div>
//       <div className={styles.earningsItem}>
//         <p className={styles.label}>This Week</p>
//         <p className={styles.amount}>${earnings?.week?.toFixed(2) || '0.00'}</p>
//       </div>
//       <div className={styles.earningsItem}>
//         <p className={styles.label}>Total</p>
//         <p className={styles.amount}>${earnings?.total?.toFixed(2) || '0.00'}</p>
//       </div>
//       <FontAwesomeIcon icon={faMoneyBillWave} className={styles.currencyIcon} />
//     </div>
//   );
// };

// export default EarningsSummary;


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import styles from './EarningsSummary.module.css';

const EarningsSummary = ({ earnings }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  return (
    <div className={`${styles.earningsSummaryCard} card`}>
      <h3 className={styles.cardTitle}>Earnings Summary</h3>
      <div className={styles.earningsItem}>
        <p className={styles.label}>Today</p>
        <p className={styles.amount}>{formatCurrency(earnings?.today)}</p>
      </div>
      <div className={styles.earningsItem}>
        <p className={styles.label}>This Week</p>
        <p className={styles.amount}>{formatCurrency(earnings?.week)}</p>
      </div>
      <div className={styles.earningsItem}>
        <p className={styles.label}>Total</p>
        <p className={styles.amount}>{formatCurrency(earnings?.total)}</p>
      </div>
      <FontAwesomeIcon 
        icon={faMoneyBillWave} 
        className={styles.currencyIcon} 
      />
    </div>
  );
};

export default EarningsSummary;