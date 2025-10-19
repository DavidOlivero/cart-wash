import type { IVehicle } from "../../core/interfaces/vehicles-interface";
import type { VehicleProperties } from "../../core/constants/types/vehicle-type";
import type { ICustomer } from "../../core/interfaces/customer-interface";

export class Vehicle implements IVehicle {
  public constructor(private _vehiclesProperties: VehicleProperties) { }

  public get properties(): VehicleProperties {
    return this._vehiclesProperties;
  }

  public assignCustomer(customer: ICustomer): void {
    this._vehiclesProperties.customer = customer;
    customer.registerNewVehicle(this)
  }
}

