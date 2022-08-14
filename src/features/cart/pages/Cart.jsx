import Payment from "../components/Payment";
import ProductCartItem from "../components/ProductCartItem";
import { Col, Row, Space, Modal, Typography } from "antd";
import ButtonUI from "components/UIKit/ButtonUI";
import "./Cart.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  getCart,
  selectTotalPrice,
  clearCart,
} from "../cartSlice";
import { Link, useHistory } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";
import { checkAuth } from "helper/auth";
import { v4 as uuidv4 } from "uuid";
const { Text } = Typography;

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isUserLoggedIn = checkAuth();

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
    setIsModalVisible(false);
  }, [dispatch]);

  const checkCartHasItems = (cartItems) =>
    Array.isArray(cartItems) && cartItems.length > 0;

  const hasItems = checkCartHasItems(cartItems);

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(getCart());
    } else {
      history.push("/");
    }
  }, [dispatch, isUserLoggedIn, history]);

  return hasItems ? (
    <>
      <Modal
        title="Thông báo ?"
        visible={isModalVisible}
        footer={[
          <ButtonUI
            variant="light"
            onClick={() => {
              setIsModalVisible(false);
            }}
            text="Quay lại"
            key={uuidv4()}
          />,
          <ButtonUI
            variant="danger"
            text="Xóa"
            onClick={handleClearCart}
            key={uuidv4()}
          />,
        ]}
      >
        <Text>Bạn có chắc chắn muốn xóa giỏ hàng ?</Text>
      </Modal>
      <Row type="flex" justify="center">
        <Col className="my-5" span={24} xl={20}>
          <Space size={20} className="ps-3">
            <Link to="/">
              <ButtonUI text="Tiếp tục mua hàng" />
            </Link>
            {hasItems && (
              <ButtonUI
                text="Xóa giỏ hàng"
                variant="danger"
                onClick={() => {
                  setIsModalVisible(true);
                }}
              />
            )}
          </Space>
          <Row className="mt-5 " type="flex" justify="center">
            <Col
              span={24}
              sm={13}
              lg={16}
              className="mb-4 px-3 d-flex justify-content-center"
            >
              {hasItems && (
                <Row span={24}>
                  {cartItems.map((item) => (
                    <ProductCartItem key={item.productId} product={item} />
                  ))}
                </Row>
              )}
            </Col>
            {hasItems && (
              <Col span={22} sm={11} lg={8} className="px-5">
                <Payment totalPrice={totalPrice} />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </>
  ) : (
    <div className="cart--no-items">
      <p>Giỏ hàng của bạn còn trống</p>
      <ButtonUI
        variant="success"
        text="Tiếp tục mua hàng"
        onClick={() => {
          history.push("/");
        }}
      />
    </div>
  );
};

export default Cart;
