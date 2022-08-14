import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "api/authApi";
import { setAccessTokenToLocalStorage } from "helper/auth";
import { NotifyHelper } from "helper/notify-helper";
import { USER_TYPES, ASYNC_STATUS } from "../../constants";


export const signUp = createAsyncThunk(
  "auth/signUp",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await authApi.signUp(values);
      return data;
    } catch (error) {
      const { response } = error;

      if (response.statusText === "Conflict") {
        NotifyHelper.error("", "Email này đã được sử dụng!");
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await authApi.signIn(values);
      return data;
    } catch (error) {
      const { response } = error;

      if (response.data.message === "auth_credential_is_wrong") {
        NotifyHelper.error("", "Tài khoản hoặc mật khẩu không đúng!");
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isFetching: false,
    accessToken: "",
    signUpStatus: ASYNC_STATUS.IDLE,
    signInStatus: ASYNC_STATUS.IDLE,
    signOutStatus: ASYNC_STATUS.IDLE,
    isLoggedIn: false,
    role: null,
    email: null
  },
  reducers: {
    setSignUpMsgToDefault: (state) => {
      state.signUpStatus = ASYNC_STATUS.IDLE;
    },
    setSignInMsgToDefault: (state) => {
      state.signInStatus = ASYNC_STATUS.IDLE;
    },
    setSignOutMsgToSuccess: (state) => {
      state.accessToken = "";
      state.signOutStatus = ASYNC_STATUS.SUCCESS;
    },
    setSignOutMsgToDefault: (state) => {
      state.signOutStatus = ASYNC_STATUS.IDLE;
    },
    fakeLogIn: (state, { payload }) => {
      const { email, role } = payload;
      state.email = email;

      if (role === 1) {
        state.role = USER_TYPES.CUSTOMER;
      } else if (role === 2) {
        state.role = USER_TYPES.PARTNER;
      } else if (role === 3) {
        state.role = USER_TYPES.DRIVER;
      } else if (role === 4) {
        state.role = USER_TYPES.EMPLOYEE;
      } else if (role === 5) {
        state.role = USER_TYPES.ADMIN;
      }

      state.isLoggedIn = true;
    },
    fakeLogOut: (state) => {
      state.role = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [signUp.pending]: (state) => {
      state.isFetching = true;
      state.signUpStatus = ASYNC_STATUS.IDLE;
    },
    [signUp.rejected]: (state, action) => {
      state.isFetching = false;
      state.signUpStatus = ASYNC_STATUS.ERROR;
    },
    [signUp.fulfilled]: (state) => {
      state.isFetching = false;
      state.signUpStatus = ASYNC_STATUS.SUCCESS;
    },
    [signIn.pending]: (state) => {
      state.isFetching = true;
      state.signInStatus = ASYNC_STATUS.IDLE;
    },
    [signIn.rejected]: (state) => {
      state.isFetching = false;
      state.signInStatus = ASYNC_STATUS.ERROR;
    },
    [signIn.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.signInStatus = ASYNC_STATUS.SUCCESS;
      state.accessToken = action.payload.accessToken;
      setAccessTokenToLocalStorage(action.payload.accessToken);
    },
  },
});

export const {
  setSignUpMsgToDefault,
  setSignInMsgToDefault,
  setSignOutMsgToDefault,
  setSignOutMsgToSuccess,
  fakeLogIn,
  fakeLogOut
} = authSlice.actions;

export const selectAuth = (state) => state.auth;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUserRole = (state) => state.auth.role;

export default authSlice.reducer;
