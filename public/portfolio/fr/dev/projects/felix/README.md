# Felix

> Assistant de continuité propulsé par l'IA pour scénaristes travaillant sur des récits complexes multi-époques.

![Status](https://img.shields.io/badge/status-Prototype-orange) [![Github](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/renaudcepre/felix)

## Pourquoi

Un ami écrit des scénarios — des thrillers complexes avec des timelines entrelacées,
des dizaines de personnages, et des pièges de continuité partout. Il suivait tout
dans des tableurs. Je me suis dit qu'une base de données orientée graphe + LLM pouvait
faire mieux : parser le texte brut des scènes, construire un graphe de connaissances,
et laisser le scénariste l'interroger en langage naturel.

## Ce que ça fait

Dépose des fichiers de scènes, Felix gère le reste :

1. **Analyse** — Un agent LLM extrait les personnages, lieux, dates,
   ambiance et résumé du texte brut
2. **Chargement** — Correspondance floue des entités avec le graphe existant,
   fusion des nouvelles données dans Neo4j, embedding des chunks de scènes dans ChromaDB
3. **Vérification** — Détecte les contradictions temporelles, les problèmes de bilocalisation
   (même personnage à deux endroits en même temps), et les incohérences narratives
4. **Profilage** — Construit et met à jour les profils de personnages, extrait
   les relations entre les scènes

Ensuite pose n'importe quelle question : « Où était Marie en mars 1942 ? »,
« Quelles scènes mentionnent la lettre ? », « Montre-moi l'arc de Paul. »

## Le défi

La contrainte principale : tout doit tourner **localement sur un Mac M4**.
Le seul modèle que j'ai trouvé qui gère la tâche et tient dans le hardware
est **Qwen2.5-7B-Instruct** via LM Studio. C'est ce qui rend ce projet
intéressant — avec Claude Sonnet ce serait beaucoup plus simple,
mais moins fun comme prototype. Faire faire de l'extraction d'entités
fiable et du raisonnement narratif à un modèle 7B, c'est là que se trouve le vrai travail.

## Stack

- FastAPI + Neo4j 5 (async) + ChromaDB
- Agents Pydantic AI + **Qwen2.5-7B-Instruct** (local, LM Studio)
- sentence-transformers (BAAI/bge-m3) pour les embeddings
- Nuxt 3 + Nuxt UI + Tailwind (dashboard web)
- Rich + Typer (chat CLI)
- Python 3.12, mypy strict, Ruff

## Ce que j'ai appris

La modélisation de graphes pour des données narratives est étonnamment complexe —
décider quand une mention de personnage est un nœud vs. une propriété,
gérer la résolution floue d'entités entre des scènes écrites à des mois d'intervalle,
et garder le LLM ancré (pas de points d'intrigue hallucinés).

Le pipeline d'ingestion m'a beaucoup appris sur l'orchestration
de multiples appels LLM avec un état partagé, des écritures idempotentes,
et le streaming de progression vers le frontend via SSE.

Faire produire des sorties structurées et fiables à un modèle 7B
a nécessité un prompt engineering soigneux et beaucoup de garde-fous
dont un modèle plus gros n'aurait pas eu besoin.

## Statut

Prototype fonctionnel — utilisé sur un vrai scénario de 80+ scènes.
Amélioration active de la suite d'éval (89 cas de test répartis
sur 4 suites utilisant pydantic-evals).

Boss fight en cours : ingérer le scénario du Seigneur des Anneaux
sans trop d'erreurs. Des centaines de personnages, des lieux répartis sur
trois âges, et un modèle 7B qui essaie de tout garder en ordre.
