import type { ICustomer } from "../../core/interfaces/customer-interface";
import type { CustomerProperties } from "../../core/constants/types/customer-type";
import type { IVehicle } from "../../core/interfaces/vehicles-interface";

export class Customer implements ICustomer {
  public constructor(private _customerProperties: CustomerProperties) { }

  public get customerProperties(): CustomerProperties {
    return this._customerProperties;
  }

  public registerNewVehicle(vehicle: IVehicle): void {
    this._customerProperties.vehicles.push(vehicle)
  }
}
