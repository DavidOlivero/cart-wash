import type { VehicleProperties } from "../constants/types/vehicle-type";
import type { ICustomer } from "./customer-interface";

export interface IVehicle {
  get properties(): VehicleProperties;
  assignCustomer(customer: ICustomer): void;
}
