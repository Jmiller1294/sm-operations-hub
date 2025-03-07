import React from 'react';
import styles from '../../styles/DashboardCard.module.css';
import { DashBoardCardProps} from '../../types/types';


const DashboardCard = (props:DashBoardCardProps) => {
  const renderCard = (size: string) => {
    switch (size) {
      case 'small':
        return (
          <div className={styles.card}>
            {props.children}
          </div>
        );
      case 'medium':
        return (
          <div className={`${styles.card} ${styles.medium}`}>
            {props.children}
          </div>
        );
      case 'large':
        return (
          <div className={`${styles.card} ${styles.large}`}>
            {props.children}
          </div>
        );
      case 'xlarge':
        return (
          <div className={`${styles.card} ${styles.xlarge}`}>
            {props.children}
          </div>
        );
      default:
        break;
    }
  }

  return (
    <>
      {renderCard(props.size)}
    </>
  )
}

export default DashboardCard