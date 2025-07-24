import { Comment } from "@/types/posts.types";
import CardHeader from "@mui/material/CardHeader";
import Image from "next/image";
import React from "react";
import userAvatar from "../../assets/imgs/user.png";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppselector } from "@/hooks/store.hooks";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

export default function CommentCard({
  commentDetails,
  onCommentUpdated,
}: {
  commentDetails: Comment;
  onCommentUpdated?: () => void;
}) {
  function handleimagePath(path: string) {
    if (path.includes("undefined")) return userAvatar;
    else return path;
  }
  const { token } = useAppselector((store) => store.userReducer);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(commentDetails.content);
  const [isSaving, setIsSaving] = useState(false);

  async function handleUpdateComment() {
    if (!editContent.trim()) return;
    setIsSaving(true);
    try {
      const response = await axios.put(
        `https://linked-posts.routemisr.com/comments/${commentDetails._id}`,
        { content: editContent },
        { headers: { token } }
      );
      if (response.data.message === "success") {
        toast.success("Comment updated!");
        setIsEditing(false);
        if (onCommentUpdated) onCommentUpdated();
      } else {
        toast.error("Failed to update comment");
      }
    } catch {
      toast.error("Error updating comment");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteComment() {
    try {
      const response = await axios.delete(
        `https://linked-posts.routemisr.com/comments/${commentDetails._id}`,
        { headers: { token } }
      );
      if (response.data.message === "success") {
        toast.success("Comment deleted!");
        if (onCommentUpdated) onCommentUpdated();
        // Optionally: trigger a refresh in the parent
      } else {
        toast.error("Failed to delete comment");
      }
    } catch {
      toast.error("Error deleting comment");
    }
  }
  return (
    <>
      <Box
        sx={{
          bgcolor: "#fff",
          px: 2,
          py: 1.5,
          borderRadius: "10px",
          mb: 2,
          boxShadow: 1,
          border: "1px solid #ececec",
          transition: "box-shadow 0.2s",
          "&:hover": { boxShadow: 3 }
        }}
      >
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
            isEditing ? (
              <IconButton aria-label="submit" onClick={handleUpdateComment} disabled={isSaving || !editContent.trim()}>
                <CheckIcon />
              </IconButton>
            ) : (
              <>
                <IconButton aria-label="edit" onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleDeleteComment}>
                  <DeleteIcon />
                </IconButton>
              </>
            )
          }
          title={commentDetails.commentCreator.name}
          subheader={new Date(commentDetails.createdAt).toLocaleDateString()}
        />
        {isEditing ? (
          <TextField
            fullWidth
            multiline
            minRows={2}
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
            disabled={isSaving}
            sx={{ pl: 0 }}
          />
        ) : (
          <Typography component={"p"} sx={{ pl: 5 }}>
            {commentDetails.content}
          </Typography>
        )}
      </Box>
    </>
  );
}
