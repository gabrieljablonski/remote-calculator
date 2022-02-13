import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import BaseController from 'http/BaseController';
import ServiceResponse from 'http/ServiceResponse';

export default function checkValidationResult(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
    return;
  }
  BaseController.sendResponse(
    req,
    res,
    ServiceResponse.badArgs(errors.array()),
  );
}
