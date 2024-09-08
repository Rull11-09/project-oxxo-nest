import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  private  employees: CreateEmployeeDto[] = [
    {
    id:1,
    name: "Alberto",
    lastName: "Costas",
    phoneNumber: "XXX23423124"
  },
    {
      id:2,
      name: "Juan",
      lastName: "Perez",
      phoneNumber: "XXX23423124"
    }
  
  ]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length
    this.employees.push(createEmployeeDto);
    return this.employees;  
  }

  findAll() {
    //Hacer que retorne todos los empleados
    return this.employees;
  }

findOne(id: number) {
  const employee = this.employees.find(employee => employee.id === id);
  return employee;
}


 update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
  const employeeToUpdate = this.findOne(id);
  const updatedEmployee = {
    ...employeeToUpdate,
    ...updateEmployeeDto,
  };
  this.employees = this.employees.map((employee) => {
    if (employee.id === id) {
      return updatedEmployee;
    }
    return employee;
  });

  return updatedEmployee;
}


  remove(id: number) {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees;

  }
}
