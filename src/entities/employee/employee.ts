import type { IEmployee } from "../../core/interfaces/employee-interface";
import type { IServiceOrder } from "../../core/interfaces/service-order-interface";

export class Employee implements IEmployee {
  private _serviceOrder: IServiceOrder | null = null;
  public constructor(private _id: number, private _name: string) { }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public assignOrder(order: IServiceOrder): void {
    this._serviceOrder = order
  }
}
