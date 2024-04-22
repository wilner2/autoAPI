import { VehicleModel } from "@/infra/entities/vehicle";
import { VehicleRepository } from "@/infra/repositories/vehicleRepo";
import { DataType, IMemoryDb, newDb } from "pg-mem";
import { DataSource } from "typeorm";
import MockDate from 'mockdate'


describe('Create Vehicle repository', () => {
    let dataSource: DataSource
    let db: IMemoryDb
    let sut: VehicleRepository
    const request = {
        cor: 'any_cor',
        marca: 'any_marca',
        placa: 'any_placa'
    }
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
            entities: [VehicleModel],
            logging: false,
        })
        await dataSource.initialize()
        await dataSource.synchronize()
        sut = new VehicleRepository(dataSource)
    })

    test('should call getRepository', async () => {
        const getRepositorySpy = jest.spyOn(sut, 'getRepository')
        await sut.create(request)

        expect(getRepositorySpy).toHaveBeenCalledWith(VehicleModel)
        expect(getRepositorySpy).toHaveBeenCalledTimes(1)
    });

    test('should save Vehicle in database', async () => {
        const repository = jest.spyOn(sut.getRepository(VehicleModel), 'save')
        request.placa = "any_placa2"
        await sut.create(request)

        expect(repository).toHaveBeenCalledWith({ ...request, created_at: new Date().toISOString(), status: true, id: 2 })
        expect(repository).toHaveBeenCalledTimes(1)
    });

    test('should return Vehicle saved', async () => {
        request.placa = "any_placa3"

        const response = await sut.create(request)

        expect(response).toEqual({ ...request, created_at: new Date().toISOString(), status: true, id: 3 })
    });

    ///Update

    test('should call getRepository in update function', async () => {
        const getRepositorySpy = jest.spyOn(sut, 'getRepository')
        const request = { placa: 'any_placa', cor: 'any_cor', marca: 'any_marca', id: 1, status: true }

        await sut.update(request)

        expect(getRepositorySpy).toHaveBeenCalledWith(VehicleModel)
        expect(getRepositorySpy).toHaveBeenCalledTimes(1)
    });


    test('should update vehicle with correct params', async () => {
        const repository = jest.spyOn(sut.getRepository(VehicleModel), 'update')
        const { cor, marca, status, placa, id } = { placa: 'any_placa', cor: 'any_cor', marca: 'any_marca', id: 1, status: true }

        await sut.update({ cor, marca, status, placa, id })

        expect(repository).toHaveBeenCalledWith({ id: id }, { cor, marca, status, placa })
        expect(repository).toHaveBeenCalledTimes(1)
    });

    ///exists

    test('should call getRepository in exists function', async () => {
        const getRepositorySpy = jest.spyOn(sut, 'getRepository')
        const request = 1

        await sut.exists(request)

        expect(getRepositorySpy).toHaveBeenCalledWith(VehicleModel)
        expect(getRepositorySpy).toHaveBeenCalledTimes(1)
    });


    test('should exists vehicle with correct params', async () => {
        const repository = jest.spyOn(sut.getRepository(VehicleModel), 'exists')
        const { id } = { id: 1 }

        await sut.exists(id)

        expect(repository).toHaveBeenCalledWith({ where: { id } })
        expect(repository).toHaveBeenCalledTimes(1)
    });

    ///List

    test('should call getRepository in list function', async () => {
        const getRepositorySpy = jest.spyOn(sut, 'getRepository')
        const request = { offset: 0, limit: 10, marca: "any_marca", cor: "any_cor" }

        await sut.list(request)

        expect(getRepositorySpy).toHaveBeenCalledWith(VehicleModel)
        expect(getRepositorySpy).toHaveBeenCalledTimes(1)
    });

    test('should list vehicles with correct params', async () => {
        const repository = jest.spyOn(sut.getRepository(VehicleModel), 'find')
        const { offset, limit, marca, cor } = { offset: 0, limit: 10, marca: "any_marca", cor: "any_cor" }

        await sut.list({ offset, limit, marca, cor })


        expect(repository).toHaveBeenCalledWith({ skip: offset, take: limit, where: { marca: marca, cor: cor } })
        expect(repository).toHaveBeenCalledTimes(1)
    });


});