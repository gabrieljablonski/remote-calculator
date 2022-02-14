/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CalculationError,
  OperationType,
} from 'features/calculation/calculation.entity';
import supertest from 'supertest';
import { createConnection, getConnection } from 'typeorm';

import createServer from '../http/createServer';

const request = supertest(createServer());

beforeAll(async () => {
  await createConnection();
});

afterAll(async () => {
  await getConnection().close();
});

describe('Calculation endpoints', () => {
  it('POST /calculation/sum should return the sum', async () => {
    const a = 10;
    const b = 2;
    const res = await request.post('/v1/calculation/sum').send({ a, b });
    const { success, data } = res.body;
    expect(success).toBeTruthy();

    const { calculation } = data;
    expect(calculation).toEqual(expect.anything());

    const { id, args, operation, result, error } = calculation;
    expect(operation).toEqual(OperationType.SUM);
    expect(error).toBeNull();
    expect(result).toEqual(a + b);
  });

  it('POST /calculation/subtract should return the subtraction', async () => {
    const a = 10;
    const b = 2;
    const res = await request.post('/v1/calculation/subtract').send({ a, b });
    const { success, data } = res.body;
    expect(success).toBeTruthy();

    const { calculation } = data;
    expect(calculation).toEqual(expect.anything());

    const { id, args, operation, result, error } = calculation;
    expect(operation).toEqual(OperationType.SUBTRACT);
    expect(error).toBeNull();
    expect(result).toEqual(a - b);
  });

  it('POST /calculation/multiply should return the multiplication', async () => {
    const a = 10;
    const b = 2;
    const res = await request.post('/v1/calculation/multiply').send({ a, b });
    const { success, data } = res.body;
    expect(success).toBeTruthy();

    const { calculation } = data;
    expect(calculation).toEqual(expect.anything());

    const { id, args, operation, result, error } = calculation;
    expect(operation).toEqual(OperationType.MULTIPLY);
    expect(error).toBeNull();
    expect(result).toEqual(a * b);
  });

  it('POST /calculation/divide should return the division', async () => {
    const a = 10;
    const b = 2;
    const res = await request.post('/v1/calculation/divide').send({ a, b });
    const { success, data } = res.body;
    expect(success).toBeTruthy();

    const { calculation } = data;
    expect(calculation).toEqual(expect.anything());

    const { id, args, operation, result, error } = calculation;
    expect(operation).toEqual(OperationType.DIVIDE);
    expect(error).toBeNull();
    expect(result).toEqual(a / b);
  });

  it('POST /calculation/divide should return an error when dividing by zero', async () => {
    const a = 10;
    const b = 0;
    const res = await request.post('/v1/calculation/divide').send({ a, b });
    const { success, data } = res.body;
    expect(success).toBeTruthy();

    const { calculation } = data;
    expect(calculation).toEqual(expect.anything());

    const { id, args, operation, result, error } = calculation;
    expect(operation).toEqual(OperationType.DIVIDE);
    expect(error).toEqual(CalculationError.DIVIDE_BY_ZERO);
    expect(result).toBeNull();
  });

  it('GET /calculation/<id> should return a previously made calculation', async () => {
    const a = 10;
    const b = 2;
    const res = await request.post('/v1/calculation/sum').send({ a, b });
    const { success, data } = res.body;
    expect(success).toBeTruthy();

    const { calculation } = data;
    expect(calculation).toEqual(expect.anything());

    const { id, args, operation, result, error } = calculation;
    expect(operation).toEqual(OperationType.SUM);
    expect(error).toBeNull();
    expect(result).toEqual(a + b);

    const res2 = await request.get(`/v1/calculation/${id}`);
    const { success: valSuccess, data: valData } = res2.body;
    expect(valSuccess).toBeTruthy();

    const { calculation: valCalculation } = valData;
    expect(calculation).toMatchObject(valCalculation);
  });
});
