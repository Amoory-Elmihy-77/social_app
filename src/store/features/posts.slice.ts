import { postsState } from "@/types/posts.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const initialState: postsState = {
  posts: null,
};

export const getAllPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { getState }) => {
    const state: RootState = getState();
    const token = state.userReducer.token;
    const options = {
      url: `https://linked-posts.routemisr.com/posts?limit=50`,
      method: "GET",
      headers: {
        //   token: localStorage.getItem("token"),
        token,
      },
    };
    const { data } = await axios.request(options);
    return data.posts;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      console.log("okk");
      console.log({ state, action });
      state.posts = action.payload;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      console.log("not okk");
      console.log({ state, action });
    });
  },
});

export const postsReducers = postsSlice.reducer;
