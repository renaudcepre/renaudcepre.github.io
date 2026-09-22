# thalweg

> An emergent geophysical world on a hex grid, in Rust. Local rules
> over a cell and its six neighbours, and rivers, lakes and seasons
> that emerge.

![Status](https://img.shields.io/badge/status-active-brightgreen) [![Github](https://img.shields.io/badge/github-thalweg-blue?logo=github)](https://github.com/renaudcepre/thalweg)

## The thing

No player, no objective, nothing to win. I wanted a world that runs
on its own, and to watch what it does. So far that gives rivers that
carve their own beds, lakes that fill and drain, snow that holds on
north faces and goes on south ones, forests that take two centuries
to reach climax. None of it is drawn. The terrain comes out of a
seed, the rest comes from the physics.

Rust, ~6,200 hexes, one tick is one hour, double buffering,
deterministic from a seed. The world is a terrarium: closed, water
and energy conserved. If a total drifts, that's a bug, and a test
fails. Physics is written in strict SI units, W/m², Pa, constants
named and sourced in the code.

The same engine compiles to WebAssembly and runs in the browser with
a three.js front end. It's embedded in
[the Yorkshire Tech site](/dev/projects/yti/README.md). The plan: run
it here too.

## The confession

I don't have the physics background to write this, nor weather, nor
erosion. The code is largely written by Claude, steered toward the
right models. So the project's question isn't "can I write it" but
"can I tell when it's wrong".

## Verification

- conservation invariants tested continuously (water, energy)
- diagnostic tools: cloud clusters, rain attractors, water flows,
  cycles, watersheds. Numbers, not visual impressions
- hypotheses tested against data: the "lake cell" hypothesis fell to
  direct measurement (0 lakes across the 6 suspect cells)
- an MCP bridge: from a Claude session, you query the running
  simulation

## Status

Active. Picked up again in July 2026 after two months paused,
published as an MIT mirror under the name thalweg (v0.13.0 in
September). Heading: agents on the map, to see whether they organise
themselves. The ground isn't ready for that.
