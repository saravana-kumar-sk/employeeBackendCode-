import {AppDataSource} from "./src/data-source";
import {init, start} from "./app";
import * as Hapi from "@hapi/hapi";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

async function launch(){
    let server : Hapi.Server<Hapi.ServerApplicationState> =   await init();
    await start(server);
}

launch().then(() : void=>{}).catch(err=>{
    console.log(err);
    console.log("THERE WAS AN ERROR LAUNCHING THE SERVER")
})