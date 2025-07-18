const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Stripe = require('stripe');

admin.initializeApp();

const stripe = new Stripe(functions.config().stripe.secret);

exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
  const { items } = data;
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: { name: item.title },
      unit_amount: Math.round(item.price * 100)
    },
    quantity: item.quantity
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: functions.config().app.success_url,
    cancel_url: functions.config().app.cancel_url
  });

  return { url: session.url };
});
