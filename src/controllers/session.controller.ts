import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { userRepository } from "../repositories";
import { createUserService } from "../services";
import { HttpException } from "../utils/types";
import jwt from "jsonwebtoken";
import appConfig from "../config";

const userService = createUserService(userRepository);

const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credentials = credentialsSchema.parse(req.body);
        const credentialsOk = await userService.checkCredentials(
            credentials.email,
            credentials.password
        );
        if (!credentialsOk) {
            next(new HttpException(401, "Bad credentials"));
        }
        const user = await userService.getByEmail(credentials.email);
        const exp = Date.now() + appConfig.JWT_ACCESS_TOKEN_EXP;
        const token = jwt.sign({ exp, user }, appConfig.JWT_TOKEN_SECRET, {
            algorithm: appConfig.JWT_ALG as jwt.Algorithm,
        });
        res.json({ jwt: token });
    } catch (error) {
        next(
            new HttpException(
                400,
                `E-mail and password are required in the request body`
            )
        );
    }
};

export const getCurrent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const jwtPayload = req.user as { user: object } | undefined;
    if (jwtPayload) {
        res.json({ ...jwtPayload.user, password: undefined });
    } else {
        next(new HttpException(401, `Not authenticated`));
    }
};
