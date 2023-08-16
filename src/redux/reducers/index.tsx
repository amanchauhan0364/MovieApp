import {createSlice} from '@reduxjs/toolkit';
import {getMovieApp, getSearchList} from '../actions';

type PropType = {
  data: object[];
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
  searchData: object[];
  isLoadingSearch: boolean;
  totalPage: number;
  totalPageSearch: number;
};

const initialState: PropType = {
  data: [],
  isLoading: true,
  isSuccess: false,
  errorMessage: '',
  searchData: [],
  isLoadingSearch: true,
  totalPage: 0,
  totalPageSearch: 0,
};

export const movieSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [getMovieApp.pending]: (state: {isLoading: boolean}) => {
      state.isLoading = true;
    },
    [getMovieApp.fulfilled]: (
      state: {
        isLoading: boolean;
        isSuccess: boolean;
        data: any;
        totalPage: any;
      },
      {payload}: any,
    ) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload.results || [];
      state.totalPage = payload.total_pages;
    },
    [getMovieApp.rejected]: (
      state: {isLoading: boolean; isSuccess: boolean; errorMessage: any},
      {payload}: any,
    ) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
    [getSearchList.pending]: (state: {isLoadingSearch: boolean}) => {
      state.isLoadingSearch = true;
    },
    [getSearchList.fulfilled]: (
      state: {isLoadingSearch: boolean; searchData: any; totalPageSearch: any},
      {payload}: any,
    ) => {
      state.isLoadingSearch = false;
      state.searchData = payload.results;
      state.totalPageSearch = payload.total_pages;
    },
    [getSearchList.rejected]: (
      state: {isLoadingSearch: boolean; errorMessage: any},
      {payload}: any,
    ) => {
      state.isLoadingSearch = false;
      state.errorMessage = payload;
    },
  },
  reducers: undefined,
});

export default movieSlice.reducer;
