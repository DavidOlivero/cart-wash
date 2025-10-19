import { WASHING_PRICING } from "../../core/constants/const/washing-pricing.const";

export abstract class Service {
  private _basePrice: number = WASHING_PRICING.basicWash;
  public constructor(private _name: string, private _description: string) { }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get basePrice(): number {
    return this._basePrice;
  }

  public abstract getPrice(): number;
}

export class BasicWashing extends Service {
  public override getPrice(): number {
    return this.basePrice;
  }
}

export class FullWashing extends Service {
  public override getPrice(): number {
    return WASHING_PRICING.fullWash + this.basePrice;
  }
}

export class Wax extends Service {
  public override getPrice(): number {
    return WASHING_PRICING.wax + this.basePrice;
  }
}
