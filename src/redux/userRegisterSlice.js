
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
let message;
export const registerUserAsync = createAsyncThunk(
  'user/registerUser',
  async (userData) => {
    const response = await axios.post(`https://anyware-backend-xi.vercel.app/auth/signup`, userData);
    console.log(response);
    message=response.data.message
if (message =="Done") {

  toast.success("now you can login")

  return response.data;  
}
toast.error(message)


  }
);

const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = 'loading';
        console.log("loading");

      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        console.log("succeeded");
        
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log("failed");

      });
  },
});

export const selectUserData = (state) => state.user.data;
export default userRegisterSlice.reducer;
