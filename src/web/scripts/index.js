export class Employee {
  _id;
  _name;
  _serviceOrder = null;
  constructor(_id, _name) {
    this._id = _id;
    this._name = _name;
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  assignOrder(order) {
    this._serviceOrder = order;
  }
}

export var EMPLOYEES_LIST = [
  new Employee(323232, "José Hernández"),
  new Employee(123456, "María Gómez"),
  new Employee(789101, "Carlos López"),
  new Employee(112131, "Ana Martínez"),
  new Employee(415161, "Luis Fernández"),
  new Employee(718192, "Sofía Ramírez"),
  new Employee(202122, "Diego Torres"),
  new Employee(232425, "Valentina Morales"),
  new Employee(262728, "Miguel Rojas")
];

export class Utils {
  static async makeFormulary(header, questions) {
    return new Promise((resolve) => {
      resolve([""]);
    });
  }
}

export class Customer {
  _customerProperties;
  constructor(_customerProperties) {
    this._customerProperties = _customerProperties;
  }
  get customerProperties() {
    return this._customerProperties;
  }
  registerNewVehicle(vehicle) {
    this._customerProperties.vehicles.push(vehicle);
  }
}

export class ServiceOrder {
  _serviceOrderProperties;
  constructor(service, employee) {
    this._serviceOrderProperties = {
      date: new Date,
      state: 0 /* Erring */,
      services: [service],
      employees: employee ? [employee] : []
    };
  }
  assignNewEmployee(employee) {
    this._serviceOrderProperties.employees.push(employee);
    employee.assignOrder(this);
  }
  addNewService(service) {
    this._serviceOrderProperties.services.push(service);
  }
  changeState(newState) {
    this._serviceOrderProperties.state = newState;
  }
  getTotalPrice() {
    let total = 0 /* ZERO */;
    this._serviceOrderProperties.services.forEach((service) => {
      total += service.getPrice();
    });
    return total;
  }
}

export var WASHING_PRICING = {
  basicWash: 30000,
  fullWash: 50000,
  wax: 60000
};

export class Service {
  _name;
  _description;
  _basePrice = WASHING_PRICING.basicWash;
  constructor(_name, _description) {
    this._name = _name;
    this._description = _description;
  }
  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get basePrice() {
    return this._basePrice;
  }
}

export class BasicWashing extends Service {
  getPrice() {
    return this.basePrice;
  }
}

export class FullWashing extends Service {
  getPrice() {
    return WASHING_PRICING.fullWash + this.basePrice;
  }
}

export class Wax extends Service {
  getPrice() {
    return WASHING_PRICING.wax + this.basePrice;
  }
}

export class Vehicle {
  _vehiclesProperties;
  constructor(_vehiclesProperties) {
    this._vehiclesProperties = _vehiclesProperties;
  }
  get properties() {
    return this._vehiclesProperties;
  }
  assignCustomer(customer) {
    this._vehiclesProperties.customer = customer;
    customer.registerNewVehicle(this);
  }
}

export class View {
  _customer;
  _vehicle;
  _service;
  _employee;
  _serviceOrder;
  async registerUser() {
    const customerInfo = await Utils.makeFormulary("Bienvenido al lavadero de autos David. Para empezar deber registrarte", [
      { ask: "Número de identificación: ", type: 1 /* Number */ },
      { ask: "Nombre: ", type: 0 /* String */ },
      { ask: "Teléfono: ", type: 1 /* Number */ },
      { ask: "correo: ", type: 0 /* String */ }
    ]);
    this._customer = new Customer({
      id: Number(customerInfo[0 /* ZERO */]),
      name: customerInfo[1 /* ONE */] ?? "",
      phone: customerInfo[2 /* TWO */] ?? "",
      email: customerInfo[3 /* THREE */] ?? "",
      vehicles: []
    });
  }
  async registerVehicle() {
    const vehicleInfo = await Utils.makeFormulary("Ahora registre un auto nuevo", [
      { ask: "Ingrese la placa del vehículo: ", type: 0 /* String */ },
      { ask: "Ingrese el tipo de vehículo (Camioneta, todo terreno, moto, etc): ", type: 0 /* String */ },
      { ask: "Ingrese la marca del vehículo: ", type: 0 /* String */ }
    ]);
    this._vehicle = new Vehicle({
      plate: vehicleInfo[0 /* ZERO */] ?? "",
      type: vehicleInfo[1 /* ONE */] ?? "",
      brand: vehicleInfo[2 /* TWO */] ?? ""
    });
  }
  assignVehicleToUser() {
    this._customer.registerNewVehicle(this._vehicle);
  }
  async createService(isForFirstTime = !!1 /* ONE */) {
    const message = isForFirstTime ? `Excelente, gracias por registrarte ${this._customer.customerProperties.name} ¿Qué servicio quieres tomar?` : "Seleccione el tipo de servicio que desea";
    const serviceInfo = await Utils.makeFormulary(message, [
      {
        ask: `1.) Lavado básico
2.) Lavado Completo
3.) Encerado
/> `, type: 1 /* Number */
      },
      { ask: "Colóquele un nombre al servicio para identificarlo: ", type: 0 /* String */ },
      { ask: "Colóquele una descripción: ", type: 0 /* String */ }
    ]);
    const selectedOption = Number(serviceInfo[0 /* ZERO */]);
    const serviceProperties = {
      name: serviceInfo[1 /* ONE */] ?? "",
      description: serviceInfo[2 /* TWO */] ?? ""
    };
    const service = selectedOption === 1 /* ONE */ ? new BasicWashing(serviceProperties.name, serviceProperties.description) : selectedOption === 0 /* ZERO */ ? new FullWashing(serviceProperties.name, serviceProperties.description) : new Wax(serviceProperties.name, serviceProperties.description);
    if (!isForFirstTime)
      return service;
    this._service = service;
  }
  async selectEmployee(isForFirstTime = !!1 /* ONE */) {
    let messageForSelectEmployee = [];
    for (const index in EMPLOYEES_LIST) {
      messageForSelectEmployee.push(`${Number(index) + 1}.) ${EMPLOYEES_LIST[index]?.name}`);
    }
    const message = isForFirstTime ? "Ahora seleccione el empleado que atenderá ente servicio" : "Seleccione el empleado que desea agregar a la order de servicio";
    const selectedEmployee = await Utils.makeFormulary(message, [{
      ask: `${messageForSelectEmployee.join(`
`)}
/> `, type: 1 /* Number */
    }]);
    const employee = EMPLOYEES_LIST[Number(selectedEmployee[0 /* ZERO */]) - 1 /* ONE */];
    if (!isForFirstTime)
      return employee;
    this._employee = employee;
  }
  createServiceOrder() {
    this._serviceOrder = new ServiceOrder(this._service, this._employee);
  }
  async serviceExecute(isForFirstTime = !!1 /* ONE */) {
    const message = isForFirstTime ? "La orden de servicio ya fue creada exitosamente ¿Qué desea hacer ahora? " : "Agregado exitosamente ¿Qué desea hacer ahora?";
    const serviceExecuteData = await Utils.makeFormulary(message, [{
      ask: `1.) Agregar un nuevo servicio
2.) Añadir un nuevo empleado
3.) Realizar servicio
/>`, type: 1 /* Number */
    }]);
    const selectedOption = Number(serviceExecuteData[0 /* ZERO */]);
    if (selectedOption === 1 /* ONE */) {
      await this.registerNewService();
      await this.serviceExecute(!!0 /* ZERO */);
    } else if (selectedOption === 2 /* TWO */) {
      await this.assignNewEmployee();
      await this.serviceExecute(!!0 /* ZERO */);
    } else
      this._serviceOrder.changeState(2 /* Done */);
    console.log("¡Felicidades! El servicio se completó exitosamente");
  }
  payService() {
    console.log(`El costo a pagar pro los servicios es de $${this._serviceOrder.getTotalPrice()}`);
    this._serviceOrder.changeState(3 /* Paid */);
  }
  async registerNewService() {
    const service = await this.createService(!!0 /* ZERO */);
    if (!service)
      return;
    this._serviceOrder.addNewService(service);
  }
  async assignNewEmployee() {
    const employee = await this.selectEmployee(!!0 /* ZERO */);
    if (!employee)
      return;
    this._serviceOrder.assignNewEmployee(employee);
  }
}

