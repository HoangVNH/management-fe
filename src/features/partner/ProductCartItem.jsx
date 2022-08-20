import { InputNumber } from "antd";
import Utils from "../../components/UIKit/Utils";
import PropTypes from "prop-types";
import {
  changeQuantity,
  removeFromCart,
  selectItemInCartById,
} from "../cart/cartSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductCartItem.module.scss";
import { DeleteOutlined } from "@ant-design/icons";

const ProductCartItem = ({ id, totalPrice }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    selectItemInCartById(state, Number(id))
  );

  const [name] = useState(product?.name);
  const [quantity, setQuantity] = useState(product?.quantity);

  const handleNumberChange = (value) => {
    setQuantity(value);
    dispatch(changeQuantity({ id, quantity: value }));
  };

  const handleRemoveFormCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className="name">{name}</div>
        <div className="price">{Utils.Money({ price: totalPrice })}</div>
      </div>
      <div className={styles.quantity}>
        <InputNumber min={1} value={quantity} onChange={handleNumberChange} />
        <button
          className={styles.deleteButton}
          onClick={() => handleRemoveFormCart(id)}
        >
          <DeleteOutlined />
          <span>Xoá</span>
        </button>
      </div>
    </div>
  );
};

ProductCartItem.propTypes = {
  id: PropTypes.number.isRequired,
  totalPrice: PropTypes.number,
};

ProductCartItem.defaultProps = {
  totalPrice: 0,
};

export default ProductCartItem;
