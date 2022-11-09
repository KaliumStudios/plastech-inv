import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  TextField,
  Stack,
  Card,
  Typography,
  Checkbox,
  Divider,
} from "@mui/material";
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
      <Typography variant="h4" sx={{ color: "white" }}>
        Agrega un nuevo Productor
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "#CADBDB", opacity: 0.5 }}>
        Esta informacion se guardara en las tablas
      </Typography>
      <Grid container mt={2} style={centeredGrids}>
        <Card sx={{ width: "66%", borderRadius: 7 }}>
          <div style={cardBackgroundColor}>
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
            <Box style={boxMargins}>
              <Typography style={typographyStyles}>Fecha</Typography>
              <TextField fullWidth></TextField>
              <Typography style={typographyStyles}>Hora de inicio</Typography>
              <TextField fullWidth></TextField>
              <Typography style={typographyStyles}>Hora de termino</Typography>
              <TextField fullWidth></TextField>
            </Box>
          </div>
          <Divider variant="middle" />
          <div style={cardBackgroundColor}>
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
            <Box style={boxMargins}>
              <Typography style={typographyStyles}>
                Piezas fabricadas
              </Typography>
              <TextField fullWidth></TextField>
              <Typography style={typographyStyles}>Numero de ciclo</Typography>
              <TextField fullWidth></TextField>
            </Box>
          </div>
        </Card>
      </Grid>
    </Stack>
  );
}
