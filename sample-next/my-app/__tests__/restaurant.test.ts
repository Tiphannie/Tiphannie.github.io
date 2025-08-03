import { createServer } from 'http';
import next from 'next';
import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

jest.setTimeout(30000); // 30 sec
let server: any;
let request: any;
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  const app = next({ dev: true }); // we use dev mode for testing and changed false o true
  const handle = app.getRequestHandler();

  await app.prepare();

  server = createServer((req, res) => handle(req, res));
  await new Promise(resolve => server.listen(3001, resolve)); // use 3001 to avoid conflict

  request = supertest('http://localhost:3001');
  await request.get('/api/restaurants'); // warm-up

},30000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();

  if (server && server.close) {
    await new Promise<void>((resolve, reject) => {
      server.close((err: any) => (err ? reject(err) : resolve()));
    });
  }
});

describe('E2E /api/restaurants', () => {
  it('GET /api/restaurants health check', async () => {
    const res = await request.get('/api/restaurants');
    console.log('GET /api/restaurants status:', res.status);
    expect([200, 404]).toContain(res.status); // Should respond with 200 or 404
  });
  
  it('should create and then get a restaurant', async () => {
    // 1. POST
    const createRes = await request.post('/api/restaurants').send({
      id: 8,
      name: 'End2End Doner',
      description: 'E2E taste test',
    });
    console.log('POST /api/restaurants status:', createRes.status);
    expect(createRes.status).toBe(201);
    expect(createRes.body.name).toBe('End2End Doner');

    // 2.GET
    const getRes = await request.get('/api/restaurants');
    console.log('GET /api/restaurants status after POST:', getRes.status);
    expect(getRes.status).toBe(200);
    expect(getRes.body.length).toBeGreaterThan(0);
    expect(getRes.body.some((r: any) => r.name === 'End2End Doner')).toBe(true);
  });
});
