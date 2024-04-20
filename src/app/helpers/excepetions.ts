export class ParamsError extends Error {
  constructor(paramName: string) {
    super(paramName);
    this.name = "ParamsError";
  }
}
