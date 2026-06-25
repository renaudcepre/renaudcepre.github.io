# An eval is just a test that returns a value

apte is an async-first test framework for Python where your unit tests and your LLM evals run in the same engine, with the same fixtures.

The whole design follows from one idea. An eval is just a test that returns a value. A unit test asserts and passes or fails. An eval returns an output, scores it, records the score. Same machinery underneath, same fixtures feeding both. There is no real reason they should live in separate tools with separate CLIs and no shared setup.

## Why it exists

It started with pytest's fixtures, not with evals.

I like pytest, but fixtures are resolved by name, with no types and no Ctrl+Click. You write `def test_x(db):` and nothing tells you where `db` came from. The IDE can't follow it, a new reader can't either, and a typo in the name surfaces at runtime.

I wanted dependencies declared in the signature, the way FastAPI does it:

```python
def test_user(db: Annotated[Database, Use(database)]): ...
```

`Use(database)` points at the fixture. Ctrl+Click jumps to it, the type is right there, and a wrong name is an error at collection time instead of a confusing failure later.

Then LLM features landed in my work and split my tooling in two. pytest for the code, a separate eval library for the model parts. Two config systems, two CLIs, and the expensive setup my tests already had (a client, a database, a pipeline) was not reachable from the eval side. That separation never made sense, so apte runs both.

## What it looks like

A deterministic test and an LLM eval, same file, same fixtures:

```python
from typing import Annotated
from apte import ApteSession, Use, ForEach, From
from apte.evals import EvalCase, EvalSuite
from apte.evals.evaluators import contains_keywords

session = ApteSession()

def make_agent() -> Agent:
    return Agent(model="your-model")

@session.test()
async def test_parsing(agent: Annotated[Agent, Use(make_agent)]):
    assert agent.parse("2+2") == 4

chatbot = EvalSuite("chatbot")
session.add_suite(chatbot)

cases = ForEach([
    EvalCase(name="capital_fr", inputs="Capital of France?", expected="Paris"),
])

@chatbot.eval(evaluators=[contains_keywords(keywords=["paris"])])
async def eval_answer(
    case: Annotated[EvalCase, From(cases)],
    agent: Annotated[Agent, Use(make_agent)],
) -> str:
    return await agent.ask(case.inputs)
```

```bash
apte run app:session      # tests, pass or fail
apte eval app:session     # evals, scored, recorded to .apte/history.jsonl
```

The same `make_agent` feeds the test and the eval. Evals return scores, get aggregated (mean, p50, p95), and each case writes a markdown artifact for when something regresses. Beyond simple checks like keyword matching, you can score with an LLM judge and typed metrics. The history file compares a run against the previous one.

The rest comes from being its own runner: scoped fixtures (session, suite, test), tag propagation (tag a fixture, every test that uses it inherits the tag), native async with no plugin, parallelism with `-n`, and a clear split between a failed assertion (your bug) and a fixture error (your infra).

## Performance

apte is faster than pytest on real suites, for two reasons. Async tests run as coroutines on a single event loop instead of pytest-asyncio's loop-per-test, and parallelism is built in.

Ported 1:1 and run with `-n8`, httpx's full suite (1285 tests) runs about 1.6x faster than pytest, and starlette's (505 tests, ~94% sync) about 1.73x, both passing the same tests as the originals. Single-threaded the two are close; the gap opens with parallelism and grows with how much each test waits on I/O. On a synthetic I/O-bound benchmark it goes much higher, but the real suites are the number to trust. The async comparison is against the standard pytest plus pytest-asyncio setup, which is what most people run. The full benchmark, with methodology and a one-command repro, lives in the repo.

For evals none of this matters much. An LLM call dwarfs framework overhead. It just means apte does not ask you to trade speed for the eval features.

## What it isn't

apte is its own runner, not a pytest plugin. That is the central tradeoff. You get explicit DI, native async and built-in evals, but you leave pytest's plugin ecosystem and fifteen years of community behind. If implicit name-based fixtures work for you, there is no reason to switch.

It is also young and small. One main author, a few months old, an API that still moves. The test engine is the solid part. The eval layer works but is thinner than dedicated tools like DeepEval or Opik: keyword and judge-based scoring with history are there, but things like trajectory or tool-use evaluation are not yet. Treat it as a credible foundation to build on rather than a finished product, and budget for reading the source if it becomes load-bearing.

Use it if you want explicit, typed dependencies, native async without a plugin, and your evals next to your tests, and you are fine being an early user. Skip it if you have a large pytest suite and team that lean on the ecosystem, or you need a recognized standard.

## Try it

```bash
pip install apte
```

Repo: https://github.com/renaudcepre/apte
Docs: https://renaudcepre.github.io/apte/

It is alpha, which is when feedback is worth the most, especially on the eval API.

---

The name: `protest` was taken on PyPI, so it became `apte`, for Async Python Tests and Evals.
