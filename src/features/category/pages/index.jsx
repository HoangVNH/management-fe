import { useParams } from "react-router-dom";
import ButtonUI from "components/UIKit/ButtonUI";
import Utils from "components/UIKit/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  sortCategory,
  getProductsPagination,
  selectProducts,
  selectPagination,
  selectCategory,
  getCategoryById,
} from "../categorySlice";
import { useState, useEffect } from "react";
import ProductCardList from "components/ProductCardList";
import { Row, Col, Typography, Select } from "antd";

const { Title } = Typography;
const { Option } = Select;

const Category = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("incrementPrice");
  const requesting = useSelector((state) => state.category.requesting);
  const finished = useSelector((state) => state.category.pagination.finished);
  const products = useSelector(selectProducts);
  const pagination = useSelector(selectPagination);
  const category = useSelector(selectCategory);

  const { name: categoryName } = category;

  const layout = {
    gutter: { xs: 4, xl: 8 },
    span: { xs: 24, sm: 12, lg: 8, xl: 6 },
  };

  function handleLoadmore() {
    dispatch(getProductsPagination({ categoryId, page: pagination + 1 }));
  }

  function handleSelect() {
    dispatch(sortCategory({ selected }));
  }

  useEffect(() => {
    dispatch(getCategoryById(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    dispatch(getProductsPagination({ categoryId, page: 1 }));
  }, [dispatch, categoryId]);

  return (
    <>
      {products.length > 0 && (
        <Row className="mt-3 me-5" type="flex" justify="end">
          <Col xs={12} md={8} xl={6}>
            <Title level={5}>Sắp xếp sản phẩm </Title>
            <Select
              defaultValue="incrementPrice"
              onChange={(e) => {
                setSelected((prevState) => (prevState = e));
              }}
              style={{ width: "100%" }}
            >
              <Option value="incrementPrice">Giá tăng dần</Option>
              <Option value="decrementPrice">Giá giảm dần</Option>
              <Option value="alphabet">Sắp xếp a-z</Option>
            </Select>
            <Row type="flex" justify="end" className="mt-3">
              <ButtonUI text="Lọc sản phẩm" onClick={handleSelect} />
            </Row>
          </Col>
        </Row>
      )}
      <Row type="flex" justify="center" className="mt-5">
        <Col span={22}>
          {products && categoryName && (
            <>
              <ProductCardList
                products={products}
                title={categoryName}
                layout={layout}
              />
              <Row type="flex" justify="center">
                {requesting ? (
                  <> {Utils.Loading()} </>
                ) : (
                  <>
                    {" "}
                    {!finished && (
                      <ButtonUI
                        className="mb-5"
                        text="Xem thêm"
                        onClick={handleLoadmore}
                      />
                    )}
                  </>
                )}
              </Row>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Category;
