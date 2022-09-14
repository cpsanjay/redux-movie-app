import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/movieApi";
import { APIKey } from "./../../common/movieApiKey";

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
};

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    const response = await movieApi
      .get(`?apikey=${APIKey}&s=${term}&type=movie`)
      .catch((err) => {
        console.log(err);
      });
    return response.data;
  }
);

export const fetchAsyncSeries = createAsyncThunk(
  "movies/fetchAsyncSeries",
  async (term) => {
    const response = await movieApi
      .get(`?apikey=${APIKey}&s=${term}&type=movie`)
      .catch((err) => {
        console.log(err);
      });
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetails = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetails",
  async (id) => {
    const response = await movieApi
      .get(`?apikey=${APIKey}&i=${id}&Plot=full`)
      .catch((err) => {
        console.log(err);
      });
    return response.data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state, action) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending...");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully...");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected...");
    },
    [fetchAsyncSeries.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully...");
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieOrShowDetails.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully...");
      return { ...state, selectedMovieOrShow: payload };
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSeletedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow;
export default movieSlice.reducer;
