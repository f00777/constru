/**
 * Helper para consumir la API REST de Payload CMS desde Astro.
 */

const PAYLOAD_URL = import.meta.env.PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export interface MediaItem {
  id: string | number
  url?: string
  alt?: string
  filename?: string
}

export interface StatItem {
  number: string
  label: string
}

export interface InicioData {
  heroTagline?: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: MediaItem | string
  heroCtaText?: string
  heroCtaLink?: string
  heroSecondaryCtaText?: string
  heroSecondaryCtaLink?: string
  stats?: StatItem[]
}

/**
 * Obtiene el contenido global de la página de Inicio desde Payload CMS.
 * Soporta draft mode si se pasa draft = true.
 */
export async function getInicioContent(isDraft = false): Promise<InicioData | null> {
  try {
    const draftQuery = isDraft ? '?draft=true' : ''
    const res = await fetch(`${PAYLOAD_URL}/api/globals/inicio${draftQuery}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Desactivar caché en modo borrador
      cache: isDraft ? 'no-store' : 'default',
    })

    if (!res.ok) {
      console.warn(`[Payload API] No se pudo obtener inicio (${res.status})`)
      return null
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('[Payload API] Error al conectar con Payload CMS:', error)
    return null
  }
}

/**
 * Helper para obtener la URL completa de una imagen de Payload.
 */
export function getMediaUrl(media?: MediaItem | string | null, fallback = ''): string {
  if (!media) return fallback
  if (typeof media === 'string') {
    return media.startsWith('http') ? media : `${PAYLOAD_URL}${media}`
  }
  if (media.url) {
    return media.url.startsWith('http') ? media.url : `${PAYLOAD_URL}${media.url}`
  }
  return fallback
}
