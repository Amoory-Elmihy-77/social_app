import { Comment } from "@/types/posts.types";
import CardHeader from "@mui/material/CardHeader";
import Image from "next/image";
import React from "react";
import userAvatar from "../../assets/imgs/user.png";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function CommentCard({
  commentDetails,
}: {
  commentDetails: Comment;
}) {
  function handleimagePath(path: string) {
    if (path.includes("undefined")) return userAvatar;
    else return path;
  }
  return (
    <>
      <Box sx={{ bgcolor: "#f0f0f0", px: 3, pb: 2, borderRadius: "8px" }}>
        <CardHeader
          avatar={
            <Image
              src={handleimagePath(commentDetails.commentCreator.photo)}
              width={30}
              height={30}
              alt={commentDetails.commentCreator.name}
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={commentDetails.commentCreator.name}
          subheader={new Date(commentDetails.createdAt).toLocaleDateString()}
        />
        <Typography component={"p"} sx={{ pl: 5 }}>
          {commentDetails.content}
        </Typography>
      </Box>
    </>
  );
}
