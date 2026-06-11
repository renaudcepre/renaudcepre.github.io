# ProTest

> Tests and LLM evals in one async-first framework for Python 3.10+.
> Explicit DI, native concurrency, smart scoping.

![Status](https://img.shields.io/badge/release-v0.2.0-brightgreen)

[![CI](https://github.com/renaudcepre/protest/actions/workflows/ci.yml/badge.svg)](https://github.com/renaudcepre/protest/actions/workflows/ci.yml) [![codecov](https://codecov.io/gh/renaudcepre/protest/graph/badge.svg?token=V0MLGEE5UZ)](https://codecov.io/gh/renaudcepre/protest) [![docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://renaudcepre.github.io/protest/) [![Github](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/renaudcepre/protest)


```bash
$ protest run tests:session -n 4
```

## Why

A colleague and I kept talking about the
magic side of pytest. We love the framework,
but fixtures resolved by name, no types,
no Ctrl+Click.

I wanted something more declarative, closer
to what FastAPI does with DI.

## Evals

Since v0.2.0, ProTest treats LLM evals as first-class citizens:
**an eval is just a test that returns a value** — scored, not
asserted. Same fixtures, same DI, same parallelism; judge,
scoring and short-circuit built in. Your evals live right next
to the tests they ship with, not in a separate framework.

## What I learned

The project grew fast. Thread pools,
async exit stacks, event bus, tree-based
scoping... Low-level async stuff you never
touch when building APIs.

## Benchmarks

To validate the approach, I rewrote large parts of
pydantic, httpx and starlette test suites with
ProTest. Result: on httpx and starlette,
tests run 20-30% faster than the official
suites, thanks to native async.

## Status

v0.2.0 released (release-please, CI, docs). Most importantly,
continuously dogfooded: ProTest is the eval harness of
[Felix](https://github.com/renaudcepre/felix), my continuity
assistant — every behavior of its LLM engine is a replayable
eval.
