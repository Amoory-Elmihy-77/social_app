"use client"

import { useAppselector } from "@/hooks/store.hooks";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Loading from "@/components/Loading/Loading";
import {toast} from "react-hot-toast"
import { ChangePasswordData } from "@/types/user.types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { Post } from "@/types/posts.types";
import PostCard from "@/components/PostCard/PostCard";

// Define the user profile type
interface UserProfile {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo: string;
  createdAt: string;
}

const ProfilePage = () => {
  const ProfileUrl = `https://linked-posts.routemisr.com/users/profile-data`;
  const CommentsUrl = `https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts?limit=2`;
  const { token } = useAppselector((store) => store.userReducer);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState<ChangePasswordData>({ password: "", newPassword: "" });
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Fetch profile data function
  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.request({
        url: ProfileUrl,
        method: "GET",
        headers: {
          token,
        },
      });
      setProfileData(data.user);
    } catch (err) {
      console.log(err);
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  };
  const fetchUserPosts = async () =>{
    setLoading(true);
    try {
      const { data } = await axios.request({
        url: CommentsUrl,
        method: "GET",
        headers: {
          token,
        },
      });
      console.log(data);
      setUserPosts(data.posts);
    } catch (err) {
      console.log(err);
      setUserPosts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfileData();
    fetchUserPosts();
  }, [token]);

  // Handle photo upload
  const handleUpload = async (selectedFile: File | null, token: string) => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    if (selectedFile.size > 4 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 4MB.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);

    const options = {
      url: "https://linked-posts.routemisr.com/users/upload-photo",
      method: "PUT",
      headers: {
        token,
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      toast.success("Photo uploaded successfully!");
      console.log("Upload success:", response.data);
      // Refresh profile data after upload
      fetchProfileData();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Upload error:", error.response || error.message);
      } else {
        console.error("Upload error:", error);
      }
      toast.error("Upload failed. Please try again.");
    }
  };

// Handle change Password
const handleChangePassword = async (
  data: ChangePasswordData,
  token: string
) => {
  const options = {
    url: "https://linked-posts.routemisr.com/users/change-password",
    method: "PATCH",
    headers: {
      token,
    },
    data,
  };

  try {
    const response = await axios.request(options);
    toast.success("Password changed successfully!");
    console.log("Password change response:", response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Password change error:", error.response || error.message);
      toast.error(error?.response?.data?.message || "Failed to change password.");
    } else {
      console.error("Password change error:", error);
      toast.error("Failed to change password.");
    }
  }
};

  // Delete post handler
  const handleDeletePost = async (postId: string) => {
    if (!token) {
      toast.error("Not authenticated");
      return;
    }
    try {
      await axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
        headers: { token },
      });
      setUserPosts((prev) => prev.filter((post) => post._id !== postId));
      toast.success("Post deleted successfully");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message || "Failed to delete post");
      } else {
        toast.error("Failed to delete post");
      }
    }
  };

  const onUploadPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleUpload(file, token || "");
  };

  const handleOpenPasswordDialog = () => setOpenPasswordDialog(true);
  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    setPasswordForm({ password: "", newPassword: "" });
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    await handleChangePassword(passwordForm, token || "");
    setPasswordLoading(false);
    handleClosePasswordDialog();
  };

  if (loading) return <Loading />;

  if (!profileData)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Typography variant="h6">Failed to load profile data.</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 128px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        p: { xs: 1, sm: 2, md: 4 },
      }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: 400, md: 450 },
          maxWidth: "100%",
          p: { xs: 2, sm: 3 },
          boxShadow: 6,
          borderRadius: 4,
          mx: { xs: 1, sm: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
            gap: 1,
          }}
        >
          <Avatar
            src={profileData.photo}
            alt={profileData.name}
            sx={{
              width: { xs: 80, sm: 100 },
              height: { xs: 80, sm: 100 },
              mb: 2,
              boxShadow: 3,
              border: "3px solid #fff",
            }}
          />
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ textAlign: "center", color: "#222" }}
          >
            {profileData.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", wordBreak: "break-all" }}
          >
            {profileData.email}
          </Typography>
        </Box>
        <CardContent sx={{ px: 0 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body1">
              <b>Date of Birth:</b> {new Date(profileData.dateOfBirth).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              <b>Gender:</b> {profileData.gender.charAt(0).toUpperCase() + profileData.gender.slice(1)}
            </Typography>
            <Typography variant="body1">
              <b>Joined:</b> {new Date(profileData.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mt: 2,
            px: 0,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 2,
              textTransform: "none",
            }}
            onClick={handleOpenPasswordDialog}
          >
            Change Password
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
            }}
            onClick={onUploadPhotoClick}
          >
            Upload Photo
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={onFileChange}
          />
        </CardActions>
        {
          userPosts.map((post)=>{
            return <PostCard key={post._id} postDetails={post} onDelete={handleDeletePost} />
          })
        }
      </Card>
      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
        <DialogTitle>Change Password</DialogTitle>
        <form onSubmit={handlePasswordSubmit}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 320 }}>
            <TextField
              label="Current Password"
              name="password"
              type="password"
              value={passwordForm.password}
              onChange={handlePasswordInputChange}
              required
              fullWidth
            />
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordInputChange}
              required
              fullWidth
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleClosePasswordDialog} disabled={passwordLoading}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" disabled={passwordLoading}>
              {passwordLoading ? "Changing..." : "Change Password"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;