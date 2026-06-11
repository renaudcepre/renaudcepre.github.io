# Felix

> Assistant de continuité IA pour scénaristes qui bossent sur des récits complexes, multi-époques.

![Status](https://img.shields.io/badge/status-En_développement-brightgreen) [![Github](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/renaudcepre/felix)

## Pourquoi

Un pote écrit des scénarios — des thrillers tordus avec des timelines entrelacées,
des dizaines de personnages, et des pièges de continuité à chaque page. Il gérait tout
dans des tableurs. Je me suis dit qu'un graphe de connaissances + LLM pouvait
faire le taf : parser le texte brut des scènes, construire le graphe,
et laisser le scénariste poser ses questions en langage naturel.

## Ce que ça fait

Tu déposes du texte, Felix s'occupe du reste :

1. **Extraction** — Des agents LLM extraient entités, relations et
   événements du texte brut
2. **Graphe** — Fusion floue dans Neo4j. Le schéma n'est pas figé :
   un « profil » définit les types d'entités et le vocabulaire de
   relations du domaine
3. **Vérification** — Bilocalisation, contradictions temporelles
   (« il agit deux scènes après sa mort ») détectées en raisonnant
   sur la chronologie d'événements de chaque entité
4. **Interrogation** — Questions en langage naturel, fiches d'entités
   générées depuis le graphe

## Du 100 % local à l'API (le pivot)

Le projet est parti d'une contrainte dure : tout devait tourner en local
sur un Mac M4, avec **Qwen2.5-7B** via LM Studio. L'extraction d'entités
tenait à coups de garde-fous, mais le raisonnement narratif d'un 7B,
non. Plutôt que de m'acharner contre le hardware, j'ai pivoté vers
l'**API Mistral** (mistral-small) — en gardant la philosophie petit
modèle + outils ciblés. Les garde-fous, eux, ont survécu au pivot :
c'est eux le vrai produit.

## Le vrai défi : cadrer le LLM

Un LLM qui écrit dans un graphe invente des entités, des relations,
des rebondissements. Tout le travail consiste à l'en empêcher :

- **Relations typées, vocabulaire dur** — appliqué à l'écriture dans le
  graphe : un type de relation hors vocabulaire est refusé, pas stocké
- **Les états bornés dans le temps sont des événements** — la mort, la
  prison, un poste : des événements ordonnés, pas des propriétés. Le
  checker de cohérence raisonne dessus de façon déterministe
- **Eval-first** — chaque comportement du moteur a son éval rejouable
  avec [ProTest](https://github.com/renaudcepre/protest) : unitaires,
  sondes d'intégration, scénarios complets de bout en bout

## Stack

- FastAPI + Neo4j 5 (async) + ChromaDB
- Agents Pydantic AI + **API Mistral** (LM Studio reste branchable pour le local)
- Nuxt 3 + Nuxt UI (front « papier »)
- ProTest pour la suite d'évals
- Python 3.12, mypy strict, Ruff

## Ce que j'ai appris

Modéliser un graphe pour des données narratives, c'est étonnamment tordu —
à partir de quand une mention de personnage devient un nœud plutôt qu'une
propriété ? Comment fusionner des entités entre des scènes écrites à des
mois d'intervalle ?

Un vocabulaire de relations laissé libre dérive **toujours** — le valider
durement à l'écriture a éliminé une classe entière de bugs d'un coup.
Et on ne pilote pas un agent LLM sans harnais d'évals : ici, chaque
correction commence par une éval qui échoue.

## Statut

En développement actif, utilisé sur un vrai scénario. Le moteur se
généralise : « scénario » n'est qu'un profil parmi d'autres (un profil
« chantier » existe déjà) — Felix devient un copilote de modélisation
en graphe dont le domaine se branche par configuration.
