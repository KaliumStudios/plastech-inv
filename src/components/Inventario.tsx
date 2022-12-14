import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  TextField,
  Stack,
  Card,
  Typography,
  Button,
  Snackbar,
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
import { defaultColDef, invColDef } from "../utils/invColDefs";
import { Inventory } from "../utils/databaseTypes";
import { Timestamp } from "firebase/firestore";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { NumberInput } from "@mui-treasury/component-numberinput";
import moment from "moment";
import { inventory, inventoryCollection } from "../firebase";
import { addDoc } from "firebase/firestore";
import _ from "lodash-es";
import { Alert } from "./Alert";
import { Subscription } from "rxjs/internal/Subscription";

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
  const [open, setOpen] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(false);
  const [currenSub, setCurrenSub] = useState<Subscription | undefined>();
  const [rowData, setRowData] = useState<ValueOf<PlastechTypeMap>[]>([]);

  useEffect(() => {
    reSubscribeToDbChanges();
  }, []);

  const reSubscribeToDbChanges = () => {
    if (currenSub) {
      currenSub.unsubscribe();
    }

    const sub = inventoryCollection.subscribe((gc) => {
      setRowData(
        gc.map((doc) => {
          const data = doc.data();
          Object.entries(data).forEach(([key, val]) => {
            if (val instanceof Timestamp) {
              const newDate = moment(val.toDate()).format("YYYY/MM/DD");
              data[key] = newDate;
            }
          });

          return data as ValueOf<PlastechTypeMap>;
        })
      );
    });
    setCurrenSub(sub);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSubmitError(false);
    setOpen(false);
  };

  const colDefs = {
    [PlastechDataType.inventory]: invColDef,
  };

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

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newErrors = validate(formValues);
    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await addDoc(inventory, formValues);
        setFormValues(initialFormValues);
        setOpen(true);
      } catch (error) {
        console.error(error);
        setSubmitError(true);
        setOpen(true);
      }
    }
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={submitError ? "Error al subir" : "Datos subidos correctamente"}
      >
        {submitError ? (
          <Alert severity="error">Hubo un error al subir la informaci??n</Alert>
        ) : (
          <Alert severity="success">Informaci??n subida con ??xito</Alert>
        )}
      </Snackbar>
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
                    cantidad: _.isFinite(val)
                      ? Number(val)
                      : formValues.cantidad,
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
              columnDefs={colDefs[1]}
              rowData={rowData}
            />
          </Box>
        </Grid>
      </Stack>
    </>
  );
}
