import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  TextField,
  Stack,
  Card,
  Typography,
  Divider,
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
import { defaultColDef, defectColDef } from "../utils/invColDefs";
import { NumberInput } from "@mui-treasury/component-numberinput";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { Defects } from "../utils/databaseTypes";
import { addDoc, Timestamp } from "firebase/firestore";
import { defects, defectsCollection } from "../firebase";
import _ from "lodash-es";
import { Alert } from "./Alert";
import { Subscription } from "rxjs/internal/Subscription";

type FallasErrors = Partial<Record<keyof Defects, string>>;

export default function Fallas() {
  const initialFormValues: Defects = {
    noCicloFalla: 0,
    diaFalla: Timestamp.fromDate(new Date()),
    grupoFalla: "",
    idFalla: 10,
    comentarios: "",
  };

  const [formValues, setFormValues] = React.useState(initialFormValues);
  const [formErrors, setFormErrors] = React.useState<FallasErrors>({});
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

    const sub = defectsCollection.subscribe((gc) => {
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
    [PlastechDataType.defects]: defectColDef,
  };

  const validate = (val: Defects) => {
    const errors: FallasErrors = {};
    if (!val.noCicloFalla) {
      errors.noCicloFalla = "N??mero de ciclo requerido";
    }
    if (!val.grupoFalla) {
      errors.grupoFalla = "Grupo de falla requerido";
    }
    if (!val.diaFalla) {
      errors.diaFalla = "D??a del fallo requerido";
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

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newErrors = validate(formValues);
    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await addDoc(defects, formValues);
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
                    noCicloFalla: _.isFinite(val)
                      ? Number(val)
                      : formValues.noCicloFalla,
                  });
                }}
              />
              {formErrors.noCicloFalla && (
                <Box style={redError}> {formErrors.noCicloFalla} </Box>
              )}
              <Typography style={typographyStyles}>Grupo de falla</Typography>
              <TextField
                fullWidth
                name="grupoFalla"
                value={formValues.grupoFalla}
                error={!!formErrors.grupoFalla}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {formErrors.grupoFalla && (
                <Box style={redError}> {formErrors.grupoFalla} </Box>
              )}
              <Typography style={typographyStyles}>Dia de la falla</Typography>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  inputFormat="MM/DD/YYYY"
                  value={moment(formValues.diaFalla.toDate())}
                  onChange={(val) => {
                    if (!val) return;
                    return setFormValues({
                      ...formValues,
                      diaFalla: Timestamp.fromDate(val.toDate()),
                    });
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
              {formErrors.diaFalla && (
                <Box style={redError}> {formErrors.diaFalla} </Box>
              )}
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
    </>
  );
}
