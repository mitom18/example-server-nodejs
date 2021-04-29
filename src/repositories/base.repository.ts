import { DeepPartial } from "typeorm";
import getDbConnection from "../database";

abstract class BaseRepository<T> {
    constructor(private modelClass: { new (): T }) {}

    async getRepository() {
        return (await getDbConnection()).getRepository(this.modelClass);
    }

    async getQueryBuilder(alias: string) {
        return (await this.getRepository()).createQueryBuilder(alias);
    }

    async getAll(): Promise<T[]> {
        return (await this.getRepository()).find();
    }

    async get(id: number): Promise<T | null> {
        return (await (await this.getRepository()).findOne(id)) || null;
    }

    async edit(id: number, data: DeepPartial<T>): Promise<void> {
        let dbEntity = await this.get(id);
        if (dbEntity !== null) {
            dbEntity = {
                ...dbEntity,
                ...data,
            };
            await (await this.getRepository()).save(dbEntity);
        }
    }

    async save(object: T): Promise<T | T[]> {
        return await (await this.getRepository()).save(object);
    }

    async remove(object: T): Promise<void> {
        await (await this.getRepository()).remove(object);
    }
}

export default BaseRepository;
