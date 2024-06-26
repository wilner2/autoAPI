import { DriverModel, RecordModel, VehicleModel } from "@/infra/entities";
import { DriverRepository } from "@/infra/repositories";
import { DataType, IMemoryDb, newDb } from "pg-mem";
import { DataSource, Like } from "typeorm";
import MockDate from 'mockdate'


describe('Create Driver repository', () => {
    let dataSource: DataSource
    let db: IMemoryDb
    let sut: DriverRepository
    const request = { nome: 'any_nome' }
    afterAll(() => {
        MockDate.reset()
    })
    beforeAll(async () => {
        MockDate.set(new Date().toString())
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
            entities: [DriverModel, RecordModel, VehicleModel],
            logging: false,
        })
        await dataSource.initialize()
        await dataSource.synchronize()
        sut = new DriverRepository(dataSource)
    })

    /// create
    test('should call getRepository', async () => {
        const getRepositorySpy = jest.spyOn(sut, 'getRepository')
        await sut.create(request)

        expect(getRepositorySpy).toHaveBeenCalledWith(DriverModel)
        expect(getRepositorySpy).toHaveBeenCalledTimes(1)
    });

    test('should save Driver in database', async () => {
        const repository = jest.spyOn(sut.getRepository(DriverModel), 'save')
        await sut.create(request)

        expect(repository).toHaveBeenCalledWith({ ...request, created_at: new Date().toISOString(), status: true, id: 2 })
        expect(repository).toHaveBeenCalledTimes(1)
    });

    ///Update

    test('should call getRepository in update function', async () => {
        const getRepositorySpy = jest.spyOn(sut, 'getRepository')
        const request = { nome: "any_nome", id: 1, status: true }

        await sut.update(request)

        expect(getRepositorySpy).toHaveBeenCalledWith(DriverModel)
        expect(getRepositorySpy).toHaveBeenCalledTimes(1)
    });


    test('should update driver with correct params', async () => {
        const repository = jest.spyOn(sut.getRepository(DriverModel), 'update')
        const { nome, status, id } = { nome: "any_nome", id: 1, status: true }

        await sut.update({ nome, status, id })

        expect(repository).toHaveBeenCalledWith({ id: id }, { nome, status, })
        expect(repository).toHaveBeenCalledTimes(1)
    });

    ///exists

    test('should call getRepository in exists function', async () => {
        const getRepositorySpy = jest.spyOn(sut, 'getRepository')
        const request = 1

        await sut.exists(request)

        expect(getRepositorySpy).toHaveBeenCalledWith(DriverModel)
        expect(getRepositorySpy).toHaveBeenCalledTimes(1)
    });


    test('should exists driver with correct params', async () => {
        const repository = jest.spyOn(sut.getRepository(DriverModel), 'exists')
        const { id } = { id: 1 }

        await sut.exists(id)

        expect(repository).toHaveBeenCalledWith({ where: { id } })
        expect(repository).toHaveBeenCalledTimes(1)
    });



    ///List

    test('should call getRepository in list function', async () => {
        const getRepositorySpy = jest.spyOn(sut, 'getRepository')
        const request = { offset: 0, limit: 10, nome: "any_nome" }

        await sut.list(request)

        expect(getRepositorySpy).toHaveBeenCalledWith(DriverModel)
        expect(getRepositorySpy).toHaveBeenCalledTimes(1)
    });

    test('should list vehicles with correct params', async () => {
        const repository = jest.spyOn(sut.getRepository(DriverModel), 'find')
        const { offset, limit, nome } = { offset: 0, limit: 10, nome: "any_nome" }

        await sut.list({ offset, limit, nome })


        expect(repository).toHaveBeenCalledWith({ skip: offset, take: limit, where: { nome: Like(`%${nome}%`) } })
        expect(repository).toHaveBeenCalledTimes(1)
    });

    test('should list vehicles with correct params if nome is not provided', async () => {
        const repository = jest.spyOn(sut.getRepository(DriverModel), 'find')
        const { offset, limit, nome } = { offset: 0, limit: 10, nome: undefined }

        await sut.list({ offset, limit, nome })


        expect(repository).toHaveBeenCalledWith({ skip: offset, take: limit, where: { nome: undefined } })
        expect(repository).toHaveBeenCalledTimes(1)
    });

    //////findbyId
    test('should call getRepository in findById function', async () => {
        const getRepositorySpy = jest.spyOn(sut, 'getRepository')

        await sut.findById(1)

        expect(getRepositorySpy).toHaveBeenCalledWith(DriverModel)
        expect(getRepositorySpy).toHaveBeenCalledTimes(1)
    });

    test('should find driver with correct params', async () => {
        const repository = jest.spyOn(sut.getRepository(DriverModel), 'findOneBy')

        await sut.findById(1)


        expect(repository).toHaveBeenCalledWith({ id: 1 })
        expect(repository).toHaveBeenCalledTimes(1)
    });
});