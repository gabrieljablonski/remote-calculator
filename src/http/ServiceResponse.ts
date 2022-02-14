import { ValidationError } from 'express-validator';

export interface HttpHeader {
  name: string;
  value: string;
}

/* eslint-disable no-shadow */
export default class ServiceResponse<DataType> {
  status: number;

  success: boolean;

  message?: string;

  data?: DataType;

  headers?: HttpHeader[];

  constructor(
    status?: number,
    success?: boolean,
    message?: string,
    data?: DataType,
    headers?: HttpHeader[],
  ) {
    this.status = status ?? 200;
    this.success = success ?? true;
    this.message = message;
    this.data = data;
    this.headers = headers;
  }

  static ok<DataType>(
    messageOrData?: string | DataType,
    data?: DataType,
    headers?: HttpHeader[],
  ): ServiceResponse<DataType> {
    if (typeof messageOrData === 'string') {
      return new ServiceResponse<DataType>(
        200,
        true,
        messageOrData,
        data,
        headers,
      );
    }
    return new ServiceResponse<DataType>(
      200,
      true,
      undefined,
      messageOrData,
      headers,
    );
  }

  static notFound(message?: string): ServiceResponse<null> {
    return new ServiceResponse(404, false, message ?? 'not found');
  }

  static badArgs(errors: ValidationError[]) {
    return new ServiceResponse(422, false, 'invalid args', { errors });
  }

  static internalServerError(message?: string): ServiceResponse<null> {
    return new ServiceResponse(500, false, message);
  }
}
