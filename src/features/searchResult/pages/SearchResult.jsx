import {
  getProductsbySearch,
  selectProduct,
} from "features/product/productSlice";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../../components/ProductCard";
import React, { useCallback, useEffect } from "react";
import { addProductToCart } from "features/cart/cartSlice";
import { Col, Row } from "antd";

const SearchResult = () => {
  let query = new URLSearchParams(useLocation().search);
  const queryString = query.get("search");
  const dispatch = useDispatch();
  const productData = useSelector(selectProduct);
  const { list } = productData;

  const handleAddToCart = useCallback(
    (product, quantity = 1) => {
      dispatch(addProductToCart({ product, quantity }));
    },
    [dispatch]
  );

  const layout = {
    gutter: { xs: 8, sm: 8, md: 8, lg: 8, xl: 8, xxl: 8 },
    span: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
  };

  useEffect(() => {
    dispatch(getProductsbySearch(queryString));
  }, [dispatch, queryString]);

  return (
    <div className="product-list__container">
      <div className={`product-list__header`}>
        <span>Kết quả cho: {queryString}</span>
      </div>
      {list && list.length > 0 ? (
        <Row gutter={{ ...layout.gutter }} className="product-list__wrapper">
          {list.map((product) => (
            <Col
              style={{ marginBottom: "2em" }}
              {...layout.span}
              key={`${product.id}`}
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
      ) : (
        <h1>Không có kết quả phù hợp</h1>
      )}
    </div>
  );
};

export default SearchResult;
