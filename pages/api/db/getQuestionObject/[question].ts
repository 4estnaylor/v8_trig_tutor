import { Prisma } from '@prisma/client';
import prisma from '../../../../lib/primsa';

export default async function (req: any, res: any) {
  // const session = useSession();
  // const userName = session.data?.user?.name;

  if (true) {
    try {
      const question = await req.query.question;

      let matchingQuestion = await prisma.question.findFirst({
        where: {
          question: question,
        },
      });

      if (matchingQuestion === null) {
        matchingQuestion = await prisma.question.findFirst({
          where: {
            question: question + '?',
          },
        });
      }

      // console.log('hmm', matchingQuestion);

      res.status(200).json({
        matchingQuestion: matchingQuestion,
      });
      res.send();
    } catch (error) {
      console.error(error);
      res.status(400);
      res.send();
    }
  }
}
