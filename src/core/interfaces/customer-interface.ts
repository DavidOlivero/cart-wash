import type { CustomerProperties } from "../constants/types/customer-type";
import type { IVehicle } from "./vehicles-interface";

export interface ICustomer {
  get customerProperties(): CustomerProperties;
  registerNewVehicle(vehicle: IVehicle): void;
}
