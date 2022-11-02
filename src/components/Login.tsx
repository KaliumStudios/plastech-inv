import  React from "react";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { TextField, Card, Typography, Grid, Button } from "@mui/material";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

export default function Login() {
  return (
    <Grid>
      <Card >
        <Box>
          <Typography>
            Sign in
          </Typography>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
                <Typography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
                </Typography>
            </Grid>
            </Grid> */}
        </Box>
        <Box >
          <Box component="form" role="form">
            <Box >
              <TextField
                type="email"
                label="Usuario"
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <TextField
                type="password"
                label="Contraseña"
                fullWidth
              />
            </Box>
            <Box display="flex" alignItems="center" ml={-1}>
              <Switch />
              <Typography
                variant="button"
                fontWeight="regular"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Recuérdame
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" mt={4} mb={1}>
              <Button fullWidth>
                sign in
              </Button>
            </Box>
            <Box mt={3} mb={1} textAlign="center">
              <Typography variant="button" color="text">
                No tienes una cuenta ?{" "}
                <Typography
                >
                    Sign up
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}