import prisma from '../../../../lib/primsa';

export default async function (req: any, res: any) {
  // const session = useSession();
  // const userName = session.data?.user?.name;

  if (true) {
    try {
      const userId = await req.query.userId;

      const userSessions = await prisma.session.findMany({
        where: {
          studentId: userId,
        },
      });

      res.status(200).json({
        userSessions: userSessions,
      });
      res.send();
    } catch (error) {
      console.error(error);
      res.status(400);
      res.send();
    }
  }
}
