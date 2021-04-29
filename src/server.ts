import express, {
    NextFunction,
    Request,
    Response,
    ErrorRequestHandler,
} from "express";
import { UserRouter } from "./routers";
import logger from "./utils/logger";
import { HttpException } from "./utils/types";

const server = express();

server.use((req, res, next) => {
    let now = new Date();
    let nowFormatted =
        now.getFullYear() +
        "-" +
        (now.getMonth() + 1) +
        "-" +
        now.getDate() +
        " " +
        now.getHours() +
        ":" +
        now.getMinutes() +
        ":" +
        now.getSeconds();
    logger.info(`[${nowFormatted}] ${req.method}:${req.url} ${res.statusCode}`);
    next();
});

const errorRequestHandler: ErrorRequestHandler = (
    err: HttpException,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    logger.error(err.stack);
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({
        status,
        message,
    });
};

server.use(express.json());
server.use("/users", UserRouter.default);
server.use((req, _res, next) => {
    if (!req.route) return next(new HttpException(404, "Page not found"));
    next();
});

server.use(errorRequestHandler);

export default server;
