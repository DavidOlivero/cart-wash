import { BasicWashing, Customer, Employee, EMPLOYEES_LIST, FullWashing, ServiceOrder, Vehicle, Wax } from "./index.js";

document.addEventListener('DOMContentLoaded', () => {
  const formSections = document.querySelectorAll('.form-section')
  let userRegister
  let vehicleRegister
  let defaultService
  let serviceOrder
  let currentSectionIndex = 0;
  let isForFirstTime = true

  showSection(currentSectionIndex);

  formSections.forEach((section, index) => {
    const form = section.querySelector('form')
    if (form) {
      form.addEventListener('submit', event => {
        event.preventDefault()
        getFormData(currentSectionIndex, event.target)
        if (index < formSections.length - 1) {
          currentSectionIndex++
          if (currentSectionIndex === 3) loadEmployees()
          showSection(currentSectionIndex)
        }
      })
    }
  });

  function showSection(index) {
    formSections.forEach((section, i) => {
      section.style.display = i === index ? 'block' : 'none';
    });
  }

  function getFormData(index, form) {
    const data = Object.fromEntries(
      new FormData(form)
    )
    if (index === 0) saveUserRegister(data)
    else if (index === 1) saveVehicleRegisterAndAssign(data)
    else if (index === 2) createService(data)
    else if (index === 3) assignEmployeeAndCreateServiceOrder(data)
    else executeService(data)
  }

  function saveUserRegister(data) {
    userRegister = new Customer({
      id: Number(data['user-id']),
      name: data['user-name'],
      phone: Number(data['user-phone']),
      email: data['user-email'],
      vehicles: []
    })
  }

  function saveVehicleRegisterAndAssign(data) {
    vehicleRegister = new Vehicle({
      plate: data['vehicle-plae'],
      type: data['vehicle-type'],
      brand: data['vehicle-brand']
    })

    userRegister.registerNewVehicle(vehicleRegister)
  }

  function createService(data) {
    const name = data['service-name']
    const description = data['service-description']
    const serviceType = data['service-type']
    const service = serviceType === '1' ? new BasicWashing(name, description) :
      serviceType === '2' ? new FullWashing(name, description) :
        new Wax(name, description)

    if (!isForFirstTime) {
      registerNewService(service)
      return
    }
    defaultService = service
  }

  function assignEmployeeAndCreateServiceOrder(data) {
    let employeeOption
    for (const employee of EMPLOYEES_LIST) {
      if (employee._name === data['employee-select']) {
        employeeOption = employee
        break;
      }
    }

    if (!isForFirstTime) {
      assignNewEmployee(employeeOption)
      return
    }

    serviceOrder = new ServiceOrder(defaultService, employeeOption)
  }

  function executeService(data) {
    const option = data['service-action']

    isForFirstTime = false
    if (option === '1') {
      currentSectionIndex = 2
      showSection(currentSectionIndex)
    }
    if (option === '2') {
      currentSectionIndex = 3
      showSection(currentSectionIndex)
    }
  }

  function loadEmployees() {
    const employeeSelection = document.querySelector('#employee-select')

    EMPLOYEES_LIST.forEach((employee) => {
      const employeeRegister = document.createElement('option')
      employeeRegister.value = employee._name
      employeeRegister.text = employee._name
      employeeSelection.appendChild(employeeRegister)
    })
  }

  function registerNewService(newService) {
    serviceOrder.addNewService(newService)
    currentSectionIndex = 3
    showSection(currentSectionIndex)
  }

  function assignNewEmployee(newEmployee) {
    serviceOrder.assignNewEmployee(newEmployee)
    currentSectionIndex = 3
    showSection(currentSectionIndex)
  }
});

