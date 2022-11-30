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

interface InventarioForm {
  nombre?: string;
  proveedor?: string;
  cantidad?: string;
  fecha?: string;
  fecha_de_uso?: string;
}

type InventoryErrors = InventarioForm;

export default function Inventario() {
  const initialFormValues = {
    nombre: "",
    proveedor: "",
    cantidad: "",
    fecha: "",
    fecha_de_uso: "",
  };

  const [formValues, setFormValues] = React.useState(initialFormValues);
  const [formErrors, setFormErrors] = React.useState<InventoryErrors>({});

  const validate = (val: InventarioForm) => {
    const errors: InventarioForm = {};
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
    if (!val.fecha_de_uso) {
      errors.fecha_de_uso = "Fecha de uso required";
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
    setFormErrors(validate(formValues));
  };

  return (
    <Stack>
      <Typography variant="h4" sx={{ color: "white" }}>
        Agrega un nuevo registro a inventario
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "#CADBDB", opacity: 0.5 }}>
        Esta informacion se guardara en las tablas
      </Typography>
      <Grid container spacing={3} mb={8} mt={2} style={centeredGrids}>
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
            <TextField
              name="cantidad"
              fullWidth
              value={formValues.cantidad}
              error={!!formErrors.cantidad}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {formErrors.cantidad && (
              <Box style={redError}> {formErrors.cantidad} </Box>
            )}
          </Box>
          <Box style={boxMargins}>
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
            <Typography style={typographyStyles}>Fecha de uso</Typography>
            <TextField
              name="fecha_de_uso"
              type="date"
              fullWidth
              value={formValues.fecha_de_uso}
              error={!!formErrors.fecha_de_uso}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {formErrors.fecha_de_uso && (
              <Box style={redError}> {formErrors.fecha_de_uso} </Box>
            )}
          </Box>
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
