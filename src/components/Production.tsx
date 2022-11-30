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
import { AgGridReact } from "ag-grid-react";
import { defaultColDef, productionColDef } from "../utils/invColDefs";
import {
  PlastechDataType,
  PlastechTypeMap,
  ValueOf,
} from "../utils/databaseTypes";
import { SelectChangeEvent } from "@mui/material/Select";

interface ProductionForm {
  pintor?: string;
  resinador?: string;
  fibrador?: string;
  manchador?: string;
  fecha?: string;
  hora_inicio?: string;
  hora_termino?: string;
  tipo_molde?: string;
  piezas_fabricadas?: string;
  num_ciclo?: string;
}

type ProductionsError = ProductionForm;

export default function Production() {
  const initialFormValues = {
    pintor: "",
    resinador: "",
    fibrador: "",
    manchador: "",
    fecha: "",
    hora_inicio: "",
    hora_termino: "",
    tipo_molde: "",
    piezas_fabricadas: "",
    num_ciclo: "",
  };

  const colDefs = {
    [PlastechDataType.production]: productionColDef,
  };

  const [formValues, setFormValues] = React.useState(initialFormValues);
  const [formErrors, setFormErrors] = React.useState<ProductionsError>({});

  const [rowData] = useState<ValueOf<PlastechTypeMap>[]>([]);

  const validate = (val: ProductionForm) => {
    const errors: ProductionForm = {};
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
    if (!val.hora_inicio) {
      errors.hora_inicio = "Hora inicial requerida";
    }
    if (!val.hora_termino) {
      errors.hora_termino = "Hora de termino requerida";
    }
    if (!val.tipo_molde) {
      errors.tipo_molde = "Tipo de molde requerido";
    }
    if (!val.piezas_fabricadas) {
      errors.piezas_fabricadas = "Piezas fabricadas requerido";
    }
    if (!val.num_ciclo) {
      errors.num_ciclo = "Número de ciclo requerido";
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
      const name = e.target.name as keyof ProductionsError;
      const newFormErrors: ProductionsError = { ...formErrors };
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
      <Typography variant="h4" sx={{ color: "white" }}>
        Agrega un nuevo Productor
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
            <Box style={boxMarginsFlex}>
              <Typography style={typographyStyles}>Fecha</Typography>
              <TextField
                name="fecha"
                type="date"
                fullWidth
                value={formValues.fecha}
                error={!!formErrors.fecha}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {formErrors.fecha && (
                <Box style={redError}> {formErrors.fecha} </Box>
              )}
              <Typography style={typographyStyles}>Hora de inicio</Typography>
              <TextField
                name="hora_inicio"
                type="time"
                fullWidth
                value={formValues.hora_inicio}
                error={!!formErrors.hora_inicio}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {formErrors.hora_inicio && (
                <Box style={redError}> {formErrors.hora_inicio} </Box>
              )}
              <Typography style={typographyStyles}>Hora de termino</Typography>
              <TextField
                name="hora_termino"
                type="time"
                fullWidth
                value={formValues.hora_termino}
                error={!!formErrors.hora_termino}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {formErrors.hora_termino && (
                <Box style={redError}> {formErrors.hora_termino} </Box>
              )}
            </Box>
          </div>
          <Divider variant="middle" />
          <div style={cardBackgroundColor}>
            <Box style={boxMarginsFlex}>
              <Typography style={typographyStyles}>Tipo de molde</Typography>
              <Box style={checkboxesStyles}>
                <Select
                  fullWidth
                  name="tipo_molde"
                  value={formValues.tipo_molde}
                  error={!!formErrors.tipo_molde}
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
              {formErrors.tipo_molde && (
                <Box style={redError}> {formErrors.tipo_molde} </Box>
              )}
            </Box>
            <Box style={boxMarginsFlex}>
              <Typography style={typographyStyles}>
                Piezas fabricadas
              </Typography>
              <TextField
                name="piezas_fabricadas"
                fullWidth
                value={formValues.piezas_fabricadas}
                error={!!formErrors.piezas_fabricadas}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {formErrors.piezas_fabricadas && (
                <Box style={redError}> {formErrors.piezas_fabricadas} </Box>
              )}
              <Typography style={typographyStyles}>Numero de ciclo</Typography>
              <TextField
                name="num_ciclo"
                fullWidth
                value={formValues.num_ciclo}
                error={!!formErrors.num_ciclo}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {formErrors.num_ciclo && (
                <Box style={redError}> {formErrors.num_ciclo} </Box>
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
