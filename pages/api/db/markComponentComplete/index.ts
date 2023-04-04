import { NextApiRequest, NextApiResponse } from 'next';
import React from 'react';
import prisma from '../../../../lib/primsa';

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('marking component complete with API');
  try {
    const query = req.query;

    const { currentSubComponent, currentTopicComponentTitle, trigUserId } =
      req.body;

    console.log(currentSubComponent, currentTopicComponentTitle, trigUserId);

    let userCourseProgress;

    if (!currentSubComponent) {
      userCourseProgress = await prisma.userCourseProgress.upsert({
        where: {
          userId: trigUserId,
        },
        update: {
          topicsComplete: {
            push: currentTopicComponentTitle,
          },
        },
        create: {
          userId: trigUserId,
          topicsComplete: [currentTopicComponentTitle],
        },
      });
    } else {
      userCourseProgress = await prisma.userCourseProgress.upsert({
        where: {
          userId: trigUserId,
        },
        update: {
          subTopicsComplete: {
            push: currentSubComponent,
          },
        },
        create: {
          userId: trigUserId,
          subTopicsComplete: [currentSubComponent],
        },
      });
    }

    res.status(201).json({
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
