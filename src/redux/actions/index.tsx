import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getMovieApp = createAsyncThunk(
  'user/MovieApp',
  async (page: Number, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        {
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTQzN2YzYmNjM2NlMjhiZGJkOWY3Y2Y3NGNmYzIwNSIsInN1YiI6IjY0ZGEwMzdmZDEwMGI2MDBlMjZhZGY2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bAG6mKtGsgjcpzFxBtUaEweJ6XjAaJRneFKJUDD8rfo',
          },
        },
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

type ItemType = {
  key: string;
  page: number;
};

export const getSearchList = createAsyncThunk(
  'user/searchList',
  async (item: ItemType, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${item.key}&include_adult=false&language=en-US&page=${item.page}`,
        {
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTQzN2YzYmNjM2NlMjhiZGJkOWY3Y2Y3NGNmYzIwNSIsInN1YiI6IjY0ZGEwMzdmZDEwMGI2MDBlMjZhZGY2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bAG6mKtGsgjcpzFxBtUaEweJ6XjAaJRneFKJUDD8rfo',
          },
        },
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
