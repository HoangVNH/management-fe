import { Button, Col, Modal, Row, Form, Input, Select, Result } from "antd";
import ProductCard from "../../components/ProductCard";
import ProductCartItem from "./ProductCartItem";
import {
  fetchDistricts,
  fetchProvinces,
  fetchWards,
  selectDistricts,
  selectIsFetchingDistricts,
  selectIsFetchingProvinces,
  selectIsFetchingWards,
  selectPartnerById,
  selectProvinces,
  selectWards,
} from "./partnerSlice";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Partner.module.scss";
import { addToCart, selectCartItems } from "../cart/cartSlice";
import { isValidArray } from "../../utils";
import { selectProductsList } from "../product/productSlice";

const { TextArea } = Input;

const PartnerDetails = () => {
  const { partnerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [isCartModalVisible, setIsCartModalVisible] = useState(false);
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);
  const [disableLocation, setDisableLocation] = useState({
    disableDistricts: true,
    disableWards: true,
  });
  const [showResult, setShowResult] = useState(false);

  const partner = useSelector((state) =>
    selectPartnerById(state, Number(partnerId))
  );
  const products = useSelector(selectProductsList);
  const productsFromCart = useSelector(selectCartItems);
  const provinces = useSelector(selectProvinces);
  const districts = useSelector(selectDistricts);
  const wards = useSelector(selectWards);
  const isFetchingProvinces = useSelector(selectIsFetchingProvinces);
  const isFetchingDistricts = useSelector(selectIsFetchingDistricts);
  const isFetchingWards = useSelector(selectIsFetchingWards);

  const handleCartOk = () => {
    setIsCartModalVisible(false);
    setIsCheckoutModalVisible(true);
  };

  const handleCartCancel = () => {
    setIsCartModalVisible(false);
  };

  const handleCheckoutOk = () => {
    setIsCheckoutModalVisible(false);
    setShowResult(true);
  };

  const handleCheckoutCancel = () => {
    setIsCheckoutModalVisible(false);
  };

  const handleAddToCart = (values) => {
    dispatch(addToCart(values));
  };

  const handleChangeProvince = (provinceCode) => {
    dispatch(fetchDistricts(provinceCode));
    setDisableLocation((prevState) => ({
      ...prevState,
      disableDistricts: false,
    }));
  };

  const handleChangeDistrict = (districtCode) => {
    dispatch(fetchWards(districtCode));
    setDisableLocation((prevState) => ({
      ...prevState,
      disableWards: false,
    }));
  };

  const renderCartModalFooter = () => (
    <>
      <Button key="cancel" onClick={handleCartCancel}>
        Hu???
      </Button>
      <Button key="submit" type="primary" onClick={handleCartOk}>
        Thanh to??n
      </Button>
    </>
  );

  const renderCheckoutModalFooter = () => (
    <>
      <Button key="cancel" onClick={handleCheckoutCancel}>
        Hu???
      </Button>
      <Button key="submit" type="primary" onClick={handleCheckoutOk}>
        ?????t h??ng
      </Button>
    </>
  );

  const renderCheckoutModalContent = () => (
    <Form layout="vertical" form={form}>
      <Form.Item label="H??? t??n">
        <Input />
      </Form.Item>
      <Form.Item label="S??? ??i???n tho???i">
        <Input />
      </Form.Item>
      <Form.Item label="?????a ch???">
        <Input />
      </Form.Item>
      <Form.Item label="T???nh">
        <Select onChange={handleChangeProvince} disabled={isFetchingProvinces}>
          {isValidArray(provinces) &&
            provinces.map((province) => (
              <Select.Option key={province.code} value={province.code}>
                {province.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Huy???n"
        style={{
          display: "inline-block",
          width: "calc(50% - 10px)",
          marginRight: "10px",
        }}
      >
        <Select
          onChange={handleChangeDistrict}
          disabled={disableLocation.disableDistricts || isFetchingDistricts}
        >
          {isValidArray(districts) &&
            districts.map((district) => (
              <Select.Option key={district.code} value={district.code}>
                {district.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="X??"
        style={{
          display: "inline-block",
          width: "calc(50%)",
          margin: "0",
        }}
      >
        <Select disabled={disableLocation.disableWards || isFetchingWards}>
          {isValidArray(wards) &&
            wards.map((ward) => (
              <Select.Option key={ward.code} value={ward.code}>
                {ward.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item label="Ghi ch??">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          style={{
            width: "100%",
          }}
        >
          T???o ?????a ch???
        </Button>
      </Form.Item>
    </Form>
  );

  useEffect(() => {
    dispatch(fetchProvinces());
  }, [dispatch]);

  if (!partner) {
    return (
      <section>
        <h2>Partner not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h2>{partner.name}</h2>

      <div className={styles["content-container"]}>
        <div className={styles["left-content"]}>
          <p>Body</p>
          <p>Partner {partnerId} Details Page</p>
          <h2>Danh s??ch s???n ph???m</h2>
        </div>
        <div className={styles["right-content"]}>
          <span>Chi nh??nh 1:</span>
        </div>
      </div>

      <Row gutter={[0, 16]}>
        {products.map((product) => (
          <Col key={product.id} span={6}>
            <ProductCard {...product} onClick={handleAddToCart} />
          </Col>
        ))}
      </Row>

      <Modal
        title="Gi??? h??ng"
        visible={isCartModalVisible}
        onOk={handleCartOk}
        onCancel={handleCartCancel}
        footer={renderCartModalFooter()}
      >
        {productsFromCart.map((product) => (
          <ProductCartItem key={product.id} {...product} />
        ))}
      </Modal>

      <Modal
        title="Thanh to??n"
        visible={isCheckoutModalVisible}
        onOk={handleCheckoutOk}
        onCancel={handleCheckoutCancel}
        footer={renderCheckoutModalFooter()}
        bodyStyle={{
          height: "450px",
          overflowY: "scroll",
        }}
      >
        {renderCheckoutModalContent()}
      </Modal>

      <Modal
        visible={showResult}
        footer={null}
        onCancel={() => setShowResult(false)}
      >
        <Result
          status="success"
          title="?????t h??ng th??nh c??ng"
          subTitle="????n h??ng ???? ???????c ti???p nh???n v?? ??ang ???????c x??? l??. C???m ??n qu?? kh??ch."
          extra={[
            <Button type="primary" key="console">
              Quay l???i
            </Button>,
            <Button key="buy">Mua l???i</Button>,
          ]}
        />
      </Modal>

      <div className={styles["bottom-container"]}>
        <Button onClick={() => navigate.goBack()}>Quay l???i</Button>
        <Button type="primary" onClick={() => setIsCartModalVisible(true)}>
          ?????t h??ng
        </Button>
      </div>
    </article>
  );
};

export default PartnerDetails;
