import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField, Stack, Card, Typography, Checkbox } from "@mui/material";
import {
  cardBackgroundColor,
  boxMargins,
  typographyStyles,
  checkboxesStyles,
  centeredGrids,
} from "../styles/Common.styles";

export default function Production() {
  return (
    <Stack>
      <Grid container spacing={3} mb={8} mt={2} style={centeredGrids}>
        <Grid item xs={7}>
          <Card style={cardBackgroundColor}>
            <Box style={boxMargins}>
              <Typography style={typographyStyles}>Pintor</Typography>
              <TextField fullWidth></TextField>
              <Typography style={typographyStyles}>Resinador</Typography>
              <TextField fullWidth></TextField>
              <Typography style={typographyStyles}>Fibrador</Typography>
              <TextField fullWidth></TextField>
              <Typography style={typographyStyles}>Manchador</Typography>
              <TextField fullWidth></TextField>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card style={cardBackgroundColor}>
            <Box style={boxMargins}>
              <Typography style={typographyStyles}>Fecha</Typography>
              <TextField fullWidth></TextField>
              <Typography style={typographyStyles}>Hora de inicio</Typography>
              <TextField fullWidth></TextField>
              <Typography style={typographyStyles}>Hora de termino</Typography>
              <TextField fullWidth></TextField>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} mb={3} style={centeredGrids}>
        <Grid item xs={7}>
          <Card style={cardBackgroundColor}>
            <Box style={boxMargins}>
              <Typography style={typographyStyles}>Tipo de molde</Typography>
              <TextField fullWidth></TextField>
              <Box style={checkboxesStyles}>
                <Typography>Molde 1</Typography>
                <Checkbox />
                <Typography>Molde 2</Typography>
                <Checkbox />
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card style={cardBackgroundColor}>
            <Box style={boxMargins}>
              <Typography style={typographyStyles}>
                Piezas fabricadas
              </Typography>
              <TextField fullWidth></TextField>
              <Typography style={typographyStyles}>Numero de ciclo</Typography>
              <TextField fullWidth></TextField>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
