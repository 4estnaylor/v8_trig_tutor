// import Cors from 'micro-cors';

// const cors = Cors({
//   allowMethods: ['POST', 'HEAD'],
// });

// // Partial of ./pages/api/webhooks/index.ts
// // ...
// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// // Stripe requires the raw body to construct the event.
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default async function webhookHandler(req, res) {
  if (req.method === 'POST') {
    switch (req.body.type) {
      case 'payment_intent.created':
        console.log('payment intent created');
        break;
      case 'checkout.session.completed':
        console.log('checkout.session.completed');
        const event = req.body;
        console.log('event', event);
        console.log('data', event.data);
        console.log('object', event.data.object);
        console.log('metadata', event.data.object.metadata);
        let sessions = event.data.object.metadata.sessions;
        console.log(sessions);
        break;
      default:
        console.log(req.body.type ? req.body.type : 'beep bop');
    }

    // let sessionsParsed = await JSON.parse(sessions);
    // console.log('sessions parsed: ', sessionsParsed);
    res.status(200).send();
  }

  // if (req.method === 'POST') {
  //   const buf = await buffer(req);
  //   const sig = req.headers['stripe-signature'];

  //   let event;

  //   try {
  //     event = stripe.webhooks.constructEvent(
  //       buf.toString(),
  //       sig,
  //       webhookSecret
  //     );
  //     console.log(event);
  //   } catch (err) {
  //     // On error, log and return the error message
  //     console.log(`❌ Error message: ${err.message}`);
  //     res.status(400).send(`Webhook Error: ${err.message}`);
  //     return;
  //   }

  //   // Successfully constructed event
  //   console.log('✅ Success:', event.id);
  //   res.status(200).send();
  //   // ...
  // }
}

// ...
// export default cors(webhookHandler);
