# Nevavik

WEB-Site for Nevavik Shop

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
- Ajustes de tema: logo, paleta (negro / blanco / neutros + un acento), tipografías.

## Cómo previsualizar

No hay tienda `.myshopify.com` en este repo. `shopify.theme.toml` deja `store = "[PLACEHOLDER]"` hasta que exista una tienda real (Partner o de producción). **No inventes** el dominio.

### A. ZIP en Admin (sin CLI)

1. Empaqueta las carpetas del tema: `layout`, `config`, `templates`, `sections`, `snippets`, `locales`, `assets`.
2. Shopify Admin → **Tienda online → Temas → Añadir tema → Subir archivo zip**.
3. **Vista previa** en el tema no publicado. El checkout es el de la tienda.

### B. Shopify CLI (recomendado)

Instala [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) 3.x (`shopify version`). En la raíz del repo, sustituye `[PLACEHOLDER]` en `shopify.theme.toml` por el subdominio real, o pásalo en el comando:

```bash
shopify theme dev --store TU-TIENDA.myshopify.com
```

Preview local con recarga. Para subir un tema **no publicado**:

```bash
shopify theme push --unpublished
```

Luego: Admin → Temas → tema no publicado → **Vista previa**. Publicar solo cuando el dueño lo pida.

No commitees tokens. Cuando tengas store real, actualiza `shopify.theme.toml`.

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
5. Ajustes del tema: logo, acento, URLs de redes.
6. Idioma de la tienda: español para usar `es.json` en la UI.

## Fuera de alcance

Cuentas de cliente (se pueden añadir luego). Apps de reviews. Catálogo CSV. Headless.
