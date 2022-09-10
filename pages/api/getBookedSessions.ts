import prisma from '../../lib/primsa';

export default async function handle(req: any, res: any) {
  if (req.method === 'GET') {
    const bookedSessions = await prisma.session.findMany();
    res.status(200).json({
      bookedSessions: bookedSessions,
    });
  }
}
