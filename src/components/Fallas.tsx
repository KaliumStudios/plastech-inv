import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  TextField,
  Stack,
  Card,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import {
  cardBackgroundColor,
  boxMargins,
  typographyStyles,
  centeredGrids,
  cardHeightControl,
  redError,
  buttonSpacing,
} from "../styles/Common.styles";
import Paper from "@mui/material/Paper";

interface FallasForm {
  failCycleNum?: string;
  failGroup?: string;
  dayFail?: string;
  comment?: string;
}

type FallasErrors = FallasForm;

export default function Fallas() {
  const initialFormValues = {
    failCycleNum: "",
    failGroup: "",
    dayFail: "",
    comment: "",
  };

  const [formValues, setFormValues] = React.useState(initialFormValues);
  const [formErrors, setFormErrors] = React.useState<FallasErrors>({});

  const validate = (val: FallasForm) => {
    const errors: FallasForm = {};
    if (!val.failCycleNum) {
      errors.failCycleNum = "Número de ciclo requerido";
    }
    if (!val.failGroup) {
      errors.failGroup = "Grupo de falla requerido";
    }
    if (!val.dayFail) {
      errors.dayFail = "Día del fallo requerido";
    }
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((v) => ({
      ...v,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name) {
      const name = e.target.name as keyof FallasErrors;
      const newFormErrors: FallasErrors = { ...formErrors };
      delete newFormErrors[name];

      setFormErrors(newFormErrors);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
  };

  return (
    <Stack>
      <Grid container spacing={3} mb={8} mt={2} style={centeredGrids}>
        <Grid item xs={7}>
          <Card style={cardBackgroundColor}>
            <Box style={boxMargins}>
              <Typography style={typographyStyles}>
                Numero de ciclo de falla
              </Typography>
              <TextField
                name="failCycleNum"
                fullWidth
                value={formValues.failCycleNum}
                error={!!formErrors.failCycleNum}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {formErrors.failCycleNum && (
                <Box style={redError}> {formErrors.failCycleNum} </Box>
              )}
              <Typography style={typographyStyles}>Grupo de falla</Typography>
              <TextField
                fullWidth
                name="failGroup"
                value={formValues.failGroup}
                error={!!formErrors.failGroup}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {formErrors.failGroup && (
                <Box style={redError}> {formErrors.failGroup} </Box>
              )}
              <Typography style={typographyStyles}>Dia de la falla</Typography>
              <TextField
                fullWidth
                name="dayFail"
                value={formValues.dayFail}
                error={!!formErrors.dayFail}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {formErrors.dayFail && (
                <Box style={redError}> {formErrors.dayFail} </Box>
              )}
            </Box>
            <Divider> </Divider>
            <Paper style={cardHeightControl}>
              <Box style={boxMargins}>
                <Typography style={typographyStyles}>Comentarios </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  name="comment"
                  value={formValues.comment}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                <Button
                  onClick={handleSubmit}
                  fullWidth
                  color="info"
                  style={buttonSpacing}
                >
                  Save
                </Button>
              </Box>
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
