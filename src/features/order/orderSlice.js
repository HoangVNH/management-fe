import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import orderApi from "api/orderApi"
import { NotifyHelper } from "helper/notify-helper"
import { ASYNC_STATUS } from "../../constants"


const initialState = {
  requesting: false,
  success: false,
  message: ASYNC_STATUS.IDLE,
  order_details: {},
  order_message: ASYNC_STATUS.IDLE
}

//----------ACTIONS----------
export const insertOrder = createAsyncThunk(
  "order/insertOrder",
  async (data, { rejectWithValue }) => {
    try {
      const res = await orderApi.insertOrder(data);
      return res;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);
//------------------------UTILITIES------------------------
const isPendingAction = (action) =>
  action.type.endsWith("/pending") && action.type.includes("order")
const isRejectedAction = (action) =>
  action.type.endsWith("/rejected") && action.type.includes("order")

//----------REDUCERS----------
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setMessageOrderToDefault: (state) => {
      state.message = ASYNC_STATUS.IDLE
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(insertOrder.fulfilled, (state, action) => {
        state.requesting = false
        state.success = true
        state.order_message = ASYNC_STATUS.SUCCESS
        NotifyHelper.success("", "Thanh toán thành công !")

      })
      //---------------PENDING & REJECTION---------------
      .addMatcher(isPendingAction, (state) => {
        state.requesting = true
        state.success = false
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.requesting = state.success = false
        state.message = action.error.message
        NotifyHelper.error(action.payload?.message ? action.payload.message
          : action.error.message, "Yêu cầu thất bại!");
      })
  },
})

// useSelector
export const { setMessageOrderToDefault } = orderSlice.actions
export const selectOrderMessage = (state) => state.order.order_message
export default orderSlice.reducer
