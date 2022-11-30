import { Timestamp } from "firebase/firestore";

export type ValueOf<T> = T[keyof T];

export enum PlastechDataType {
  production,
  inventory,
  defects,
}

export type PlastechTypeMap = {
  [PlastechDataType.production]: Production;
  [PlastechDataType.inventory]: Inventory;
  [PlastechDataType.defects]: Defects;
};

export interface Defects {
  comentarios: string;
  dia: Timestamp;
  grupoDefalla: number;
  idFalla: number;
  noCicloFalla: number;
}

export interface Inventory {
  cantidad: number;
  fecha: Timestamp;
  fechaDeUso: Timestamp;
  nombre: string;
  proveedor: string;
}

export interface Production {
  fecha: Timestamp;
  fibrador: string;
  horaFin: Timestamp;
  horaInicio: Timestamp;
  manchador: string;
  numCiclo: number;
  piezasFabricadas: number;
  pintor: string;
  resinador: string;
  tipoMolde: string;
}
