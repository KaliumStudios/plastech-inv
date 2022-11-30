import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField, Stack, Card, Typography, Button } from "@mui/material";
import {
  boxMargins,
  typographyStyles,
  centeredGrids,
  redError,
  buttonSpacing,
} from "../styles/Common.styles";
import { Inventory } from "../utils/databaseTypes";
import { Timestamp } from "firebase/firestore";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { NumberInput } from "@mui-treasury/component-numberinput/dist";
import moment from "moment";

type InventoryForm = Record<keyof Inventory, string>;
type InventoryErrors = Partial<InventoryForm>;

export default function Inventario() {
  const initialFormValues: Inventory = {
    nombre: "",
    proveedor: "",
    cantidad: 0,
    fecha: Timestamp.fromDate(new Date()),
    fechaDeUso: Timestamp.fromDate(new Date()),
  };

  const [formValues, setFormValues] =
    React.useState<Inventory>(initialFormValues);
  const [formErrors, setFormErrors] = React.useState<InventoryErrors>({});

  const validate = (val: Inventory) => {
    const errors: InventoryErrors = {};
    if (!val.nombre) {
      errors.nombre = "Name required";
    }
    if (!val.proveedor) {
      errors.proveedor = "Proveedor required";
    }
    if (!val.cantidad) {
      errors.cantidad = "Cantidad required";
    }
    if (!val.fecha) {
      errors.fecha = "Fecha required";
    }
    if (!val.fechaDeUso) {
      errors.fechaDeUso = "Fecha de uso required";
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
      const name = e.target.name as keyof InventoryErrors;
      const newFormErrors: InventoryErrors = { ...formErrors };
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
        Agrega un nuevo registro a inventario
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "#CADBDB", opacity: 0.5 }}>
        Esta informacion se guardara en las tablas
      </Typography>
      <Grid container mt={2} style={centeredGrids}>
        <Card sx={{ width: "66%", borderRadius: 7 }}>
          <Box style={boxMargins}>
            <Typography style={typographyStyles}>Nombre</Typography>
            <TextField
              name="nombre"
              fullWidth
              value={formValues.nombre}
              error={!!formErrors.nombre}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {formErrors.nombre && (
              <Box style={redError}> {formErrors.nombre} </Box>
            )}
            <Typography style={typographyStyles}>Proveedor</Typography>
            <TextField
              fullWidth
              name="proveedor"
              value={formValues.proveedor}
              error={!!formErrors.proveedor}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {formErrors.proveedor && (
              <Box style={redError}> {formErrors.proveedor} </Box>
            )}
            <Typography style={typographyStyles}>Cantidad</Typography>
            <NumberInput
              min={0}
              name="cantidad"
              fullWidth
              value={formValues.cantidad}
              error={!!formErrors.cantidad}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(val: any, _md: any) => {
                setFormValues({
                  ...formValues,
                  cantidad: val ?? formValues.cantidad,
                });
              }}
            />
            {formErrors.cantidad && (
              <Box style={redError}> {formErrors.cantidad} </Box>
            )}
          </Box>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box style={boxMargins}>
              <Typography style={typographyStyles}>Fecha</Typography>
              <DesktopDatePicker
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
              <Typography style={typographyStyles}>Fecha de uso</Typography>
              <DesktopDatePicker
                inputFormat="MM/DD/YYYY"
                value={moment(formValues.fechaDeUso.toDate())}
                onChange={(val) => {
                  if (!val) return;
                  return setFormValues({
                    ...formValues,
                    fechaDeUso: Timestamp.fromDate(val.toDate()),
                  });
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
              {formErrors.fechaDeUso && (
                <Box style={redError}> {formErrors.fechaDeUso} </Box>
              )}
            </Box>
          </LocalizationProvider>
          <Button
            onClick={handleSubmit}
            fullWidth
            color="info"
            style={buttonSpacing}
          >
            Save
          </Button>
        </Card>
      </Grid>
    </Stack>
  );
}
