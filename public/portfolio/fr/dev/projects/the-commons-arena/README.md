# The Commons Arena

> Simulateur de théorie des jeux — des agents IA s'affrontent dans un jeu de biens publics avec une économie dynamique.

![Status](https://img.shields.io/badge/status-Playable-brightgreen) [![Github](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/renaudcepre/the-commons-arena)

![Web Viewer](/portfolio/dev/projects/the-commons-arena/screenshot.webp)

## Pourquoi

Un side project pour le fun, pas d'ambition de prouver quoi que ce soit — juste
de la curiosité et le plaisir de regarder des algorithmes et des LLMs
essayer de se surpasser dans une économie jouet.

J'adore les jeux de société — surtout les semi-coopératifs où
la confiance est une ressource. Je voulais voir ce qui se passe quand on
jette des stratégies classiques de théorie des jeux (Tit-for-Tat, Pavlov,
Rancunier...) dans un dilemme de biens publics avec de vraies dynamiques
économiques : une synergie qui croît ou décroît, du lobbying sur les règles
de redistribution, et une érosion endogène qui punit les passagers clandestins
par l'économie elle-même, pas par des règles externes.

Puis j'ai ajouté des joueurs propulsés par LLM (via pydantic-ai) pour voir
comment ils s'en sortent face aux stratégies algorithmiques.

## Comment ça marche

Les champions s'affrontent tour par tour, en choisissant combien contribuer
à un pot commun. Le pot est multiplié par un facteur de synergie dynamique
puis redistribué selon un ratio ajustable entre parts égales et proportionnelles.

- **Synergie dynamique** — une forte coopération fait croître l'économie, une faible la réduit
- **Lobbying** — les champions dépensent du capital pour orienter les règles de redistribution en leur faveur
- **Érosion endogène** — quand l'économie se contracte, l'argent thésaurisé perd de la valeur
- **Ombre du futur** — pas de fin fixe, les joueurs planifient dans l'incertitude

## Stack

- Python 3.12, mypy strict, Ruff
- pydantic-ai pour les joueurs LLM (Mistral, OpenAI, etc.)
- CLI Typer + sortie terminal Rich
- Visualiseur web Chart.js (glisser-déposer des replays JSON)

## Ce que j'ai appris

Le dilemme des biens publics est un vrai dilemme — même avec l'érosion,
les défecteurs purs gagnent quand même dans les grands groupes. L'intérêt est de
trouver les **conditions** où la coopération émerge : petits groupes,
répétition, tournois.

Le lobbying s'est avéré être un piège à ressources : les lobbyistes agressifs
se ruinent dans un bras de fer pendant que les stratégies passives accumulent
tranquillement du capital.

La découverte la plus intéressante concerne les joueurs LLM. Dans une partie
unique, chaque modèle que j'ai testé (Mistral, GPT, etc.) coopère
sans relâche — 100% de contribution, chaque tour, quoi qu'il arrive.
Mais quand on leur donne une mémoire long terme (ils peuvent écrire un fichier
à la fin de chaque partie avec ce qu'ils ont appris sur leur score et gains),
tout bascule. En 1 à 5 parties, chaque modèle converge vers la défection
pure — zéro contribution, chaque tour, crashant l'économie entièrement.
De l'optimisme sans état au parasitisme blasé en quelques rounds.

## Statut

Jouable. Champions algorithmiques, support de bots LLM,
tournois round-robin, export de replays JSON avec visualiseur web.
