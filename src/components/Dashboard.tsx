import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getDefects } from "../firebase";
import { DocumentData } from "firebase/firestore";

export default function Dashboard() {
  const [docs, setDocs] = useState([] as DocumentData[]);
  useEffect(() => {
    getDefects().then((defects) => {
      setDocs(defects);
    });
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Comentarios</TableCell>
              <TableCell align="right">Timestamp</TableCell>
              <TableCell align="right">Grupo de falla</TableCell>
              <TableCell align="right">Id falla</TableCell>
              <TableCell align="right">No ciclo de falla</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {docs.map((doc) => (
              <TableRow
                key={doc.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {doc.id}
                </TableCell>
                <TableCell align="right">{doc.comentarios}</TableCell>
                <TableCell align="right">{doc.dia.seconds}</TableCell>
                <TableCell align="right">{doc.grupoDeFalla}</TableCell>
                <TableCell align="right">{doc.idFalla}</TableCell>
                <TableCell align="right">{doc.noCicloFalla}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
