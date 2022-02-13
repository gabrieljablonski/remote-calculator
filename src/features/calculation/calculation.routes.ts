import { Router } from 'express';
import CalculationController from './calculation.controller';

const router = Router();

router.post(
  '/sum',
  CalculationController.validateArgs(),
  CalculationController.checkValidationResult,
  CalculationController.sum,
);
router.post(
  '/subtract',
  CalculationController.validateArgs(),
  CalculationController.checkValidationResult,
  CalculationController.subtract,
);
router.post(
  '/multiply',
  CalculationController.validateArgs(),
  CalculationController.checkValidationResult,
  CalculationController.multiply,
);
router.post(
  '/divide',
  CalculationController.validateArgs(),
  CalculationController.checkValidationResult,
  CalculationController.divide,
);

export default router;
