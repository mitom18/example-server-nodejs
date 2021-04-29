import winston from "winston";
import appConfig from "../config";

const logger = winston.createLogger({
    level: appConfig.LOG_LEVEL,
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: "combined.log" })],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

export default logger;
