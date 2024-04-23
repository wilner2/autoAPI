import { CreateRecord, RecordInProgress } from "@/domain/contracts/repos/record";
import { RegisterRecordCase } from "@/domain/useCases/record";
import { MockProxy, mock } from "jest-mock-extended";
import { FindByID as FindByIDVehicle } from "@/domain/contracts/repos/vehicle";
import { FindByID as FindByIDDriver } from "@/domain/contracts/repos/driver";
import MockDate from 'mockdate'

describe("RegisterRecord UseCases", () => {
    let sut: RegisterRecordCase;
    let stubCreateRecordORM: MockProxy<CreateRecord>;
    let stubRecordInProgress: MockProxy<RecordInProgress>;
    let stubFindByIDVehicle: MockProxy<FindByIDVehicle>;
    let stubFindByIDDriver: MockProxy<FindByIDDriver>;
    const request = { idMotorista: 1, idAutomovel: 1, desc: "any_desc" }
    afterAll(() => {
        MockDate.reset()
    })
    beforeAll(async () => {
        MockDate.set(new Date().toString())
    })
    beforeEach(() => {
        stubCreateRecordORM = mock<CreateRecord>();
        stubRecordInProgress = mock<RecordInProgress>();
        stubFindByIDVehicle = mock<FindByIDVehicle>();
        stubFindByIDDriver = mock<FindByIDDriver>();
        sut = new RegisterRecordCase(stubCreateRecordORM, stubRecordInProgress, stubFindByIDVehicle, stubFindByIDDriver);

        stubRecordInProgress.findRecordInProgress.mockResolvedValue(true)
        stubFindByIDVehicle.findById.mockResolvedValue({ id: 1, created_at: new Date, status: true, placa: "any_placa", cor: "any_cor", marca: "any_marca" })
        stubFindByIDDriver.findById.mockResolvedValue({ id: 1, created_at: new Date, status: true, nome: "any_nome" })

    });
    test("should create driver", async () => {
        stubRecordInProgress.findRecordInProgress.mockResolvedValueOnce(false)
        await sut.execute(request);
        const spy = jest.spyOn(stubCreateRecordORM, "create");

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(
            request,
            { id: 1, created_at: new Date, status: true, nome: "any_nome" },
            { id: 1, created_at: new Date, status: true, placa: "any_placa", cor: "any_cor", marca: "any_marca" },
        );
    });

    test("should call function verify if exists record in progresss by idMotorista and idAutomovel", async () => {
        await sut.execute(request);
        const spy = jest.spyOn(stubRecordInProgress, "findRecordInProgress");

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(request);
    });

    test("should return recordInProgress equals true", async () => {

        const response = await sut.execute(request);

        expect(response).toEqual({ recordInProgress: true });
    });

    test("should return driverNotFound equals true", async () => {
        stubFindByIDDriver.findById.mockResolvedValueOnce(null)
        const response = await sut.execute(request);

        expect(response).toEqual({ driverNotFound: true });
    });

    test("should return vehicleNotFound equals true", async () => {
        stubFindByIDVehicle.findById.mockResolvedValueOnce(null)

        const response = await sut.execute(request);

        expect(response).toEqual({ vehicleNotFound: true });
    });

});
