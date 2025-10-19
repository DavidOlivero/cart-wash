import type { IServiceOrder } from "./service-order-interface";

export interface IEmployee {
  assignOrder(order: IServiceOrder): void;
  get id(): number;
  get name(): string;
}
