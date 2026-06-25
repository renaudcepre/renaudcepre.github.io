# hexmap

> Geophysical cellular automaton on a hexagonal grid. Local
> propagation rules, and rivers, microclimates and seasons emerging.

![Status](https://img.shields.io/badge/status-paused-yellow) ![Repo](https://img.shields.io/badge/repo-private-lightgrey)

## The thing

Rust. ~500 hexagons, double-buffering, deterministic from a seed. The
world is a terrarium: closed, water and energy conserved. If a total
drifts, it's a bug, and a test fails.

## The confession

I don't have the physics skills to write this, nor the meteorology,
nor the erosion. The code is largely written by Claude, steered
toward the right models. So the project's question isn't "can I
write it" but "can I tell when it's wrong".

## Verification

- conservation invariants tested continuously (water, energy)
- 5 diagnostic tools: cloud clusters, rain attractors, water flows,
  cycles, drainage basins. Numbers, not visual impressions
- hypotheses tested against data: the "lake-cell" hypothesis fell to
  direct measurement (0 lakes out of the 6 suspect cells). The same
  tooling showed a near-periodic simulation year over year (0.998
  correlation), open issue, fix specified

## Status

Paused since May 2026: `v0.6.1-pause` tag, issues triaged, documented
re-entry point with its validation metric.
