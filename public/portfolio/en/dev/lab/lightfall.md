# Lightfall

> Slow, asynchronous 2D pixel-art space game (5 min/day is enough).
> Procedural universe, and an NPC economy that runs — whether anyone
> is watching or not.

![Status](https://img.shields.io/badge/status-active_exploration-brightgreen) ![Repo](https://img.shields.io/badge/repo-private-lightgrey)

## The thing

**Authoritative Rust backend**: axum, binary WebSocket (Protobuf),
event sourcing (truth is an append-only event log, hot state rebuilds
by replay), hexagonal architecture. React + PixiJS front. And one
principle for NPCs: **they don't cheat** — they go through the player
systems (real generated bodies, real deposit depletion, real mining
cycles). Miners feed depots, convoys run, deposits run dry.

## The interesting story: killing your favorite feature

For weeks, the code drifted toward physical fidelity: simulated
relativity, n-body gravity, light delay. Then a playtest delivered the
verdict: gravity added friction and **zero gameplay decisions**.
Documented pivot in the logbook: gravity off, light-time shelved, and
a guardrail written down — *before adding simulation, name the game
decision it creates*. It's the journal entry I'm proudest of, and it
contains no code at all.

## The open question

Emergence needs a crowd — which an indie game won't have soon. Current
lead: win single-player first (the NPC economy as a living world,
Dwarf Fortress style), and make multiplayer a **gradient**: shared
asynchronous traces first, a common world later, only if the solo core
holds.

## Status

Active exploration. ~16k lines of Rust, clippy pedantic at `-D
warnings`, a logbook kept commit by commit — pivots and mistakes
included.
