import { Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';
import BaseController from 'http/BaseController';
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

  static async validate(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    super.sendResponse(req, res, await CalculationService.validate(id));
  }
}
