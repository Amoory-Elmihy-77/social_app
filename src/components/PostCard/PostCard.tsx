"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Post } from "@/types/posts.types";
import Image from "next/image";
import CommentCard from "../CommentCard/CommentCard";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function PostCard({
  postDetails,
  showAllComments = false,
}: {
  postDetails: Post;
  showAllComments?: boolean;
}) {
  return (
    <Card sx={{ maxWidth: "85%", mx: "auto", mb: 3, p: 3 }}>
      <CardHeader
        avatar={
          <Image
            src={postDetails.user.photo}
            width={50}
            height={50}
            alt={postDetails.user.name}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postDetails.user.name}
        subheader={new Date(postDetails.createdAt).toLocaleDateString()}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {postDetails.body}
        </Typography>
      </CardContent>
      {postDetails.image && (
        <CardMedia
          component="img"
          height="240"
          image={postDetails.image}
          alt="Paella dish"
        />
      )}
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Divider sx={{ mb: 2 }}>Comments</Divider>
      {postDetails.comments.length > 0 && !showAllComments && (
        <CommentCard commentDetails={postDetails.comments[0]} />
      )}
      {postDetails.comments.length > 1 &&
        showAllComments &&
        postDetails.comments.map((comment) => (
          <CommentCard key={comment._id} commentDetails={comment} />
        ))}
      {!showAllComments && postDetails.comments.length > 1 && (
        <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            href={`/post/${postDetails._id}`}
          >
            Show more comments
          </Link>
        </Button>
      )}
      <TextField
        multiline
        fullWidth
        minRows={2}
        placeholder="add your comment ..."
        sx={{ mt: 2 }}
      />
    </Card>
  );
}
