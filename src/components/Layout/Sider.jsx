import {
  CloudOutlined,
  UserOutlined,
  TeamOutlined,
  SolutionOutlined,
  ShopOutlined,
  ContainerOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { USER_TYPES } from "../../constants";
import { selectUserRole } from "../../features/auth/authSlice";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const customerMenuItems = [
  {
    icon: TeamOutlined,
    label: "Đối tác",
    link: "/customer/partners",
  },
  {
    icon: CloudOutlined,
    label: "Lịch sử mua hàng",
    link: "/customer/orders",
  },
];

const partnerMenuItems = [
  {
    icon: ShopOutlined,
    label: "Sản phẩm",
    link: "/partner/products",
  },
  {
    icon: SolutionOutlined,
    label: "Hợp đồng",
    link: "/partner/contracts",
  },
];

const driverMenuItems = [
  {
    icon: ContainerOutlined,
    label: "Danh sách đơn hàng",
    link: "/driver/orders",
  },
  {
    icon: DollarCircleOutlined,
    label: "Theo dõi thu nhập",
    link: "/driver/orders-history",
  },
];

const employeeMenuItems = [
  {
    icon: TeamOutlined,
    label: "Danh sách hợp đồng",
    link: "/employee/partners",
  },
];

const adminMenuItems = [
  {
    icon: UserOutlined,
    label: "Danh sách người dùng",
    link: "/admin/",
  },
];

const renderMenuItems = (userRole) => {
  let content = [];

  if (userRole === USER_TYPES.PARTNER) {
    content = [...partnerMenuItems];
  } else if (userRole === USER_TYPES.CUSTOMER) {
    content = [...customerMenuItems];
  } else if (userRole === USER_TYPES.DRIVER) {
    content = [...driverMenuItems];
  } else if (userRole === USER_TYPES.ADMIN) {
    content = [...adminMenuItems];
  } else if (userRole === USER_TYPES.EMPLOYEE) {
    content = [...employeeMenuItems];
  }

  return content.map((item, index) => ({
    key: String(index + 1),
    icon: React.createElement(item.icon),
    label: <Link to={item.link}>{item.label}</Link>,
  }));
};

const MySider = () => {
  const navigate = useNavigate();
  const userRole = useSelector(selectUserRole);
  const renderedMenu = renderMenuItems(userRole);

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        className="logo"
        style={{
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={renderedMenu}
      />
    </Sider>
  );
};

export default MySider;
