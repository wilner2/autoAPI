import { DataSource, ObjectLiteral, ObjectType, Repository } from 'typeorm'

export abstract class PgRepository {
    constructor(private readonly dataSource: DataSource) { }
    getRepository<Entity extends ObjectLiteral>(entity: ObjectType<Entity>): Repository<Entity> {
        return this.dataSource.getRepository(entity)
    }
}