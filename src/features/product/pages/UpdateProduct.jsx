import {
  Row,
  Col,
  Card,
  Typography,
  Form,
  Input,
  Skeleton,
  InputNumber,
  Select,
} from "antd";
import ButtonUI from "../../../components/UIKit/ButtonUI";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { getProductById, selectProductDetails } from "../productSlice";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function UpdateProduct() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { productId } = useParams();
  // const product = useSelector(selectProductDetail);
  const categories = [];
  const suppliers = [];
  const product = useSelector(selectProductDetails);

  console.log("product", product);

  const handleSubmit = (e) => {
    if (e) {
      const c = Number(
        e.categoryId?.toString().replace(/[-/\\^$*+?.()|[\]{}]/g, "")
      );
      const s = Number(
        e.supplierId?.toString().replace(/[-/\\^$*+?.()|[\]{}]/g, "")
      );
      let newProduct = {
        ...e,
        categoryId: isNaN(c) ? product.categoryId : c,
        supplierId: isNaN(s) ? product.supplierId : s,
      };

      // dispatch(updateProduct({ id: parseInt(params.id), data: newProduct }));
    }
  };

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(parseInt(productId)));
    }
  }, [dispatch, productId]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   dispatch(getCategoryList());
  //   dispatch(getSupplierList());
  // }, [dispatch]);

  // initialize data
  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product?.name,
        description: product?.description,
        inStock: product?.inStock,
        price: product?.price,
        unit: product?.unit,
        discount: product?.discount,
        categoryId: categories[product?.categoryId]?.name,
        supplierId: suppliers[product?.supplierId]?.name,
      });
    }
  }, [product, form, suppliers, categories]);

  return (
    <>
      {product !== null ? (
        <Card
          style={{ width: "100%" }}
          title={
            <Title level={4} className="color-primary">
              Chỉnh sửa sản phẩm
            </Title>
          }
          className="border-small shadow-sm rounded-3"
        >
          <Row className="d-flex" justify="center">
            <Col xs={24} md={20}>
              <Form layout="vertical" onFinish={handleSubmit} form={form}>
                <Row gutter={16}>
                  <Col xs={24} lg={8}>
                    <Title level={5}>Tên sản phẩm </Title>
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập thông tin này!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Title level={5}>Danh mục </Title>
                    <Form.Item name="categoryId">
                      <Select showSearch placeholder="Chọn danh mục">
                        {categories &&
                          categories.length > 0 &&
                          categories.map((category) => (
                            <Option
                              key={category.id}
                              value={JSON.stringify([category.id])}
                            >
                              {category.name}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} lg={8}>
                    <Title level={5}>Đơn vị </Title>
                    <Form.Item name="unit">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Title level={5}>Giảm giá </Title>
                    <Form.Item name="discount">
                      <InputNumber min={0} max={1000000} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Title level={5}>Giá </Title>
                    <Form.Item
                      name="price"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập thông tin này!",
                        },
                      ]}
                    >
                      <InputNumber min={0} max={1000000} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Title level={5}>Số lượng </Title>
                    <Form.Item
                      name="inStock"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập thông tin này!",
                        },
                      ]}
                    >
                      <InputNumber min={1} max={1000} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Title level={5}>Nhà cung cấp </Title>
                    <Form.Item name="supplierId">
                      <Select showSearch placeholder="Chọn nhà cung cấp">
                        {suppliers &&
                          suppliers.length > 0 &&
                          suppliers.map((supplier) => (
                            <Option
                              key={supplier.id}
                              value={JSON.stringify([supplier.id])}
                            >
                              {supplier.name}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={16}>
                    <Title level={5}>Mô tả </Title>
                    <Form.Item
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập thông tin này!",
                        },
                      ]}
                    >
                      <TextArea rows={8} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="d-flex mt-5 mb-3" justify="center" gutter={10}>
                  <Col>
                    <ButtonUI
                      text="Cập nhật"
                      htmlType="submit"
                      // requesting={requesting}
                      withIcon={<SyncOutlined />}
                    />
                  </Col>
                  <Col>
                    <Link to="/product">
                      <ButtonUI variant="secondary" text="Quay lại" />
                    </Link>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      ) : (
        <Skeleton />
      )}
    </>
  );
}

export default UpdateProduct;
