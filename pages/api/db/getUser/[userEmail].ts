import prisma from '../../../../lib/primsa';
import { useSession } from 'next-auth/react';

export default async function (req: any, res: any) {
  console.log('called');
  // const session = useSession();
  // const userName = session.data?.user?.name;

  if (req.method === 'GET') {
    try {
      const userEmail = req.query.userEmail;

      let user = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (!user) {
        const newUser = await prisma.user.create({
          data: {
            email: userEmail,
          },
        });

        user = await prisma.user.findUnique({
          where: { email: userEmail },
        });
      }

      res.status(200).json({
        user: user,
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(400);
  }

  res.status(200);

  res.send();
}
