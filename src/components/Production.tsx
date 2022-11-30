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
  MenuItem,
  Select,
} from "@mui/material";
import {
  cardBackgroundColor,
  typographyStyles,
  checkboxesStyles,
  centeredGrids,
  redError,
  boxMarginsFlex,
} from "../styles/Common.styles";
import { Production as ProductionType } from "../utils/databaseTypes";
import { Timestamp } from "firebase/firestore";
import { NumberInput } from "@mui-treasury/component-numberinput";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { AgGridReact } from "ag-grid-react";
import { defaultColDef, productionColDef } from "../utils/invColDefs";
import {
  PlastechDataType,
  PlastechTypeMap,
  ValueOf,
} from "../utils/databaseTypes";
import { SelectChangeEvent } from "@mui/material/Select";

type ProductionErrors = Partial<Record<keyof ProductionType, string>>;

export default function Production() {
  const initialFormValues: ProductionType = {
    pintor: "",
    resinador: "",
    fibrador: "",
    manchador: "",
    fecha: Timestamp.fromDate(new Date()),
    horaInicio: Timestamp.fromDate(new Date()),
    horaFin: Timestamp.fromDate(new Date()),
    tipoMolde: "",
    piezasFabricadas: 0,
    numCiclo: 0,
  };

  const colDefs = {
    [PlastechDataType.production]: productionColDef,
  };

  const [formValues, setFormValues] = React.useState(initialFormValues);
  const [formErrors, setFormErrors] = React.useState<ProductionErrors>({});

  const [rowData] = useState<ValueOf<PlastechTypeMap>[]>([]);

  const validate = (val: ProductionType) => {
    const errors: ProductionErrors = {};
    if (!val.pintor) {
      errors.pintor = "Pintor requerido";
    }
    if (!val.resinador) {
      errors.resinador = "Resinador requerido";
    }
    if (!val.fibrador) {
      errors.fibrador = "Fibrador requerido";
    }
    if (!val.manchador) {
      errors.manchador = "Manchador requerido";
    }
    if (!val.fecha) {
      errors.fecha = "Fecha requerida";
    }
    if (!val.horaInicio) {
      errors.horaInicio = "Hora inicial requerida";
    }
    if (!val.horaFin) {
      errors.horaFin = "Hora de termino requerida";
    }
    if (!val.tipoMolde) {
      errors.tipoMolde = "Tipo de molde requerido";
    }
    if (val.piezasFabricadas == undefined || val.piezasFabricadas == null) {
      errors.piezasFabricadas = "Piezas fabricadas requerido";
    }
    if (val.numCiclo == undefined || val.numCiclo == null) {
      errors.numCiclo = "Número de ciclo requerido";
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

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormValues((v) => ({
      ...v,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name) {
      const name = e.target.name as keyof ProductionErrors;
      const newFormErrors: ProductionErrors = { ...formErrors };
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
        Agrega un nuevo producto
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "#CADBDB", opacity: 0.5 }}>
        Esta informacion se guardara en las tablas
      </Typography>
      <Grid container mt={2} style={centeredGrids}>
        <Card sx={{ width: "66%", borderRadius: 7 }}>
          <div style={cardBackgroundColor}>
            <Box style={boxMarginsFlex}>
              <Typography style={typographyStyles}>Pintor</Typography>
              <TextField
                name="pintor"
                fullWidth
                value={formValues.pintor}
                error={!!formErrors.pintor}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {formErrors.pintor && (
                <Box style={redError}> {formErrors.pintor} </Box>
              )}
              <Typography style={typographyStyles}>Resinador</Typography>
              <TextField
                name="resinador"
                fullWidth
                value={formValues.resinador}
                error={!!formErrors.resinador}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {formErrors.resinador && (
                <Box style={redError}> {formErrors.resinador} </Box>
              )}
              <Typography style={typographyStyles}>Fibrador</Typography>
              <TextField
                name="fibrador"
                fullWidth
                value={formValues.fibrador}
                error={!!formErrors.fibrador}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {formErrors.fibrador && (
                <Box style={redError}> {formErrors.fibrador} </Box>
              )}
              <Typography style={typographyStyles}>Manchador</Typography>
              <TextField
                name="manchador"
                fullWidth
                value={formValues.manchador}
                error={!!formErrors.manchador}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {formErrors.manchador && (
                <Box style={redError}> {formErrors.manchador} </Box>
              )}
            </Box>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Box style={boxMarginsFlex}>
                <Typography style={typographyStyles}>Fecha</Typography>
                <DesktopDatePicker
                  label="Fecha"
                  inputFormat="MM/DD/YYYY"
                  value={moment(formValues.fecha.toDate())}
                  onChange={(val) => {
                    if (!val) return;
                    return setFormValues({
                      ...formValues,
                      fecha: Timestamp.fromDate(val.toDate()),
                    });
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
                {formErrors.fecha && (
                  <Box style={redError}> {formErrors.fecha} </Box>
                )}
                <Typography style={typographyStyles}>Hora de inicio</Typography>
                <TextField
                  name="horaInicio"
                  type="time"
                  fullWidth
                  value={formValues.horaInicio}
                  error={!!formErrors.horaInicio}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                {formErrors.horaInicio && (
                  <Box style={redError}> {formErrors.horaInicio} </Box>
                )}
                <Typography style={typographyStyles}>
                  Hora de termino
                </Typography>
                <TextField
                  name="horaFin"
                  type="time"
                  fullWidth
                  value={formValues.horaFin}
                  error={!!formErrors.horaFin}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                {formErrors.horaFin && (
                  <Box style={redError}> {formErrors.horaFin} </Box>
                )}
              </Box>
            </LocalizationProvider>
          </div>
          <Divider variant="middle" />
          <div style={cardBackgroundColor}>
            <Box style={boxMarginsFlex}>
              <Typography style={typographyStyles}>Tipo de molde</Typography>
              <Box style={checkboxesStyles}>
                <Select
                  fullWidth
                  name="tipoMolde"
                  value={formValues.tipoMolde}
                  error={!!formErrors.tipoMolde}
                  onChange={handleSelectChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="4x6">4x6</MenuItem>
                  <MenuItem value="bow">Bow</MenuItem>
                </Select>
              </Box>
              {formErrors.tipoMolde && (
                <Box style={redError}> {formErrors.tipoMolde} </Box>
              )}
            </Box>
            <Box style={boxMarginsFlex}>
              <Typography style={typographyStyles}>
                Piezas fabricadas
              </Typography>
              <NumberInput
                min={0}
                name="piezasFabricadas"
                fullWidth
                value={formValues.piezasFabricadas}
                error={!!formErrors.piezasFabricadas}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(val: any, _md: any) => {
                  setFormValues({
                    ...formValues,
                    piezasFabricadas: val ?? formValues.piezasFabricadas,
                  });
                }}
              />
              {formErrors.piezasFabricadas && (
                <Box style={redError}> {formErrors.piezasFabricadas} </Box>
              )}
              <Typography style={typographyStyles}>Numero de ciclo</Typography>
              <NumberInput
                min={0}
                name="numCiclo"
                fullWidth
                value={formValues.numCiclo}
                error={!!formErrors.numCiclo}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(val: any, _md: any) => {
                  setFormValues({
                    ...formValues,
                    numCiclo: val ?? formValues.numCiclo,
                  });
                }}
              />
              {formErrors.numCiclo && (
                <Box style={redError}> {formErrors.numCiclo} </Box>
              )}
            </Box>
          </div>
          <Button onClick={handleSubmit} fullWidth color="info">
            Save
          </Button>
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
            columnDefs={colDefs[0]}
            rowData={rowData}
          />
        </Box>
      </Grid>
    </Stack>
  );
}
