# The Commons Arena

> Game theory simulator — AI agents compete in a public goods game with dynamic economics.

![Status](https://img.shields.io/badge/status-Playable-brightgreen) [![Github](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/renaudcepre/the-commons-arena)

![Web Viewer](/portfolio/dev/projects/the-commons-arena/screenshot.webp)

## Why

A fun side project, no ambition to prove anything — just
curiosity and the pleasure of watching algorithms and LLMs
try to outsmart each other in a toy economy.

I love board games — especially semi-cooperative ones where
trust is a resource. I wanted to see what happens when you
throw classic game theory strategies (Tit-for-Tat, Pavlov,
Rancunier...) into a public goods dilemma with real economic
dynamics: synergy that grows or decays, lobbying on redistribution
rules, and endogenous erosion that punishes free-riders through
the economy itself, not external rules.

Then I added LLM-powered players (via pydantic-ai) to see
how they fare against algorithmic strategies.

## How it works

Champions compete turn by turn, choosing how much to contribute
to a common pot. The pot is multiplied by a dynamic synergy factor
then redistributed via a tunable ratio between equal and proportional
shares.

- **Dynamic synergy** — high cooperation grows the economy, low cooperation shrinks it
- **Lobbying** — champions spend capital to shift redistribution rules in their favor
- **Endogenous erosion** — when the economy contracts, hoarded money loses value
- **Shadow of the future** — no fixed end, players plan under uncertainty

## Stack

- Python 3.12, mypy strict, Ruff
- pydantic-ai for LLM players (Mistral, OpenAI, etc.)
- Typer CLI + Rich terminal output
- Chart.js web viewer (drag & drop JSON replays)

## What I learned

The public goods dilemma is a real dilemma — even with erosion,
pure defectors still win in large groups. The interest is in
finding the **conditions** where cooperation emerges: small groups,
repetition, tournaments.

Lobbying turned out to be a resource trap: aggressive lobbyists
ruin themselves in a tug-of-war while passive strategies quietly
accumulate capital.

The most interesting finding was with LLM players. In a single
game, every model I tested (Mistral, GPT, etc.) cooperates
relentlessly — 100% contribution, every turn, no matter what.
But when you give them long-term memory (they can write a file
at the end of each game with what they learned about their
score and earnings), everything flips. Within 1 to 5 games,
every single model converges to pure defection — zero
contribution, every turn, crashing the economy entirely.
Stateless optimism to jaded free-riding in a few rounds.

## Status

Playable. Algorithmic champions, LLM bot support,
round-robin tournaments, JSON replay export with web viewer.
