import { ColDef, ColGroupDef } from "ag-grid-community";
import { Timestamp } from "firebase/firestore";
import { Production } from "./databaseTypes";

function createProductionData(
  pintor: string,
  resinador: string,
  fibrador: string,
  manchador: string,
  fecha: Timestamp,
  horaInicio: Timestamp,
  horaFin: Timestamp,
  tipoMolde: string,
  piezasFabricadas: number,
  numCiclo: number
): Production {
  return {
    pintor,
    resinador,
    fibrador,
    manchador,
    fecha,
    horaInicio,
    horaFin,
    tipoMolde,
    piezasFabricadas,
    numCiclo,
  };
}

const names = [
  "Juan",
  "Fransisco",
  "Eliud",
  "Alex",
  "Amauri",
  "Marcelo",
  "Mauricio",
  "Benjamín",
];
function generateRandomName() {
  return names[Math.floor(Math.random() * names.length)];
}
function createRandomProductionData() {
  return createProductionData(
    generateRandomName(),
    generateRandomName(),
    generateRandomName(),
    generateRandomName(),
    new Timestamp(0, 0),
    new Timestamp(0, 0),
    new Timestamp(0, 0),
    "Molde A",
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 5)
  );
}

export const randomProdData = [...new Array(15)].map(() =>
  createRandomProductionData()
);

export const defaultColDef: ColDef = {
  resizable: true,
  sortable: true,
  filter: true,
};

export const productionColDef: (ColDef | ColGroupDef)[] = [
  {
    headerName: "Pintor",
    field: "pintor",
  },
  {
    headerName: "Resinador",
    field: "resinador",
  },
  {
    headerName: "Fibrador",
    field: "fibrador",
  },
  {
    headerName: "Manchador",
    field: "manchador",
  },
  {
    headerName: "Fecha",
    field: "fecha",
  },
  {
    headerName: "Hora de inicio",
    field: "horaInicio",
  },
  {
    headerName: "Hora de término",
    field: "horaFin",
  },
  {
    headerName: "Tipo de molde",
    field: "tipoMolde",
  },
  {
    headerName: "Piezas fabricadas",
    field: "piezasFabricadas",
  },
  {
    headerName: "Número de ciclo",
    field: "numCiclo",
  },
];

export const invColDef: (ColDef | ColGroupDef)[] = [
  {
    headerName: "Nombre",
    field: "nombre",
  },
  {
    headerName: "Proveedor",
    field: "proveedor",
  },
  {
    headerName: "Cantidad",
    field: "cantidad",
  },
  {
    headerName: "Fecha",
    field: "fecha",
  },
  {
    headerName: "Fecha de uso",
    field: "fechaDeUso",
  },
];

export const defectColDef: (ColDef | ColGroupDef)[] = [
  {
    headerName: "Numero de ciclo de falla",
    field: "noCicloFalla",
  },
  {
    headerName: "Grupo de falla",
    field: "grupoFalla",
  },
  {
    headerName: "Dia de la falla",
    field: "diaFalla",
  },
  {
    headerName: "Comentarios",
    field: "comentarios",
  },
];
