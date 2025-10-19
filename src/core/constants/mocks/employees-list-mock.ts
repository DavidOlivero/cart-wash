import { Employee } from "../../../entities/employee/employee";
import type { IEmployee } from "../../interfaces/employee-interface";

export const EMPLOYEES_LIST: IEmployee[] = [
  new Employee(323232, 'José Hernández'),
  new Employee(123456, 'María Gómez'),
  new Employee(789101, 'Carlos López'),
  new Employee(112131, 'Ana Martínez'),
  new Employee(415161, 'Luis Fernández'),
  new Employee(718192, 'Sofía Ramírez'),
  new Employee(202122, 'Diego Torres'),
  new Employee(232425, 'Valentina Morales'),
  new Employee(262728, 'Miguel Rojas')
]
