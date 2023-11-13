
import { configureStore } from '@reduxjs/toolkit';
import userRegisterSlice from './userRegisterSlice';
import userLoginSlice from './userLoginSlice';

export const store = configureStore({
  reducer: {
    userRegister: userRegisterSlice,
    userLogin: userLoginSlice,

  },
});

export default store;
