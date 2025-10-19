import { DataTypes } from "../core/constants/enums/data-types-enum";
import { Numbers } from "../core/constants/enums/numbers-enum";
import { ServiceOrderState } from "../core/constants/enums/service-state-enum";
import { EMPLOYEES_LIST } from "../core/constants/mocks/employees-list-mock";
import type { ICustomer } from "../core/interfaces/customer-interface";
import type { IEmployee } from "../core/interfaces/employee-interface";
import type { IServiceOrder } from "../core/interfaces/service-order-interface";
import type { IVehicle } from "../core/interfaces/vehicles-interface";
import { Utils } from "../core/utils/Utils";
import { Customer } from "../entities/customer/customer";
import { ServiceOrder } from "../entities/service-order/service-order";
import { type Service, BasicWashing, FullWashing, Wax } from "../entities/service/service";
import { Vehicle } from "../entities/vehicle/vehicle";


export class View {
  private _customer!: ICustomer;
  private _vehicle!: IVehicle;
  private _service!: Service;
  private _employee!: IEmployee | undefined;
  private _serviceOrder!: IServiceOrder;

  public async registerUser(): Promise<void> {
    const customerInfo = await Utils.makeFormulary(
      'Bienvenido al lavadero de autos David. Para empezar deber registrarte',
      [
        { ask: 'Número de identificación: ', type: DataTypes.Number },
        { ask: 'Nombre: ', type: DataTypes.String },
        { ask: 'Teléfono: ', type: DataTypes.Number },
        { ask: 'correo: ', type: DataTypes.String }
      ]
    );

    this._customer = new Customer({
      id: Number(customerInfo[Numbers.ZERO]),
      name: customerInfo[Numbers.ONE] ?? '',
      phone: customerInfo[Numbers.TWO] ?? '',
      email: customerInfo[Numbers.THREE] ?? '',
      vehicles: []
    });
  }

  public async registerVehicle(): Promise<void> {
    const vehicleInfo = await Utils.makeFormulary(
      'Ahora registre un auto nuevo',
      [
        { ask: 'Ingrese la placa del vehículo: ', type: DataTypes.String },
        { ask: 'Ingrese el tipo de vehículo (Camioneta, todo terreno, moto, etc): ', type: DataTypes.String },
        { ask: 'Ingrese la marca del vehículo: ', type: DataTypes.String }
      ]
    );

    this._vehicle = new Vehicle({
      plate: vehicleInfo[Numbers.ZERO] ?? '',
      type: vehicleInfo[Numbers.ONE] ?? '',
      brand: vehicleInfo[Numbers.TWO] ?? '',
    });
  }

  public assignVehicleToUser(): void {
    this._customer.registerNewVehicle(this._vehicle);
  }

  public async createService(isForFirstTime: boolean = !!Numbers.ONE): Promise<void | Service> {
    const message = isForFirstTime ? `Excelente, gracias por registrarte ${this._customer.customerProperties.name} ¿Qué servicio quieres tomar?` : 'Seleccione el tipo de servicio que desea';
    const serviceInfo = await Utils.makeFormulary(
      message,
      [
        { ask: '1.) Lavado básico\n2.) Lavado Completo\n3.) Encerado\n/> ', type: DataTypes.Number },
        { ask: 'Colóquele un nombre al servicio para identificarlo: ', type: DataTypes.String },
        { ask: 'Colóquele una descripción: ', type: DataTypes.String },
      ]
    );

    const selectedOption: number = Number(serviceInfo[Numbers.ZERO]);
    const serviceProperties = {
      name: serviceInfo[Numbers.ONE] ?? '',
      description: serviceInfo[Numbers.TWO] ?? ''
    };

    const service = selectedOption === Numbers.ONE ? new BasicWashing(serviceProperties.name, serviceProperties.description) :
      selectedOption === Numbers.ZERO ? new FullWashing(serviceProperties.name, serviceProperties.description) :
        new Wax(serviceProperties.name, serviceProperties.description);

    if (!isForFirstTime) return service;
    this._service = service
  }

  public async selectEmployee(isForFirstTime: boolean = !!Numbers.ONE): Promise<void | IEmployee> {
    let messageForSelectEmployee: string[] = [];
    for (const index in EMPLOYEES_LIST) {
      messageForSelectEmployee.push(`${Number(index) + 1}.) ${EMPLOYEES_LIST[index]?.name}`);
    }

    const message = isForFirstTime ? 'Ahora seleccione el empleado que atenderá ente servicio' :
      'Seleccione el empleado que desea agregar a la order de servicio';
    const selectedEmployee = await Utils.makeFormulary(
      message,
      [{ ask: `${messageForSelectEmployee.join('\n')}\n/> `, type: DataTypes.Number }]
    );

    const employee = EMPLOYEES_LIST[Number(selectedEmployee[Numbers.ZERO]) - Numbers.ONE];
    if (!isForFirstTime) return employee;
    this._employee = employee;
  }

  public createServiceOrder(): void {
    this._serviceOrder = new ServiceOrder(this._service, this._employee);
  }

  public async serviceExecute(isForFirstTime: boolean = !!Numbers.ONE): Promise<void> {
    const message = isForFirstTime ? 'La orden de servicio ya fue creada exitosamente ¿Qué desea hacer ahora? ' :
      'Agregado exitosamente ¿Qué desea hacer ahora?'
    const serviceExecuteData = await Utils.makeFormulary(
      message,
      [{ ask: '1.) Agregar un nuevo servicio\n2.) Añadir un nuevo empleado\n3.) Realizar servicio\n/>', type: DataTypes.Number }]
    );
    const selectedOption = Number(serviceExecuteData[Numbers.ZERO]);

    if (selectedOption === Numbers.ONE) {
      await this.registerNewService();
      await this.serviceExecute(!!Numbers.ZERO);
    }
    else if (selectedOption === Numbers.TWO) {
      await this.assignNewEmployee();
      await this.serviceExecute(!!Numbers.ZERO);
    }
    else this._serviceOrder.changeState(ServiceOrderState.Done);
    console.log('¡Felicidades! El servicio se completó exitosamente')
  }

  public payService(): void {
    console.log(`El costo a pagar pro los servicios es de $${this._serviceOrder.getTotalPrice()}`);
    this._serviceOrder.changeState(ServiceOrderState.Paid);
  }

  private async registerNewService(): Promise<void> {
    const service = await this.createService(!!Numbers.ZERO);
    if (!service) return;

    this._serviceOrder.addNewService(service);
  }

  private async assignNewEmployee(): Promise<void> {
    const employee = await this.selectEmployee(!!Numbers.ZERO);
    if (!employee) return;

    this._serviceOrder.assignNewEmployee(employee);
  }
}

