import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import { NotifyHelper } from "helper/notify-helper";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  productList1: [],
  productList2: [],
  productList3: [],
  list: [],
  pagination: {},
  detail: {
    id: 0,
    name: "",
    sku: "",
    description: "",
    price: 0,
    discount: 0,
  },
};

//----------ACTIONS----------
export const getProductList = createAsyncThunk(
  "product/getProductList",
  async () => {
    const response = await productApi.getProductList();
    return response.data;
  }
);

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    const response = await productApi.getProductById(id);
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
    if(res && res.data.totalCount > 0){
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.fulfilled, (state, action) => {
        state.requesting = false;
        state.success = true;
        state.detail = action.payload;
      })
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
      }).addCase(getProductsbySearch.fulfilled, (state, action) => {
        state.requesting = false;
        if (Array.isArray(action.payload?.data?.data) ) {
          state.list = action.payload?.data?.data
        }
        else
          state.list = []
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

export const { setDataToEmpty } = productSlice.actions;

export const selectProduct = (state) => state.product;
export const selectProductDetail = (state) => state.product.detail;

export default productSlice.reducer;
