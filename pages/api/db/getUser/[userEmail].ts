import prisma from '../../../../lib/primsa';

export default async function (req: any, res: any) {
  // const session = useSession();
  // const userName = session.data?.user?.name;

  if (req.method === 'GET') {
    try {
      const userEmail = await req.query.userEmail;
      console.log('user email given to api: ', userEmail);
      if (!userEmail) return;

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

  res.send();
}
