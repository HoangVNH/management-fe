import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import addressApi from "api/addressApi"
import { NotifyHelper } from "helper/notify-helper"
import { ASYNC_STATUS } from "../../constants"

const initialState = {
  requesting: false,
  success: false,
  message: null,
  address_details: null,
  list_address: [],
  default_address: {},
}

//----------ACTIONS----------
export const getAddressList = createAsyncThunk(
  "address/getAddressList",
  async () => {
    const data = await addressApi.getAddressList()
    return data
  }
)

export const getAddressById = createAsyncThunk(
  "address/getAddressById",
  async (id) => {
    const data = await addressApi.getAddressById(id)
    return data
  }
)
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (id, address) => {
    return await addressApi.updateAddress(id, address)
  }
)

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id) => {
    const res = await addressApi.deleteAddressById(id)
    return [res, id]
  }
)
export const insertAddress = createAsyncThunk(
  "address/insertAddress",
  async (address) => {
    return await addressApi.insertAddress(address)
  }
)

//------------------------UTILITIES------------------------
const isPendingAction = (action) =>
  action.type.endsWith("/pending") && action.type.includes("address")
const isRejectedAction = (action) =>
  action.type.endsWith("/rejected") && action.type.includes("address")

//----------SLICERS----------
const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {
    setDefaultAddress: (state, action) => {
      state.default_address = action.payload
      NotifyHelper.success("", "Đặt địa chỉ mặc định thành công !")
    },
    setDefaultAddressMessage: (state) => {
      state.message = ASYNC_STATUS.IDLE
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddressById.fulfilled, (state, action) => {
        state.requesting = false
        state.success = true
        state.address_details = action.payload
      })
      .addCase(getAddressList.fulfilled, (state, action) => {
        state.requesting = false
        state.list_address = action.payload.data.data
        state.default_address = action.payload.data.data[0] ? action.payload.data.data[0] : {}
      })
      .addCase(updateAddress.fulfilled, (state) => {
        state.requesting = false
        state.success = true
        NotifyHelper.success("", "Cập nhật thành công !")
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.requesting = false
        state.success = true
        state.list_address = state.list_address.filter((address) => address.id !== action.payload[1])
        NotifyHelper.success("", "Xóa thành công !")
      })
      .addCase(insertAddress.fulfilled, (state) => {
        state.requesting = false
        state.success = true
        state.message = ASYNC_STATUS.SUCCESS
        NotifyHelper.success("", "Thêm thành công !")
      })

      //---------------PENDING & REJECTION---------------
      .addMatcher(isPendingAction, (state) => {
        state.requesting = true
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.requesting = state.success = false
        state.message = action.error.message
        NotifyHelper.error(action.error.message, "Yêu cầu thất bại!")
      })
  },
})

//  --------SECLECTORS --------
export const selectAddressList = (state) => state.address.list_address
export const selectAddressById = (state) => state.address.address_details
export const selectDefaultAddress = (state) => state.address.default_address
export const selectAddressMessage = (state) => state.address.message
export const selectRequesting = (state) => state.address.requesting
export const { setDefaultAddress, setDefaultAddressMessage } = 
  addressSlice.actions

export default addressSlice.reducer
