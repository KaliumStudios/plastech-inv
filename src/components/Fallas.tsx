import React, { useState } from "react";
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
  boxMargins,
  typographyStyles,
  centeredGrids,
  redError,
  buttonSpacing,
} from "../styles/Common.styles";
import { AgGridReact } from "ag-grid-react";
import {
  PlastechDataType,
  PlastechTypeMap,
  ValueOf,
} from "../utils/databaseTypes";
import { defaultColDef, defectColDef } from "../utils/invColDefs";
import { NumberInput } from "@mui-treasury/component-numberinput";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { Defects } from "../utils/databaseTypes";
import { Timestamp } from "firebase/firestore";

type FallasErrors = Partial<Record<keyof Defects, string>>;

export default function Fallas() {
  const initialFormValues: Defects = {
    noCicloFalla: 0,
    dia: Timestamp.fromDate(new Date()),
    grupoDefalla: "",
    idFalla: 10,
    comentarios: "",
  };

  const [formValues, setFormValues] = React.useState(initialFormValues);
  const [formErrors, setFormErrors] = React.useState<FallasErrors>({});

  const colDefs = {
    [PlastechDataType.defects]: defectColDef,
  };

  const [rowData] = useState<ValueOf<PlastechTypeMap>[]>([]);

  const validate = (val: Defects) => {
    const errors: FallasErrors = {};
    if (!val.noCicloFalla) {
      errors.noCicloFalla = "Número de ciclo requerido";
    }
    if (!val.grupoDefalla) {
      errors.grupoDefalla = "Grupo de falla requerido";
    }
    if (!val.dia) {
      errors.dia = "Día del fallo requerido";
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
    const newErrors = validate(formValues);
    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // TODO: Upload to database
      console.log(formValues);
    }
  };

  return (
    <Stack>
      <Typography variant="h4" sx={{ color: "white" }}>
        Agrega una nueva falla
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "#CADBDB", opacity: 0.5 }}>
        Esta informacion se guardara en las tablas
      </Typography>
      <Grid container mt={2} style={centeredGrids}>
        <Card sx={{ width: "66%", borderRadius: 7 }}>
          <Box style={boxMargins}>
            <Typography style={typographyStyles}>
              Numero de ciclo de falla
            </Typography>
            <NumberInput
              min={0}
              name="noCicloFalla"
              fullWidth
              value={formValues.noCicloFalla}
              error={!!formErrors.noCicloFalla}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(val: any, _md: any) => {
                setFormValues({
                  ...formValues,
                  noCicloFalla: val ?? formValues.noCicloFalla,
                });
              }}
            />
            {formErrors.noCicloFalla && (
              <Box style={redError}> {formErrors.noCicloFalla} </Box>
            )}
            <Typography style={typographyStyles}>Grupo de falla</Typography>
            <TextField
              fullWidth
              name="grupoDefalla"
              value={formValues.grupoDefalla}
              error={!!formErrors.grupoDefalla}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {formErrors.grupoDefalla && (
              <Box style={redError}> {formErrors.grupoDefalla} </Box>
            )}
            <Typography style={typographyStyles}>Dia de la falla</Typography>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                inputFormat="MM/DD/YYYY"
                value={moment(formValues.dia.toDate())}
                onChange={(val) => {
                  if (!val) return;
                  return setFormValues({
                    ...formValues,
                    dia: Timestamp.fromDate(val.toDate()),
                  });
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
            {formErrors.dia && <Box style={redError}> {formErrors.dia} </Box>}
          </Box>
          <Divider> </Divider>

          <Box style={boxMargins}>
            <Typography style={typographyStyles}>Comentarios </Typography>
            <TextField
              fullWidth
              multiline
              rows={5}
              name="comentarios"
              value={formValues.comentarios}
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
        </Card>
      </Grid>
      <Grid>
        <Box
          className="ag-theme-alpine"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "3rem",
          }}
        >
          <AgGridReact
            containerStyle={{
              height: 600,
              width: "80%",
            }}
            defaultColDef={defaultColDef}
            columnDefs={colDefs[2]}
            rowData={rowData}
          />
        </Box>
      </Grid>
    </Stack>
  );
}
