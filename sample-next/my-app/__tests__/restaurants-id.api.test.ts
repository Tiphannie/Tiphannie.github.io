import handler from '@/pages/api/restaurants/[id]';
import { createMocks } from 'node-mocks-http';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Seed 1 restaurant for testing
  const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", new mongoose.Schema({
    id: String,
    name: String,
    description: String
  }));

  await Restaurant.create({
    id: "42",
    name: "Original Name",
    description: "Original Description",
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('GET /api/restaurants/[id] returns one restaurant', async () => {
  const { req, res } = createMocks({
    method: 'GET',
    query: { id: '42' },
  });

  await handler(req, res);
  expect(res._getStatusCode()).toBe(200);
  const data = JSON.parse(res._getData());
  expect(data.name).toBe('Original Name');
});

test('PUT /api/restaurants/[id] updates the restaurant', async () => {
  const { req, res } = createMocks({
    method: 'PUT',
    query: { id: '42' },
    body: {
      name: 'Updated Name',
      description: 'Updated Description',
    },
  });

  await handler(req, res);
  expect(res._getStatusCode()).toBe(200);
  const data = JSON.parse(res._getData());
  expect(data.name).toBe('Updated Name');
});
