import React, { useState } from "react";

import { Box, Card, Grid, MenuItem, Select, Typography } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { AgGridReact } from "ag-grid-react";
import {
  defaultColDef,
  defectColDef,
  invColDef,
  productionColDef,
  randomProdData,
} from "../utils/invColDefs";

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
  const colDefs = [productionColDef, invColDef, defectColDef];
  // TODO: Add setRowData when it's needed
  const [rowData] = useState(randomProdData);
  const [colDefIdx, setColDefIdx] = useState(0);

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
          onChange={(e) => {
            setColDefIdx(e.target.value as number);
          }}
          variant="outlined"
        >
          <MenuItem value={0}>Producción</MenuItem>
          <MenuItem value={1}>Inventario</MenuItem>
          <MenuItem value={2}>Fallas</MenuItem>
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
