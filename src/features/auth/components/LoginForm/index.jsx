import { Button, Form, Input, Select } from "antd";
import { PARTNER_ROUTES , CUSTOMER_ROUTES , USER_TYPES, DRIVER_ROUTES, EMPLOYEE_ROUTES, ADMIN_ROUTES } from "../../../../constants";

import { fakeLogIn, selectIsLoggedIn, selectUserRole } from "features/auth/authSlice";
import React, { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

const { Option } = Select;

const LoginForm = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUserRole);

  const handleFinish = (values) => {
    const formatValues = { ...values, role: Number(values.role)};
    dispatch(fakeLogIn(formatValues));
  }

  useEffect(() => {
    form.resetFields();
  }, [form]);

  if (isLoggedIn) {
    let dest;

    if (userRole === USER_TYPES.PARTNER) {
      dest = PARTNER_ROUTES.productsOverview;
    } else if (userRole === USER_TYPES.DRIVER) {
      dest = DRIVER_ROUTES.orders;
    } else if (userRole === USER_TYPES.EMPLOYEE) {
      dest = EMPLOYEE_ROUTES.partnerOverview;
    } else if (userRole === USER_TYPES.ADMIN) {
      dest = ADMIN_ROUTES.userOverview;
    } else {
      dest = CUSTOMER_ROUTES.seeAllPartners;
    }

    return <Redirect to={dest} />
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout={"vertical"}
      name="login-form"
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "Email không hợp lệ!",
          },
          {
            required: true,
            message: "Vui lòng nhập email!",
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu!",
          },
        ]}
      >
        <Input.Password placeholder="Mật khẩu" />
      </Form.Item>

      <Form.Item
        name="role"
        label="Vai trò"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn quyền!",
          },
        ]}
      >
        <Select
          placeholder="Chọn quyền"
        >
          <Option value="1">Khách hàng</Option>
          <Option value="2">Đối tác</Option>
          <Option value="3">Tài xế</Option>
          <Option value="4">Nhân viên</Option>
          <Option value="5">Quản trị</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="full-width-button"
        >
          Đăng nhập
        </Button>
        Chưa có tài khoản?
        <Button
          type="link"
          htmlType="button"
          onClick={() => {
            history.push('/register');
          }}
          style={{ paddingLeft: 5 }}
        >
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
