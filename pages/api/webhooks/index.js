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
    console.log('happening');
    const event = req.body;
    console.log(event.data);
    console.log(event.data.object);
    console.log(event.data.object.metadata);
    let sessions = event.data.object.metadata.sessions;
    console.log(sessions);
    let sessionsParsed = await JSON.parse(sessions);
    console.log('sessions parsed: ', sessionsParsed);
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
