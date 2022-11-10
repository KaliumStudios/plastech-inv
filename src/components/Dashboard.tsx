import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function createData(
  name: string,
  producto: number,
  inventario: number,
  fallas: number,
  protein: number
) {
  return { name, producto, inventario, fallas, protein };
}

const rows = [
  createData("Producto 1", 159, 6.0, 24, 4.0),
  createData("Producto 2", 237, 9.0, 37, 4.3),
  createData("Producto 3", 262, 16.0, 24, 6.0),
  createData("Producto 4", 305, 3.7, 67, 4.3),
  createData("Producto 5", 356, 16.0, 49, 3.9),
];

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
  return (
    <div>
      <Grid
        sx={{ display: "flex", justifyContent: "center" }}
        container
        spacing={3}
        mb={10}
      >
        <Grid item xs={3.2}>
          <Card>
            <Typography variant="h6">Production</Typography>
          </Card>
        </Grid>
        <Grid item xs={3.2}>
          <Card>
            <Typography variant="h6">Inventario</Typography>
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
            {" "}
            <div>
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
          </Card>
        </Grid>
        <Grid item xs={2.6}>
          <Card>
            {" "}
            <div>
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
          </Card>
        </Grid>
      </Grid>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <TableContainer component={Paper} sx={{ width: "80%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>.-.</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Producto</TableCell>
                <TableCell align="right">Inventario</TableCell>
                <TableCell align="right">Fallo</TableCell>
                <TableCell align="right">Protein</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.producto}</TableCell>
                  <TableCell align="right">{row.inventario}</TableCell>
                  <TableCell align="right">{row.fallas}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}
