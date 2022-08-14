import { Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import SearchResult from "features/searchResult/pages/SearchResult";
import HomePage from "features/homepage";
import ProductDetails from "features/product/pages/ProductDetails";
import Cart from "features/cart/pages/Cart";
import Order from "features/order/pages";
import OrderSuccess from "features/order/pages/OrderSuccess";
import Category from "features/category/pages";
import LoginPage from "features/auth/pages/LoginPage";
import RegisterPage from "features/auth/pages/RegisterPage";
import PartnerDetails from "features/partner/PartnerDetails";

const routes = [
  {
    key: uuidv4(),
    path: "/",
    component: HomePage,
  },
  {
    key: uuidv4(),
    path: "/partner/:partnerId",
    component: PartnerDetails,
  },
  {
    key: uuidv4(),
    path: `/product`,
    component: SearchResult,
  },
  {
    key: uuidv4(),
    path: `/product/:productId`,
    component: ProductDetails,
  },
  {
    key: uuidv4(),
    path: "/cart",
    component: Cart,
  },
  {
    key: uuidv4(),
    path: "/order",
    component: Order,
  },
  {
    key: uuidv4(),
    path: "/ordersuccess",
    component: OrderSuccess,
  },
  {
    key: uuidv4(),
    path: `/category/:categoryId`,
    component: Category,
  },
  {
    key: uuidv4(),
    path: '/login',
    component: LoginPage
  },
  {
    key: uuidv4(),
    path: '/register',
    component: RegisterPage
  },
];

const mappedRoutes = routes.map((route) => (
  <Route exact path={route.path} component={route.component} key={route.key} />
));

export default mappedRoutes;
