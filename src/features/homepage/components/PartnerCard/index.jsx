import React from "react";
import { useHistory } from "react-router-dom";
import styles from './PartnerCard.module.scss';

function PartnerCard({ id, name, categoryName }) {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles['left-content']}>
        <h4 className={styles['partner-name']}>{name}</h4>
        <span className={styles['partner-category']}>{categoryName}</span>
      </div>
      <button onClick={() => history.push(`/partner/${id}`)}>Xem sản phẩm</button>
      
    </div>
  )
};

export default PartnerCard;
