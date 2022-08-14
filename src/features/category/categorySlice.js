import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import categoryApi from "api/categoryApi";
import { NotifyHelper } from "helper/notify-helper";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  list_products: [],
  category_detail: {
    id: 0,
    name: "",
    description: "",
  },
  pagination: {
    page: 0,
    finished: false,
  },
  categories: [],
};

//----------ACTIONS----------
export const getProductsPagination = createAsyncThunk(
  "category/getProductsPagination",
  async (data) => {
    const response = await productApi.getProductsPagination(data);
    return response.data;
  }
);

export const getCategoryList = createAsyncThunk(
  "category/getCategoryList",
  async () => {
    const response = await categoryApi.getCategoryList();
    return response.data;
  }
);

export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  async (id) => {
    const response = await categoryApi.getCategoryById(id);
    return response.data;
  }
);

//------------------------UTILITIES------------------------
const isPendingAction = (action) =>
  action.type.endsWith("/pending") && action.type.includes("category");
const isRejectedAction = (action) =>
  action.type.endsWith("/rejected") && action.type.includes("category");

//----------REDUCERS----------
const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    sortCategory: (state, action) => {
      switch (action.payload.selected) {
        case "incrementPrice":
          state.list_products.sort(
            (a, b) => parseFloat(a.price) - parseFloat(b.price)
          );
          break;
        case "decrementPrice":
          state.list_products.sort(
            (a, b) => parseFloat(b.price) - parseFloat(a.price)
          );
          break;
        case "alphabet":
          state.list_products.sort((a, b) => {
            if (a.productName < b.productName) return -1;
            if (a.productName > b.productName) return 1;
            return 0;
          });
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsPagination.fulfilled, (state, action) => {
        if (action.payload.data.length === 0) {
          //check if loadmore is done
          state.success = state.requesting = false;
          state.pagination.finished = true;
        } else {
          if (action.payload.data.page > 1) {
            state.list_products = state.list_products.concat(
              action.payload.data
            );
          } else {
            state.list_products = action.payload.data;
          }
          state.requesting = false;
          state.success = true;
        }
        state.pagination.page++;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.requesting = false;
        state.success = true;
        state.category_detail = action.payload;
      })
      .addCase(getCategoryList.pending, (state) => {
        state.requesting = true;
      })
      .addCase(getCategoryList.fulfilled, (state, { payload }) => {
        state.requesting = false;
        state.categories = payload.data;
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

export const selectCategory = (state) => state.category.category_detail;
export const selectProducts = (state) => state.category.list_products;
export const selectPagination = (state) => state.category.pagination.page;
export const selectCategories = (state) => state.category.categories;
export const { sortCategory } = categorySlice.actions;
export default categorySlice.reducer;
