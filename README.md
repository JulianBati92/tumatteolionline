# Tu Matteoli Online

Este proyecto contiene una tienda en línea sencilla hecha con HTML, CSS y JavaScript. A continuación se explica cómo integrar una pasarela de pagos utilizando Firebase y Stripe.

## Configuración de Firebase

1. Crea un proyecto en [Firebase](https://firebase.google.com/) y habilita **Cloud Functions**.
2. Instala la [Firebase CLI](https://firebase.google.com/docs/cli) y ejecuta `firebase login` para autenticarte.
3. Dentro del directorio `functions` instala las dependencias con:
   ```bash
   npm install
   ```
4. Configura la clave secreta de Stripe:
   ```bash
   firebase functions:config:set stripe.secret="TU_STRIPE_SECRET_KEY"
   ```
5. Configura las URLs de éxito y cancelación para Stripe:
   ```bash
   firebase functions:config:set app.success_url="https://tu-sitio.com/exito" \
     app.cancel_url="https://tu-sitio.com/cancelado"
   ```
6. Despliega las funciones con:
   ```bash
   firebase deploy --only functions
  ```
7. Habilita **Cloud Firestore** en modo de prueba para almacenar las ordenes.
   Cuando tu aplicación esté lista para producción, revisa las reglas de
   seguridad.

## Configuración del Frontend

1. El archivo `js/firebase-config.js` ya contiene un ejemplo de configuración con el proyecto **tumatteolionline**. Si utilizas otro proyecto de Firebase, actualiza los valores por los tuyos.
2. Al presionar **Comprar ahora** en `carrito.html`, se llamará a la función `createCheckoutSession` que crea una sesión de pago en Stripe y redirige al usuario a la pasarela.

### Ejemplo de `firebase-config.js`

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDf9kPs2so_VFyMelCKXvFhEs3A4-xMbvQ",
  authDomain: "tumatteolionline.firebaseapp.com",
  projectId: "tumatteolionline",
  storageBucket: "tumatteolionline.appspot.com",
  messagingSenderId: "621581841999",
  appId: "1:621581841999:web:a0840941af57f63ee89c3a",
  measurementId: "G-WDG0ZRM9HF"
};
```

## Estructura del Proyecto

- `functions/` contiene el código de las Cloud Functions de Firebase.
- `js/firebase-config.js` inicializa Firebase en el frontend.
- `js/carrito.js` maneja el flujo de compra y la llamada a la función.
- Al presionar **Comprar ahora** se abre un formulario donde se solicitan nombre,
  email y dirección. Estos datos se almacenan en Firestore antes de iniciar el
  checkout con Stripe.

Con estos pasos tendrás integrada una pasarela de pagos utilizando Firebase Functions y Stripe.

## Pruebas locales

Para probar la pasarela sin desplegarla puedes utilizar los emuladores de Firebase:

```bash
firebase emulators:start --only functions
```

Luego abre `carrito.html` en tu navegador. La función `createCheckoutSession` se ejecutará de forma local.
