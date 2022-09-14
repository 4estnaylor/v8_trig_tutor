const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const body = req.body;
      let lineItems = [];

      body.forEach((session) => {
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
          amount: 3000,
          name: '45 min session',
          description: DateTimestring,
        };
        console.log(lineItem);
        lineItems.push(lineItem);
      });
      console.log(lineItems);

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        metadata: { sessions: JSON.stringify(body) },
        mode: 'payment',
        success_url: `${req.headers.origin}/book/successfully_booked=true`,
        cancel_url: `${req.headers.origin}/book/?canceled=true`,
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
