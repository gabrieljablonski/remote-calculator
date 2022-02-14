import supertest from 'supertest';
import { Connection, createConnection } from 'typeorm';

const createServer = require('../build/utils/createServer');

const request = supertest(createServer.default());

let db: Connection;

beforeAll(async () => {
  db = await createConnection();
});

describe('Calculation endpoints', () => {
  it('POST /calculation/sum should return the sum', async () => {
    const a = 10;
    const b = 2;
    const res = await request.post('/v1/calculation/sum').send({ a, b });
    const { success, data } = res.body;
    expect(success).toBeTruthy();

    const { calculation } = data;
    expect(calculation).toBeTruthy();

    const { id, args, operation, result, error } = data;
    expect(operation).toEqual('SUM');
    expect(error).toBeFalsy();
    expect(result).toEqual(a + b);
  });
  it('POST /calculation/subtract should return the subtraction', async () => {
    const a = 10;
    const b = 2;
    const res = await request.post('/v1/calculation/subtract').send({ a, b });
    const { success, data } = res.body;
    expect(success).toBeTruthy();

    const { calculation } = data;
    expect(calculation).toBeTruthy();

    const { id, args, operation, result, error } = data;
    expect(operation).toEqual('SUBTRACT');
    expect(error).toBeFalsy();
    expect(result).toEqual(a - b);
  });
  it('POST /calculation/multiply should return the multiplication', async () => {
    const a = 10;
    const b = 2;
    const res = await request.post('/v1/calculation/multiply').send({ a, b });
    const { success, data } = res.body;
    expect(success).toBeTruthy();

    const { calculation } = data;
    expect(calculation).toBeTruthy();

    const { id, args, operation, result, error } = data;
    expect(operation).toEqual('MULTIPLY');
    expect(error).toBeFalsy();
    expect(result).toEqual(a * b);
  });
  it('POST /calculation/divide should return the division', async () => {
    const a = 10;
    const b = 2;
    const res = await request.post('/v1/calculation/divide').send({ a, b });
    const { success, data } = res.body;
    expect(success).toBeTruthy();

    const { calculation } = data;
    expect(calculation).toBeTruthy();

    const { id, args, operation, result, error } = data;
    expect(operation).toEqual('DIVIDE');
    expect(error).toBeFalsy();
    expect(result).toEqual(a / b);
  });
  it('POST /calculation/divide should return an error when dividing by zero', async () => {
    const a = 10;
    const b = 2;
    const res = await request.post('/v1/calculation/divide').send({ a, b });
    const { success, data } = res.body;
    expect(success).toBeTruthy();

    const { calculation } = data;
    expect(calculation).toBeTruthy();

    const { id, args, operation, result, error } = data;
    expect(operation).toEqual('DIVIDE');
    expect(error).toEqual('DIVIDE_BY_ZERO');
  });
  it('GET /calculation/<id> should return a previously made calculation', async () => {
    const a = 10;
    const b = 2;
    const res = await request.post('/v1/calculation/sum').send({ a, b });
    const { success, data } = res.body;
    expect(success).toBeTruthy();

    const { calculation } = data;
    expect(calculation).toBeTruthy();

    const { id, args, operation, result, error } = data;
    expect(operation).toEqual('SUM');
    expect(error).toBeFalsy();
    expect(result).toEqual(a + b);

    const res2 = await request.get(`/v1/calculation/${id}`);
    const { success: valSuccess, data: valData } = res.body;
    expect(valSuccess).toBeTruthy();

    const { calculation: valCalculation } = valData;
    expect(valCalculation).toMatchObject(calculation);
  });
});

afterAll(() => {
  db.close();
});
