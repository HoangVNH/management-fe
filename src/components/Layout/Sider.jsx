import {
  CloudOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from "antd";
import { selectUserRole } from 'features/auth/authSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const { Sider } = Layout;

const customerMenuItems = [
  {
    icon: UserOutlined,
    label: 'Đối tác',
    link: '/'
  },
  {
    icon: CloudOutlined,
    label: 'Lịch sử mua hàng',
    link: '/orders'
  }
];

const partnerMenuItems = [
  {
    icon: UserOutlined,
    label: 'Chi nhánh',
    link: '/'
  },
  {
    icon: CloudOutlined,
    label: 'Lịch sử mua hàng',
    link: '/orders'
  }
]

const renderMenuItems = (userRole) => {
  let content = customerMenuItems;

  return content.map((item, index) => ({
    key: String(index + 1),
    icon: React.createElement(item.icon),
    label: 
      <Link to={item.link}>
        {item.label}
      </Link>
  }));
}

// const menuItems = [
//   {
//     icon: UserOutlined,
//     label: 'Đối tác',
//     link: '/'
//   },
//   {
//     icon: CloudOutlined,
//     label: 'Lịch sử mua hàng',
//     link: '/orders'
//   }
// ].map((item, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(item.icon),
//   label: 
//     <Link to={item.link}>
//       {item.label}
//     </Link>
// }));

const MySider = () => {
  const history = useHistory();
  const userRole = useSelector(selectUserRole);
  const renderedMenu = renderMenuItems(userRole);

  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        className="logo"
        style={{
          cursor: 'pointer'
        }}
        onClick={() => history.push('/')} />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={renderedMenu} />
    </Sider>
  )
};

export default MySider;
