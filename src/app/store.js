import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import counterReducer from "../features/counter/counterSlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
// import addressReducer from "../features/address/addressSlice";
import rootSaga from "./rootSaga";
// import locationReducer from "../features/location/locationSlice";
// import categoryReducer from "../features/category/categorySlice";
// import orderReducer from "../features/order/orderSlice";
import partnerReducer from "../features/partner/partnerSlice";
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
    // location: locationReducer,
    // category: categoryReducer,
    // address: addressReducer,
    // order: orderReducer,
    partner: partnerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
