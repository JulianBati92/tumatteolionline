# Cómo contribuir

Gracias por interesarte en el proyecto. Las correcciones, mejoras de accesibilidad y propuestas relacionadas con seguridad son bienvenidas.

## Antes de empezar

1. Creá un fork del repositorio.
2. Trabajá en una rama con un nombre descriptivo.
3. Probá el sitio y las funciones localmente.
4. Abrí un pull request explicando qué cambiaste y cómo lo verificaste.

Para cambios grandes, conviene abrir primero un issue. No incluyas claves, datos reales de clientes ni credenciales en commits, capturas o registros.

## Comprobaciones básicas

Desde `functions/` ejecutá:

```bash
npm ci
npm run check
npm audit --omit=dev
```

Los cambios deben conservar el flujo de carrito y evitar que precios o totales proporcionados por el navegador sean considerados confiables.
