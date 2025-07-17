import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { jest } from '@jest/globals';


// Create mock functions for Mongoose methods
const mockFind = jest.fn();
const mockSave = jest.fn();
const mockFindByIdAndDelete = jest.fn();
const mockFindByIdAndUpdate = jest.fn();

jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose') as any;
  return {
    ...actualMongoose,
    model: jest.fn(() => ({
      find: mockFind,
      findByIdAndDelete: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      save: mockSave,
    })),
    models: {},
    Schema: actualMongoose.Schema,
  };
});


describe('Berlin Döner API Mongoose Integration', () => {
  it('should return mocked menu items from find()', async () => {
    const mockData = [{ name: 'Lahmacun', price: 6.5 }];
    mockFind.mockReturnValueOnce({
      lean: () => Promise.resolve(mockData),
    });

    const DishPrice = mongoose.model('DishPrice', new mongoose.Schema({}));
    const result = await DishPrice.find().lean();
    expect(result).toEqual(mockData);
  });
});
