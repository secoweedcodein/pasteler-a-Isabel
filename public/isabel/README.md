# Isabel Pastelería — sitio web

Sitio estático (HTML5, CSS3, JavaScript). Sin backend. Listo para GitHub Pages y para entregar a un cliente.

## Qué ya funciona

- Navegación de escritorio y menú móvil
- Catálogo con filtros
- Pedido por formulario → WhatsApp
- Botones de consulta y botón flotante de WhatsApp
- Cotización de eventos
- Preguntas frecuentes
- Visor de fotos (cuando hay imagen)
- SEO básico, favicon y datos de negocio

## Solo te falta

1. Poner fotos en `assets/images/` con los nombres de esa carpeta (ver `assets/images/README.md`).
2. Si tienes el logo original, reemplaza `assets/logo/logo-isabel.svg`.
3. Si cambia el número o Instagram, edita `js/config.js`.

No inventes precios ni horarios en el HTML hasta tenerlos confirmados. Los precios se pueden agregar así:

```html
<span class="price">$0.000</span>
```

dentro de `.item__info`.

## Publicar en GitHub Pages

### Opción A — Solo esta carpeta (la más simple)

1. Crea un repositorio y sube **el contenido de esta carpeta** (`index.html`, `css`, `js`, `assets`) a la raíz.
2. GitHub → Settings → Pages → Source: **Deploy from a branch** → `main` → `/ (root)`.
3. El sitio queda en `https://USUARIO.github.io/NOMBRE-DEL-REPO/`.

Las rutas son relativas: funciona en subdirectorios.

### Opción B — Este proyecto completo (Lovable + carpeta `public/isabel`)

Si el repositorio es todo el proyecto (no solo esta carpeta):

1. GitHub → Settings → Pages → Source: **GitHub Actions**.
2. El workflow `.github/workflows/github-pages.yml` publica `public/isabel`.

## Probar en el computador

Abre `index.html` en el navegador o sirve la carpeta:

```sh
npx --yes serve .
```
