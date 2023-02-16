import { NextApiRequest, NextApiResponse } from 'next';
import React from 'react';
import prisma from '../../../../lib/primsa';

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('marking component complete with API');
  try {
    const query = req.query;

    res.status(201).json({
      status: 'succefully posted!',
      query: query,
      body: req.body,
    });
  } catch (err) {
    console.error(err);
  }
};

export default index;
