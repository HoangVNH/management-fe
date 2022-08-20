import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PartnerCard.module.scss";

function PartnerCard({ id, name, categoryName }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles["left-content"]}>
        <h4 className={styles["partner-name"]}>{name}</h4>
        <span className={styles["partner-category"]}>{categoryName}</span>
      </div>
      <button onClick={() => navigate(`${id}`)}>Xem sản phẩm</button>
    </div>
  );
}

export default PartnerCard;
