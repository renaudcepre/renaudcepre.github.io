# Lightfall

> Slow, asynchronous 2D pixel-art space game (5 min/day is enough).
> Procedural universe, autonomous NPC economy.

![Status](https://img.shields.io/badge/status-active_exploration-brightgreen) ![Repo](https://img.shields.io/badge/repo-private-lightgrey)

## The thing

Authoritative Rust backend: axum, binary WebSocket (Protobuf), event
sourcing, hexagonal architecture. React + PixiJS front. NPCs go
through the player systems: real generated bodies, real deposit
depletion, real mining cycles. Miners feed depots, convoys run,
deposits run dry.

## The pivot

For weeks the code drifted toward physical fidelity: simulated
relativity, gravity, light delay. At playtest, gravity added friction
and zero gameplay decisions. All of it got cut (gravity off,
light-time shelved) and the rule went into the logbook: before adding
simulation, name the game decision it creates.

## The open question

Emergence needs people, and an indie game has no crowd. Current lead:
win single-player first, with the NPC economy as the living world,
Dwarf Fortress style. Multiplayer as a gradient: shared asynchronous
traces first, a common world later.

## Status

Active exploration. ~16k lines of Rust, clippy pedantic at
`-D warnings`, logbook kept commit by commit.
