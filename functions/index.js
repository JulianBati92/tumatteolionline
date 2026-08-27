const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret, defineString } = require('firebase-functions/params');
const Stripe = require('stripe');

const stripeSecret = defineSecret('STRIPE_SECRET_KEY');
const checkoutSuccessUrl = defineString('CHECKOUT_SUCCESS_URL', {
  default: 'https://tumatteolionline.vercel.app/?pago=exitoso'
});
const checkoutCancelUrl = defineString('CHECKOUT_CANCEL_URL', {
  default: 'https://tumatteolionline.vercel.app/carrito.html?pago=cancelado'
});

// El precio siempre se resuelve en el servidor. El cliente solo envía el ID
// del producto y la cantidad que desea comprar.
const catalog = {
  'set-01': { name: 'Set Matteoli', price: 10000 },
  'mates-01': { name: 'Imperial 925 Cream', price: 2850 },
  'mates-02': { name: 'Imperial 925 Blanco', price: 2600 },
  'mates-03': { name: 'Imperial Rosalia', price: 2500 },
  'mates-04': { name: 'Torpedo Natural', price: 2200 },
  'mates-5': { name: 'Imperial Blanco', price: 2500 },
  'mates-6': { name: 'Camionero Beige', price: 2500 },
  'bombilla-01': { name: 'Bombilla Alpaca', price: 2300 },
  'bombilla-02': { name: 'Bombilla Acero', price: 1600 }
};

function buildLineItems(items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 30) {
    throw new HttpsError('invalid-argument', 'El carrito no es válido.');
  }

  return items.map(({ id, quantity }) => {
    const product = catalog[id];
    const parsedQuantity = Number(quantity);

    if (!product || !Number.isInteger(parsedQuantity) || parsedQuantity < 1 || parsedQuantity > 10) {
      throw new HttpsError('invalid-argument', 'Hay un producto o una cantidad no válida.');
    }

    return {
      price_data: {
        currency: 'ars',
        product_data: { name: product.name },
        unit_amount: Math.round(product.price * 100)
      },
      quantity: parsedQuantity
    };
  });
}

function validateEmail(value) {
  const email = String(value || '').trim().toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email) || email.length > 254) {
    throw new HttpsError('invalid-argument', 'El correo electrónico no es válido.');
  }

  return email;
}

exports.createCheckoutSession = onCall({ secrets: [stripeSecret] }, async (request) => {
  const lineItems = buildLineItems(request.data?.items);
  const customerEmail = validateEmail(request.data?.email);
  const stripe = new Stripe(stripeSecret.value());

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    customer_email: customerEmail,
    success_url: checkoutSuccessUrl.value(),
    cancel_url: checkoutCancelUrl.value()
  });

  return { url: session.url };
});
