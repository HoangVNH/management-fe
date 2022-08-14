import { InputNumber } from "antd";
import Utils from "components/UIKit/Utils";
import { changeQuantity, selectItemInCartById } from "features/cart/cartSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './ProductCartItem.module.scss';

const ProductCartItem = ({ id, totalPrice }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => selectItemInCartById(state, Number(id)));

  const [name] = useState(product?.name);
  const [quantity, setQuantity] = useState(product?.quantity);

  const handleNumberChange = (value) => {
    setQuantity(value);
    dispatch(changeQuantity({ id, quantity: value }));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className="name">{name}</div>
        <div className="price">{Utils.Money({ price: totalPrice })}</div>
      </div>
      <div className="quantity">
        <InputNumber
          min={1}
          value={quantity}
          onChange={handleNumberChange}
        />
      </div>
    </div>
  )
};

export default ProductCartItem;
