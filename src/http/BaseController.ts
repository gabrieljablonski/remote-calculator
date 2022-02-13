import { Request, Response } from 'express';

import ServiceResponse from './ServiceResponse';

export default class BaseController {
  static sendResponse(
    req: Request,
    res: Response,
    response: ServiceResponse<unknown>,
  ): void {
    const { status, message, data, success } = response;
    res.status(status).send({ success, message, data });
  }
}
