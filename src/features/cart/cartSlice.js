/* eslint-disable array-callback-return */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotifyHelper } from "helper/notify-helper";
import { fee } from "../../constants/fee";
import cartApi from "api/cartApi";

const initialState = {
  finalPrices: fee.shipping,
  totalPrice: 0,
  items: [],
  totalItems: 0,
  isFetching: false,
};

export const getCart = createAsyncThunk("cart/getCart", async () => {
  const response = await cartApi.getCart();
  return response.data;
});

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await cartApi.addProductToCart(product);
      NotifyHelper.success("", "Sản phẩm đã được thêm vào Giỏ hàng");
      return data;
    } catch (error) {
      NotifyHelper.error("", "Cần đăng nhập để thực hiện thao tác này");
      return rejectWithValue(error.response.data);
    }
  }
);

// export const changeQuantity = createAsyncThunk(
//   "cart/changeQuantity",
//   async (quantity, { rejectWithValue }) => {
//     try {
//       const { data } = await cartApi.changeQuantity(quantity);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const removeProductFromCart = createAsyncThunk(
  "cart/removeProduct",
  async (itemId, { rejectWithValue }) => {
    try {
      const { data } = await cartApi.removeProductFromCart(itemId);
      NotifyHelper.success("", "Xóa sản phẩm thành công!");
      return data;
    } catch (error) {
      NotifyHelper.error("", "Xóa sản phẩm thất bại!");
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await cartApi.clearCart();
      NotifyHelper.success("", "Xoá giỏ hàng thành công!");
      return data;
    } catch (error) {
      NotifyHelper.error("", "Xóa giỏ hàng thất bại!");
      return rejectWithValue(error.response.data);
    }
  }
);

//----------REDUCERS----------
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const { id } = payload;
      const index = state.items.findIndex((item) => item.id === id);

      if (index !== -1) {
        const newQuantity = state.items[index].quantity + 1;
        const newTotalPrice = newQuantity * state.items[index].price;

        state.items[index].quantity = newQuantity;
        state.items[index].totalPrice = newTotalPrice;
      } else {
        state.items.push({
          ...payload,
          quantity: 1,
          totalPrice: payload.price
        });
      }

      state.totalPrice = state.items.reduce((prevValue, currValue) => prevValue + currValue.price, 0);
    },
    changeQuantity: (state, { payload }) => {
      const { id, quantity } = payload;
      const index = state.items.findIndex((item) => item.id === id);

      if (index !== -1) {
        const newTotalPrice = quantity * state.items[index].price;

        state.items[index].quantity = quantity;
        state.items[index].totalPrice = newTotalPrice;

        state.totalPrice = state.items.reduce((prevValue, currValue) => prevValue + currValue.price, 0);
      }
    },
  },
  extraReducers: {
    [getCart.pending]: (state) => {
      if (state.isFetching === false) {
        state.isFetching = true;
      }
    },
    [getCart.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.items = payload.items;
      state.totalItems = payload.items?.length;
      state.totalPrice = payload.totalPrice;
    },
    [removeProductFromCart.pending]: (state) => {
      state.isFetching = true;
    },
    [removeProductFromCart.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.items = payload.items;
      state.totalItems = payload.items?.length;
      state.totalPrice = payload.totalPrice;
    },
    [clearCart.pending]: (state) => {
      state.isFetching = true;
    },
    [clearCart.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.items = payload.items;
      state.totalItems = payload.items?.length;
      state.totalPrice = payload.totalPrice;
    },
  },
});

export const {
  addToCart,
  increment,
  decrement,
  changeQuantity
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectIsCartFetching = (state) => state.cart.isFetching;
export const selectTotalPrice = (state) => state.cart.totalPrice;
export const selectItemInCartById = (state, itemId) => state.cart.items.find((item) => item.id === itemId);

export default cartSlice.reducer;
