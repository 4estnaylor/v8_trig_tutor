import { Prisma } from '@prisma/client';
import prisma from '../../../../lib/primsa';

export default async function (req: any, res: any) {
  // const session = useSession();
  // const userName = session.data?.user?.name;

  if (true) {
    try {
      const userId = await req.query.userId;
      const questionId = await req.query.questionId;

      const userAnswers = await prisma.answer.findFirst({
        where: {
          userId: userId,
          questionId: questionId,
        },
      });

      res.status(200).json({
        userAnswers: userAnswers,
      });
      res.send();
    } catch (error) {
      console.error(error);
      res.status(400);
      res.send();
    }
  }
}
