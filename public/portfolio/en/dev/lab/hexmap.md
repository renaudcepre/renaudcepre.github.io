# hexmap

> Emergent world simulator on a hexagonal grid. Geophysical cellular
> automaton: rivers, microclimates and seasons emerge from local
> propagation rules.

![Status](https://img.shields.io/badge/status-paused-yellow) ![Repo](https://img.shields.io/badge/repo-private-lightgrey)

## The thing

Rust. ~500 hexagons, double-buffering (cell order never affects the
result), fully deterministic from a seed. The model is a **terrarium**:
closed world, water and energy conserved — if a total drifts, it's a
bug, and a test says so before I do.

## The confession

I don't have the physics skills to write this. Nor the meteorology,
nor the erosion. The code is largely written by Claude, which I steered
toward the studies and models. So the interesting question isn't "can
I write it?" (no) but "**can I tell when it's wrong?**". That became
the project's real subject.

## The verification apparatus

- **Conservation invariants** tested continuously (water, energy)
- **5 structural diagnostic tools**: cloud clusters, rain attractors,
  water flows, temporal cycles, drainage basins — numbers, not visual
  impressions
- **Hypotheses that die against data**: the "lake-cell" hypothesis was
  invalidated by direct measurement (0 of the 6 suspect attractors
  were lakes). The same tooling revealed the simulation was strictly
  periodic year over year (0.998 correlation) — quantified diagnosis,
  open issue, fix planned

## Status

Paused — cleanly: `v0.6.1-pause` tag, issues triaged honestly ("an
honest state beats a fake cleanup"), documented re-entry point with
its validation metric already in place. Not abandoned: a dated,
reasoned stop.
