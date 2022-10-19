import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField, Stack, Card, Typography } from "@mui/material";
import {
  cardBackgroundColor,
  boxMargins,
  typographyStyles,
  centeredGrids,
} from "../styles/Common.styles";

export default function Production() {
  return (
    <Stack>
      <Grid container spacing={3} mb={8} mt={2} style={centeredGrids}>
        <Grid item xs={7}>
          <Card style={cardBackgroundColor}>
            <Box style={boxMargins}>
              <Typography style={typographyStyles}>Nombre</Typography>
              <TextField
                fullWidth
                // inputProps={{ style: { fontSize: 40 } }}
              ></TextField>
              <Typography style={typographyStyles}>Proveedor</Typography>
              <TextField fullWidth></TextField>
              <Typography style={typographyStyles}>Cantidad</Typography>
              <TextField fullWidth></TextField>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card style={cardBackgroundColor}>
            <Box style={boxMargins}>
              <Typography style={typographyStyles}>Fecha</Typography>
              <TextField fullWidth></TextField>
              <Typography style={typographyStyles}>Fecha de uso</Typography>
              <TextField fullWidth></TextField>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
