/* ==========================================================================
   PROJECT: The Architecture of Choice (SDG 3.5.1 - Treatment Coverage)
   RESOLUTION: 1920x1080 (Scales to Fullscreen via CSS)
   LICENSE: Released under GNU General Public License v3.0 (GPL-3.0)
   ========================================================================== */

let artBuffer;

/* Setup canvas, initialize memory buffer, and hide OS cursor */
function setup() {
  let canvas = createCanvas(1920, 1080);
  canvas.parent('canvas-container');
  artBuffer = createGraphics(1920, 1080);
  artBuffer.colorMode(HSL, 360, 100, 100, 1);
  generateStaticArt(artBuffer);
  noCursor();
}

/* Main render loop: draws static art memory and dynamic cursor */
function draw() {
  image(artBuffer, 0, 0, width, height);
  drawCustomCursor(mouseX, mouseY);
}

/* Generates background and maps the 3 transitional data nodes */
function generateStaticArt(pg) {
  pg.background(0, 0, 3);
  drawInstitutionalGrid(pg);
  renderNode(pg, 1920 * 0.20, 540, 0.0, "0% COVERAGE (COERCION)");
  renderNode(pg, 1920 * 0.50, 540, 0.5, "AGENCY: 'I NEED HELP'");
  renderNode(pg, 1920 * 0.80, 540, 1.0, "100% COVERAGE (VOLUNTARY)");
}

/* Master coordinator for positioning and drawing a specific data node */
function renderNode(pg, x, y, coverage, labelTitle) {
  pg.push();
  pg.translate(x, y);
  drawTreatmentNetwork(pg, coverage);
  drawCoreSufferer(pg, coverage);
  drawNodeLabel(pg, labelTitle);
  pg.pop();
}

/* Procedural background grid representing rigid systemic structures */
function drawInstitutionalGrid(pg) {
  pg.strokeWeight(1);
  for (let x = 0; x < pg.width; x += 30) {
    let alpha = noise(x * 0.05) > 0.7 ? 0.3 : 0.05;
    pg.stroke(0, 0, 100, alpha);
    if (x < pg.width * 0.4) pg.line(x, 0, x, pg.height);
  }
  for (let y = 0; y < pg.height; y += 15) {
    if (noise(y * 0.1) > 0.8) {
      pg.stroke(0, 100, 50, 0.2);
      pg.line(0, y, pg.width, y);
    }
  }
}

/* Loops through elements to build the data-art network */
function drawTreatmentNetwork(pg, coverage) {
  let elements = 150;
  for (let i = 0; i < elements; i++) {
    renderNetworkElement(pg, i, elements, coverage);
  }
}

/* Calculates parametric positions and interpolates based on coverage */
function renderNetworkElement(pg, i, total, coverage) {
  let angle = map(i, 0, total, 0, TWO_PI);
  let radius = noise(i * 0.1, coverage) * 300 + 50;
 
  let radialX = cos(angle) * radius, radialY = sin(angle) * radius;
  let rigidX = noise(i) * 200 - 100, rigidY = noise(i + 100) * 400 - 200;
 
  let x = lerp(rigidX, radialX, coverage);
  let y = lerp(rigidY, radialY, coverage);
 
  applyNetworkStyle(pg, i, total, coverage);
  drawNetworkShape(pg, x, y, coverage);
}

/* Modulates stroke weight and color based on treatment coverage */
function applyNetworkStyle(pg, i, total, coverage) {
  let h = lerp(0, map(i, 0, total, 180, 360), coverage);
  let s = lerp(100, 60, coverage);
  let l = lerp(50, 60, coverage);
 
  pg.strokeWeight(lerp(2, 0.75, coverage));
  pg.stroke(h, s, l, 0.6);
}

/* Draws rigid glich lines (0.0) or connected bezier curves (1.0) */
function drawNetworkShape(pg, x, y, coverage) {
  if (coverage > 0.4) {
    pg.noFill();
    pg.bezier(0, 0, x * 0.5, y * 0.1, x * 0.8, y * 0.9, x, y);
  } else {
    pg.line(x, y, x + random(-20, 20), y);
  }
}

/* The Core: Transitions from a shattered block to a unified circle */
function drawCoreSufferer(pg, coverage) {
  pg.noStroke();
  if (coverage < 0.5) {
    pg.fill(0, 100, 50, 0.9); // Harsh Red Friction
    for(let i=0; i<5; i++) {
      pg.rect(random(-20, 0), random(-20, 0), random(10, 40), random(5, 15));
    }
  } else {
    pg.fill(200, 80, 60, 0.9); // Calming Teal Harmony
    pg.circle(0, 0, 45);
    pg.fill(0, 0, 100, 0.8);
    pg.circle(0, 0, 15);
  }
}

/* Typography titles styled as raw data outputs */
function drawNodeLabel(pg, labelTitle) {
  pg.fill(0, 0, 80, 0.9);
  pg.noStroke();
  pg.textAlign(CENTER);
  pg.textSize(16);
  pg.textFont("monospace");
  pg.text(labelTitle, 0, 340);
  pg.stroke(0, 0, 100, 0.3);
  pg.strokeWeight(1);
  pg.line(-80, 355, 80, 355);
}

/* Draws an interactive cyber-reticle mapped to mouse coordinates */
function drawCustomCursor(x, y) {
  push();
  stroke(255);
  strokeWeight(1.5);
  noFill();
  line(x - 20, y, x - 5, y);
  line(x + 5, y, x + 20, y);
  line(x, y - 20, x, y - 5);
  line(x, y + 5, x, y + 20);
  stroke('hsla(0, 100%, 50%, 0.8)');
  circle(x, y, 4);
  pop();
}