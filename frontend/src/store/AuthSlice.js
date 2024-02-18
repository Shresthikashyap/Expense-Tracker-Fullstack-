// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialAuthenticationState = {
    isAuthenticated: false,
    token:''
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthenticationState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true
      state.token = action.payload.token;
    },
    loginFail(state, action) {
      state.isAuthenticated = false;
      state.error = action.payload.error;
    },
    logout(state,action) {
      state.isAuthenticated = false;
      state.token = '';
    },
  },
});

export const { loginSuccess, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;
