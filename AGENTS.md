## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)


# Plan de Acción: Integración de Payload CMS + Live Preview con Astro

## Objetivo General
Transformar el sitio estático desarrollado en Astro en un sitio dinámico conectado a **Payload CMS (Self-hosted)**. El objetivo principal es permitir la gestión de textos e imágenes fijas desde un panel amigable y habilitar **Live Preview** (usando la estrategia de Astro SSR + refresco automático por iframe) para que el cliente edite contenido y vea los cambios en tiempo real antes de publicar.

---

## Lista TODO de Implementación

### Fase 1: Setup e Instalación de Payload CMS
- [ ] Inicializar un proyecto de Payload CMS (v3.0+) configurado con TypeScript y SQLite.
- [ ] Configurar el despliegue del servidor de Payload en mi pc local y creando los archivos de configuración de docker para después ser desplegado en el servidor vps.
- [ ] Definir variables de entorno (`PAYLOAD_SECRET`, cadenas de conexión a base de datos, URLs de CORS).

### Fase 2: Modelado de Datos y Colecciones
- [ ] Crear las colecciones para imágenes/archivos multimedia (`Media`).
- [ ] Crear las colecciones o *Globals* para las páginas del sitio (gestión de textos e imágenes fijas).
- [ ] Configurar permisos de lectura pública para la API REST/GraphQL.
- [ ] Crear usuarios administradores e iterar la interfaz para que el panel sea intuitivo.

### Fase 3: Conexión de Astro con Payload API
- [ ] Configurar el SDK de Payload o `fetch` centralizado en Astro para consumir los datos de las colecciones.
- [ ] Reemplazar los textos e imágenes estáticas (*hardcoded*) en los componentes de Astro por los datos obtenidos del CMS.
- [ ] Probar la construcción del sitio (*build*) asegurando que consume el contenido del CMS correctamente.

### Fase 4: Configuración de Live Preview (Astro SSR + Autosave)
- [ ] Configurar Astro en modo híbrido/SSR (`output: 'server'` o rutas dinámicas bajo demanda) para la vista previa.
- [ ] Crear un endpoint o ruta de preview en Astro (ej. `/api/preview`) que lea datos en modo borrador (*draft mode*).
- [ ] Configurar la opción `livePreview` en los esquemas de Payload apuntando a la URL de preview de Astro.
- [ ] Añadir un script liviano en Astro para escuchar eventos `postMessage` de Payload y refrescar el iframe al autoguardar.

### Fase 5: Pruebas y Despliegue
- [ ] Probar el flujo completo de edición de textos e imágenes en vivo desde el panel.
- [ ] Verificar tiempos de carga del frontend y asegurar que no haya sobrecarga de JS en el sitio de producción.
- [ ] Validar variables de entorno y conectividad final en el servidor de producción.
