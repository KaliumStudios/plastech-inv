import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField, Stack, Card, Typography } from "@mui/material";
import {
  cardBackgroundColor,
  boxMargins,
  typographyStyles,
  centeredGrids,
  cardHeightControl,
} from "../styles/Common.styles";
import Paper from "@mui/material/Paper";

export default function Fallas() {
  return (
    <Stack>
      <Grid container spacing={3} mb={8} mt={2} style={centeredGrids}>
        <Grid item xs={7}>
          <Card style={cardBackgroundColor}>
            <Box style={boxMargins}>
              <Typography style={typographyStyles}>
                Numero de ciclo de falla
              </Typography>
              <TextField fullWidth></TextField>
              <Typography style={typographyStyles}>Grupo de falla</Typography>
              <TextField fullWidth></TextField>
              <Typography style={typographyStyles}>Dia de la falla</Typography>
              <TextField fullWidth></TextField>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Paper style={cardHeightControl}>
            <Card style={cardHeightControl}>
              <Box style={boxMargins}>
                <Typography style={typographyStyles}>Comentarios </Typography>
                <TextField fullWidth multiline rows={5}></TextField>
              </Box>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
