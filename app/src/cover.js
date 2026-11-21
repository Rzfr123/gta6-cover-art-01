// Vice Coast Cover Studio — the cover engine.
//
// Draws GTA-style multi-panel cover art on a canvas: a cast of photo
// panels with role tags, a giant striped chrome title, a neon script
// subtitle, a press-quote bar, a billing block, a barcode and a gold
// seal, all graded in a Vice City sunset. Every measurement is a
// fraction of the canvas, so the same state renders at 1920x1080,
// 1080x1080 and 1080x1350. Nothing here loads over the network: photos
// come from the page, fonts from app/fonts.

export const SIZES = {
  '1920x1080': [1920, 1080],
  '1080x1080': [1080, 1080],
  '1080x1350': [1080, 1350],
};

export const GRADES = {
  sunset: { label: 'Sunset', filter: 'saturate(1.3) contrast(1.06)', top: '#ff9a3d', bottom: '#d63384', alpha: 0.22 },
  neon: { label: 'Neon Night', filter: 'saturate(1.45) contrast(1.1)', top: '#ff2e88', bottom: '#00e5c7', alpha: 0.26 },
  gold: { label: 'Vice Gold', filter: 'saturate(1.12) brightness(1.06) contrast(1.03)', top: '#ffc93d', bottom: '#b45309', alpha: 0.2 },
  noir: { label: 'Palm Noir', filter: 'saturate(0.35) contrast(1.14) brightness(0.96)', top: '#7c3aed', bottom: '#0f0a1e', alpha: 0.3 },
  haze: { label: 'Heat Haze', filter: 'saturate(0.92) brightness(1.09) contrast(0.98)', top: '#ffe8c9', bottom: '#ff8a5c', alpha: 0.16 },
};

// Each layout is a function of the canvas size returning the panels
// (fractions of width/height, with an optional slant in fractions of
// the panel height) and the title band (fractions) the title sits in.
export const LAYOUTS = {
  cast: {
    label: 'Cast Grid',
    panels(w, h) {
      const land = w >= h;
      if (land) return [
        { x: 0.015, y: 0.085, w: 0.19, h: 0.40 },
        { x: 0.215, y: 0.085, w: 0.31, h: 0.40 },
        { x: 0.535, y: 0.085, w: 0.21, h: 0.40 },
        { x: 0.755, y: 0.085, w: 0.23, h: 0.40 },
        { x: 0.015, y: 0.50, w: 0.235, h: 0.235 },
        { x: 0.26, y: 0.50, w: 0.235, h: 0.235 },
        { x: 0.505, y: 0.50, w: 0.235, h: 0.235 },
        { x: 0.75, y: 0.50, w: 0.235, h: 0.235 },
      ];
      return [
        { x: 0.02, y: 0.085, w: 0.47, h: 0.30 },
        { x: 0.51, y: 0.085, w: 0.47, h: 0.30 },
        { x: 0.02, y: 0.40, w: 0.47, h: 0.30 },
        { x: 0.51, y: 0.40, w: 0.47, h: 0.30 },
        { x: 0.02, y: 0.715, w: 0.30, h: 0.20 },
        { x: 0.35, y: 0.715, w: 0.30, h: 0.20 },
        { x: 0.68, y: 0.715, w: 0.30, h: 0.20 },
      ];
    },
    titleBand: { y: 0.66, h: 0.285 },
  },
  fourup: {
    label: 'Four Up',
    panels(w, h) {
      const land = w >= h;
      if (land) return [
        { x: 0.015, y: 0.085, w: 0.235, h: 0.50 },
        { x: 0.26, y: 0.085, w: 0.235, h: 0.50 },
        { x: 0.505, y: 0.085, w: 0.235, h: 0.50 },
        { x: 0.75, y: 0.085, w: 0.235, h: 0.50 },
      ];
      return [
        { x: 0.02, y: 0.085, w: 0.225, h: 0.52 },
        { x: 0.265, y: 0.085, w: 0.225, h: 0.52 },
        { x: 0.51, y: 0.085, w: 0.225, h: 0.52 },
        { x: 0.755, y: 0.085, w: 0.225, h: 0.52 },
      ];
    },
    titleBand: { y: 0.62, h: 0.325 },
  },
  heroleft: {
    label: 'Hero Left',
    panels(w, h) {
      const land = w >= h;
      if (land) return [
        { x: 0.015, y: 0.085, w: 0.44, h: 0.62 },
        { x: 0.47, y: 0.085, w: 0.515, h: 0.30 },
        { x: 0.47, y: 0.40, w: 0.25, h: 0.305 },
        { x: 0.735, y: 0.40, w: 0.25, h: 0.305 },
      ];
      return [
        { x: 0.02, y: 0.085, w: 0.96, h: 0.44 },
        { x: 0.02, y: 0.54, w: 0.47, h: 0.24 },
        { x: 0.51, y: 0.54, w: 0.47, h: 0.24 },
      ];
    },
    titleBand: { y: 0.70, h: 0.245 },
  },
  tilted: {
    label: 'Tilted Six',
    panels(w, h) {
      const land = w >= h;
      if (land) return [
        { x: 0.015, y: 0.085, w: 0.32, h: 0.34, slant: 0.10 },
        { x: 0.34, y: 0.085, w: 0.32, h: 0.34, slant: 0.10 },
        { x: 0.665, y: 0.085, w: 0.32, h: 0.34, slant: 0.10 },
        { x: 0.015, y: 0.44, w: 0.32, h: 0.34, slant: -0.10 },
        { x: 0.34, y: 0.44, w: 0.32, h: 0.34, slant: -0.10 },
        { x: 0.665, y: 0.44, w: 0.32, h: 0.34, slant: -0.10 },
      ];
      return [
        { x: 0.02, y: 0.085, w: 0.47, h: 0.28, slant: 0.12 },
        { x: 0.51, y: 0.085, w: 0.47, h: 0.28, slant: 0.12 },
        { x: 0.02, y: 0.38, w: 0.47, h: 0.28, slant: -0.12 },
        { x: 0.51, y: 0.38, w: 0.47, h: 0.28, slant: -0.12 },
        { x: 0.02, y: 0.675, w: 0.47, h: 0.22, slant: 0.12 },
        { x: 0.51, y: 0.675, w: 0.47, h: 0.22, slant: 0.12 },
      ];
    },
    titleBand: { y: 0.70, h: 0.245 },
  },
  fullbleed: {
    label: 'Full Bleed',
    panels() { return [{ x: 0, y: 0.07, w: 1, h: 0.93 }]; },
    titleBand: { y: 0.60, h: 0.345 },
  },
  nine: {
    label: 'Nine Panel',
    panels(w, h) {
      const land = w >= h;
      if (land) {
        const out = [];
        for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++)
          out.push({ x: 0.015 + c * 0.245, y: 0.085 + r * 0.255, w: 0.235, h: 0.24 });
        return out;
      }
      const out = [];
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++)
        out.push({ x: 0.02 + c * 0.326, y: 0.085 + r * 0.20, w: 0.306, h: 0.185 });
      return out;
    },
    titleBand: { y: 0.62, h: 0.325 },
  },
};

const DEFAULT_TAGS = ['THE DRIVER', 'THE BOSS', 'THE BRAINS', 'THE FIXER', 'THE LOOKOUT', 'THE CAPTAIN', 'THE GETAWAY', 'THE HIDEOUT', 'THE ESCAPE'];

/** A fresh default state: four sample photos, one per panel slot. */
export function defaultState() {
  return {
    size: '1920x1080',
    layout: 'cast',
    grade: 'sunset',
    title: 'VICE COAST',
    subtitle: 'Chasing the Last Sunset',
    tagline: 'EVERYONE WANTS A CUT OF THE SUNSET',
    quote: 'THE HOTTEST RIDE ON THE COAST',
    source: 'GOLDEN COAST GAZETTE',
    vol: 'VOL. 1',
    photos: [null, null, null, null],
    panels: [],
    selected: 0,
  };
}

/** Panels for the state's layout, each with its photo, tag and crop. */
export function statePanels(state) {
  const [w, h] = SIZES[state.size];
  const rects = LAYOUTS[state.layout].panels(w, h);
  return rects.map((r, i) => {
    const saved = state.panels[i] || {};
    // A repeated photo gets a different crop so the second row of a
    // grid never looks like a copy of the first.
    const repeat = i >= 4 ? { zoom: 1.18, ox: (i % 2 ? -0.08 : 0.08), oy: -0.05 } : {};
    return {
      ...r,
      photo: saved.photo ?? (i % 4),
      tag: saved.tag ?? DEFAULT_TAGS[i % DEFAULT_TAGS.length],
      zoom: saved.zoom ?? repeat.zoom ?? 1,
      ox: saved.ox ?? repeat.ox ?? 0,
      oy: saved.oy ?? repeat.oy ?? 0,
    };
  });
}

function hashSeed(text) {
  let s = 7;
  for (const ch of text) s = (s * 31 + ch.codePointAt(0)) % 9973;
  return s;
}

function drawPhotoCover(ctx, img, x, y, w, h, zoom, ox, oy, grade) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const scale = Math.max(w / iw, h / ih) * zoom;
  const pw = iw * scale;
  const ph = ih * scale;
  const dx = x + (w - pw) / 2 + ox * w;
  const dy = y + (h - ph) / 2 + oy * h;
  ctx.filter = grade.filter;
  ctx.drawImage(img, dx, dy, pw, ph);
  ctx.filter = 'none';
  // Sunset / neon wash, then a vignette so the tag stays readable.
  const wash = ctx.createLinearGradient(x, y, x, y + h);
  wash.addColorStop(0, grade.top);
  wash.addColorStop(1, grade.bottom);
  ctx.globalCompositeOperation = 'overlay';
  ctx.globalAlpha = grade.alpha;
  ctx.fillStyle = wash;
  ctx.fillRect(x, y, w, h);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  const vig = ctx.createRadialGradient(x + w / 2, y + h / 2, Math.min(w, h) * 0.3, x + w / 2, y + h / 2, Math.max(w, h) * 0.75);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(10,4,24,0.34)');
  ctx.fillStyle = vig;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

function drawRoleTag(ctx, x, y, w, h, tag, selected) {
  const fs = Math.max(12, h * 0.055);
  ctx.font = `700 ${fs}px Anton, sans-serif`;
  const tw = ctx.measureText(tag).width;
  const pad = fs * 0.7;
  const bw = tw + pad * 2 + fs * 0.5;
  const bh = fs * 1.9;
  const bx = x + w * 0.02;
  const by = y + h - bh - h * 0.04;
  ctx.fillStyle = selected ? '#ffd23d' : '#0d0716';
  ctx.fillRect(bx, by, bw, bh);
  ctx.fillStyle = selected ? '#0d0716' : '#ffd23d';
  ctx.beginPath();
  ctx.moveTo(bx, by);
  ctx.lineTo(bx + fs * 0.45, by);
  ctx.lineTo(bx, by + bh);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = selected ? '#0d0716' : '#ffffff';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(tag, bx + pad + fs * 0.35, by + bh / 2 + fs * 0.05);
  ctx.textBaseline = 'alphabetic';
}

// A skyline silhouette strip along the bottom of the title band.
function drawSkyline(ctx, x, y, w, h, seed) {
  ctx.save();
  ctx.fillStyle = 'rgba(16,6,32,0.5)';
  let px = x;
  let n = seed;
  const rnd = () => { n = (n * 16807) % 2147483647; return n / 2147483647; };
  while (px < x + w) {
    const bw = w * (0.03 + rnd() * 0.05);
    const bh = h * (0.25 + rnd() * 0.7);
    ctx.fillRect(px, y + h - bh, bw, bh);
    px += bw + w * 0.008;
  }
  ctx.restore();
}

// The striped chrome title: gradient fill, dark bands cut across it,
// a thick white outline and a hard drop shadow.
function drawChromeTitle(ctx, text, cx, cy, maxWidth, maxHeight) {
  let size = maxHeight;
  ctx.font = `${size}px Anton, sans-serif`;
  while (ctx.measureText(text).width > maxWidth && size > 24) {
    size -= 4;
    ctx.font = `${size}px Anton, sans-serif`;
  }
  const tw = ctx.measureText(text).width;
  const off = document.createElement('canvas');
  const pad = Math.ceil(size * 0.22);
  off.width = Math.ceil(tw + pad * 2);
  off.height = Math.ceil(size * 1.35 + pad * 2);
  const o = off.getContext('2d');
  o.font = `${size}px Anton, sans-serif`;
  o.textAlign = 'center';
  o.textBaseline = 'middle';
  const grad = o.createLinearGradient(0, pad, 0, pad + size);
  grad.addColorStop(0, '#fff6b0');
  grad.addColorStop(0.45, '#ffb347');
  grad.addColorStop(0.72, '#ff5e7a');
  grad.addColorStop(1, '#d63384');
  o.fillStyle = grad;
  o.fillText(text, off.width / 2, off.height / 2);
  // Horizontal sunset bands across the letters.
  o.globalCompositeOperation = 'source-atop';
  const band = size / 9;
  for (let i = 1; i < 9; i += 2) {
    o.fillStyle = 'rgba(20,4,40,0.30)';
    o.fillRect(0, pad + (i * band), off.width, band * 0.62);
  }
  o.fillStyle = 'rgba(255,255,255,0.20)';
  o.fillRect(0, pad, off.width, band * 0.5);
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${size}px Anton, sans-serif`;
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = size * 0.11;
  ctx.shadowColor = 'rgba(5,0,15,0.85)';
  ctx.shadowBlur = size * 0.12;
  ctx.shadowOffsetY = size * 0.07;
  ctx.strokeText(text, cx, cy);
  ctx.shadowColor = 'transparent';
  ctx.drawImage(off, cx - off.width / 2, cy - off.height / 2);
  ctx.restore();
  return size;
}

function drawBarcode(ctx, x, y, w, h, seed) {
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = '#0d0716';
  let n = seed;
  const rnd = () => { n = (n * 16807) % 2147483647; return n / 2147483647; };
  let px = x + w * 0.06;
  while (px < x + w * 0.94) {
    const bw = w * (0.008 + rnd() * 0.03);
    if (rnd() > 0.35) ctx.fillRect(px, y + h * 0.08, bw, h * 0.72);
    px += bw + w * 0.012;
  }
  ctx.restore();
}

function drawSeal(ctx, cx, cy, r) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.beginPath();
  const points = 16;
  for (let i = 0; i < points * 2; i++) {
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.82;
    ctx[i === 0 ? 'moveTo' : 'lineTo'](Math.cos(a) * rr, Math.sin(a) * rr);
  }
  ctx.closePath();
  const gold = ctx.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.1, 0, 0, r);
  gold.addColorStop(0, '#ffe98a');
  gold.addColorStop(0.6, '#f5b301');
  gold.addColorStop(1, '#b97e00');
  ctx.fillStyle = gold;
  ctx.fill();
  ctx.strokeStyle = '#7a5200';
  ctx.lineWidth = Math.max(2, r * 0.05);
  ctx.stroke();
  ctx.fillStyle = '#3d2700';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `700 ${r * 0.34}px Anton, sans-serif`;
  ctx.fillText('★ BEST ★', 0, -r * 0.22);
  ctx.font = `700 ${r * 0.42}px Anton, sans-serif`;
  ctx.fillText('CAST', 0, r * 0.22);
  ctx.restore();
}

/** Draws the whole cover for `state` onto `canvas` (its own size). */
export function drawCover(canvas, state) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const grade = GRADES[state.grade] || GRADES.sunset;
  const layout = LAYOUTS[state.layout] || LAYOUTS.cast;
  const panels = statePanels(state);

  // Deep purple base, then a sunset wash behind everything.
  ctx.fillStyle = '#160a26';
  ctx.fillRect(0, 0, w, h);
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#2b1150');
  sky.addColorStop(0.5, '#7a1e6e');
  sky.addColorStop(1, '#ff7a3d');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Photo panels.
  const gap = Math.max(3, w * 0.004);
  for (let i = 0; i < panels.length; i++) {
    const p = panels[i];
    const px = p.x * w;
    const py = p.y * h;
    const pw = p.w * w;
    const ph = p.h * h;
    const slant = (p.slant || 0) * ph;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(px + slant, py);
    ctx.lineTo(px + pw + slant, py);
    ctx.lineTo(px + pw - slant, py + ph);
    ctx.lineTo(px - slant, py + ph);
    ctx.closePath();
    ctx.clip();
    const img = state.photos[p.photo];
    if (img) drawPhotoCover(ctx, img, px - Math.abs(slant), py, pw + Math.abs(slant) * 2, ph, p.zoom, p.ox, p.oy, grade);
    else { ctx.fillStyle = '#3a1c5c'; ctx.fillRect(px, py, pw, ph); }
    ctx.restore();
    ctx.strokeStyle = '#12081f';
    ctx.lineWidth = gap;
    ctx.beginPath();
    ctx.moveTo(px + slant, py);
    ctx.lineTo(px + pw + slant, py);
    ctx.lineTo(px + pw - slant, py + ph);
    ctx.lineTo(px - slant, py + ph);
    ctx.closePath();
    ctx.stroke();
    if (state.layout !== 'fullbleed') drawRoleTag(ctx, px, py, pw, ph, p.tag, i === state.selected);
  }

  // Title band: dark glass over the panels, skyline behind the title.
  const band = layout.titleBand;
  const by = band.y * h;
  const bh = band.h * h;
  const bandGrad = ctx.createLinearGradient(0, by, 0, by + bh);
  bandGrad.addColorStop(0, 'rgba(18,6,34,0.0)');
  bandGrad.addColorStop(0.30, 'rgba(18,6,34,0.45)');
  bandGrad.addColorStop(1, 'rgba(18,6,34,0.85)');
  ctx.fillStyle = bandGrad;
  ctx.fillRect(0, by, w, bh);
  drawSkyline(ctx, 0, by + bh * 0.78, w, bh * 0.22, hashSeed(state.title));

  // Chrome title, neon script subtitle, tagline ribbon.
  const title = (state.title || 'VICE COAST').toUpperCase();
  const titleSize = drawChromeTitle(ctx, title, w / 2, by + bh * 0.34, w * 0.94, bh * 0.42);
  ctx.save();
  ctx.translate(w / 2, by + bh * 0.62);
  ctx.rotate(-0.03);
  ctx.font = `${Math.max(20, titleSize * 0.34)}px Pacifico, cursive`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#ff2e88';
  ctx.shadowBlur = titleSize * 0.22;
  ctx.fillStyle = '#ff8fd1';
  ctx.fillText(state.subtitle || '', 0, 0);
  ctx.restore();
  if (state.tagline) {
    ctx.font = `700 ${Math.max(13, h * 0.016)}px Anton, sans-serif`;
    const tw = ctx.measureText(state.tagline).width;
    const rh = h * 0.028;
    const rx = (w - tw) / 2 - rh;
    const ry = by + bh * 0.80;
    ctx.fillStyle = '#ffd23d';
    ctx.beginPath();
    ctx.moveTo(rx, ry);
    ctx.lineTo(rx + tw + rh * 2, ry);
    ctx.lineTo(rx + tw + rh * 2 - rh * 0.5, ry + rh);
    ctx.lineTo(rx, ry + rh);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#1c0a30';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(state.tagline, w / 2, ry + rh / 2 + 1);
    ctx.textBaseline = 'alphabetic';
  }

  // Gold seal, overlapping the top-right panel's corner, clear of the title.
  drawSeal(ctx, w * 0.93, h * 0.115, Math.min(w, h) * 0.05);

  // Press-quote bar on top. The quote shrinks until stars + quote +
  // source + VOL badge all fit on one line.
  const barH = h * 0.062;
  const barGrad = ctx.createLinearGradient(0, 0, w, 0);
  barGrad.addColorStop(0, '#12081f');
  barGrad.addColorStop(1, '#2b1150');
  ctx.fillStyle = barGrad;
  ctx.fillRect(0, 0, w, barH);
  ctx.fillStyle = '#ffd23d';
  ctx.font = `700 ${barH * 0.4}px Anton, sans-serif`;
  const volW = ctx.measureText(state.vol).width + barH * 0.6;
  const starFont = barH * 0.52;
  ctx.font = `${starFont}px sans-serif`;
  const starsW = ctx.measureText('★★★★★').width;
  const quoteText = `"${state.quote}"`;
  const srcText = `— ${state.source}`;
  let quoteSize = barH * 0.38;
  ctx.font = `700 ${quoteSize}px Anton, sans-serif`;
  while (ctx.measureText(quoteText).width + ctx.measureText(srcText).width > w - w * 0.03 - starsW - volW - w * 0.05 && quoteSize > 12) {
    quoteSize -= 1;
    ctx.font = `700 ${quoteSize}px Anton, sans-serif`;
  }
  ctx.fillStyle = '#ffd23d';
  ctx.font = `${starFont}px sans-serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('★★★★★', w * 0.015, barH * 0.56);
  const quoteX = w * 0.015 + starsW + w * 0.015;
  ctx.fillStyle = '#ffffff';
  ctx.font = `700 ${quoteSize}px Anton, sans-serif`;
  ctx.fillText(quoteText, quoteX, barH * 0.56);
  ctx.fillStyle = '#ffd23d';
  ctx.fillText(srcText, quoteX + ctx.measureText(quoteText).width + w * 0.015, barH * 0.56);
  // VOL badge, top right.
  ctx.font = `700 ${barH * 0.4}px Anton, sans-serif`;
  ctx.fillStyle = '#ffd23d';
  ctx.fillRect(w - volW - w * 0.012, barH * 0.16, volW, barH * 0.68);
  ctx.fillStyle = '#12081f';
  ctx.textAlign = 'center';
  ctx.fillText(state.vol, w - volW / 2 - w * 0.012, barH * 0.58);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  // Billing block at the foot. The credit lines shrink until they fit
  // between COMING SOON and the barcode.
  const footH = h * 0.055;
  ctx.fillStyle = '#12081f';
  ctx.fillRect(0, h - footH, w, footH);
  ctx.fillStyle = '#ffffff';
  ctx.font = `700 ${footH * 0.34}px Anton, sans-serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('— COMING SOON', w * 0.015, h - footH * 0.5);
  const credit1 = 'A VICE COAST PICTURES PRODUCTION  ·  STARRING YOU  ·  SHOT ON YOUR OWN CAMERA';
  const credit2 = 'GRADED AT SUNSET  ·  LETTERED BY HAND  ·  NO PHOTO EVER LEAVES YOUR DEVICE';
  let creditSize = footH * 0.26;
  ctx.font = `${creditSize}px sans-serif`;
  while (Math.max(ctx.measureText(credit1).width, ctx.measureText(credit2).width) > w * 0.58 && creditSize > 8) {
    creditSize -= 0.5;
    ctx.font = `${creditSize}px sans-serif`;
  }
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillText(credit1, w / 2, h - footH * 0.68);
  ctx.fillText(credit2, w / 2, h - footH * 0.28);
  ctx.textAlign = 'left';
  drawBarcode(ctx, w * 0.905, h - footH * 0.82, w * 0.08, footH * 0.64, hashSeed(state.title + state.subtitle));
  ctx.textBaseline = 'alphabetic';
}
