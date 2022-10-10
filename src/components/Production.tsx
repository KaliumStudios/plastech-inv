import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const CardItemText = styled(Paper)(({ theme }) => ({
  backgroundColor: "#0d1b2a",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
  display: "block",
}));

export default function Production() {
  return (
    <Box>
      <Grid container spacing={2} columnSpacing={4}>
        <Grid item xs={8}>
          <CardItemText>xs=8</CardItemText>
        </Grid>
        <Grid item xs={4}>
          <CardItemText>xs=4</CardItemText>
        </Grid>
      </Grid>
    </Box>
  );
}
