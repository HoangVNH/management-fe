import { Button, Form, Input } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const checkPassword = (_, value) => {
    const reg = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (reg.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("Mật khẩu yếu!"));
  };

  return (
    <Form
      form={form}
      onFinish={() => {
        console.log('registered');
      }}
      layout={"vertical"}
      name="register-form"
    >
      <Form.Item
        label="Email"
        name="email"
        validateFirst
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
        <Input placeholder="Email" autoComplete="off" />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        validateFirst
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khảu!",
          },
          {
            validator: checkPassword,
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Mật khẩu" autoComplete="off" />
      </Form.Item>
      <Form.Item
        label="Nhập lại mật khẩu"
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        validateFirst
        rules={[
          {
            required: true,
            message: "Vui lòng nhập lại mật khẩu!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("Mật khẩu không trùng khớp!"));
            },
          }),
          {
            validator: checkPassword,
          },
        ]}
      >
        <Input.Password placeholder="Mật khẩu" autoComplete="off" />
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
  );
};

export default RegisterForm;
