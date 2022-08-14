/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Col, Layout, Row } from "antd";
import {
  fakeLogOut,
  selectIsLoggedIn,
} from "features/auth/authSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const { Header } = Layout;

// const MainHeader = () => {
//   const [isLoggedOut, setIsLoggedOut] = useState(false);
//   const [loginFormInstance] = Form.useForm();
//   const [registerFormInstance] = Form.useForm();
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const { signUpStatus, signInStatus, signOutStatus } =
//     useSelector(selectAuth);
//   const isUserLoggedIn = checkAuth();

//   const handleCloseLoginModal = useCallback(() => {
//     loginFormInstance.resetFields();
//   }, [loginFormInstance]);

//   const handleCloseRegisterModal = useCallback(() => {
//     registerFormInstance.resetFields();
//   }, [registerFormInstance]);

//   // const switchToRegisterModal = useCallback(() => {
//   //   setIsDisplayLoginModal(false);
//   //   loginFormInstance.resetFields();
//   //   setIsDisplayRegisterModal(true);
//   // }, [loginFormInstance]);

//   // const switchToLoginModal = useCallback(() => {
//   //   setIsDisplayRegisterModal(false);
//   //   registerFormInstance.resetFields();
//   //   setIsDisplayLoginModal(true);
//   // }, [registerFormInstance]);

//   // const handleRegister = useCallback(
//   //   (values) => {
//   //     dispatch(signUp(values));
//   //   },
//   //   [dispatch]
//   // );

//   // const handleLogin = useCallback(
//   //   (values) => {
//   //     dispatch(signIn(values));
//   //     setIsLoggedOut(false);
//   //   },
//   //   [dispatch]
//   // );

//   const handleLogout = useCallback(() => {
//     clearAccessToken();
//     history.push("/");
//     setIsLoggedOut(true);
//     dispatch(setSignOutMsgToSuccess());
//   }, [history, dispatch]);

//   const renderMenuItem = () => {
//     const menu = (
//       <Menu>
//         <Menu.Item
//           key="info"
//           icon={<InfoCircleOutlined />}
//           onClick={() => history.push("/info")}
//         >
//           Thông Tin
//         </Menu.Item>
//         <Menu.Item
//           key="logout"
//           icon={<PoweroffOutlined />}
//           onClick={handleLogout}
//         >
//           Đăng Xuất
//         </Menu.Item>
//       </Menu>
//     );

//     return isUserLoggedIn && !isLoggedOut ? (
//       <Dropdown overlay={menu}>
//         <a
//           href="#"
//           className="link--normalize"
//           onClick={(e) => e.preventDefault()}
//         >
//           <UserOutlined className="navigation-bar__login" /> Tài Khoản
//         </a>
//       </Dropdown>
//     ) : (
//       <button
//         type="button"
//         className="navigation-bar__login"
//       >
//         <UserOutlined className="vertical-align-icon" />
//         <span>Đăng Nhập</span>
//       </button>
//     );
//   };

//   useEffect(() => {
//     if (signUpStatus === ASYNC_STATUS.SUCCESS) {
//       NotifyHelper.success("Đăng ký thành công", "Thông báo");
//       handleCloseRegisterModal();
//       dispatch(setSignUpMsgToDefault());
//     }
//   }, [signUpStatus, handleCloseRegisterModal, dispatch]);

//   useEffect(() => {
//     if (signInStatus === ASYNC_STATUS.SUCCESS) {
//       NotifyHelper.success("Đăng nhập thành công", "Thông báo");
//       handleCloseLoginModal();
//       dispatch(setSignInMsgToDefault());
//     }
//   }, [signInStatus, handleCloseLoginModal, dispatch]);

//   useEffect(() => {
//     if (signOutStatus === ASYNC_STATUS.SUCCESS) {
//       NotifyHelper.success("Đăng xuất thành công", "Thông báo");
//       dispatch(setSignOutMsgToDefault());
//     }
//   }, [signOutStatus, dispatch]);

//   return (
//     <>
//       <Header>
//         <Row className="navigation-bar">
//           <Col flex={3} className="navigation-bar__left">
//             <Link to="/" className="navigation-bar__logo link--normalize">
//               KovyMart
//             </Link>
//             <Search />
//           </Col>
//           <Col flex={2} className="navigation-bar__right">
//             {renderMenuItem()}
//             {isUserLoggedIn && !isLoggedOut && (
//               <Link to="/cart" className="link--normalize navigation-bar__cart">
//                 <ShoppingCartOutlined className="vertical-align-icon" />
//                 <span>Giỏ Hàng</span>
//               </Link>
//             )}
//           </Col>
//         </Row>
//       </Header>
//     </>
//   );
// };

const AnotherMainHeader = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  let content;
  if (isLoggedIn) {
    content = <Button onClick={() => dispatch(fakeLogOut())}>Đăng xuất</Button>;
  } else {
    content = <Button onClick={() => history.push('/login')}>Đăng nhập</Button>;
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
  )
}

export default AnotherMainHeader;
