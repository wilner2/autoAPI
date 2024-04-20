export class ParamIsMissing extends Error {
  constructor(paramName: string) {
    super(`Params ${paramName} is missing`);
    this.name = "MissingParamError";
  }
}
