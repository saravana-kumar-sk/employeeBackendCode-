import {Server, ServerApplicationState} from "@hapi/hapi"
import {join} from "path";
import * as inert from "@hapi/inert";
// Local routes imports
import routes from "./src/employeesDetails/employeeRoutes";
import "reflect-metadata";
import * as winston from 'winston'
const { combine, timestamp, json, prettyPrint } = winston.format;
const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json(),
        prettyPrint()
    ),
    transports: [
        new winston.transports.File({ filename: "Logger_Details.log" })
    ]
});

const server : Server<ServerApplicationState> = new Server({
    port: 4000,
    host: 'localhost',
    routes: {
        files:{
            relativeTo: join(__dirname, 'public')
        }
    }
});

const init = async () : Promise<Server<ServerApplicationState>> => {
    await server.register(
        {
            plugin: inert   // inert is a plugin used for serving static files
        },
    );

    server.route(routes);
    return server
};
const start = async (server:Server<ServerApplicationState>) : Promise<Server<ServerApplicationState>> =>{
    await server.start();
    logger.info(`Server running on :${server.info.uri}`);
    return server
}

export {init, start,logger}