import { NextApiRequest, NextApiResponse } from 'next';

let restaurants: any[] = []; // In-memory store

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(restaurants);
  }

  if (req.method === 'POST') {
    const newRestaurant = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
    };
    restaurants.push(newRestaurant);
    return res.status(201).json(newRestaurant);
  }

  return res.status(405).end();
}
