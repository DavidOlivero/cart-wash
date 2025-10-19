import { View } from './view/view';

const view = new View();
await view.registerUser();
await view.registerVehicle();
view.assignVehicleToUser();
await view.createService();
await view.selectEmployee();
view.createServiceOrder();
await view.serviceExecute();
view.payService();
