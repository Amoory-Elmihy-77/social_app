"use client";
import { Box, Button, Paper, TextField, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    onSubmit: async (values) => {
      console.log(values);

      const options = {
        url: `https://linked-posts.routemisr.com/users/signup`,
        method: "POST",
        data: values,
      };
      try {
        const { data } = await axios.request(options);
        if (data.message === "success") {
          toast.success("Signup successful! Come to login...");
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        } else {
          toast.error(data.message || "Signup failed");
        }
      } catch {
        toast.error("An error occurred. Please try again.");
      }
    },
  });
  return (
    <>
      <Box sx={{ p: 2, mt: 3, mx: "auto", width: { xs: "90%", md: 600 } }}>
        <Paper elevation={6} sx={{ p: 5 }}>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "25px" }}
          >
            <TextField
              label="Name"
              variant="outlined"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              name="name"
            />
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
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              name="rePassword"
            />
            <TextField
              label="Date of birth"
              variant="outlined"
              type="date"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              name="dateOfBirth"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Gender"
              variant="outlined"
              select
              value={formik.values.gender}
              onChange={formik.handleChange}
              name="gender"
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
            <Button type="submit" variant="contained">
              Sign Up
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
}
