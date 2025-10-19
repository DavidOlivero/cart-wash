import type { ICustomer } from "../../interfaces/customer-interface";

export type VehicleProperties = {
  plate: string;
  type: string;
  brand: string;
  customer?: ICustomer;
}
