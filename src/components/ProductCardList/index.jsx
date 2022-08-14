import { Col, Row } from "antd";
import { addProductToCart } from "features/cart/cartSlice";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "../../components/ProductCard";
import "./styles.scss";

const ProductCardList = ({ products, title, layout, className, style }) => {
  const dispatch = useDispatch();

  const modifyProduct = useCallback((product, quantity) => {
    const modifiedProduct = { ...product, quantity, productId: product.id };
    delete modifiedProduct["id"];

    return modifiedProduct;
  }, []);

  const handleAddToCart = useCallback(
    (product, quantity = 1) => {
      const modifiedProduct = modifyProduct(product, quantity);

      dispatch(addProductToCart(modifiedProduct));
    },
    [dispatch, modifyProduct]
  );

  return (
    <div className="product-list__container">
      <div className={`product-list__header ${className}`} style={style}>
        <span>{title}</span>
      </div>
      <Row gutter={{ ...layout.gutter }} className="product-list__wrapper">
        {products.map((product) => (
          <Col
            style={{ marginBottom: "2em" }}
            {...layout.span}
            key={`${product.id + product.categoryId}`}
          >
            <ProductCard
              id={product.id}
              name={product.productName}
              price={product.price}
              netPrice={product.netPrice}
              discount={product.discount}
              onAddToCart={() => handleAddToCart(product)}
              smallImage={product.smallImage}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

ProductCardList.propTypes = {
  products: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object,
  layout: PropTypes.object,
};

ProductCardList.defaultProps = {
  className: "",
  style: {},
  layout: {},
};

export default ProductCardList;
