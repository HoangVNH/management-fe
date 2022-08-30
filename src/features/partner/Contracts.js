import { Card, Table, Skeleton, Typography, BackTop, Row, Col } from "antd";
import { Link } from "react-router-dom";
import ButtonUI from "../../components/UIKit/ButtonUI";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsListByPartnerId,
  selectProductsList,
} from "../product/productSlice";
import { useEffect } from "react";

const { Column } = Table;
const { Text } = Typography;

const TableProducts = () => {
  const dispatch = useDispatch();
  // const pageSize = useSelector(selectPageSizeProduct);
  // const searchParam = useSelector(selectSearchParam);
  const products = useSelector(selectProductsList);

  const handlePagination = (e) => {
    console.log(e);
  };

  useEffect(() => {
    dispatch(getProductsListByPartnerId());
  }, [dispatch]);

  console.log("products >>> ", products);

  return (
    <Card className="border-small shadow-small mt-4 rounded-3">
      <Table
        dataSource={products}
        rowKey="key"
        scroll={{ x: 1036 }}
        pagination={{
          total: 10,
          onChange: (e) => {
            handlePagination(e);
          },
        }}
        // locale={{
        //   emptyText: products ? <Skeleton /> : "",
        // }}
      >
        {Array.isArray(products) && products.length > 0 ? (
          <>
            <Column
              title={<Text strong>STT</Text>}
              render={(value, item, index) => 1 + index}
            />

            <Column
              className="column-product"
              title={<Text strong>Sản phẩm</Text>}
              dataIndex="name"
              render={(text) => <Text>{text}</Text>}
            />
            <Column
              title={<Text strong>Thông tin chi tiết</Text>}
              dataIndex="category"
              className="column-product"
              render={(text) => (
                <Text>
                  <Text strong> Danh mục: </Text>
                  {text || "N/A"} <br />
                </Text>
              )}
            />
            <Column
              title={<Text strong>Giá</Text>}
              className="column-30"
              dataIndex="price"
              render={(text) => (
                <Text>
                  {text.toLocaleString("en-US", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
              )}
            />
            <Column
              title={
                <Row className="d-flex" justify="end">
                  <Text strong>Tùy chọn</Text>
                </Row>
              }
              dataIndex="LandOwnerName"
              render={(text, record) => (
                <Row
                  className="d-flex"
                  justify="end"
                  gutter={10}
                  style={{ rowGap: ".25rem" }}
                >
                  <Col>
                    <ButtonUI
                      variant="danger"
                      text="Xóa"
                      onClick={() => {
                        console.log("clicked");
                      }}
                    />
                  </Col>
                  <Col>
                    <Link to={`/updateproduct/${record.id}`}>
                      <ButtonUI variant="light" text="Sửa" />
                    </Link>
                  </Col>
                </Row>
              )}
            />
          </>
        ) : (
          <Skeleton />
        )}
      </Table>
      <BackTop style={{ right: "5%" }} />
    </Card>
  );
};

export default function Contracts() {
  return (
    <Col>
      {/* Search engine */}
      {/* <Row className="d-flex" justify="center">
        <Col md={16} xs={23}>
          <SearchProducts />
        </Col>
      </Row> */}
      {/* Table data */}
      <Row className="mt-2 d-flex" justify="center">
        <Col>
          <TableProducts />
        </Col>
      </Row>
    </Col>
  );
}
