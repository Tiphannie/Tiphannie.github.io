import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import handler from '@/pages/api/berlin-doner/index';
import { createMocks } from 'node-mocks-http';

jest.setTimeout(30000); // 30 seconds

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

test('POST /api/berlin-doner creates new menu item', async () => {
  const { req, res } = createMocks({
    method: 'POST',
    body: { name: 'Döner Kebab', price: 5 },
  });

  await handler(req, res);
  expect(res._getStatusCode()).toBe(201);
  const json = JSON.parse(res._getData());
  expect(json.name).toBe('Döner Kebab');
});
