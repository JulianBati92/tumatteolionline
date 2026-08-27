# Tu Matteoli Online

Tienda web para mostrar un catálogo de mates y accesorios, administrar un carrito e iniciar pagos mediante Stripe. El frontend está hecho con HTML, CSS y JavaScript sin frameworks; el checkout se crea desde Firebase Functions para que los precios no dependan de los datos enviados por el navegador.

## Funcionalidades

- catálogo con filtros por categoría;
- carrito persistido en el navegador;
- formulario con datos de contacto;
- checkout alojado por Stripe;
- validación de productos y cantidades en el servidor;
- integración con Firebase Functions.

## Tecnologías

- HTML, CSS y JavaScript;
- Firebase Functions;
- Firebase Admin SDK;
- Stripe Checkout;
- GitHub Actions y Dependabot.

## Estructura

```text
.
├── css/                 Estilos del sitio
├── img/                 Imágenes del catálogo
├── js/                  Catálogo, carrito e integración con Firebase
├── functions/           Funciones backend y creación del checkout
├── index.html           Catálogo
└── carrito.html         Carrito y datos de compra
```

## Puesta en marcha

### 1. Preparar Firebase

Creá un proyecto en Firebase, instalá la CLI e iniciá sesión:

```bash
npm install -g firebase-tools
firebase login
```

Actualizá la configuración pública del proyecto en `js/firebase-config.js`. Esos identificadores permiten conectar el frontend con Firebase, pero no reemplazan las reglas de seguridad ni deben utilizarse como credenciales privadas.

### 2. Instalar las funciones

```bash
cd functions
npm ci
```

Configurá la clave secreta de Stripe sin guardarla en el repositorio:

```bash
firebase functions:secrets:set STRIPE_SECRET_KEY
```

El proyecto incluye valores predeterminados para `CHECKOUT_SUCCESS_URL` y `CHECKOUT_CANCEL_URL` con el dominio publicado. Podés reemplazarlos durante el despliegue si utilizás otro dominio.

Desplegá la función de checkout con:

```bash
firebase deploy --only functions:createCheckoutSession
```

### 3. Probar localmente

```bash
firebase emulators:start --only functions
```

Serví los archivos del frontend con un servidor HTTP local. No abras los HTML directamente desde `file://`, porque los módulos y las solicitudes pueden ser bloqueados por el navegador.

## Modelo de seguridad

El navegador solo envía identificadores y cantidades. La función valida cada producto y obtiene su precio desde un catálogo controlado por el servidor antes de crear la sesión de Stripe. Los datos recibidos también tienen límites de formato y longitud.

Para una implementación comercial completa todavía se recomienda:

- confirmar el pago mediante webhooks de Stripe;
- guardar el pedido únicamente después de verificar el evento;
- habilitar Firebase App Check;
- definir políticas de privacidad y conservación de datos;
- ajustar moneda, impuestos, envíos y URL según el comercio.

Los problemas de seguridad deben reportarse siguiendo [SECURITY.md](SECURITY.md), sin publicar datos sensibles en issues.

## Contribuciones

Las propuestas y correcciones son bienvenidas. Consultá [CONTRIBUTING.md](CONTRIBUTING.md) antes de abrir un pull request.

## Licencia

Distribuido bajo la licencia MIT. Consultá [LICENSE](LICENSE).
