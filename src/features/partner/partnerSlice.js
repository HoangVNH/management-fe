import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import provincesApi from "../../api/provincesApi";

export const fetchProvinces = createAsyncThunk(
  "partner/fetchProvinces",
  async () => {
    const response = await provincesApi.listProvinces();
    return response.data;
  }
);

export const fetchDistricts = createAsyncThunk(
  "partner/fetchDistricts",
  async (provinceCode) => {
    const response = await provincesApi.getDistricts(provinceCode);
    return response.data;
  }
);

export const fetchWards = createAsyncThunk(
  "partner/fetchWards",
  async (districtCode) => {
    const response = await provincesApi.getWards(districtCode);
    return response.data;
  }
);

const initialState = {
  data: [
    {
      id: 1,
      name: "Tên đối tác 1",
      email: "doitac1@gmail.com",
      categoryName: "Mặt hàng kinh doanh 1",
    },
    {
      id: 2,
      name: "Tên đối tác 2",
      email: "doitac2@gmail.com",
      categoryName: "Mặt hàng kinh doanh 2",
    },
    {
      id: 3,
      name: "Tên đối tác 3",
      email: "doitac3@gmail.com",
      categoryName: "Mặt hàng kinh doanh 3",
    },
    {
      id: 4,
      name: "Tên đối tác 4",
      email: "doitac4@gmail.com",
      categoryName: "Mặt hàng kinh doanh 4",
    },
    {
      id: 5,
      name: "Tên đối tác 5",
      email: "doitac5@gmail.com",
      categoryName: "Mặt hàng kinh doanh 5",
    },
  ],
  products: [
    {
      id: 1,
      name: "Bánh Mì",
      price: 15000,
      inStock: 50,
    },
    {
      id: 2,
      name: "Cơm Tấm",
      price: 20000,
      inStock: 10,
    },
    {
      id: 3,
      name: "Bánh Bèo",
      price: 15000,
      inStock: 15,
    },
    {
      id: 4,
      name: "Hủ Tiếu",
      price: 25000,
      inStock: 50,
    },
    {
      id: 5,
      name: "Mì Tôm",
      price: 8000,
      inStock: 50,
    },
  ],
  provinces: [],
  districts: [],
  wards: [],
  isFetchingProvinces: false,
  isFetchingDistricts: false,
  isFetchingWards: false,
};

export const partnerSlice = createSlice({
  name: "partner",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProvinces.pending, (state) => {
      state.isFetchingProvinces = true;
    });
    builder.addCase(fetchProvinces.fulfilled, (state, { payload }) => {
      state.isFetchingProvinces = false;
      state.provinces = payload;
    });
    builder.addCase(fetchProvinces.rejected, (state) => {
      state.isFetchingProvinces = false;
    });
    builder.addCase(fetchDistricts.pending, (state) => {
      state.isFetchingDistricts = true;
      state.wards = [];
    });
    builder.addCase(fetchDistricts.fulfilled, (state, { payload }) => {
      const { districts } = payload;
      state.isFetchingDistricts = false;
      state.districts = districts;
    });
    builder.addCase(fetchDistricts.rejected, (state) => {
      state.isFetchingDistricts = false;
    });
    builder.addCase(fetchWards.pending, (state) => {
      state.isFetchingWards = true;
      state.wards = [];
    });
    builder.addCase(fetchWards.fulfilled, (state, { payload }) => {
      const { wards } = payload;
      state.isFetchingWards = false;
      state.wards = wards;
    });
    builder.addCase(fetchWards.rejected, (state) => {
      state.isFetchingWards = false;
    });
  },
});

export const selectAllPartners = (state) => state.partner.data;

export const selectPartnerById = (state, partnerId) =>
  state.partner.data.find((partner) => partner.id === partnerId);

export const selectProductsByPartnerId = (state) => state.partner.products;

export const selectProvinces = (state) => state.partner.provinces;
export const selectDistricts = (state) => state.partner.districts;
export const selectWards = (state) => state.partner.wards;

export const selectIsFetchingProvinces = (state) =>
  state.partner.isFetchingProvinces;
export const selectIsFetchingDistricts = (state) =>
  state.partner.isFetchingDistricts;
export const selectIsFetchingWards = (state) => state.partner.isFetchingWards;

export default partnerSlice.reducer;
