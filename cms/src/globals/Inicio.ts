import type { GlobalConfig } from 'payload'

export const Inicio: GlobalConfig = {
  slug: 'inicio',
  label: 'Página de Inicio',
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  admin: {
    livePreview: {
      url: ({ data }) => {
        const siteUrl = process.env.PAYLOAD_PUBLIC_SITE_URL || 'http://localhost:4321'
        const secret = process.env.PAYLOAD_PUBLIC_DRAFT_SECRET || 'constru-preview-secret-2026'
        return `${siteUrl}/?preview=true&secret=${secret}`
      },
    },
  },
  fields: [
    {
      name: 'heroTagline',
      type: 'text',
      label: 'Subtítulo Superior Hero',
      defaultValue: 'Proyectos Industriales · Estructuras Metálicas · Diseño',
      required: true,
    },
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Título Principal Hero',
      defaultValue: 'INGENIERÍA Y CONSTRUCCIÓN DE ALTO NIVEL',
      required: true,
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      label: 'Descripción Hero',
      defaultValue:
        'Diseño y construcción integrados bajo una sola dirección. Del proyecto al llaves en mano, con control total de calidad y plazos.',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de Fondo Hero',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'heroCtaText',
          type: 'text',
          label: 'Texto Botón Principal',
          defaultValue: 'Cotizar Proyecto',
        },
        {
          name: 'heroCtaLink',
          type: 'text',
          label: 'Enlace Botón Principal',
          defaultValue: '/contacto',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'heroSecondaryCtaText',
          type: 'text',
          label: 'Texto Botón Secundario',
          defaultValue: 'Ver Portafolio',
        },
        {
          name: 'heroSecondaryCtaLink',
          type: 'text',
          label: 'Enlace Botón Secundario',
          defaultValue: '/portafolio',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Estadísticas e Indicadores',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Cifra / Número (ej: +20)',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Etiqueta (ej: Años de Experiencia)',
          required: true,
        },
      ],
    },
  ],
}
