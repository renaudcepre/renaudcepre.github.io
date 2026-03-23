# Felix

> AI-powered continuity assistant for screenwriters working on complex, multi-era narratives.

![Status](https://img.shields.io/badge/status-Prototype-orange) [![Github](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/renaudcepre/felix)

## Why

A friend writes screenplays — complex thrillers with interleaved timelines,
dozens of characters, and continuity traps everywhere. He was tracking
everything in spreadsheets. I figured a graph database + LLM could do
better: parse raw scene text, build a knowledge graph, and let the writer
query it in natural language.

## What it does

Drop scene files in, Felix handles the rest:

1. **Analyze** — An LLM agent extracts characters, locations, dates,
   mood and summary from raw text
2. **Load** — Fuzzy-matches entities against the existing graph,
   merges new data into Neo4j, embeds scene chunks in ChromaDB
3. **Check** — Detects timeline contradictions, bilocalization issues
   (same character in two places at once), and narrative inconsistencies
4. **Profile** — Builds and updates character profiles, extracts
   relationships across scenes

Then ask anything: "Where was Marie in March 1942?",
"Which scenes mention the letter?", "Show me Paul's character arc."

## Stack

- FastAPI + Neo4j 5 (async) + ChromaDB
- Pydantic AI agents (Mistral / Together / LM Studio)
- sentence-transformers (BAAI/bge-m3) for embeddings
- Nuxt 3 + Nuxt UI + Tailwind (web dashboard)
- Rich + Typer (CLI chat)
- Python 3.12, mypy strict, Ruff

## What I learned

Graph modeling for narrative data is surprisingly tricky —
deciding when a character mention is a node vs. a property,
handling fuzzy entity resolution across scenes written months apart,
and making the LLM stay grounded (no hallucinated plot points).

The ingest pipeline taught me a lot about orchestrating
multiple LLM calls with shared state, idempotent writes,
and streaming progress to the frontend via SSE.

## Status

Working prototype — used on a real 80+ scene screenplay.
Actively improving the eval suite (89 test cases across
4 suites using pydantic-evals).
