import {configureStore} from '@reduxjs/toolkit';
import MovieReducer from '../reducers/index';

export const store = configureStore({
  reducer: {
    MovieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
