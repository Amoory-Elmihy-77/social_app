"use client";

import { Box, Button, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import { login } from "@/store/features/user.slice";
import { useAppDispatch } from "@/hooks/store.hooks";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      dispatch(login(values)).then((res) => {
        if (res.payload.message === "success") {
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      });
    },
  });
  return (
    <>
      <Box sx={{ p: 2, mt: 3, mx: "auto", maxwidth: 600 }}>
        <Paper elevation={6} sx={{ p: 5 }}>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "25px" }}
          >
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
            />
            <Button type="submit" variant="contained">
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
}
