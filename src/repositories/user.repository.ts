import { User } from "../model/index";
import BaseRepository from "./base.repository";

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User);
    }
}

export const userRepository = new UserRepository();
