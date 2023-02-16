import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserData = createAsyncThunk('users/fetchData', async (params) => {
  const { page = 1, limit = 15 } = params;

  const paramsLine = `?page=${page}&limit=${limit}`;
  console.log(paramsLine);
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/userData${paramsLine}`);

  return data;
});

const initialState = {
  userData: [],
  pagination: {
    page: 1,
    limit: 15,
    pages: 5,
  },

  status: 'loading',
};

const userSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setCurentPage(state, action) {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = 'loading';
      state.userData = [];
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.status = 'error';
      state.userData = [];
    });
  },
});

export const { setCurentPage } = userSlice.actions;

export default userSlice.reducer;
