import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  publicList: {
    id: 1,
    title: 'Selected Columns',
    columns: [
      { id: 1, title: 'Name', key: 'name' },
      { id: 2, title: 'User Name', key: 'userName' },
      { id: 7, title: 'Company', key: 'company' },
      { id: 5, title: 'Phone', key: 'phone' },
    ],
  },
  hideList: {
    id: 2,
    title: 'Available Columns',
    columns: [
      { id: 8, title: 'Id', key: 'id' },
      { id: 3, title: 'Email', key: 'email' },
      { id: 4, title: 'Address', key: 'address' },
      { id: 6, title: 'Website', key: 'website' },
    ],
  },
  showPopup: false,
};

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setPublicList(state, action) {
      state.publicList = action.payload;
    },
    setHideList(state, action) {
      state.hideList = action.payload;
    },
    setShowPopup(state, action) {
      state.showPopup = action.payload;
    },
  },
});

export const { setPublicList, setHideList, setShowPopup } = listSlice.actions;

export default listSlice.reducer;
