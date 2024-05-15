import { AppDataSource } from "../data-source";
import {Employees} from "./employeeEntity"
import {ReqRefDefaults, ResponseToolkit} from "@hapi/hapi";
import {logger} from '../../app'
import { addEmployeeService ,getIndividualEmployeeService,getAllEmployeeService,deleteEmployeeService,patchEmployeeService} from "./employeeService";

const addEmployee = async (req:any,h:ResponseToolkit<ReqRefDefaults>) =>{
    try{
        return await addEmployeeService(req,h)
    }
    catch(err){
        logger.error("Error in adding Employee")
        return h.response({error: err})
    }
}

const getIndividualEmployee = async (req:any ,h:ResponseToolkit<ReqRefDefaults>) =>{
    try {
        const findEmployee=req.payload
        const employeesList = await AppDataSource.getRepository(Employees)
        console.log(employeesList)
        return await getIndividualEmployeeService(req,h,employeesList,findEmployee)
    }
    catch(err){
        logger.error(`Error while fetching the ${req.params.id}`)
        return h.response("user not found")

    }
}
const getAllEmployee = async (req:any,h: ResponseToolkit<ReqRefDefaults>) =>{
    const employeesList = await AppDataSource.getRepository(Employees)
    return await getAllEmployeeService(req,h,employeesList)
}

const deleteEmployee = async (req: any, h: ResponseToolkit<ReqRefDefaults>) => {
    const userId = req.params.id;    
    const EmployeeRepository = await AppDataSource.getRepository(Employees);
    return await deleteEmployeeService(req,h,EmployeeRepository,userId)
}


const patchEmployee = async (req: any, h: ResponseToolkit<ReqRefDefaults>) => {
    try {
        if (req.payload.hasOwnProperty('employeeId')) {
            return h.response('ID cannot be changed through this endpoint').code(400);
        }
        const employeeId = req.params.id;
        const employeeRepository = AppDataSource.getRepository(Employees);
        return await patchEmployeeService(req,h,employeeRepository,employeeId)
    } catch (err:any) {
        logger.error(`Failed to update user: ${err.message}`);
        return h.response(`Failed to update user: ${err.message}`).code(500);
    }
};

export { addEmployee,getAllEmployee,deleteEmployee,patchEmployee,getIndividualEmployee}