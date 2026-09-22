# Felix

> AI-powered continuity assistant for screenwriters working on complex, multi-era narratives.

![Status](https://img.shields.io/badge/status-paused-yellow) [![Github](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/renaudcepre/felix)

## Why

A friend writes screenplays — complex thrillers with interleaved timelines,
dozens of characters, and continuity traps everywhere. He was tracking
everything in spreadsheets. I figured a graph database + LLM could do
better: parse raw scene text, build a knowledge graph, and let the writer
query it in natural language.

## What it does

Drop raw text in, Felix handles the rest:

1. **Extract** — LLM agents pull entities, relationships and events
   out of raw text
2. **Graph** — Fuzzy-merges everything into Neo4j. The schema isn't
   hardcoded: a "profile" defines the entity types and relation
   vocabulary of the domain
3. **Check** — Bilocalization and timeline contradictions ("he acts
   two scenes after his death") detected by reasoning over each
   entity's ordered event chronology
4. **Query** — Natural language questions, entity sheets generated
   straight from the graph

## From 100% local to API (the pivot)

The project started with a hard constraint: everything had to run
locally on a Mac M4, with **Qwen2.5-7B** via LM Studio. Entity
extraction held up thanks to heavy guardrails — narrative reasoning
on a 7B did not. Rather than keep fighting the hardware, I pivoted to
the **Mistral API** (mistral-small), keeping the small-model-plus-
targeted-tools philosophy. The guardrails survived the pivot: they
turned out to be the real product.

## The real challenge: caging the LLM

An LLM writing into a graph will invent entities, relationships,
plot twists. The whole job is stopping it:

- **Typed relations, hard vocabulary** — enforced at graph-write time:
  a relation type outside the vocabulary is rejected, not stored
- **Time-bounded states are events** — death, prison, a job: ordered
  events, not properties. The consistency checker reasons over them
  deterministically
- **Eval-first** — every engine behavior has a replayable eval built
  with [apte](/dev/projects/apte/README.md): unit-level,
  integration probes, full end-to-end scenarios

## Stack

- FastAPI + Neo4j 5 (async) + ChromaDB
- Pydantic AI agents + **Mistral API** (LM Studio still pluggable for local)
- Nuxt 3 + Nuxt UI ("paper" front-end)
- apte for the eval suite
- Python 3.12, mypy strict, Ruff

## What I learned

Graph modeling for narrative data is surprisingly tricky — when does
a character mention become a node rather than a property? How do you
merge entities across scenes written months apart?

A free-form relation vocabulary **always** drifts — validating it hard
at write time killed an entire class of bugs at once. And you can't
steer an LLM agent without an eval harness: here, every fix starts
with a failing eval.

## The wall

I hit a pretty hard wall between what I wanted to do and what the
small models I was using could do. Extraction holds. Narrative
reasoning, merging entities across scenes written months apart,
restraint (writing nothing on a plain "hi"): no. A 7B invents, and
mistral-small still invents. The guardrails limit the damage, they
don't replace a model that understands the story.

## Status

Paused since June 2026, resume point documented in the journal. The
engine runs on a real screenplay and "screenplay" is just one profile
among others (a "construction site" profile exists).
