import { loadStripe } from '@stripe/stripe-js';

export async function handleCheckout(req, res) {
  if (req.method === 'GET') {
    try {
      console.log('trying');
      res.status(200).json({
        status: 'successfully posted',
      });
    } catch (error) {
      console.log('woops!');
      console.error(error);
    }
  }
}
