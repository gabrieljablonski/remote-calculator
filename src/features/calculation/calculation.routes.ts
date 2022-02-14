import { Router } from 'express';

import checkValidationResult from 'http/middlewares/checkValidationResult';
import CalculationController from './calculation.controller';

const router = Router();

router.post(
  '/sum',
  CalculationController.validateArgs(),
  checkValidationResult,
  CalculationController.sum,
);

router.post(
  '/subtract',
  CalculationController.validateArgs(),
  checkValidationResult,
  CalculationController.subtract,
);

router.post(
  '/multiply',
  CalculationController.validateArgs(),
  checkValidationResult,
  CalculationController.multiply,
);

router.post(
  '/divide',
  CalculationController.validateArgs(),
  checkValidationResult,
  CalculationController.divide,
);

router.get('/:id([0-9a-z]+)', CalculationController.validate);

export default router;
