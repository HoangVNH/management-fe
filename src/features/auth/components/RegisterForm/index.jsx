import { Button, Form, Input, InputNumber, Select, Tabs } from "antd";
import { fetchDistricts, fetchProvinces, selectDistricts, selectIsFetchingDistricts, selectIsFetchingProvinces, selectProvinces } from "features/partner/partnerSlice";
import React, { useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { isValidArray } from "utils";
const { TabPane } = Tabs;

const onChange = (key) => {
  console.log('key >>> ', key);
}

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const RegisterForm = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  
  const [disableDistricts, setDisableDistricts] = useState(true);

  const provinces = useSelector(selectProvinces);
  const districts = useSelector(selectDistricts);
  const isFetchingProvinces = useSelector(selectIsFetchingProvinces);
  const isFetchingDistricts = useSelector(selectIsFetchingDistricts);

  const handleChangeProvince = (provinceCode) => {
    dispatch(fetchDistricts(provinceCode));
    setDisableDistricts(false)
  }

  useEffect(() => {
    dispatch(fetchProvinces());
  }, [dispatch]);

  return (
    <Tabs onChange={onChange} type="card">
      <TabPane tab="Khách hàng" key="1">
        <Form
          {...formItemLayout}
          form={form}
          onFinish={() => {
            console.log('registered');
          }}
          layout={"vertical"}
          name="customer-register-form"
          autoComplete="off"
          scrollToFirstError
        >
          <Form.Item
            label="Họ tên"
            name="name"

            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ tên!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"

            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"

            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: "Email không hợp lệ!",
              },
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="full-width-button"
            >
              Đăng ký
            </Button>
            Đã có tài khoản?
            <Button
              type="link"
              htmlType="button"
              onClick={() => {
                history.push('/login');
              }}
              style={{ paddingLeft: 5 }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </TabPane>
    <TabPane tab="Đối tác" key="2">
      <Form
        {...formItemLayout}
        form={form}
        onFinish={() => {
          console.log('registered');
        }}
        layout={"vertical"}
        name="partner-register-form"
        autoComplete="off"
        scrollToFirstError
      >
        <Form.Item
          label="Tên đối tác"
          name="partnerName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên đối tác!",
            },
          ]}
        >
          <Input placeholder="Tên đối tác"/>
        </Form.Item>
        <Form.Item
          label="Người đại diện"
          name="representative"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập người đại diện!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tỉnh"
        >
        <Select
          onChange={handleChangeProvince}
          disabled={isFetchingProvinces}
        >
          {
            isValidArray(provinces) && provinces.map((province) =>
              <Select.Option
                key={province.code}
                value={province.code}
              >
                {province.name}
              </Select.Option>
            )
          }
        </Select>
      </Form.Item>
      <Form.Item
        label="Huyện"
      >
        <Select
          disabled={
            disableDistricts || isFetchingDistricts
          }
        >
          {
            isValidArray(districts) && districts.map((district) =>
              <Select.Option
                key={district.code}
                value={district.code}
              >
                {district.name}
              </Select.Option>
            )
          }
        </Select>
      </Form.Item>
        <Form.Item
          label="Số chi nhánh"
          name="numberOfBranches"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số chi nhánh!",
            },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          label="Số lượng đơn hàng mỗi ngày"
          name="numberOfOrders"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số lượng đơn hàng mỗi ngày!",
            },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          label="Loại hàng vận chuyển"
          name="productType"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập loại hàng vận chuyển!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ kinh doanh"
          name="address"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ kinh doanh!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: "Email không hợp lệ!",
            },
            {
              required: true,
              message: "Vui lòng nhập email!",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="full-width-button"
          >
            Đăng ký
          </Button>
          Đã có tài khoản?
          <Button
            type="link"
            htmlType="button"
            onClick={() => {
              history.push('/login');
            }}
            style={{ paddingLeft: 5 }}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </TabPane>
    <TabPane tab="Tài xế" key="3">
      <Form
        form={form}
        {...formItemLayout}
        onFinish={() => {
          console.log('registered');
        }}
        layout={"vertical"}
        name="driver-register-form"
        autoComplete="off"
        scrollToFirstError
      >
        <Form.Item
          label="Họ tên"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ tên!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="CMND"
          name="idCard"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập CMND!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Biển số xe"
          name="licensePlate"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập biển số xe!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Khu vực hoạt động"
          name="activityArea"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập khu vực hoạt động!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: "Email không hợp lệ!",
            },
            {
              required: true,
              message: "Vui lòng nhập email!",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tài khoản ngân hàng"
          name="bankAccount"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tài khoản ngân hàng!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="full-width-button"
          >
            Đăng ký
          </Button>
          Đã có tài khoản?
          <Button
            type="link"
            htmlType="button"
            onClick={() => {
              history.push('/login');
            }}
            style={{ paddingLeft: 5 }}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </TabPane>
  </Tabs>
  );
};

export default RegisterForm;
