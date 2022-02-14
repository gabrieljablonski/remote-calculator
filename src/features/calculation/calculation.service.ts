import { getMongoRepository } from 'typeorm';

import ServiceResponse from 'http/ServiceResponse';
import { handleAsync } from 'utils';
import Calculation, {
  CalculationError,
  OperationType,
} from 'features/calculation/calculation.entity';

export default class CalculationService {
  private static UniqueIdHeaderName = 'Remote-Calculator-Calculation-Id';

  static async sum(
    a: number,
    b: number,
  ): Promise<ServiceResponse<{ calculation: Calculation } | null>> {
    const calculation = new Calculation();
    calculation.args = [a, b];
    calculation.operation = OperationType.SUM;
    calculation.result = a + b;

    const calculationRepo = getMongoRepository(Calculation);
    const { error } = await handleAsync(calculationRepo.save(calculation));
    if (error) {
      return ServiceResponse.internalServerError(JSON.stringify(error));
    }
    return ServiceResponse.ok('', { calculation }, [
      {
        name: CalculationService.UniqueIdHeaderName,
        value: calculation.id.toHexString(),
      },
    ]);
  }

  static async subtract(
    a: number,
    b: number,
  ): Promise<ServiceResponse<{ calculation: Calculation } | null>> {
    const calculation = new Calculation();
    calculation.args = [a, b];
    calculation.operation = OperationType.SUBTRACT;
    calculation.result = a - b;

    const calculationRepo = getMongoRepository(Calculation);
    const { error } = await handleAsync(calculationRepo.save(calculation));
    if (error) {
      return ServiceResponse.internalServerError(JSON.stringify(error));
    }
    return ServiceResponse.ok('', { calculation }, [
      {
        name: CalculationService.UniqueIdHeaderName,
        value: calculation.id.toHexString(),
      },
    ]);
  }

  static async multiply(
    a: number,
    b: number,
  ): Promise<ServiceResponse<{ calculation: Calculation } | null>> {
    const calculation = new Calculation();
    calculation.args = [a, b];
    calculation.operation = OperationType.MULTIPLY;
    calculation.result = a * b;

    const calculationRepo = getMongoRepository(Calculation);
    const { error } = await handleAsync(calculationRepo.save(calculation));
    if (error) {
      return ServiceResponse.internalServerError(JSON.stringify(error));
    }
    return ServiceResponse.ok('', { calculation }, [
      {
        name: CalculationService.UniqueIdHeaderName,
        value: calculation.id.toHexString(),
      },
    ]);
  }

  static async divide(
    a: number,
    b: number,
  ): Promise<ServiceResponse<{ calculation: Calculation } | null>> {
    const calculation = new Calculation();
    calculation.args = [a, b];
    calculation.operation = OperationType.DIVIDE;

    if (b === 0) {
      calculation.error = CalculationError.DIVIDE_BY_ZERO;
    } else {
      calculation.result = a / b;
    }

    const calculationRepo = getMongoRepository(Calculation);
    const { error } = await handleAsync(calculationRepo.save(calculation));
    if (error) {
      return ServiceResponse.internalServerError(JSON.stringify(error));
    }
    return ServiceResponse.ok('', { calculation }, [
      {
        name: CalculationService.UniqueIdHeaderName,
        value: calculation.id.toHexString(),
      },
    ]);
  }

  static async validate(
    id: string,
  ): Promise<ServiceResponse<{ calculation: Calculation } | null>> {
    const calculationRepo = getMongoRepository(Calculation);
    const { result: calculation, error } = await handleAsync(
      calculationRepo.findOneOrFail(id),
    );
    if (!calculation || error) {
      return ServiceResponse.notFound('calculation not found');
    }
    return ServiceResponse.ok({ calculation });
  }
}
