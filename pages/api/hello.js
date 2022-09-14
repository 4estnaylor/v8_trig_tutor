const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const body = req.body;
      console.log(body);
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            // price: process.env.PRICE_ID,
            quantity: 1,
            currency: 'usd',
            amount: 2800,
            name: '45 min session',
            description: 'test description',
          },
        ],
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
