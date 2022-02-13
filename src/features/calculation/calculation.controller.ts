import { NextFunction, Request, Response } from 'express';
import { body, ValidationChain, validationResult } from 'express-validator';
import BaseController from 'http/BaseController';
import ServiceResponse from 'http/ServiceResponse';
import CalculationService from './calculation.service';

export default class CalculationController extends BaseController {
  static validateArgs(): ValidationChain[] {
    return [
      body('a', 'required arg').exists(),
      body('b', 'required arg').exists(),
      body('a', 'arg should be a number').optional().isNumeric(),
      body('b', 'arg should be a number').optional().isNumeric(),
    ];
  }

  static checkValidationResult(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
      return;
    }
    super.sendResponse(req, res, ServiceResponse.badArgs(errors.array()));
  }

  static async sum(req: Request, res: Response): Promise<void> {
    const { a, b } = req.body;
    super.sendResponse(req, res, await CalculationService.sum(a, b));
  }

  static async subtract(req: Request, res: Response): Promise<void> {
    const { a, b } = req.body;
    super.sendResponse(req, res, await CalculationService.subtract(a, b));
  }

  static async multiply(req: Request, res: Response): Promise<void> {
    const { a, b } = req.body;
    super.sendResponse(req, res, await CalculationService.multiply(a, b));
  }

  static async divide(req: Request, res: Response): Promise<void> {
    const { a, b } = req.body;
    super.sendResponse(req, res, await CalculationService.divide(a, b));
  }
}
