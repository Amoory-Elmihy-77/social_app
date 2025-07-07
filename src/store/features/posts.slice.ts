import { postsState } from "@/types/posts.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const initialState: postsState = {
  posts: null,
  singlePost: null,
};

export const getAllPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { getState }) => {
    const state = getState() as RootState;
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
export const getSinglePost = createAsyncThunk(
  "posts/getSinglePost",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const token = state.userReducer.token;
    const options = {
      url: `https://linked-posts.routemisr.com/posts/${id}`,
      method: "GET",
      headers: {
        //   token: localStorage.getItem("token"),
        token,
      },
    };
    const { data } = await axios.request(options);
    return data.post;
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

    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      console.log("okk");
      console.log({ state, action });
      state.singlePost = action.payload;
    });
    builder.addCase(getSinglePost.rejected, (state, action) => {
      console.log("not okk");
      console.log({ state, action });
    });
  },
});

export const postsReducers = postsSlice.reducer;
