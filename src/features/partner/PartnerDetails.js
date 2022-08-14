import { Button, Col, Modal, Row, Form, Input } from "antd";
import ProductCard from "components/ProductCard";
import ProductCartItem from "./ProductCartItem";
import { selectPartnerById, selectProductsByPartnerId } from "./partnerSlice";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styles from './Partner.module.scss';
import { addToCart, selectCartItems } from "features/cart/cartSlice";

const { TextArea } = Input;

const PartnerDetails = () => {
  const { partnerId } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isCartModalVisible, setIsCartModalVisible] = useState(false);
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);

  const partner = useSelector((state) => selectPartnerById(state, Number(partnerId)));
  const products = useSelector(selectProductsByPartnerId);
  const productsFromCart = useSelector(selectCartItems);

  const handleCartOk = () => {
    setIsCartModalVisible(false);
    setIsCheckoutModalVisible(true);
  };

  const handleCartCancel = () => {
    setIsCartModalVisible(false);
  };

  const handleCheckoutOk = () => {
    setIsCartModalVisible(false);
    setIsCheckoutModalVisible(true);
  };

  const handleCheckoutCancel = () => {
    setIsCheckoutModalVisible(false);
  };

  const handleAddToCart = (values) => {
    dispatch(addToCart(values));
  }

  const renderCartModalFooter = () => (
    <>
      <Button
        key="cancel"
        onClick={handleCartCancel}
      >
        Huỷ
      </Button>
      <Button
        key="submit"
        type="primary"
        onClick={handleCartOk}
      >
        Thanh toán
      </Button>
    </>
  );

  const renderCheckoutModalFooter = () => (
    <>
      <Button
        key="cancel"
        onClick={handleCheckoutCancel}
      >
        Huỷ
      </Button>
      <Button
        key="submit"
        type="primary"
        onClick={handleCheckoutOk}
      >
        Đặt hàng
      </Button>
    </>
  );

  const renderCheckoutModalContent = () => (
    <Form
      layout="vertical"
      form={form}
    >
      <Form.Item label="Họ tên">
        <Input />
      </Form.Item>
      <Form.Item label="Số điện thoại">
        <Input />
      </Form.Item>
      <Form.Item label="Địa chỉ">
        <Input />
      </Form.Item>
      <Form.Item label="Toà nhà hoặc lầu">
        <Input />
      </Form.Item>
      <Form.Item label="Ghi chú">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" style={{
          width: '100%'
        }}>
          Tạo địa chỉ
        </Button>
      </Form.Item>
    </Form>
  );

  if (!partner) {
    return (
      <section>
        <h2>Partner not found!</h2>
      </section>
    )
  }

  return (
    <article>
      <h2>{partner.name}</h2>
      
      <div className={styles["content-container"]}>
        <div className={styles["left-content"]}>
          <p>Body</p>
          <p>Partner {partnerId} Details Page</p>
          <h2>Danh sách sản phẩm</h2>
        </div>
        <div className={styles["right-content"]}>
          <span>Chi nhánh 1:</span>
        </div>
      </div>

      <Row className="product-wrapper" gutter={[0, 16]}>
        {
          products.map(product => (
            <Col
              key={product.id}
              span={6}
            >
              <ProductCard
                {...product}
                onClick={handleAddToCart}
              />
            </Col>
          ))
        }
      </Row>

      <Modal
        title="Giỏ hàng"
        visible={isCartModalVisible}
        onOk={handleCartOk}
        onCancel={handleCartCancel}
        footer={renderCartModalFooter()}
      >
        {
          productsFromCart.map(product => (
            <ProductCartItem
              key={product.id}
              {...product}
            />
          ))
        }
      </Modal>

      <Modal
        title="Thanh toán"
        visible={isCheckoutModalVisible}
        onOk={handleCheckoutOk}
        onCancel={handleCheckoutCancel}
        footer={renderCheckoutModalFooter()}
        bodyStyle={{
          height: '450px',
          overflowY: 'scroll'
        }}
      >
        {renderCheckoutModalContent()}
      </Modal>

      <div className={styles["bottom-container"]}>
        <Button
          type="primary"
          onClick={
            () => setIsCartModalVisible(true)
          }
        >Đặt hàng</Button>
      </div>
    </article>
  )
};

export default PartnerDetails;
