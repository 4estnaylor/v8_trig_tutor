const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/primsa';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      let body = await JSON.parse(req.body);
      const sessionToCancel = body.sessionToCancel;

      const stringifiedSession = JSON.stringify(sessionToCancel);
      const refund = await stripe.refunds.create({
        payment_intent: sessionToCancel.paymentIntentId,
        amount: 4000,
      });
      // const refund = 'yo mama';
      console.log('cancel session api called', sessionToCancel);
      const deletedSession = await prisma.session.delete({
        where: {
          id: sessionToCancel.id,
        },
      });
      res.status(201).json({
        status: 'succesfully refunded!',
        refund: refund,
        deletedSession: deletedSession,
      });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
