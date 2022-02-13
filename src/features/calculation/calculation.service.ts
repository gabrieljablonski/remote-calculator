import ServiceResponse from 'http/ServiceResponse';
import Calculation from './calculation.entity';

export default class CalculationService {
  static async sum(
    a: number,
    b: number,
  ): Promise<ServiceResponse<{ calculation: Calculation }>> {
    throw new Error('not implemented yet');
  }

  static async subtract(
    a: number,
    b: number,
  ): Promise<ServiceResponse<{ calculation: Calculation }>> {
    throw new Error('not implemented yet');
  }

  static async multiply(
    a: number,
    b: number,
  ): Promise<ServiceResponse<{ calculation: Calculation }>> {
    throw new Error('not implemented yet');
  }

  static async divide(
    a: number,
    b: number,
  ): Promise<ServiceResponse<{ calculation: Calculation }>> {
    throw new Error('not implemented yet');
  }
}
