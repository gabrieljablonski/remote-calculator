import { ValidationError } from 'express-validator';

/* eslint-disable no-shadow */
export default class ServiceResponse<DataType> {
  status: number;

  success: boolean;

  message?: string;

  data?: DataType;

  constructor(
    status?: number,
    success?: boolean,
    message?: string,
    data?: DataType,
  ) {
    this.status = status ?? 200;
    this.success = success ?? true;
    this.message = message;
    this.data = data;
  }

  static ok<DataType>(
    messageOrData?: string | DataType,
    data?: DataType,
  ): ServiceResponse<DataType> {
    if (typeof messageOrData === 'string') {
      return new ServiceResponse<DataType>(200, true, messageOrData, data);
    }
    return new ServiceResponse<DataType>(200, true, undefined, messageOrData);
  }

  static badArgs(errors: ValidationError[]) {
    return new ServiceResponse(422, false, 'invalid args', { errors });
  }

  static internalServerError(message?: string): ServiceResponse<null> {
    return new ServiceResponse(500, false, message);
  }
}
