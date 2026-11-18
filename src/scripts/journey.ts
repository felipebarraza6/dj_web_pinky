import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/** Three Ibiza acts — scroll morphs CSS vars between them */
const ACTS = {
  sunset: {
    bg: '#1a0f14',
    bgDeep: '#0c070a',
    fg: '#fff6ef',
    fgMuted: 'rgba(255, 246, 239, 0.68)',
    accent: '#ff6b3d',
    accent2: '#f4c95f',
    accentSoft: 'rgba(255, 107, 61, 0.18)',
    surface: 'rgba(255, 246, 239, 0.06)',
    border: 'rgba(255, 246, 239, 0.14)',
    orbA: '#ff6b3d',
    orbB: '#7b3f6e',
    orbC: '#f4c95f',
    grain: 0.12,
    villaWash: 0.05,
    nightDepth: 0.35,
  },
  villa: {
    bg: '#14202b',
    bgDeep: '#0a1218',
    fg: '#f4f7fb',
    fgMuted: 'rgba(244, 247, 251, 0.7)',
    accent: '#38bdf8',
    accent2: '#f4c95f',
    accentSoft: 'rgba(56, 189, 248, 0.16)',
    surface: 'rgba(244, 247, 251, 0.07)',
    border: 'rgba(244, 247, 251, 0.16)',
    orbA: '#f4c95f',
    orbB: '#38bdf8',
    orbC: '#94a3b8',
    grain: 0.08,
    villaWash: 1,
    nightDepth: 0.2,
  },
  afterhours: {
    bg: '#0b0612',
    bgDeep: '#050308',
    fg: '#f7f2ff',
    fgMuted: 'rgba(247, 242, 255, 0.68)',
    accent: '#ff2f78',
    accent2: '#50ffdc',
    accentSoft: 'rgba(255, 47, 120, 0.16)',
    surface: 'rgba(247, 242, 255, 0.06)',
    border: 'rgba(247, 242, 255, 0.14)',
    orbA: '#ff2f78',
    orbB: '#5b21b6',
    orbC: '#50ffdc',
    grain: 0.16,
    villaWash: 0.15,
    nightDepth: 0.7,
  },
} as const;

type ActId = keyof typeof ACTS;

const ACT_ORDER: ActId[] = ['sunset', 'villa', 'afterhours'];

function lerpColor(a: string, b: string, t: number): string {
  // Only handles hex #rrggbb — accents are hex in ACTS
  if (!a.startsWith('#') || !b.startsWith('#')) return t < 0.5 ? a : b;
  const parse = (hex: string) => {
    const h = hex.replace('#', '');
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ] as const;
  };
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bl
    .toString(16)
    .padStart(2, '0')}`;
}

function applyActMix(t: number) {
  // t in [0, 2]: 0→1 sunset→villa, 1→2 villa→afterhours
  const clamped = Math.max(0, Math.min(2, t));
  const fromId = ACT_ORDER[Math.floor(clamped)] ?? 'afterhours';
  const toId = ACT_ORDER[Math.min(ACT_ORDER.length - 1, Math.ceil(clamped))] ?? fromId;
  const localT = clamped - Math.floor(clamped);
  const from = ACTS[fromId];
  const to = ACTS[toId];
  const root = document.documentElement;

  const mix = <K extends keyof typeof from>(key: K, isColor = false) => {
    const a = from[key];
    const b = to[key];
    if (typeof a === 'number' && typeof b === 'number') {
      return a + (b - a) * localT;
    }
    if (isColor && typeof a === 'string' && typeof b === 'string') {
      return lerpColor(a, b, localT);
    }
    return localT < 0.5 ? a : b;
  };

  root.style.setProperty('--bg', mix('bg', true) as string);
  root.style.setProperty('--bg-deep', mix('bgDeep', true) as string);
  root.style.setProperty('--accent', mix('accent', true) as string);
  root.style.setProperty('--accent-2', mix('accent2', true) as string);
  root.style.setProperty('--orb-a', mix('orbA', true) as string);
  root.style.setProperty('--orb-b', mix('orbB', true) as string);
  root.style.setProperty('--orb-c', mix('orbC', true) as string);
  root.style.setProperty('--grain-opacity', String(mix('grain')));
  root.style.setProperty('--villa-wash', String(mix('villaWash')));
  root.style.setProperty('--night-depth', String(mix('nightDepth')));

  // Non-hex / rgba: snap with slight blend via CSS color-mix not available — pick nearest
  root.style.setProperty('--fg', (localT < 0.5 ? from.fg : to.fg) as string);
  root.style.setProperty('--fg-muted', (localT < 0.5 ? from.fgMuted : to.fgMuted) as string);
  root.style.setProperty('--accent-soft', (localT < 0.5 ? from.accentSoft : to.accentSoft) as string);
  root.style.setProperty('--surface', (localT < 0.5 ? from.surface : to.surface) as string);
  root.style.setProperty('--border', (localT < 0.5 ? from.border : to.border) as string);

  const active: ActId =
    clamped < 0.66 ? 'sunset' : clamped < 1.33 ? 'villa' : 'afterhours';
  root.dataset.act = active;
  root.style.setProperty('--act-progress', String(clamped / 2));
}

function initReveals() {
  gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

function initOrbs() {
  gsap.to('[data-orb="a"]', {
    yPercent: 18,
    xPercent: 8,
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
  gsap.to('[data-orb="b"]', {
    yPercent: -14,
    xPercent: -10,
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
  gsap.to('[data-orb="c"]', {
    yPercent: 10,
    xPercent: -6,
    duration: 18,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

function initNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;
  ScrollTrigger.create({
    start: 40,
    onUpdate: (self) => {
      nav.classList.toggle('is-scrolled', self.scroll() > 40);
    },
  });
}

export function initJourney() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduced) {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // Color morph on scroll (no HUD)
  const proxy = { t: 0 };
  applyActMix(0);

  gsap.to(proxy, {
    t: 2,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.1,
      onUpdate: () => applyActMix(proxy.t),
    },
  });

  if (!reduced) {
    initReveals();
    initOrbs();
  } else {
    document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  initNav();

  gsap.from('.hero__title', {
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: 'power4.out',
    delay: 0.05,
  });
}
