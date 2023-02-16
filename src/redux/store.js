import { configureStore } from '@reduxjs/toolkit';

import listSlice from './filter/slice';
import userSlice from './user/slice';

export const store = configureStore({
  reducer: {
    lists: listSlice,
    user: userSlice,
  },
});
