import { RecordModel } from "@/infra/entities";
import { RecordRepository } from "@/infra/repositories";
import { DataType, IMemoryDb, newDb } from "pg-mem";
import { DataSource } from "typeorm";
import MockDate from 'mockdate'
describe('Create Record repository', () => {
    let dataSource: DataSource
    let db: IMemoryDb
    let sut: RecordRepository
    const request = { idAutomovel: 1, idMotorista: 1, desc: "any_desc" };

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
            entities: [RecordModel],
            logging: false,
        })
        await dataSource.initialize()
        await dataSource.synchronize()
        sut = new RecordRepository(dataSource)
    })

    test('should call getRepository', async () => {
        const getRepositorySpy = jest.spyOn(sut, 'getRepository')
        await sut.create(request)

        expect(getRepositorySpy).toHaveBeenCalledWith(RecordModel)
        expect(getRepositorySpy).toHaveBeenCalledTimes(1)
    });

    test('should save Record in database', async () => {
        const repository = jest.spyOn(sut.getRepository(RecordModel), 'save')
        await sut.create(request)

        expect(repository).toHaveBeenCalledWith({ ...request, inicio: new Date().toISOString(), fim: null, inProgress: true, id: 2 })
        expect(repository).toHaveBeenCalledTimes(1)
    });

    ////findRecordInProgress

    test('should call getRepository in exists function', async () => {
        const getRepositorySpy = jest.spyOn(sut, 'getRepository')
        const { idAutomovel, idMotorista } = request
        await sut.findRecordInProgress({ idAutomovel, idMotorista })

        expect(getRepositorySpy).toHaveBeenCalledWith(RecordModel)
        expect(getRepositorySpy).toHaveBeenCalledTimes(1)
    });

    test('should return if exists record calling with correct params', async () => {
        const repository = jest.spyOn(sut.getRepository(RecordModel), 'exists')
        jest.spyOn(sut.getRepository(RecordModel), 'exists').mockResolvedValueOnce(true)
        const { idAutomovel, idMotorista } = request

        const response = await sut.findRecordInProgress({ idAutomovel, idMotorista })

        expect(repository).toHaveBeenCalledWith({ where: [{ inProgress: true, idAutomovel }, { inProgress: true, idMotorista }] })
        expect(repository).toHaveBeenCalledTimes(1)
        expect(response).toEqual(true)
    });

    /// update

    test('should call getRepository in update function', async () => {
        const getRepositorySpy = jest.spyOn(sut, 'getRepository')
        const request = { id: 1, inProgress: false }

        await sut.update(request)

        expect(getRepositorySpy).toHaveBeenCalledWith(RecordModel)
        expect(getRepositorySpy).toHaveBeenCalledTimes(1)
    });


    test('should update record with correct params', async () => {
        const repository = jest.spyOn(sut.getRepository(RecordModel), 'update')
        const { id, inProgress } = { id: 1, inProgress: false }
        await sut.update({ id, inProgress })

        expect(repository).toHaveBeenCalledWith({ id: id }, { inProgress })
        expect(repository).toHaveBeenCalledTimes(1)
    });

});