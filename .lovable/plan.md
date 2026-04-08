

## Publicar tu página en GitHub Pages

### Lo que necesitas hacer (pasos manuales)

**Paso 1: Conectar con GitHub**
1. En el editor de Lovable, ve a **⚙️ Project Settings** → **GitHub** → **Connect project**
2. Autoriza la app de Lovable en tu cuenta de GitHub
3. Selecciona tu cuenta y crea el repositorio con el nombre **UNIMETRO**
4. Tu código se sincronizará automáticamente

**Paso 2: Lo que yo configuraré en el código**
Una vez conectado, necesito hacer cambios técnicos para que funcione en GitHub Pages:

1. **Configurar `vite.config.ts`** — Agregar `base: "/UNIMETRO/"` para que las rutas de los archivos funcionen correctamente en GitHub Pages
2. **Crear `.github/workflows/deploy.yml`** — Un archivo de GitHub Actions que automáticamente compila el proyecto y lo publica en GitHub Pages cada vez que se haga push
3. **Ajustar rutas de assets** — Asegurar que imágenes y recursos usen rutas relativas

**Paso 3: Activar GitHub Pages (manual)**
1. Ve a tu repositorio en GitHub → **Settings** → **Pages**
2. En **Source**, selecciona **GitHub Actions**
3. Tu página estará disponible en: `https://TU-USUARIO.github.io/UNIMETRO/`

### Resumen
- Conectar GitHub es manual (tú lo haces desde Settings)
- Yo configuro el build y deploy automático en el código
- Después activas Pages en GitHub Settings

¿Apruebas el plan para que configure los archivos necesarios?

