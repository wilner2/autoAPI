export type HttpResponse = {
  statusCode: number;
  data: any;
};


export const HTTPBadRequest = (error: Error): HttpResponse => {
  return { statusCode: 400, data: error.message };
};

export const HTTPInternalServerError = (error: Error): HttpResponse => {
  return { statusCode: 500, data: error.message };
};

export const Ok = (data: any): HttpResponse => {
  return { statusCode: 200, data: data };
};

export const HTTPNotFound = (error: Error): HttpResponse => {
  return { statusCode: 404, data: error.message };
};