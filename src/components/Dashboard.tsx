import React, { useState, useEffect } from "react";

import { Subscription } from "rxjs/internal/Subscription";
import {
  Box,
  Card,
  Grid,
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { AgGridReact } from "ag-grid-react";
import {
  defaultColDef,
  defectColDef,
  invColDef,
  productionColDef,
} from "../utils/invColDefs";
import { gridCollections } from "../firebase";
import {
  PlastechDataType,
  PlastechTypeMap,
  ValueOf,
} from "../utils/databaseTypes";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const options = {
  chart: {
    type: "spline",
  },
  title: {
    text: "Yep Chart",
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6],
    },
  ],
};

export default function Dashboard() {
  const colDefs = {
    [PlastechDataType.production]: productionColDef,
    [PlastechDataType.inventory]: invColDef,
    [PlastechDataType.defects]: defectColDef,
  };

  const [rowData, setRowData] = useState<ValueOf<PlastechTypeMap>[]>([]);
  const [colDefIdx, setColDefIdx] = useState<PlastechDataType>(
    PlastechDataType.production
  );
  const [currenSub, setCurrenSub] = useState<Subscription | undefined>();

  useEffect(() => {
    changeGridScreen(PlastechDataType.production);
  }, []);

  const changeGridScreen = (newVal: PlastechDataType) => {
    setColDefIdx(newVal);

    if (currenSub) {
      currenSub.unsubscribe();
    }

    const sub = gridCollections[newVal].subscribe((gc) => {
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

  const handleScreenChange = (e: SelectChangeEvent<PlastechDataType>) => {
    const newVal = Number(e.target.value) as PlastechDataType;
    changeGridScreen(newVal);
  };

  return (
    <Box>
      <Grid
        sx={{ display: "flex", justifyContent: "center" }}
        container
        spacing={3}
        mb={10}
      >
        <Grid item xs={3.2}>
          <Card>
            <Typography variant="h6">Production</Typography>
            <Typography variant="h6">
              Production <ArrowUpwardIcon color="success" />
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={3.2}>
          <Card>
            <Typography variant="h6">Inventario</Typography>
            <Typography variant="h6">
              Inventario <ArrowUpwardIcon color="success" />
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={3.2}>
          <Card sx={{ display: "block", justifyContent: "flex-start" }}>
            <Typography variant="h6">Fallas</Typography>
            <Typography variant="h6">
              Numero de Fallas <ArrowUpwardIcon color="success" />
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <Grid
        sx={{ display: "flex", justifyContent: "center" }}
        container
        spacing={3}
        mb={10}
      >
        <Grid item xs={7}>
          <Card>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Card>
        </Grid>
        <Grid item xs={2.6}>
          <Card>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Card>
        </Grid>
      </Grid>
      <Box
        className="ag-theme-alpine"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Select
          sx={{
            width: "50%",
            bgcolor: "white",
            mb: "1rem",
          }}
          value={colDefIdx}
          onChange={handleScreenChange}
          variant="outlined"
        >
          <MenuItem value={PlastechDataType.production}>Producción</MenuItem>
          <MenuItem value={PlastechDataType.inventory}>Inventario</MenuItem>
          <MenuItem value={PlastechDataType.defects}>Fallas</MenuItem>
        </Select>
        <AgGridReact
          containerStyle={{
            height: 600,
            width: "80%",
          }}
          defaultColDef={defaultColDef}
          columnDefs={colDefs[colDefIdx]}
          rowData={rowData}
        />
      </Box>
    </Box>
  );
}
