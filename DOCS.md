# 📄 DOCS.md - Hoja de Vida y Bitácora del Proyecto

> **Nota:** Este archivo actúa como una hoja de vida secuencial del proyecto para registrar cronológicamente todos los cambios, su justificación y el impacto en los archivos. Cada rama de Git mantendrá y actualizará su correspondiente historial en este documento.

---

## 📌 Información General de la Rama
* **Fecha de Creación del Documento:** 22 de Julio de 2026
* **Rama de Git:** `cms-init`

---

## 📜 Historial Secuencial de Cambios

### 📝 Log #1: Inicialización de Payload CMS (v3.0+)
* **Fecha:** 22 de Julio de 2026
* **Rama Git:** `cms-init`
* **Por qué se realizó el cambio:**
  * Iniciar la transición del sitio estático en Astro hacia un sistema dinámico administrable mediante **Payload CMS (Self-hosted)**.
  * Habilitar la gestión de textos e imágenes desde un panel amigable y dejar sentadas las bases para el *Live Preview* y despliegue en VPS.
* **Descripción de Cambios Realizados:**
  * **Comando de creación utilizado:** `npx create-payload-app@latest -n cms`
  * **Plantilla seleccionada:** Proyecto en blanco (`blank` template).
  * **Base de datos:** SQLite con la cadena de conexión apuntando al archivo local `cms/cms.db`.
  * **Configuración Agéntica:** Se habilitó la Skill de Claude (generando la carpeta `cms/.claude/` con `CLAUDE.md`).
  * **Carpetas creadas:** `cms/` conteniendo la estructura completa de la aplicación Next.js + Payload CMS v3.0 (archivos de configuración, esquemas iniciales de `src/`, dependencias en `package.json` y `cms.db`).

### 📝 Log #2: Unificación de Docker Compose y Puerto 4343 para Payload CMS
* **Fecha:** 22 de Julio de 2026
* **Rama Git:** `cms-init`
* **Por qué se realizó el cambio:**
  * Consolidar el despliegue del proyecto en un único archivo de orquestación de Docker (`docker-compose.yml`) en la raíz del repositorio.
  * Mantener el servicio `web-constructora` (Astro en puerto `4321`) y exponer el nuevo servicio `cms` (Payload CMS) en el puerto `4343` para evitar conflictos y facilitar la gestión local y en producción VPS.
  * Habilitar la opción `output: 'standalone'` en la configuración de Next.js (`cms/next.config.ts`) para permitir la compilación optimizada en Docker.
  * Garantizar la persistencia de la base de datos `cms/cms.db` y de archivos multimedia (`cms/public/media`) a través de volúmenes mapeados.
* **Descripción de Cambios Realizados:**
  * **Modificado:** [docker-compose.yml](file:///home/pepecortishell/Documents/temp/constru/docker-compose.yml) (raíz) - Se definieron los servicios `web-constructora` (puerto `4321:80`) y `cms` (puerto `4343:3000` con variables de entorno y montaje de volúmenes).
  * **Modificado:** [cms/next.config.ts](file:///home/pepecortishell/Documents/temp/constru/cms/next.config.ts) - Se agregó la propiedad `output: 'standalone'`.
  * **Eliminado:** `cms/docker-compose.yml` - Se eliminó la configuración duplicada dentro del subdirectorio del CMS.

### 📝 Log #3: Arquitectura de Puerto Único mediante Reverse Proxy en Nginx (/admin)
* **Fecha:** 22 de Julio de 2026
* **Rama Git:** `cms-init`
* **Por qué se realizó el cambio:**
  * Eliminar la necesidad de gestionar múltiples puertos públicos (`4343`, `4321`), unificando todo el tráfico del sitio bajo un **único puerto público (`4321`)**.
  * Configurar Nginx como un **Reverse Proxy de alto rendimiento** para que el panel de administración responda directamente en `http://localhost:4321/admin`, las APIs en `/api` y los recursos estáticos del admin en `/_next`, mientras que el resto de las rutas (`/`, `/nosotros`, `/servicios`, etc.) continúan siendo servidas estáticamente por Astro.
* **Descripción de Cambios Realizados:**
  * **Modificado:** [nginx.conf](file:///home/pepecortishell/Documents/temp/constru/nginx.conf) - Se agregaron bloques con modificador `^~` para hacer proxy directo a `http://cms:3000` de las rutas `/admin`, `/api` y `/_next`.
  * **Modificado:** [docker-compose.yml](file:///home/pepecortishell/Documents/temp/constru/docker-compose.yml) - Se dejó `4321:80` como el único puerto mapeado públicamente en el servicio `web-constructora`. El servicio `cms` ahora sólo expone el puerto `3000` internamente a la red de Docker.

### 📝 Log #4: Corrección de compilación Docker en CMS (npm ci a npm install)
* **Fecha:** 22 de Julio de 2026
* **Rama Git:** `cms-init`
* **Por qué se realizó el cambio:**
  * Resolver el error `exit code 1` durante el comando `docker compose up --build`. El comando `npm ci` en la etapa de dependencias del `cms/Dockerfile` fallaba debido a una estricta verificación de sincronía de desajustes entre plataformas en `package-lock.json`.
  * Reemplazar `npm ci` por `npm install` para permitir la instalación fluida y limpia de paquetes dentro del contenedor Alpine Linux.
* **Descripción de Cambios Realizados:**
  * **Modificado:** [cms/Dockerfile](file:///home/pepecortishell/Documents/temp/constru/cms/Dockerfile) - Se cambió `npm ci` por `npm install` en la instrucción `deps`.

### 📝 Log #5: Solución a la carpeta `public` ausente en compilación de CMS
* **Fecha:** 22 de Julio de 2026
* **Rama Git:** `cms-init`
* **Por qué se realizó el cambio:**
  * Resolver el error `COPY --from=builder /app/public ./public: "/app/public": not found` durante la compilación de la imagen runner de Payload CMS. La plantilla limpia de Payload 3.0 no crea por defecto un directorio `public/`, haciendo fallar la copia de recursos estáticos en Docker.
  * Crear la estructura `cms/public/media` y asegurar la existencia preventiva de la carpeta `public` en el proceso de compilación (`RUN mkdir -p public`).
* **Descripción de Cambios Realizados:**
  * **Creado:** `cms/public/media/.gitkeep` - Creada la carpeta `public/media` para almacenar los archivos multimedia del CMS.
  * **Modificado:** [cms/Dockerfile](file:///home/pepecortishell/Documents/temp/constru/cms/Dockerfile) - Se agregó `RUN mkdir -p public` en la etapa `builder`.

### 📝 Log #6: Implementación de Live Preview en Tiempo Real y Variables de Entorno
* **Fecha:** 22 de Julio de 2026
* **Rama Git:** `cms-init`
* **Por qué se realizó el cambio:**
  * Configurar la gestión dinámica de contenidos e imágenes para la página de Inicio (`index.astro`) a través de Payload CMS.
  * Habilitar la funcionalidad de **Live Preview en tiempo real** mediante la comunicación iframe (`postMessage`) entre el panel de Payload (`http://localhost:3000`) y la app de Astro (`http://localhost:4321`).
  * Parametrizar las URLs y secretos de borrador a través de archivos `.env` independientes para desarrollo y producción.
* **Descripción de Cambios Realizados:**
  * **Creado:** `cms/src/globals/Inicio.ts` - Esquema Global de la página de inicio en Payload con campos de textos, botones CTA, array de estadísticas e imágenes `media` con `livePreview` habilitado.
  * **Modificado:** [cms/src/payload.config.ts](file:///home/pepecortishell/Documents/temp/constru/cms/src/payload.config.ts) - Importado y registrado el Global `Inicio` y breakpoints de previsualización (mobile, tablet, desktop).
  * **Modificado:** `cms/.env` y `cms/.env.example` - Agregadas las variables `PAYLOAD_PUBLIC_SERVER_URL`, `PAYLOAD_PUBLIC_SITE_URL` y `PAYLOAD_PUBLIC_DRAFT_SECRET`.
  * **Creado:** `.env` y `.env.example` (raíz) - Agregadas las variables `PUBLIC_PAYLOAD_URL` y `PAYLOAD_PREVIEW_SECRET` para Astro.
  * **Creado:** [src/lib/payload.ts](file:///home/pepecortishell/Documents/temp/constru/src/lib/payload.ts) - Helper TypeScript para obtener datos de Payload API y manejar URLs de imágenes.
  * **Modificado:** [src/pages/index.astro](file:///home/pepecortishell/Documents/temp/constru/src/pages/index.astro) - Reemplazados los valores hardcoded por el consumo de la API de Payload e integrado el script receptor de `window.addEventListener('message')` para autosave en vivo.

### 📝 Log #7: Optimización de Live Preview (Señal Ready + Autosave Instantáneo en Tecleo)
* **Fecha:** 22 de Julio de 2026
* **Rama Git:** `cms-init`
* **Por qué se realizó el cambio:**
  * Corregir el comportamiento donde la vista previa no se actualizaba automáticamente al presionar *Save Draft* o mientras se tecleaban datos sin refrescar manualmente la página del administrador.
  * Emitir la señal `payload-live-preview-ready` desde el iframe al cargar para sincronizar el estado inicial con Payload CMS.
  * Manejar múltiples formatos de payload de eventos en `postMessage` (`data`, `doc`, `document`) e implementar la recarga/re-renderizado instantáneo de textos, imágenes y arreglos dinámicos al teclear y al guardar borrador.
* **Descripción de Cambios Realizados:**
  * **Modificado:** [src/pages/index.astro](file:///home/pepecortishell/Documents/temp/constru/src/pages/index.astro) - Actualizado el script del cliente con la emisión de la señal de preparación (`payload-live-preview-ready`), parser de mensajes y actualización en tiempo real de campos y arrays.

### 📝 Log #8: Desactivación de React StrictMode para eliminar Overlay de Hidratación en Dev
* **Fecha:** 22 de Julio de 2026
* **Rama Git:** `cms-init`
* **Por qué se realizó el cambio:**
  * Ocultar la ventana emergente de error de desarrollo de Next.js (`A tree hydrated but some attributes of the server rendered HTML didn't match`).
  * Esta advertencia es un comportamiento inofensivo de renderizado en desarrollo de Next.js 16 / React 19 en componentes de interfaz de Payload (`<button disabled={...}>`), el cual no afecta el funcionamiento ni existe en las versiones compiladas de producción.
* **Descripción de Cambios Realizados:**
  * **Modificado:** [cms/next.config.ts](file:///home/pepecortishell/Documents/temp/constru/cms/next.config.ts) - Se agregó `reactStrictMode: false`.







