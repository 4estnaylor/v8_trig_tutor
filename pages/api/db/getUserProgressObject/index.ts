import { NextApiRequest, NextApiResponse } from 'next';
import React from 'react';
import prisma from '../../../../lib/primsa';

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('wewewewewewewewwe getting userCourseProgress from api');
  try {
    const query = req.query;

    const { trigUserId } = req.body;

    console.log('getUserPRogressApi', trigUserId);

    const userCourseProgress = await prisma.userCourseProgress.findFirst({
      where: {
        userId: trigUserId,
      },
    });

    res.status(200).json({
      status: 'succefully posted!',
      query: query,
      body: req.body,
      userProgress: userCourseProgress,
    });
  } catch (err) {
    console.error(err);
  }
};

export default index;
