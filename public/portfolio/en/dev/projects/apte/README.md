# apte

> Tests and LLM evals in one async-first framework for Python 3.10+.
> Explicit DI, native concurrency, smart scoping. Formerly ProTest.

![Status](https://img.shields.io/badge/release-v0.3.1-brightgreen) ![Status](https://img.shields.io/badge/status-closed-lightgrey)

[![CI](https://github.com/renaudcepre/apte/actions/workflows/ci.yml/badge.svg)](https://github.com/renaudcepre/apte/actions/workflows/ci.yml) [![codecov](https://codecov.io/gh/renaudcepre/apte/graph/badge.svg?token=V0MLGEE5UZ)](https://codecov.io/gh/renaudcepre/apte) [![docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://renaudcepre.github.io/apte/) [![Github](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/renaudcepre/apte)


```bash
$ apte run tests:session -n 4
```

## Why

A colleague and I kept talking about the
magic side of pytest. We love the framework,
but fixtures resolved by name, no types,
no Ctrl+Click.

I wanted something more declarative, closer
to what FastAPI does with DI.

## Evals

Since v0.2.0, apte treats LLM evals as first-class citizens:
**an eval is just a test that returns a value** — scored, not
asserted. Same fixtures, same DI, same parallelism; judge,
scoring and short-circuit built in. Your evals live right next
to the tests they ship with, not in a separate framework. I wrote [a post](/blog/apte.md) about it.

## What I learned

The project grew fast. Thread pools,
async exit stacks, event bus, tree-based
scoping... Low-level async stuff you never
touch when building APIs.

## Benchmarks

To validate the approach, I rewrote large parts of
pydantic, httpx and starlette test suites with
apte. Result: on httpx and starlette,
tests run 20-30% faster than the official
suites, thanks to native async.

## Status

v0.3.1, closed in June 2026: release-please, CI, docs, asciinema
demo, blog post. Zero users besides me, the promo never took off.
apte was the eval harness of [Felix](/dev/lab/felix.md)
for as long as Felix was running.
