import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const d3 = require("d3");
const { voronoiTreemap } = require("d3-voronoi-treemap");
const { Delaunay } = require("d3-delaunay");
const polygonClipping = require("polygon-clipping");
const seedrandom = require("seedrandom");
const paper = require("paper");

const here = dirname(new URL(import.meta.url).pathname);
const colors = { transport: "#3987e5", output: "#d55181", delivery: "#c98500" };
const leaves = [
  ["transport", "singleResponseTimeoutMs"],
  ["transport", "executionAdmissionTimeoutMs"],
  ["transport", "maximumJsonPayloadBytes"],
  ["transport", "maximumExecutionControlPayloadBytes"],
  ["output", "maximumChunkRawBytes"],
  ["delivery", "postAcceptanceExecutionReattachmentLimit"],
  ["delivery", "resultTransferResumeLimitPerExecutionAttempt"],
  ["transport", "statusResponseTimeoutMs"],
];

class Lancet {
  static polygon(x, y, width, height, samples = 24) {
    const radius = width;
    const springY = y + width * Math.sqrt(3) / 2;
    const left = [];
    const right = [];
    for (let index = 0; index <= samples; index += 1) {
      const angle = (Math.PI / 3) * (index / samples);
      left.push([x + width - radius * Math.cos(angle), springY - radius * Math.sin(angle)]);
      right.push([x + radius * Math.cos(angle), springY - radius * Math.sin(angle)]);
    }
    const apexToLeft = left.reverse();
    return [[x, y + height], [x, springY], ...apexToLeft.slice(1, -1), [x + width / 2, y], ...right.reverse().slice(1, -1).reverse().reverse(), [x + width, springY], [x + width, y + height]]
      .filter((point, index, all) => index === 0 || point[0] !== all[index - 1][0] || point[1] !== all[index - 1][1]);
  }

  static arch(x, y, width, height, samples = 32) {
    const springY = y + (width * Math.sqrt(3)) / 2;
    const points = [[x, y + height], [x, springY]];
    for (let index = 1; index < samples; index += 1) {
      const angle = (Math.PI / 3) * (index / samples);
      points.push([x + width - width * Math.cos(angle), springY - width * Math.sin(angle)]);
    }
    points.push([x + width / 2, y]);
    for (let index = samples - 1; index >= 1; index -= 1) {
      const angle = (Math.PI / 3) * (index / samples);
      points.push([x + width * Math.cos(angle), springY - width * Math.sin(angle)]);
    }
    points.push([x + width, springY], [x + width, y + height]);
    return points;
  }
}

class Spike {
  static treemap(clip) {
    const root = d3
      .hierarchy({
        children: Array.from(d3.group(leaves, ([section]) => section)).map(([section, items]) => ({
          section,
          children: items.map(([, leaf]) => ({ section, leaf, weight: 1 })),
        })),
      })
      .sum((node) => node.weight ?? 0);
    voronoiTreemap().clip(clip).prng(seedrandom("stained-glass")).convergenceRatio(0.001).maxIterationCount(200)(root);
    return root.leaves().map((node) => ({ polygon: node.polygon, section: node.data.section, leaf: node.data.leaf }));
  }

  static lloyd(clip) {
    const random = seedrandom("stained-glass");
    const [minX, minY, maxX, maxY] = [
      d3.min(clip, (p) => p[0]), d3.min(clip, (p) => p[1]), d3.max(clip, (p) => p[0]), d3.max(clip, (p) => p[1]),
    ];
    let points = leaves.map(() => {
      for (;;) {
        const point = [minX + random() * (maxX - minX), minY + random() * (maxY - minY)];
        if (d3.polygonContains(clip, point)) return point;
      }
    });
    let cells = [];
    for (let iteration = 0; iteration < 30; iteration += 1) {
      const voronoi = Delaunay.from(points).voronoi([minX, minY, maxX, maxY]);
      cells = points.map((_, index) => {
        const clipped = polygonClipping.intersection([voronoi.cellPolygon(index)], [[...clip, clip[0]]]);
        return clipped[0]?.[0] ?? [];
      });
      points = cells.map((cell, index) => (cell.length > 2 ? d3.polygonCentroid(cell) : points[index]));
    }
    return cells.map((polygon, index) => ({ polygon, section: leaves[index][0], leaf: leaves[index][1] }));
  }

  static paperBands(x, y, width, height) {
    paper.setup(new paper.Size(1000, 1000));
    const arch = new paper.Path({ segments: Lancet.arch(x, y, width, height), closed: true });
    const rows = 4;
    const pieces = [];
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < 2; column += 1) {
        const index = row * 2 + column;
        const skew = (row % 2 === 0 ? 1 : -1) * 18;
        const top = y + (height / rows) * row;
        const bottom = top + height / rows;
        const middleTop = x + width / 2 + skew;
        const middleBottom = x + width / 2 - skew;
        const cut = new paper.Path({
          segments:
            column === 0
              ? [[x - 5, top], [middleTop, top], [middleBottom, bottom], [x - 5, bottom]]
              : [[middleTop, top], [x + width + 5, top], [x + width + 5, bottom], [middleBottom, bottom]],
          closed: true,
        });
        const piece = arch.intersect(cut, { insert: false });
        pieces.push({ d: piece.pathData, section: leaves[index][0], leaf: leaves[index][1] });
      }
    }
    return pieces;
  }
}

const width = 220;
const height = 620;
const clipA = Lancet.arch(40, 40, width, height);
const clipB = Lancet.arch(340, 40, width, height);
const treemap = Spike.treemap(clipA);
const lloyd = Spike.lloyd(clipB);
const bands = Spike.paperBands(640, 40, width, height);
const polygonPath = (polygon) => `M${polygon.map((point) => point.map((value) => value.toFixed(1)).join(",")).join("L")}Z`;
const piece = (d, section, leaf) =>
  `<path d="${d}" fill="${colors[section]}" stroke="#1d1d1b" stroke-width="5" stroke-linejoin="round"><title>${leaf}</title></path>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 720" width="900" height="720" style="background:#121211">
${treemap.map((cell) => piece(polygonPath(cell.polygon), cell.section, cell.leaf)).join("\n")}
${lloyd.map((cell) => piece(polygonPath(cell.polygon), cell.section, cell.leaf)).join("\n")}
${bands.map((cell) => piece(cell.d, cell.section, cell.leaf)).join("\n")}
<path d="${polygonPath(clipA)}" fill="none" stroke="#3b3a36" stroke-width="10"/>
<path d="${polygonPath(clipB)}" fill="none" stroke="#3b3a36" stroke-width="10"/>
<path d="${polygonPath(Lancet.arch(640, 40, width, height))}" fill="none" stroke="#3b3a36" stroke-width="10"/>
<text x="150" y="700" fill="#c3c2b7" font-family="system-ui" font-size="16" text-anchor="middle">d3-voronoi-treemap</text>
<text x="450" y="700" fill="#c3c2b7" font-family="system-ui" font-size="16" text-anchor="middle">d3-delaunay + Lloyd + polygon-clipping</text>
<text x="750" y="700" fill="#c3c2b7" font-family="system-ui" font-size="16" text-anchor="middle">Paper.js boolean bands</text>
</svg>`;
mkdirSync(here, { recursive: true });
writeFileSync(join(here, "geometry-spike.svg"), svg);
const areas = (cells) => cells.map((cell) => Math.abs(d3.polygonArea(cell.polygon)));
const spread = (values) => (d3.max(values) / d3.min(values)).toFixed(2);
console.log("treemap area max/min", spread(areas(treemap)), "cells", treemap.length);
console.log("lloyd area max/min", spread(areas(lloyd)), "cells", lloyd.length);
console.log("paper pieces", bands.length);
