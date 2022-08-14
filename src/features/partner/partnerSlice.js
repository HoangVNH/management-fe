import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [
    {
      id: 1,
      name: 'Tên đối tác 1',
      email: 'doitac1@gmail.com',
      categoryName: 'Mặt hàng kinh doanh 1',
    },
    {
      id: 2,
      name: 'Tên đối tác 2',
      email: 'doitac2@gmail.com',
      categoryName: 'Mặt hàng kinh doanh 2'
    },
    {
      id: 3,
      name: 'Tên đối tác 3',
      email: 'doitac3@gmail.com',
      categoryName: 'Mặt hàng kinh doanh 3'
    },
    {
      id: 4,
      name: 'Tên đối tác 4',
      email: 'doitac4@gmail.com',
      categoryName: 'Mặt hàng kinh doanh 4'
    },
    {
      id: 5,
      name: 'Tên đối tác 5',
      email: 'doitac5@gmail.com',
      categoryName: 'Mặt hàng kinh doanh 5'
    },
  ],
  products: [
    {
      id: 1,
      name: 'Bánh Mì',
      price: 15000,
      inStock: 50
    },
    {
      id: 2,
      name: 'Cơm Tấm',
      price: 20000,
      inStock: 10
    },
    {
      id: 3,
      name: 'Bánh Bèo',
      price: 15000,
      inStock: 15
    },
    {
      id: 4,
      name: 'Hủ Tiếu',
      price: 25000,
      inStock: 50
    },
    {
      id: 5,
      name: 'Mì Tôm',
      price: 8000,
      inStock: 50
    }
  ],
};

export const partnerSlice = createSlice({
  name: 'partner',
  initialState: initialState,
  reducers: {}
});

export const selectAllPartners = (state) => state.partner.data;

export const selectPartnerById = (state, partnerId) => 
  state.partner.data.find((partner) => partner.id === partnerId);

  export const selectProductsByPartnerId = (state) => state.partner.products;

export default partnerSlice.reducer;
