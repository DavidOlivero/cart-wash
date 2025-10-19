import { Numbers } from "../../core/constants/enums/numbers-enum";
import { ServiceOrderState } from "../../core/constants/enums/service-state-enum";
import type { ServiceOrderType } from "../../core/constants/types/service-order-type";
import type { IEmployee } from "../../core/interfaces/employee-interface";
import type { IServiceOrder } from "../../core/interfaces/service-order-interface";
import type { Service } from "../service/service";

export class ServiceOrder implements IServiceOrder {
  private _serviceOrderProperties: ServiceOrderType;

  public constructor(service: Service, employee: IEmployee | undefined) {
    this._serviceOrderProperties = {
      date: new Date(),
      state: ServiceOrderState.Erring,
      services: [service],
      employees: employee ? [employee] : []
    };
  }

  public assignNewEmployee(employee: IEmployee): void {
    this._serviceOrderProperties.employees.push(employee);
    employee.assignOrder(this)
  }

  public addNewService(service: Service): void {
    this._serviceOrderProperties.services.push(service);
  }

  public changeState(newState: ServiceOrderState): void {
    this._serviceOrderProperties.state = newState;
  }

  public getTotalPrice(): number {
    let total: number = Numbers.ZERO;
    this._serviceOrderProperties.services.forEach((service) => {
      total += service.getPrice();
    })

    return total;
  }
}
