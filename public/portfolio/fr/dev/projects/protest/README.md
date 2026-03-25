# ProTest

> Framework de test async-first pour Python 3.10+
> DI explicite, concurrence native, scoping intelligent.

![Status](https://img.shields.io/badge/status-In_Development-brightgreen)

[![CI](https://github.com/renaudcepre/protest/actions/workflows/ci.yml/badge.svg)](https://github.com/renaudcepre/protest/actions/workflows/ci.yml) [![codecov](https://codecov.io/gh/renaudcepre/protest/graph/badge.svg?token=V0MLGEE5UZ)](https://codecov.io/gh/renaudcepre/protest) [![docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://renaudcepre.github.io/protest/) [![Github](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/renaudcepre/protest)


```bash
$ protest run tests:session -n 4
```

## Pourquoi

Un collègue et moi, on n'arrêtait pas de parler du
côté magique de pytest. On adore le framework,
mais les fixtures résolues par nom, pas de types,
pas de Ctrl+Click.

Je voulais quelque chose de plus déclaratif, plus proche
de ce que fait FastAPI avec la DI.

## Ce que j'ai appris

Le projet a grossi vite. Thread pools,
piles de sortie async, bus d'événements, scoping en arbre...
Du async bas niveau qu'on ne touche jamais
quand on construit des APIs.

## Benchmarks

Pour valider l'approche, j'ai réécrit de larges portions des
suites de tests de pydantic, httpx et starlette avec
ProTest. Résultat : sur httpx et starlette,
les tests tournent 20-30% plus vite que les suites
officielles, grâce à l'async natif.

## Statut

v0.1.0 alpha. Architecture modulaire, système de
plugins propre. En cours : un reporter WebSocket
temps réel et un plugin PyCharm.
