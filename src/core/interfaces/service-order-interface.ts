import type { Service } from "../../entities/service/service";
import type { ServiceOrderState } from "../constants/enums/service-state-enum";
import type { IEmployee } from "./employee-interface";

export interface IServiceOrder {
  assignNewEmployee(employee: IEmployee): void;
  addNewService(service: Service): void;
  changeState(newState: ServiceOrderState): void;
  getTotalPrice(): number;
}
