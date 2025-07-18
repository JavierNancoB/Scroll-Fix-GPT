# 🧩 Fix de Scroll para ChatGPT — Extensión Unpacked para Chrome

Este proyecto soluciona el problema donde el **scrollbar de ChatGPT es difícil de usar o se bloquea**, especialmente al llegar al área inferior donde se encuentra la caja de texto.
La extensión ajusta el estilo de la página para que:

* El scrollbar sea siempre visible y accesible.
* La caja de texto no se solape ni se dañe.
* La experiencia sea suave y más parecida al comportamiento esperado en otras apps.

---

## 📁 Estructura del proyecto

```bash
chatgpt-scroll-fix/
├── manifest.json
└── content-script.css
```

---

## 📦 Archivos

### `manifest.json`

```json
{
  "manifest_version": 3,
  "name": "ChatGPT Scroll Fix",
  "version": "1.0",
  "description": "Arregla el scroll en ChatGPT para que sea siempre accesible sin interferir con la caja de texto.",
  "content_scripts": [
    {
      "matches": ["https://chatgpt.com/*"],
      "css": ["content-script.css"]
    }
  ],
  "permissions": []
}
```

---

### `content-script.css`

```css
/* ✅ Permitir scroll normal y visible */
div[class*="overflow-y-auto"][class*="flex-col"] {
  overflow-y: auto !important;
  position: relative !important;
  z-index: 1 !important;
  max-height: calc(100vh - 150px) !important;
}

/* ✅ Restaurar visibilidad del scrollbar (estético) */
div[class*="overflow-y-auto"][class*="flex-col"]::-webkit-scrollbar {
  width: 12px;
}
div[class*="overflow-y-auto"][class*="flex-col"]::-webkit-scrollbar-thumb {
  background-color: rgba(80, 80, 80, 0.7);
}

/* ✅ Arreglar .content-fade para no bloquear eventos del mouse */
.content-fade {
  pointer-events: none !important;
  z-index: 0 !important;
}
.content-fade * {
  pointer-events: auto !important;
}

/* ✅ Evitar que la caja de texto se mezcle o colapse */
form.stretch {
  position: sticky !important;
  bottom: 0 !important;
  z-index: 20 !important;
  background-color: white !important;
  padding-bottom: 1rem !important;
  border-top: 1px solid #ccc;
}
```

---

## ⚙️ Cómo instalar la extensión en modo desarrollador

1. Abre **Chrome** y ve a `chrome://extensions/`
2. Activa el interruptor **"Modo de desarrollador"** (arriba a la derecha).
3. Haz clic en **"Cargar descomprimida"**.
4. Selecciona la carpeta del proyecto (`chatgpt-scroll-fix/`) donde estén los dos archivos.

¡Listo! Ahora cuando entres a `chatgpt.com`, el fix estará activo automáticamente ✅
