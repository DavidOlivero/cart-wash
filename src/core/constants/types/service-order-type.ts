import type { Service } from "../../../entities/service/service";
import type { IEmployee } from "../../interfaces/employee-interface";
import type { ServiceOrderState } from "../enums/service-state-enum";

export type ServiceOrderType = {
  date: Date;
  state: ServiceOrderState;
  services: Service[];
  employees: IEmployee[];
}
