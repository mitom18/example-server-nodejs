import { createConnection, Connection } from "typeorm";
import appConfig from "./config";
import { User } from "./model";

let db: Connection | null = null;

const getDbConnection = async (): Promise<Connection> => {
    if (db === null) {
        db = await createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: appConfig.DB_USER,
            password: appConfig.DB_PASSWORD,
            database: appConfig.DB_NAME,
            entities: [User],
        });
    }
    return db;
};

export default getDbConnection;
