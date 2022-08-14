import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import locationApi from "api/locationApi"
import { NotifyHelper } from "helper/notify-helper"

const initialState = {
  requesting: false,
  success: false,
  message: null,
  provinces: [],
  districts: [],
  wards: [],
  list_province_details: {},
  list_district_details: {},
  ward_details: {}
}

//----------ACTIONS----------
export const getProvinces = createAsyncThunk(
  "location/getProvinces",
  async () => {
    return await locationApi.getProvinces()
  }
)
export const getProvinceById = createAsyncThunk(
  "location/getProvinceById",
  async (id) => {
    return await locationApi.getProvinceById(id)
  }
)
export const getDistricts = createAsyncThunk(
  "location/getDistricts",
  async (provinceId) => {
    return await locationApi.getDistricts(provinceId)
  }
)
export const getDistrictById = createAsyncThunk(
  "location/getDistrictById",
  async (id) => {
    return await locationApi.getDistrictById(id)
  }
)
export const getWards = createAsyncThunk(
  "location/getWards",
  async (districtId) => {
    return await locationApi.getWards(districtId)
  }
)
export const getWardById = createAsyncThunk(
  "location/getWardById",
  async (id) => {
    return await locationApi.getWardById(id)
  }
)
//------------------------UTILITIES------------------------
const isPendingAction = (action) =>
  action.type.endsWith("/pending") && action.type.includes("location")
const isRejectedAction = (action) =>
  action.type.endsWith("/rejected") && action.type.includes("location")

//----------REDUCERS----------
const locationSlice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //------------------PROVINCE------------------
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.requesting = false
        state.success = true
        state.provinces = action.payload.data.data
      })
      .addCase(getProvinceById.fulfilled, (state, action) => {
        state.requesting = false
        state.success = true
        state.province_details = action.payload
      })
      //------------------DISTRICT------------------
      .addCase(getDistricts.fulfilled, (state, action) => {
        state.requesting = false
        state.success = true
        state.districts = action.payload.data.data
      })
      .addCase(getDistrictById.fulfilled, (state, action) => {
        state.requesting = false
        state.success = true
        state.district_details = action.payload
      })
      //------------------WARD------------------
      .addCase(getWards.fulfilled, (state, action) => {
        state.requesting = false
        state.success = true
        state.wards = action.payload.data.data
      })
      .addCase(getWardById.fulfilled, (state, action) => {
        state.requesting = false
        state.success = true
        state.ward_details = action.payload
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

// useSelector
export const selectProvinces = state => state.location.provinces
export const selectDistricts = state => state.location.districts
export const selectWards = state => state.location.wards
export const selectProvinceDetails = state => state.location.province_details
export const selectDistrictDetails = state => state.location.district_details
export const selectWardDetails = state => state.location.ward_details
export default locationSlice.reducer
