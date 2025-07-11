"use client";

import Loading from "@/components/Loading/Loading";
import PostCard from "@/components/PostCard/PostCard";
import PostForm from "@/components/PostForm/PostForm";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useAppDispatch, useAppselector } from "@/hooks/store.hooks";
import { getAllPosts } from "@/store/features/posts.slice";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();

  const { posts } = useAppselector((store) => store.postsReducers);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <ProtectedRoute>
      <Grid container sx={{ mt: 3 }}>
        <Grid size={3}></Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ p: 3 }}>
          <PostForm />
          {posts ? (
            posts.map((post) => <PostCard key={post._id} postDetails={post} />)
          ) : (
            <Loading />
          )}
        </Grid>
        <Grid size={3}></Grid>
      </Grid>
    </ProtectedRoute>
  );
}
