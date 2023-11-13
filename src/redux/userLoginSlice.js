
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import Login from './../Components/Login/Login';
let message;
export const LoginUserAsync = createAsyncThunk(
  'user/LoginUser',
  async (userData) => {
    const response = await axios.post(`https://anyware-backend-xi.vercel.app/auth/login`, userData);
    console.log(response);
    message=response.data.message
if (message =="Done") {

    localStorage.setItem("userToken", response.data.access_token);



  toast.success("now you online")

  return response.data;  
}
toast.error(message)


  }
);

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginUserAsync.pending, (state) => {
        state.status = 'loading';
        console.log("loading");

      })
      .addCase(LoginUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        console.log("succeeded");
        
      })
      .addCase(LoginUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log("failed");

      });
  },
});

export const selectUserData = (state) => state.user.data;
export default userLoginSlice.reducer;
