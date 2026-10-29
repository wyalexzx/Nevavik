# Néravik

WEB-Site for Néravik Shop

Tema **Shopify Online Store 2.0** nativo (Liquid + HTML + CSS + JS + plantillas JSON). Shopify es dueño de productos, variantes, inventario, carrito y checkout. No hay Hydrogen, React ni checkout propio.

El copy de marca, fotos de campaña, políticas y redes no están inventados: en el editor verás `[PLACEHOLDER]` hasta que Alejandro los rellene.

## Qué incluye

- Inicio: campaña (hero), intro de marca, CTAs **Comprar**, focos de colección (elige streetwear / training / gorras en el editor).
- Colecciones y productos de Shopify (no hardcodeados).
- Ficha: galería, descripción, variantes talla/estilo, añadir al carrito.
- Carrito → checkout nativo de Shopify (`name="checkout"`).
- Páginas (Nosotros, contacto, envíos, devoluciones) vía **Admin → Páginas** + sección `main-page`. Plantilla alternativa `page.contact` con formulario.
- Cabecera/pie con menús de Shopify y redes vacías hasta tener URLs.
- Locales de UI: `locales/en.default.json` y `locales/es.json`.
- Ajustes de tema: logo (si está vacío, la cabecera usa `assets/logo.jpg`), paleta (negro / blanco / neutros + un acento), tipografías.

## Cómo previsualizar

Tienda: `y0mbc3-7d.myshopify.com` (Admin: https://admin.shopify.com/store/y0mbc3-7d). Está en `shopify.theme.toml`. No commitees tokens.

### A. ZIP en Admin (sin CLI)

1. Empaqueta las carpetas del tema: `layout`, `config`, `templates`, `sections`, `snippets`, `locales`, `assets`.
2. Shopify Admin → **Tienda online → Temas → Añadir tema → Subir archivo zip**.
3. **Vista previa** en el tema no publicado. El checkout es el de la tienda.

### B. Shopify CLI (recomendado)

Instala [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) 3.x (`shopify version`). En la raíz del repo:

```bash
shopify theme dev --store y0mbc3-7d.myshopify.com
```

Preview local con recarga. Para subir un tema **no publicado**:

```bash
shopify theme push --unpublished --store y0mbc3-7d.myshopify.com
```

Luego: Admin → Temas → tema no publicado → **Vista previa**. Publicar solo cuando el dueño lo pida.

### C. Partner Dashboard

[partners.shopify.com](https://partners.shopify.com) → tienda de desarrollo → instala el tema con CLI o ZIP. El dashboard no sustituye las carpetas del tema.

### D. Conectar GitHub (después)

Admin → Temas → Añadir tema → **Conectar GitHub** a `wyalexzx/Nevavik`. Requiere que este esqueleto OS 2.0 esté en la rama conectada.

No uses Theme Kit (`theme watch` / `config.yml`).

## Después de subir el tema

1. Admin → **Navegación**: menú `main-menu` y `footer` (Inicio, colecciones, Nosotros, Contacto, Envíos, Devoluciones).
2. **Colecciones**: streetwear, training, gorras — asígnalas en Inicio → Focos de colección / Colección destacada.
3. **Páginas** con el copy real; para contacto, asigna la plantilla `contact`.
4. **Políticas** de la tienda (envío, reembolsos, privacidad) — el pie las lista solas.
5. Ajustes del tema: logo (opcional; si no hay uno en el editor se muestra `assets/logo.jpg`), acento, URLs de redes.
6. Idioma de la tienda: español para usar `es.json` en la UI.
7. **Nombre de la tienda** en Admin → **Settings → Store details → Store name**: cámbialo a **Néravik**. Hoy `shop.name` sigue saliendo de Shopify (p. ej. “My Store”) y aparece en pestaña del navegador, checkout y Open Graph. El tema no puede renombrar la tienda. Cabecera (estrella) y kickers visibles ya usan Néravik.

## Fuera de alcance

Cuentas de cliente (se pueden añadir luego). Apps de reviews. Catálogo CSV. Headless.
