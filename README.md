# 🏗️ Sitio Web Corporativo - Empresa de Ingeniería y Construcción

Este proyecto es el portal web oficial de una empresa de **Ingeniería y Construcción de Alto Nivel**, desarrollado con **Astro 7** y **Tailwind CSS 4**. Ofrece una experiencia moderna, rápida y optimizada para la conversión de clientes industriales, comerciales y residenciales.

---

## 🎯 Objetivo General del Sitio

El objetivo principal de esta plataforma es posicionar la marca de la constructora en el sector industrial y comercial, ofreciendo:
* **Presentación Institucional**: Dar a conocer la trayectoria, experiencia, certificaciones y valores de la empresa.
* **Catálogo de Servicios**: Detallar las capacidades en ingeniería, diseño, estructuras metálicas, obras civiles y proyectos "llave en mano".
* **Exhibición de Portafolio**: Mostrar proyectos ejecutados con alta calidad visual para generar confianza en potenciales clientes.
* **Captación de Leads**: Facilitar vías directas de cotización y contacto mediante formularios e información de contacto estructurada.

---

## 🛠️ Tecnologías Utilizadas

* **Framework:** [Astro v7](https://astro.build/) (Renderizado estático súper rápido y arquitectura de componentes ligera)
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (Diseño responsivo y estilizado moderno)
* **Servidor de Producción:** [Nginx](https://nginx.org/) en contenedor Alpine
* **Contenedorización:** [Docker](https://www.docker.com/) & Docker Compose (Multi-stage build)

---

## 📂 Estructura del Proyecto

```text
/
├── public/                 # Archivos estáticos (imágenes, favicons, fuentes, etc.)
├── src/
│   ├── assets/             # Recursos multimedia y assets del proyecto
│   ├── components/         # Componentes reutilizables UI
│   │   ├── Navbar.astro    # Navegación principal responsive
│   │   ├── Footer.astro    # Pie de página corporativo
│   │   └── Welcome.astro   # Componentes auxiliares
│   ├── layouts/            # Plantillas base del sitio
│   │   └── Layout.astro    # Estructura HTML5 base (SEO, meta tags, Navbar, Footer)
│   ├── pages/              # Enrutamiento basado en archivos
│   │   ├── index.astro     # Página de Inicio (Landing Page)
│   │   ├── nosotros.astro  # Información corporativa y equipo
│   │   ├── servicios.astro # Detalle de servicios de ingeniería y construcción
│   │   ├── portafolio.astro# Galería de proyectos completados
│   │   └── contacto.astro  # Formulario de cotización y ubicación
│   └── styles/             # Hojas de estilo globales
├── Dockerfile              # Configuración de compilación multi-etapa
├── docker-compose.yml      # Orquestación del contenedor web
├── nginx.conf              # Configuración personalizada de Nginx
├── astro.config.mjs        # Configuración de Astro
└── package.json            # Dependencias y scripts del proyecto
```

---

## 📄 Documentación Oficial de las Páginas

### 1. `index.astro` (Inicio)
* **Ruta:** `/`
* **Descripción:** Landing page principal orientada a captar la atención del visitante inmediatamente.
* **Secciones Clave:**
  * **Hero Section:** Mensaje de impacto ("Ingeniería y Construcción de Alto Nivel") con llamados a la acción para cotizar o ver el portafolio.
  * **Estadísticas:** Indicadores de impacto (+20 años de experiencia, +100 proyectos ejecutados, etc.).
  * **Resumen de Servicios:** Vistas previas de las áreas principales de especialización.
  * **Diferenciadores & Proceso:** Filosofía de trabajo, calidad y cumplimiento de plazos.
  * **Llamado a la Acción (CTA):** Banner final incentivando el inicio de nuevos proyectos.

### 2. `nosotros.astro` (Nosotros)
* **Ruta:** `/nosotros`
* **Descripción:** Página institucional dedicada a construir credibilidad y transparencia.
* **Secciones Clave:**
  * **Historia y Trayectoria:** Origen y evolución de la empresa.
  * **Misión y Visión:** Compromiso con la excelencia técnica y el desarrollo sostenible.
  * **Valores Corporativos:** Seguridad laboral, precisión de ingeniería, transparencia e innovación.
  * **Certificaciones y Estándares:** Normativas de seguridad y gestión de calidad.

### 3. `servicios.astro` (Servicios)
* **Ruta:** `/servicios`
* **Descripción:** Catálogo detallado de las soluciones de ingeniería y construcción que ofrece la empresa.
* **Servicios Destacados:**
  * Proyectos Industriales y Comerciales.
  * Fabricación y Montaje de Estructuras Metálicas.
  * Obras Civiles y Edificación.
  * Consultoría, Diseño y Modalidad "Llave en Mano".

### 4. `portafolio.astro` (Portafolio de Proyectos)
* **Ruta:** `/portafolio`
* **Descripción:** Galería interactiva y organizada de las obras ejecutadas por la constructora.
* **Secciones Clave:**
  * Fichas de proyectos con fotografías en alta resolución.
  * Categorización por tipo de obra (Naves industriales, edificios comerciales, infraestructura civil).
  * Especificaciones técnicas relevantes de cada obra.

### 5. `contacto.astro` (Contacto y Cotizaciones)
* **Ruta:** `/contacto`
* **Descripción:** Centro de atención al cliente y recepción de requerimientos de proyectos.
* **Secciones Clave:**
  * Formulario de cotización directa de proyectos.
  * Datos de contacto (teléfonos, correos corporativos, dirección física).
  * Horarios de atención y mapa de ubicación.

---

## 🐳 Inicialización y Despliegue con Docker

El proyecto cuenta con un entorno contenerizado listo para producción utilizando **Docker Multi-Stage Build** y **Nginx**.

### Prerrequisitos
* Tener instalado [Docker Engine](https://docs.docker.com/get-docker/) (v20.10 o superior).
* Tener instalado [Docker Compose](https://docs.docker.com/compose/) (v2.0 o superior).

---

### Opción A: Usando Docker Compose (Recomendado)

1. **Iniciar el contenedor en modo background:**
   ```bash
   docker compose up -d --build
   ```

2. **Verificar el estado del contenedor:**
   ```bash
   docker compose ps
   ```

3. **Ver los logs en tiempo real:**
   ```bash
   docker compose logs -f
   ```

4. **Acceder a la aplicación:**
   Abre tu navegador e ingresa a: **`http://localhost:4321`**

5. **Detener el servicio:**
   ```bash
   docker compose down
   ```

---

### Opción B: Usando Comandos Directos de Docker

Si prefieres construir y ejecutar la imagen de Docker manualmente:

1. **Construir la imagen de Docker:**
   ```bash
   docker build -t constructora-astro:latest .
   ```

2. **Ejecutar el contenedor mapeando el puerto 4321:**
   ```bash
   docker run -d --name constructora-web -p 4321:80 constructora-astro:latest
   ```

3. **Detener y remover el contenedor:**
   ```bash
   docker stop constructora-web
   docker rm constructora-web
   ```

---

## 💻 Desarrollo Local (Sin Docker)

Si deseas trabajar en la fase de desarrollo directamente en tu máquina:

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev

# 3. Compilar para producción localmente
npm run build

# 4. Previsualizar la compilación de producción
npm run preview
```

El servidor de desarrollo estará disponible en `http://localhost:4321`.
