# Felix

> Assistant de continuité IA pour scénaristes qui bossent sur des récits complexes, multi-époques.

![Status](https://img.shields.io/badge/status-Prototype-orange) [![Github](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/renaudcepre/felix)

## Pourquoi

Un pote écrit des scénarios — des thrillers alambiqués avec des timelines entrelacées,
des dizaines de personnages, et des pièges de continuité à chaque page. Il gérait tout
dans des tableurs. Je me suis dit qu'un graphe de connaissances + LLM pouvait
faire le taf : parser le texte brut des scènes, construire le graphe,
et laisser le scénariste poser ses questions en langage naturel.

## Ce que ça fait

Tu déposes des fichiers de scènes, Felix s'occupe du reste :

1. **Analyse** — Un agent LLM extrait personnages, lieux, dates,
   ambiance et résumé du texte brut
2. **Chargement** — Matching flou des entités avec le graphe existant,
   fusion dans Neo4j, embedding des chunks de scènes dans ChromaDB
3. **Vérification** — Détecte les contradictions temporelles, la bilocalisation
   (même personnage à deux endroits en même temps), et les incohérences narratives
4. **Profilage** — Construit et met à jour les fiches personnages, extrait
   les relations entre scènes

Ensuite tu demandes ce que tu veux : « Où était Marie en mars 1942 ? »,
« Quelles scènes mentionnent la lettre ? », « Montre-moi l'arc de Paul. »

## Le défi

La contrainte : tout doit tourner **en local sur un Mac M4**.
Le seul modèle qui tient la route et rentre dans le hardware,
c'est **Qwen2.5-7B-Instruct** via LM Studio. C'est ce qui rend le projet
intéressant — avec Claude Sonnet ce serait bien plus simple,
mais bien moins fun comme prototype. Faire de l'extraction d'entités fiable
et du raisonnement narratif avec un modèle 7B, c'est là qu'est le vrai boulot.

## Stack

- FastAPI + Neo4j 5 (async) + ChromaDB
- Agents Pydantic AI + **Qwen2.5-7B-Instruct** (local, LM Studio)
- sentence-transformers (BAAI/bge-m3) pour les embeddings
- Nuxt 3 + Nuxt UI + Tailwind (dashboard web)
- Rich + Typer (chat CLI)
- Python 3.12, mypy strict, Ruff

## Ce que j'ai appris

Modéliser un graphe pour des données narratives, c'est étonnamment tordu —
quand est-ce qu'une mention de personnage est un nœud plutôt qu'une propriété ?
Comment gérer la résolution floue d'entités entre des scènes écrites à des mois d'intervalle ?
Et surtout, comment garder le LLM ancré sans qu'il invente des rebondissements.

Le pipeline d'ingestion m'a appris pas mal de choses sur l'orchestration
de multiples appels LLM avec état partagé, des écritures idempotentes,
et du streaming de progression vers le front via SSE.

Tirer des sorties structurées et fiables d'un modèle 7B,
ça demande du prompt engineering soigné et une tonne de garde-fous
dont un plus gros modèle n'aurait pas eu besoin.

## Statut

Prototype fonctionnel — testé sur un vrai scénario de 80+ scènes.
En train d'améliorer la suite d'éval (89 cas de test répartis
sur 4 suites, via pydantic-evals).

Boss fight en cours : ingérer le Seigneur des Anneaux
sans trop de casse. Des centaines de personnages, des lieux étalés sur
trois âges, et un modèle 7B qui essaie de pas perdre le fil.
