type HttpResponse = {
  statusCode: number;
  msg: string;
};

export const HTTPBadRequest = (error: Error): HttpResponse => {
  return { statusCode: 400, msg: error.message };
};
