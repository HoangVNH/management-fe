import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";
import { NotifyHelper } from "../../helper/notify-helper";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  products: [],
  pagination: {},
  details: {},
};

//----------ACTIONS----------
export const getProductList = createAsyncThunk(
  "product/getProductList",
  async () => {
    const response = await productApi.getProductList();
    return response.data;
  }
);

export const getProductsByCategoryId = createAsyncThunk(
  "product/getProductsByCategoryId",
  async (id) => {
    const { data } = await productApi.getProductsByCategoryId(id);
    return { data, id };
  }
);

export const getProductsbySearch = createAsyncThunk(
  "product/getProductsbySearch",
  async (search) => {
    const res = await productApi.getProductsbySearch(search);
    if (res && res.data.totalCount > 0) {
      return res;
    }
    return 0;
  }
);

//------------------------UTILITIES------------------------
const isPendingAction = (action) =>
  action.type.endsWith("/pending") && action.type.includes("product");
const isRejectedAction = (action) =>
  action.type.endsWith("/rejected") && action.type.includes("product");

//----------REDUCERS----------
const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setDataToEmpty: (state) => {
      state.detail = initialState.detail;
    },
    getProductsListByPartnerId: (state) => {
      state.products = [
        {
          key: nanoid(),
          id: 1,
          name: "Bánh Mì",
          price: 15000,
          inStock: 50,
        },
        {
          key: nanoid(),
          id: 2,
          name: "Cơm Tấm",
          price: 20000,
          inStock: 10,
        },
        {
          key: nanoid(),
          id: 3,
          name: "Bánh Bèo",
          price: 15000,
          inStock: 15,
        },
        {
          key: nanoid(),
          id: 4,
          name: "Hủ Tiếu",
          price: 25000,
          inStock: 50,
        },
        {
          key: nanoid(),
          id: 5,
          name: "Mì Tôm",
          price: 8000,
          inStock: 20,
        },
        {
          key: nanoid(),
          id: 6,
          name: "Hủ Tiếu",
          price: 25000,
          inStock: 50,
        },
        {
          key: nanoid(),
          id: 7,
          name: "Mì Tôm",
          price: 8000,
          inStock: 20,
        },
        {
          key: nanoid(),
          id: 8,
          name: "Hủ Tiếu",
          price: 25000,
          inStock: 50,
        },
        {
          key: nanoid(),
          id: 9,
          name: "Mì Tôm",
          price: 8000,
          inStock: 20,
        },
      ];
    },
    getProductById: (state, { payload }) => {
      const index = state.products.findIndex(
        (product) => product.id === payload
      );

      if (index !== -1) {
        state.details = state.products[index];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(getProductById.fulfilled, (state, action) => {
      //   state.requesting = false;
      //   state.success = true;
      //   state.detail = action.payload;
      // })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.requesting = false;
        state.list = action.payload;
      })
      .addCase(getProductsByCategoryId.fulfilled, (state, action) => {
        state.requesting = false;
        if (action.payload.id === 1) {
          state.productList1 = action.payload.data.data;
        } else if (action.payload.id === 2) {
          state.productList2 = action.payload.data.data;
        } else {
          state.productList3 = action.payload.data.data;
        }
      })
      .addCase(getProductsbySearch.fulfilled, (state, action) => {
        state.requesting = false;
        if (Array.isArray(action.payload?.data?.data)) {
          state.list = action.payload?.data?.data;
        } else state.list = [];
      })

      //---------------PENDING & REJECTION---------------
      .addMatcher(isPendingAction, (state) => {
        state.requesting = true;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.requesting = state.success = false;
        state.message = action.error.message;
        NotifyHelper.error(action.error.message, "Yêu cầu thất bại!");
      });
  },
});

export const { setDataToEmpty, getProductsListByPartnerId, getProductById } =
  productSlice.actions;

export const selectProductsList = (state) => state.product.products;
export const selectProductDetails = (state) => state.product.details;

export default productSlice.reducer;
