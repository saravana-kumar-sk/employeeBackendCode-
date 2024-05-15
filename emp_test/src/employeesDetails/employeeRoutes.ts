import {ReqRefDefaults, ResponseToolkit, ServerRoute} from "@hapi/hapi";
import { Container, Service } from 'typedi';
import {addEmployee, deleteEmployee, getAllEmployee,patchEmployee,getIndividualEmployee} from "./employeeHandler"
const prefix : string = "/api/v1"
const routes : ServerRoute[] = [{
    method: 'GET',
    path: '/',
    handler: (async function(req: any, h:ResponseToolkit<ReqRefDefaults>){
        return h.file("login.html")
        }
    )},
    {
        method: 'POST',
        path: `${prefix}/login`,
        handler:addEmployee
    },
    {
        method: 'GET',
        path: `${prefix}/viewDetails`,
        handler:getAllEmployee
    },
    {
        method: 'DELETE',
        path: `${prefix}/login/{id}`,
        handler:deleteEmployee
    },
    {
        method: 'PATCH',
        path: `${prefix}/login/{id}`,
        handler:patchEmployee
    },
    {
        method: 'POST',
        path: `${prefix}/login/singleData`,
        handler:getIndividualEmployee
    }
        
    
]   
export default routes;