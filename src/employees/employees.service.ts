import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { v4 as uuid } from 'uuid';


@Injectable()
export class EmployeesService {
  private  employees: CreateEmployeeDto[] = [
    {
    id:uuid() ,
    name: "Alberto",
    lastName: "Costas",
    phoneNumber: "XXX23423124"
  },
    {
      id:uuid() ,
      name: "Juan",
      lastName: "Perez",
      phoneNumber: "XXX23423124"
    }
  
  ]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return this.employees;  
  }

  findAll() {
    //Hacer que retorne todos los empleados
    return this.employees;
  }

findOne(id: string) {
  const employee = this.employees.find(employee => employee.id === id);
  if (!employee) {
    throw new NotFoundException();
  }
  return employee;
}


 update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
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


  remove(id: string) {
    this.findOne(id)
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees;

  }
}
