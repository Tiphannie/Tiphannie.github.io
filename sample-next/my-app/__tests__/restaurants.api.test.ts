import handler from '@/pages/api/restaurants/index'; // statt .ts
import { createMocks } from 'node-mocks-http';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('GET /api/restaurants returns an array', async () => {
  const { req, res } = createMocks({
    method: 'GET',
  });

  await handler(req, res);
  expect(res._getStatusCode()).toBe(200);
  const data = JSON.parse(res._getData());
  expect(Array.isArray(data)).toBe(true);
});

test('POST /api/restaurants creates a new restaurant', async () => {
  const { req, res } = createMocks({
    method: 'POST',
    body: {
      id: 1,
      name: 'Testaurant',
      description: 'Test Description',
    },
  });

  await handler(req, res);
  expect(res._getStatusCode()).toBe(201);
  const data = JSON.parse(res._getData());
  expect(data.name).toBe('Testaurant');
});
