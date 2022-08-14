import { Col, Row, Typography, Modal, Input } from "antd";
import ImageWithFallBack from "components/ImageWithFallback";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonUI from "components/UIKit/ButtonUI";
import Utils from "components/UIKit/Utils";
import PropTypes from "prop-types";
import { changeQuantity, removeProductFromCart } from "../cartSlice";
import { useDispatch } from "react-redux";
import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const { Text, Title } = Typography;

const ProductCartItem = ({ product }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productQuantity, setProductQuantity] = useState(product.quantity);

  const handleChange = (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      setProductQuantity(+value);
      handleChangeQuantity(product.productId, +value);
    }
  };

  const handleChangeQuantity = useCallback(
    (productId, quantity) => {
      dispatch(changeQuantity({ productId, quantity }));
    },
    [dispatch]
  );

  const handleDeleteProduct = useCallback(
    (id) => {
      dispatch(removeProductFromCart({ itemId: id }));
      setIsModalVisible(false);
    },
    [dispatch]
  );

  const handleIncrease = () => {
    setProductQuantity(productQuantity + 1);
    handleChangeQuantity(product.productId, productQuantity + 1);
  };

  const handleDecrease = () => {
    if (productQuantity - 1 > 0) {
      setProductQuantity(productQuantity - 1);
      handleChangeQuantity(product.productId, productQuantity - 1);
    } else {
      dispatch(removeProductFromCart({ itemId: product.id }));
    }
  };

  useEffect(() => {
    setProductQuantity(product.quantity);
  }, [product.quantity]);

  return (
    <Col span={24} className="rounded-3 mb-3 border p-2 shadow-sm">
      <Modal
        title="Thông báo ?"
        visible={isModalVisible}
        footer={[
          <ButtonUI
            variant="light"
            onClick={() => setIsModalVisible(false)}
            text="Quay lại"
            key={uuidv4()}
          />,
          <ButtonUI
            variant="danger"
            text="Xóa"
            onClick={() => handleDeleteProduct(product.id)}
            key={uuidv4()}
          />,
        ]}
      >
        <Text>Bạn có chắc chắn muốn xóa sản phẩm này ?</Text>
      </Modal>

      <Row className="my-3">
        <Col span={8} sm={8} lg={4} className="ps-2">
          <Link to={`/product/${product.productId}`}>
            <ImageWithFallBack
              className="rounded"
              src={product.smallImage || ""}
            />
          </Link>
        </Col>
        <Col span={15} sm={12} lg={10} className="ps-4">
          <Link to={`/product/${product.productId}`}>
            <Title level={5}>
              {product.productName ? (
                product.productName
              ) : (
                <>{product.name ? product.name : "Title"}</>
              )}
            </Title>
          </Link>
          <Typography.Link>
            <Text type="danger" onClick={() => setIsModalVisible(true)}>
              <DeleteOutlined className="align-baseline" /> Xóa sản phẩm
            </Text>
          </Typography.Link>
        </Col>
        <Col
          span={24}
          sm={24}
          className="pe-3 d-flex justify-content-end align-items-end"
        >
          <Title level={5} className="me-4 mb-2">
            {Utils.Money({ money: product.total })}
          </Title>
          <ButtonUI
            className="mb-2"
            onClick={handleDecrease}
            type="default"
            normal={true}
            withIcon={<MinusOutlined />}
          />
          <Input
            className="mb-2 text-center mx-1"
            style={{ maxWidth: "4em" }}
            bordered={true}
            value={productQuantity || 1}
            min={1}
            max={99}
            controls={false}
            onChange={handleChange}
          />
          <ButtonUI
            className="mb-2"
            onClick={handleIncrease}
            type="default"
            normal={true}
            withIcon={<PlusOutlined />}
          />
        </Col>
      </Row>
    </Col>
  );
};

ProductCartItem.propTypes = {
  product: PropTypes.object,
  onChangeQuantity: PropTypes.func,
};

export default ProductCartItem;
