"use client";

import Loading from "@/components/Loading/Loading";
import PostCard from "@/components/PostCard/PostCard";
import { useAppDispatch, useAppselector } from "@/hooks/store.hooks";
import { getSinglePost } from "@/store/features/posts.slice";
import Grid from "@mui/material/Grid";
import { use, useEffect } from "react";

export default function PostDetails({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = use(params);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, []);

  const { singlePost } = useAppselector((store) => store.postsReducers);
  return (
    <Grid container sx={{ pt: 5 }}>
      <Grid size={3}></Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        {singlePost ? (
          <PostCard postDetails={singlePost} showAllComments={true} />
        ) : (
          <Loading />
        )}
      </Grid>
      <Grid size={3}></Grid>
    </Grid>
  );
}
