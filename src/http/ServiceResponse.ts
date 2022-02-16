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

  constructor({
    status,
    success,
    message,
    data,
    headers,
  }: Partial<ServiceResponse<DataType>>) {
    this.status = status ?? 200;
    this.success = success ?? true;
    this.message = message;
    this.data = data;
    this.headers = headers;
  }

  static ok<DataType>({
    message,
    data,
    headers,
  }: Partial<ServiceResponse<DataType>>): ServiceResponse<DataType> {
    return new ServiceResponse<DataType>({
      status: 200,
      success: true,
      message,
      data,
      headers,
    });
  }

  static notFound(message?: string): ServiceResponse<null> {
    return new ServiceResponse({
      status: 404,
      success: false,
      message: message ?? 'not found',
    });
  }

  static badArgs(errors: ValidationError[]) {
    return new ServiceResponse({
      status: 422,
      success: false,
      message: 'invalid args',
      data: { errors },
    });
  }

  static internalServerError(message?: string): ServiceResponse<null> {
    return new ServiceResponse({ status: 500, success: false, message });
  }
}
