import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { UserRole } from "../model";
import { userRepository } from "../repositories";
import { createUserService } from "../services";
import { HttpException } from "../utils/types";

const userService = createUserService(userRepository);

const userSchema = z.object({
    id: z.number().optional(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    role: z.nativeEnum(UserRole),
});

export const getAll = async (_req: Request, res: Response) => {
    const users = await userService.getAll();
    res.json(users);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        next(new HttpException(404, "Route requires :id to be number"));
    }
    const user = await userService.getById(id);
    if (user === null) {
        next(new HttpException(404, "User not found"));
    } else {
        res.json(user);
    }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userFromBody = userSchema.parse(req.body);
        try {
            const user = await userService.add(userFromBody);
            res.status(201).json(user);
        } catch (error) {
            next(
                new HttpException(
                    409,
                    `Could not create user - ${error.message}`
                )
            );
        }
    } catch (error) {
        next(
            new HttpException(
                400,
                `User object is required in the request body`
            )
        );
    }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        next(new HttpException(404, "Route requires :id to be number"));
    }
    const user = await userService.getById(id);
    if (user === null) {
        next(new HttpException(404, "User not found"));
    } else {
        try {
            const userFromBody = userSchema.parse(req.body);
            try {
                await userService.edit(id, userFromBody);
                res.status(204).send();
            } catch (error) {
                next(
                    new HttpException(
                        409,
                        `Could not edit user ${id} - ${error.message}`
                    )
                );
            }
        } catch (error) {
            next(
                new HttpException(
                    400,
                    `User object is required in the request body`
                )
            );
        }
    }
};
