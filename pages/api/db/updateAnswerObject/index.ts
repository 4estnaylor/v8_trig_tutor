import prisma from '../../../../lib/primsa';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { trigUserId, questionId, answerState, attemptIncrement } = req.body;

    const upsertAnswer = await prisma.answer.upsert({
      where: {
        userId_questionId: {
          userId: trigUserId,
          questionId: questionId,
        },
      },
      update: {
        answerState: answerState,
      },
      create: {
        questionId: questionId,
        userId: trigUserId,
        answerState: answerState,
      },
    });

    // console.log(name, phone, textReminder, callReminder, trigUserId);
    console.log('upserting answer', upsertAnswer);

    res.status(201).json({
      status: 'succesful post!',
    });
  } catch (err) {
    console.log(err);
  }
}
