import { Box, Button, Paper, TextField } from "@mui/material";

export default function Login() {
  return (
    <>
      <Box sx={{ p: 2, mt: 3, mx: "auto", width: 600 }}>
        <Paper elevation={6} sx={{ p: 5 }}>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "25px" }}
          >
            <TextField label="Email" variant="outlined" type="email" />
            <TextField label="Password" variant="outlined" type="password" />
            <Button variant="contained">Login</Button>
          </form>
        </Paper>
      </Box>
    </>
  );
}
