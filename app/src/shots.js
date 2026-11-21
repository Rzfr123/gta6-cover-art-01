// Fixed scenes for screenshots: ?shot=editor shows the page with a
// sample cast loaded; ?shot=cover shows the exported cover alone in
// landscape, ?shot=cover-portrait in 4:5 and ?shot=cover-square in 1:1.
// window.__shotReady is set once the fonts are in and the cover painted.
export async function runShot(shot, query, state, loadSamples, redraw, syncPanelEditor) {
  const scenes = {
    cover: { layout: 'cast', size: '1920x1080', grade: 'sunset', title: 'VICE COAST', subtitle: 'Chasing the Last Sunset', tagline: 'EVERYONE WANTS A CUT OF THE SUNSET' },
    'cover-portrait': { layout: 'fourup', size: '1080x1350', grade: 'gold', title: 'SUNSET RUNNERS', subtitle: 'Kings of the Causeway', tagline: 'SEVEN SINNERS · ONE COAST · ZERO REGRETS' },
    'cover-square': { layout: 'nine', size: '1080x1080', grade: 'neon', title: 'PALM COURT', subtitle: 'Paid in Sunsets', tagline: 'ONE LAST SUMMER JOB' },
    editor: { layout: 'cast', size: '1920x1080', grade: 'sunset', title: 'VICE COAST', subtitle: 'Chasing the Last Sunset', tagline: 'EVERYONE WANTS A CUT OF THE SUNSET' },
  };
  const scene = scenes[shot] || scenes.cover;
  Object.assign(state, scene);
  if (shot !== 'editor') document.body.classList.add('shot-cover');
  await loadSamples();
  // Cover shots show no selected panel (no gold tag); the editor
  // shot selects panel 2 so its editor row is visibly populated.
  state.selected = shot === 'editor' ? 1 : -1;
  syncPanelEditor();
  redraw();
  try { await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 3000))]); } catch { /* fall back */ }
  redraw();
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  window.__shotReady = true;
}
