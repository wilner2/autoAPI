import { UpdateAuto } from "@/app/controllers/updateAuto";
import { ParamsError } from "@/app/helpers/excepetions";
import { HTTPBadRequest } from "@/app/helpers/http";

describe('UpdateAuto Controller', () => {

    let sut: UpdateAuto
    beforeEach(() => {
        sut = new UpdateAuto()
    })
    test('should return 400 if placa is not provided', async () => {
        const request = {
            id: 1,
            cor: "any_cor",
            marca: "any_marca",
            status: false
        }

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400);
        expect(response.msg).toEqual(
            HTTPBadRequest(new ParamsError("\"placa\" is required")).msg
        );
    });

    test('should return 400 if cor is not provided', async () => {
        const request = {
            id: 1,
            placa: "any_placa",
            marca: "any_marca",
            status: false
        }

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400);
        expect(response.msg).toEqual(
            HTTPBadRequest(new ParamsError("\"cor\" is required")).msg
        );
    });

    test('should return 400 if marca is not provided', async () => {
        const request = {
            id: 1,
            placa: "any_placa",
            cor: "any_cor",
            status: false
        }

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400);
        expect(response.msg).toEqual(
            HTTPBadRequest(new ParamsError("\"marca\" is required")).msg
        );
    });

    test('should return 400 if id is not provided', async () => {
        const request = {
            cor: "any_cor",
            placa: "any_placa",
            marca: "any_marca",
            status: false
        }

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400);
        expect(response.msg).toEqual(
            HTTPBadRequest(new ParamsError("\"id\" is required")).msg
        );
    });

    test('should return 400 if status is not provided', async () => {
        const request = {
            id: 1,
            cor: "any_cor",
            placa: "any_placa",
            marca: "any_marca",
        }

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400);
        expect(response.msg).toEqual(
            HTTPBadRequest(new ParamsError("\"status\" is required")).msg
        );
    });

    test("should return 200 if auto updated successfully", async () => {
        const request = {
            id: 1,
            cor: "any_cor",
            placa: "any_placa",
            marca: "any_marca",
            status: true
        }


        const response = await sut.handle(request);

        expect(response.statusCode).toBe(200);
        expect(response.msg).toEqual("created successfully");
    });

});