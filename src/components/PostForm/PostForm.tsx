import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAppselector } from "@/hooks/store.hooks";
import { useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function PostForm() {
  const { token } = useAppselector((store) => store.userReducer);
  const postContentRef = useRef<HTMLInputElement>(null);
  const postFileRef = useRef<HTMLInputElement>(null);

  async function createPost() {
    const content = postContentRef.current?.value || "";
    const file = postFileRef.current?.files?.[0];

    const myFormData = new FormData();
    myFormData.append("body", content);
    if (file) myFormData.append("image", file);

    const options = {
      url: `https://linked-posts.routemisr.com/posts`,
      method: "POST",
      headers: {
        token,
      },
      data: myFormData,
    };
    const { data } = await axios.request(options);
    if (data.message === "success") toast.success("Post created Successfully ");
    else toast.error("some thing is wrong try again ");
  }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <>
      <Box sx={{ width: "90%", mb: 4, mx: "auto" }}>
        <TextField
          fullWidth
          multiline
          minRows={7}
          placeholder="What's in your mind ..."
          inputRef={postContentRef}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              ref={postFileRef}
            />
          </Button>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={createPost}
          >
            Post
          </Button>
        </Box>
      </Box>
    </>
  );
}
