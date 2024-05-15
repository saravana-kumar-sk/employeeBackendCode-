import "reflect-metadata"
import { DataSource } from "typeorm"
import { Employees } from "./employeesDetails/employeeEntity"

export const AppDataSource : DataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Saravana@123",
    database: "employeeDb",
    synchronize: true,
    logging: false,
    entities: [Employees],
    migrations: [],
    subscribers: [],
})
