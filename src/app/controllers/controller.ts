import { HttpResponse } from "../helpers/http"

export interface Controller {
    handle(request: any): Promise<HttpResponse>
    validate(request: any): string | undefined
}