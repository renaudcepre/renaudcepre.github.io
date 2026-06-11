# ProTest

> Tests et évals LLM dans un seul framework async-first pour Python 3.10+.
> DI explicite, concurrence native, scoping malin.

![Status](https://img.shields.io/badge/release-v0.2.0-brightgreen)

[![CI](https://github.com/renaudcepre/protest/actions/workflows/ci.yml/badge.svg)](https://github.com/renaudcepre/protest/actions/workflows/ci.yml) [![codecov](https://codecov.io/gh/renaudcepre/protest/graph/badge.svg?token=V0MLGEE5UZ)](https://codecov.io/gh/renaudcepre/protest) [![docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://renaudcepre.github.io/protest/) [![Github](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/renaudcepre/protest)


```bash
$ protest run tests:session -n 4
```

## Pourquoi

Avec un collègue, on revenait tout le temps sur le côté
magique de pytest. On adore le framework, mais les fixtures
résolues par nom, pas de types, pas de Ctrl+Click — ça gratte.

Je voulais un truc plus déclaratif, dans l'esprit
de ce que fait FastAPI avec la DI.

## Évals

Depuis la v0.2.0, ProTest traite les évals LLM comme des citoyens
de première classe : **une éval, c'est juste un test qui renvoie une
valeur** — scorée au lieu d'assertée. Mêmes fixtures, même DI, même
parallélisme ; juge, scoring et short-circuit en natif. Tes évals
vivent à côté des tests qu'elles accompagnent, pas dans un
framework à part.

## Ce que j'ai appris

Le projet a pris de l'ampleur vite. Thread pools,
exit stacks async, bus d'événements, scoping en arbre...
Du async bas niveau qu'on touche jamais en faisant des APIs.

## Benchmarks

Pour valider l'approche, j'ai réécrit de gros morceaux des
suites de tests de pydantic, httpx et starlette avec ProTest.
Résultat : sur httpx et starlette, les tests passent
20-30% plus vite que les suites officielles, grâce à l'async natif.

## Statut

v0.2.0 releasée (release-please, CI, docs). Et surtout, dogfoodé
en continu : ProTest est le harnais d'évals de
[Felix](https://github.com/renaudcepre/felix), mon assistant de
continuité — chaque comportement de son moteur LLM y est une éval
rejouable.
