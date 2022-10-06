import prisma from '../../../../lib/primsa';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, phone, textReminder, callReminder, trigUserId } = req.body;

    const updateUser = await prisma.user.update({
      where: {
        id: trigUserId,
      },
      data: {
        name: name,
        phone: phone,
        textReminder: textReminder,
        callReminder: callReminder,
      },
    });
    console.log(name, phone, textReminder, callReminder, trigUserId);
    console.log('updating user name, phone, and reminders');

    res.status(201).json({
      status: 'succesful post!',
    });
  } catch (err) {
    console.log(err);
  }
  // const session = useSession();
  // const userName = session.data?.user?.name;
}
