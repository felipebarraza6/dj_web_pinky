/**
 * DJ Pinky — contenido elevado para landing tipo Rizzet.
 * Paths de media respetan `base` de Astro (GitHub Pages).
 */
const base = import.meta.env.BASE_URL;
const asset = (path: string) => `${base}${path.replace(/^\//, '')}`;

export const dj = {
  brand: 'DJ PINKY',
  tagline: 'DJ · Sonido · Eventos que se sienten',
  heroEyebrow: 'Fiestas · Cumpleaños · Eventos en vivo',
  heroTitle: 'DJ Pinky',
  heroLead:
    'Armo la noche completa: sonido potente, luces que acompañan y una pista que no se cae. Desde el primer brindis hasta el último tema.',
  ctaPrimary: 'Cotiza tu evento',
  ctaSecondary: 'Mira cómo suena',
  aboutLabel: 'Un gusto',
  aboutName: 'Pinky',
  aboutBio: [
    'Llevo años haciendo que la gente baile en fiestas, celebraciones y eventos al aire libre. No vendo una playlist genérica: leo la pista y subo o bajo según lo que pida el momento.',
    'Llego con equipo de sonido e iluminación listo para montar. Tú me cuentas el vibe; yo me encargo de que suene limpio, se vea pro y la gente se quede hasta el final.',
  ],
  stats: [
    { value: '10+', label: 'años en eventos' },
    { value: '100%', label: 'noche completa' },
    { value: '360°', label: 'sonido + luces' },
  ],
  gearLabel: 'Lo que llevo',
  gearTitle: 'Mi equipo',
  gear: [
    {
      name: 'Controladora Pioneer',
      description:
        'Mezcla en vivo con precisión: transiciones limpias y control total de la energía de la pista.',
    },
    {
      name: 'PA + monitores',
      description:
        'Sonido claro y potente para que se sienta en la pista y se pueda conversar fuera de ella.',
    },
    {
      name: 'Truss e iluminación',
      description:
        'Luces y estructura para que el escenario se vea de evento, no de ensayo improvisado.',
    },
  ],
  galleryLabel: 'En vivo',
  galleryTitle: 'Así se ve una noche',
  galleryLead:
    'Montajes reales: pool parties, escenarios al atardecer, fiestas y cierres de pista. El material crudo; la presentación, premium.',
  gallery: [
    {
      title: 'Booth al sol',
      act: 'sunset',
      src: asset('media/gallery/pool-set.jpg'),
      span: 2,
    },
    {
      title: 'Montaje al dusk',
      act: 'villa',
      src: asset('media/gallery/setup-dusk.jpg'),
      span: 1,
    },
    {
      title: 'Truss & luces',
      act: 'villa',
      src: asset('media/gallery/truss.jpg'),
      span: 1,
    },
    {
      title: 'Escenario de noche',
      act: 'afterhours',
      src: asset('media/gallery/night-stage.jpg'),
      span: 1,
    },
    {
      title: 'Show en vivo',
      act: 'afterhours',
      src: asset('media/gallery/live-band.jpg'),
      span: 1,
    },
    {
      title: 'Energía de pista',
      act: 'afterhours',
      src: asset('media/gallery/crowd-energy.jpg'),
      span: 2,
    },
  ],
  videosLabel: 'Reel',
  videosTitle: 'Mira el vibe',
  videosLead: 'Clips reales del montaje y la noche. Sin filtros de Instagram: puro evento.',
  videos: [
    {
      title: 'Live en el evento',
      src: asset('media/video/live-clip.mp4'),
      poster: asset('media/gallery/day-event.jpg'),
    },
    {
      title: 'Promo party',
      src: asset('media/video/promo.mp4'),
      poster: asset('media/gallery/lights.jpg'),
    },
  ],
  zonesLabel: 'Dónde toco',
  zonesTitle: 'Tu espacio, mi setup',
  zonesLead:
    'Me adapto al lugar: jardín, quincho, salón, plaza o pool party. Si cabe la gente, armamos la noche.',
  zones: [
    {
      name: 'Cumpleaños & pool parties',
      description: 'Música para toda la tarde-noche, con energía sin pasarse de agresivo.',
    },
    {
      name: 'Fiestas y celebraciones',
      description: 'Desde el primer brindis hasta el cierre: playlist a medida + lectura de pista.',
    },
    {
      name: 'Eventos al aire libre',
      description: 'Montaje de sonido e iluminación pensado para espacios abiertos.',
    },
    {
      name: 'Escenarios & shows',
      description: 'Apoyo sonoro y luces para presentaciones en vivo y cierres de fiesta.',
    },
  ],
  contactLabel: '¿Hablamos?',
  contactTitle: 'Cuéntame de tu evento',
  contactLead:
    'Fecha, lugar y vibe. Te respondo para armar la cotización sin compromiso.',
  email: 'djpinky@evento.cl',
  whatsappLabel: 'Háblame',
  whatsappUrl: 'https://wa.me/56900000000',
  socials: {
    instagram: '#',
    mixes: '#noches',
  },
  tracks: [
    'Warm-up suave',
    'Pista caliente',
    'Clásicos que pegan',
    'Reggaetón select',
    'Cumbia & recall',
    'Cierre full',
  ],
  heroMedia: {
    image: asset('media/hero/booth.jpg'),
    video: asset('media/video/promo.mp4'),
  },
  footerNote: 'DJ Pinky · Demo para revisión · 2026',
} as const;

export type DjData = typeof dj;
