# ProTest

> Async-first testing framework for Python 3.10+
> Explicit DI, native concurrency, smart scoping.

```bash
$ pip install protest
$ protest run tests:session -n 4
```

## Why

A colleague and I kept talking about the
magic side of pytest. We love the framework,
but fixtures resolved by name, no types,
no Ctrl+Click.

I wanted something more declarative, closer
to what FastAPI does with DI.

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

v0.1.0 alpha. Modular architecture, clean
plugin system. Working on a real-time
WebSocket reporter and a PyCharm plugin.

> https://github.com/renaudcepre/protest
