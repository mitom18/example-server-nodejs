import { User } from "../model/index";
import BaseRepository from "./base.repository";

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User);
    }

    async getByEmail(email: string): Promise<User | null> {
        try {
            return await (await this.getQueryBuilder("u"))
                .where("u.email = :email", { email })
                .getOneOrFail();
        } catch (error) {
            return null;
        }
    }
}

export const userRepository = new UserRepository();
