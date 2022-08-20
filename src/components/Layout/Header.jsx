/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Col, Layout, Row } from "antd";
import { fakeLogOut, selectIsLoggedIn } from "../../features/auth/authSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const AnotherMainHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  let content;
  if (isLoggedIn) {
    content = <Button onClick={() => dispatch(fakeLogOut())}>Đăng xuất</Button>;
  } else {
    content = <Button onClick={() => navigate("/login")}>Đăng nhập</Button>;
  }

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
      }}
    >
      <Row className="navigation-bar">
        <Col flex={2} className="navigation-bar__right">
          {content}
        </Col>
      </Row>
    </Header>
  );
};

export default AnotherMainHeader;
