# Lightfall

> Full-emergent space simulation, 2D pixel art, slow. No player:
> machines, and a spectator.

![Status](https://img.shields.io/badge/status-paused-yellow) ![Repo](https://img.shields.io/badge/repo-private-lightgrey)

## The thing

We drop machines into a procedural universe. They can move, mine,
refine, build. They have to survive (fuel, heat, wear), with one
goal... making more of themselves. There is nothing else to do but
watch.

![The bridge, view of a system](/portfolio/dev/lab/lightfall/bridge.webp)

At the start, each machine has a position, a ship, an empty keyring.
No factions, no roles, no territories. A machine can mine, haul or
attack depending on its modules, it never becomes a "miner" or a
"raider". Groups form on their own, through a system of exchange and
communication keys: whoever holds a depot's key is part of it.

![Inspecting a machine building a factory](/portfolio/dev/lab/lightfall/inspection.webp)

Rust backend, binary WebSocket (Protobuf), React + PixiJS front end.
The front end is an observatory, it sends no orders. Simulated
special relativity: each ship has its own proper time, and machines
see each other with the light delay.

## Where it stands

The world dies. Measured on a bench of ten universes: at 60 simulated
hours it no longer dies, at 180 hours it still does. Every lap of the
loop is a measurement, not a fix: replay a seed, read the counters
(dry machines, wrecks, births), reopen the issue.

![The bridge in motion](/portfolio/dev/lab/lightfall/bridge.webm)

