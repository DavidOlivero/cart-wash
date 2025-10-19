import type { IVehicle } from "../../interfaces/vehicles-interface";

export type CustomerProperties = {
  id: number;
  name: string;
  phone: string;
  email: string;
  vehicles: IVehicle[];
}
