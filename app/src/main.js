// Vice Coast Cover Studio — wires the page: photos in, caption typed,
// layout / grade / size picked, panels cropped by drag, cover out as PNG.
// A `?shot=` query sets up a fixed scene for a screenshot instead.
import { drawCover, defaultState, statePanels, SIZES, LAYOUTS, GRADES } from './cover.js';
import { runShot } from './shots.js';

const canvas = document.getElementById('cover');
const status = document.getElementById('status');
const state = defaultState();
const SAMPLES = ['boulevard', 'silver', 'ember', 'pier'];

/** Loads an image from a URL, resolving to the image once it can be drawn. */
export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

function applySize() {
  const [w, h] = SIZES[state.size];
  canvas.width = w;
  canvas.height = h;
}

function redraw() {
  applySize();
  drawCover(canvas, state);
}

function panelState(i) {
  state.panels[i] = state.panels[i] || {};
  return state.panels[i];
}

// --- option button rows -------------------------------------------------
function buildOptions(id, entries, current, onPick) {
  const box = document.getElementById(id);
  box.innerHTML = '';
  for (const [key, label] of entries) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.className = 'opt' + (key === current ? ' on' : '');
    b.addEventListener('click', () => { onPick(key); buildOptions(id, entries, key, onPick); redraw(); });
    box.appendChild(b);
  }
}

function refreshOptions() {
  buildOptions('layouts', Object.entries(LAYOUTS).map(([k, v]) => [k, v.label]), state.layout, (k) => { state.layout = k; state.selected = 0; syncPanelEditor(); });
  buildOptions('grades', Object.entries(GRADES).map(([k, v]) => [k, v.label]), state.grade, (k) => { state.grade = k; });
  buildOptions('sizes', Object.entries(SIZES).map(([k]) => [k, k]), state.size, (k) => { state.size = k; });
}

// --- photos --------------------------------------------------------------
async function loadSamples() {
  for (let i = 0; i < SAMPLES.length; i++) {
    if (!state.photos[i]) state.photos[i] = await loadImage(`samples/${SAMPLES[i]}.jpg`);
  }
}

function buildPhotoSlots() {
  const box = document.getElementById('photos');
  box.innerHTML = '';
  SAMPLES.forEach((name, i) => {
    const label = document.createElement('label');
    label.className = 'slot';
    label.innerHTML = `<span>Photo ${i + 1} · ${name}</span>`;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      state.photos[i] = await loadImage(URL.createObjectURL(file));
      redraw();
      status.textContent = `Photo ${i + 1} loaded from your machine.`;
    });
    label.appendChild(input);
    box.appendChild(label);
  });
  const fill = document.createElement('button');
  fill.type = 'button';
  fill.textContent = 'Fill every panel with photo 1';
  fill.addEventListener('click', () => {
    const panels = statePanels(state);
    panels.forEach((p, i) => { panelState(i).photo = 0; });
    redraw();
    status.textContent = 'Every panel now shows photo 1 — pick another per panel below.';
  });
  box.appendChild(fill);
}

// --- caption fields ------------------------------------------------------
function bindText(id, key) {
  const el = document.getElementById(id);
  el.addEventListener('input', () => { state[key] = el.value; redraw(); });
}
['title', 'subtitle', 'tagline', 'quote', 'source'].forEach((key) => bindText(key, key));

// --- selected-panel editor ----------------------------------------------
function syncPanelEditor() {
  const panels = statePanels(state);
  const p = panels[state.selected] || panels[0];
  if (!p) return;
  document.getElementById('panelLabel').textContent = `Panel ${state.selected + 1} of ${panels.length}`;
  const tag = document.getElementById('panelTag');
  tag.value = p.tag;
  const photo = document.getElementById('panelPhoto');
  photo.innerHTML = '';
  SAMPLES.forEach((name, i) => {
    const o = document.createElement('option');
    o.value = String(i);
    o.textContent = `Photo ${i + 1} · ${name}`;
    photo.appendChild(o);
  });
  photo.value = String(p.photo);
  document.getElementById('panelZoom').value = String(p.zoom);
  document.getElementById('panelX').value = String(p.ox);
  document.getElementById('panelY').value = String(p.oy);
}

document.getElementById('panelTag').addEventListener('input', (e) => {
  panelState(state.selected).tag = e.target.value.toUpperCase();
  redraw();
});
document.getElementById('panelPhoto').addEventListener('change', (e) => {
  panelState(state.selected).photo = Number(e.target.value);
  redraw();
});
document.getElementById('panelZoom').addEventListener('input', (e) => {
  panelState(state.selected).zoom = Number(e.target.value);
  redraw();
});
document.getElementById('panelX').addEventListener('input', (e) => {
  panelState(state.selected).ox = Number(e.target.value);
  redraw();
});
document.getElementById('panelY').addEventListener('input', (e) => {
  panelState(state.selected).oy = Number(e.target.value);
  redraw();
});

// Click a panel to select it; drag it to move its photo inside the frame.
let drag = null;
canvas.addEventListener('pointerdown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const fx = (e.clientX - rect.left) / rect.width;
  const fy = (e.clientY - rect.top) / rect.height;
  const panels = statePanels(state);
  const hit = panels.findIndex((p) => fx >= p.x && fx <= p.x + p.w && fy >= p.y && fy <= p.y + p.h);
  if (hit < 0) return;
  state.selected = hit;
  syncPanelEditor();
  redraw();
  const saved = panelState(hit);
  drag = { x: fx, y: fy, ox: saved.ox || 0, oy: saved.oy || 0 };
  canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const rect = canvas.getBoundingClientRect();
  const fx = (e.clientX - rect.left) / rect.width;
  const fy = (e.clientY - rect.top) / rect.height;
  const saved = panelState(state.selected);
  saved.ox = drag.ox + (fx - drag.x);
  saved.oy = drag.oy + (fy - drag.y);
  document.getElementById('panelX').value = String(saved.ox);
  document.getElementById('panelY').value = String(saved.oy);
  redraw();
});
canvas.addEventListener('pointerup', () => { drag = null; });

// --- export ---------------------------------------------------------------
function exportSize(size, done) {
  const saved = state.size;
  state.size = size;
  const [w, h] = SIZES[size];
  const off = document.createElement('canvas');
  off.width = w;
  off.height = h;
  drawCover(off, state);
  state.size = saved;
  off.toBlob((blob) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `vice-coast-${size}.png`;
    a.click();
    if (done) done();
  }, 'image/png');
}

document.getElementById('export').addEventListener('click', () => {
  exportSize(state.size, () => { status.textContent = `Saved vice-coast-${state.size}.png`; });
});
document.getElementById('exportAll').addEventListener('click', () => {
  const sizes = Object.keys(SIZES);
  let i = 0;
  const next = () => {
    if (i >= sizes.length) { status.textContent = 'Saved all three sizes.'; return; }
    exportSize(sizes[i++], next);
  };
  next();
});

// --- boot -----------------------------------------------------------------
async function boot() {
  buildPhotoSlots();
  refreshOptions();
  syncPanelEditor();
  try { await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]); } catch { /* fonts fall back */ }
  const shot = new URLSearchParams(location.search).get('shot');
  if (shot) {
    await runShot(shot, new URLSearchParams(location.search), state, loadSamples, redraw, syncPanelEditor);
  } else {
    await loadSamples();
    redraw();
  }
  status.textContent = 'Sample cast loaded — drop in your own photos to make it yours.';
}

boot();
