const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { selectedSessions, userId, price, email } = req.body;
      let lineItems = [];

      const stringifiedSessions = JSON.stringify(selectedSessions);
      const stringifiedUserId = JSON.stringify(userId);

      const metaData = {
        sessions: stringifiedSessions,
        userId: stringifiedUserId,
      };

      selectedSessions.forEach((session) => {
        const date = new Date(session);
        const DateTimestring = date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          weekday: 'long',
          hour: 'numeric',
          year: 'numeric',
        });
        const lineItem = {
          quantity: 1,
          currency: 'usd',
          amount: price * 100,
          name: '45 min session',
          description: DateTimestring,
        };
        lineItems.push(lineItem);
      });

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        metadata: metaData,
        mode: 'payment',
        customer_email: email,
        success_url: `${req.headers.origin}/sessions?success=true`,
        cancel_url: `${req.headers.origin}/sessions?canceled=true`,
      });

      res.json({ id: session.id });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
