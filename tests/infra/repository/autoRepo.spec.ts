import { CreateAuto } from "@/contracts/repos/createAuto";
import { Auto } from "@/infra/entities/auto";
import { AutoRepository } from "@/infra/repositories/autoRepo";
import { DataType, IMemoryDb, newDb } from "pg-mem";
import { DataSource } from "typeorm";

describe('Create Auto repository', () => {


    let dataSource: DataSource
    let db: IMemoryDb
    let sut: AutoRepository

    const request: CreateAuto.Input = {
        cor: 'any_cor',
        marca: 'any_marca',
        placa: 'any_placa'
    }
    beforeAll(async () => {
        db = newDb()

        db.public.registerFunction({
            name: 'current_database',
            args: [],
            returns: DataType.text,
            implementation: () => 'hello world: '
        })
        db.public.registerFunction({
            name: 'version',
            args: [],
            returns: DataType.text,
            implementation: () => 'hello world: '
        })
        db.public.registerFunction({
            name: 'now',
            args: [],
            returns: DataType.timestamp,
            implementation: () => 'hello world: '
        })

        db.public.registerFunction({
            name: 'exists',
            args: [DataType.integer],
            returns: DataType.bool,
            implementation: () => 'hello world: '
        })

        db.public.registerFunction({
            name: "obj_description",
            args: [DataType.text, DataType.text],
            returns: DataType.text,
            implementation: () => "test",
        });


        dataSource = db.adapters.createTypeormDataSource({
            type: 'postgres',
            port: 6566,
            entities: [Auto],
            logging: true,
        })
        await dataSource.initialize()
        await dataSource.synchronize()
        sut = new AutoRepository(dataSource)
    })
    test('should call getRepository', async () => {
        const getRepositorySpy = jest.spyOn(sut, 'getRepository')
        await sut.create(request)

        expect(getRepositorySpy).toHaveBeenCalledWith(Auto)
        expect(getRepositorySpy).toHaveBeenCalledTimes(1)
    });
});