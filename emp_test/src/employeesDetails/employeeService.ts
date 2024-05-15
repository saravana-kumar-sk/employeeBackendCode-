import { AppDataSource } from "../data-source";
import {Employees} from "./employeeEntity"
import {ReqRefDefaults, ResponseToolkit} from "@hapi/hapi";
import {logger} from '../../app'
import * as Joi from 'joi'


const addEmployeeService = async (req: any, h: ResponseToolkit<ReqRefDefaults>) => {
    try {
      const employeeSchema = Joi.object({

        Name: Joi.string().required(),
        Email: Joi.string().email().required(),
        contactNumber: Joi.string().required(),
        Address: Joi.string().required(),
        Salary: Joi.number().required(),
      });
      const { error, value } = employeeSchema.validate(req.payload);
  
      if (error) 
        {
        logger.error('Validation error:', error.details[0].message);
        return h.response({ message: error.details[0].message }).code(400);
        }
      const { Name, Email, contactNumber, Address, Salary } = value;
      const employeeObj = new Employees();
      employeeObj.Name = Name;
      employeeObj.Email = Email;
      employeeObj.contactNumber = contactNumber;
      employeeObj.Address = Address;
      employeeObj.Salary = Salary;
      logger.info("Employee obj:", employeeObj);
      await AppDataSource.manager.save(employeeObj);
      logger.info("Employee added")
      return h.response({ message: "Employee added" }).code(200);
    } 
    catch (error) 
    {
      logger.error('Error adding employee:', error); 
      return h.response({ message: "Error adding employee" }).code(500);
    }
  };
  const getIndividualEmployeeService = async (req: any, h: ResponseToolkit<ReqRefDefaults>, employeesList: any, findEmployee: any) => {
    try {
      const retrieveEmployee = await employeesList.findOneBy(findEmployee);
  
      if (!retrieveEmployee) {
        logger.warn("Employee Not Found");
        return h.response("Employee Not Found").code(404)
      }
  
      logger.info(`Fetch details of employee ${retrieveEmployee.employeeId} ID`);
      return h.response(retrieveEmployee).code(200);
    } catch (error) {
      logger.error("Error fetching employee:", error);
      return h.response({ message: "Error retrieving employee" }).code(500);
    }
  };

const getAllEmployeeService = async (req: any, h: ResponseToolkit<ReqRefDefaults>, employeesList: any) => {
    try {
      const allUserData = await employeesList.find();
      logger.info("Retrieved all user data.");
      return h.response(allUserData).code(200);
    } catch (error) {
      logger.error("Error retrieving all user data:", error);
      return h.response({ message: "Error retrieving employees" }).code(500); 
    }
  };
  const deleteEmployeeService = async (req: any, h: ResponseToolkit<ReqRefDefaults>, employeeRepository: any, userId: number) => {
    try {
      const userToRemove = await employeeRepository.findOneBy({ employeeId: userId });
  
      if (!userToRemove) {
        logger.warn("User Not Found");
        return h.response("User Not Found").code(404);
      }
  
      await employeeRepository.remove(userToRemove);
      logger.info('Delete Successful');
      return h.response(`Deleted userID: ${userId}`).code(200);
    } 
    catch (error) 
    {
      logger.error("Error deleting user:", error);
      return h.response({ message: "Error deleting employee" }).code(500); 
    }
  };


const patchEmployeeService = async (req: any, h: ResponseToolkit<ReqRefDefaults>, employeeRepository: any, employeeId: number) => {
  try {
    const employeeUpdateSchema = Joi.object({
      Name: Joi.string().optional(), 
      Email: Joi.string().email().optional(),
      contactNumber: Joi.string().optional(),
      Address: Joi.string().optional(),
      Salary: Joi.number().optional(),
    });
    const { error, value } = employeeUpdateSchema.validate(req.payload);
    if (error) 
    {
      logger.error('Validation error:', error.details[0].message);
      return h.response({ message: error.details[0].message }).code(400); 
    }
    const userUpdate = await employeeRepository.findOneBy({ employeeId: employeeId });
    if (!userUpdate) 
    {
      logger.warn(`Employee with id ${employeeId} not found.`);
      return h.response(`Employee with id ${employeeId} not found.`).code(404);
    }

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        userUpdate[key] = value[key]; 
      }
    }
    await AppDataSource.manager.save(userUpdate);
    logger.info(`Updated Employee with id ${employeeId}`);
    return h.response(`Updated Employee with id ${employeeId}`).code(200);
  } 
  catch (error) 
  {
    logger.error('Error patching employee:', error); 
    return h.response({ message: "Error updating employee" }).code(500); 
  }
};

export {addEmployeeService,getIndividualEmployeeService,getAllEmployeeService,deleteEmployeeService,patchEmployeeService}





