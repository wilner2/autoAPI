type HttpResponse = {
  statusCode: number;
  msg: string;
};

export const HTTPBadRequest = (error: Error): HttpResponse => {
  return { statusCode: 400, msg: error.message };
};

export const HTTPInternalServerError = (error: Error): HttpResponse => {
  return { statusCode: 500, msg: error.message };
};

export const Ok = (msg: any): HttpResponse => {
  return { statusCode: 200, msg: msg };
};
