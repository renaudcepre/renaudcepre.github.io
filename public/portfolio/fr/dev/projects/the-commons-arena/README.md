# The Commons Arena

> Simulateur de théorie des jeux — des agents IA s'affrontent dans un jeu de biens publics à économie dynamique.

![Status](https://img.shields.io/badge/status-Playable-brightgreen) [![Github](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/renaudcepre/the-commons-arena)

![Web Viewer](/portfolio/dev/projects/the-commons-arena/screenshot.webp)

## Pourquoi

Un side project pour le fun — pas d'ambition de prouver quoi que ce soit,
juste de la curiosité et l'envie de regarder des algos et des LLMs
essayer de s'arnaquer dans une économie jouet.

J'adore les jeux de société, surtout les semi-coopératifs où la confiance
est une ressource. Je voulais voir ce que ça donne quand on balance
des stratégies classiques de théorie des jeux (Tit-for-Tat, Pavlov,
Rancunier...) dans un dilemme de biens publics avec de vraies mécaniques
économiques : une synergie qui monte ou descend, du lobbying sur les
règles de redistribution, et une érosion endogène qui punit les
passagers clandestins par l'économie elle-même — pas par des règles externes.

Et puis j'ai collé des joueurs LLM (via pydantic-ai) pour voir
ce que ça donne face aux stratégies algorithmiques.

## Comment ça marche

Les champions jouent tour par tour, en choisissant combien mettre
dans un pot commun. Le pot est multiplié par un facteur de synergie dynamique
puis redistribué selon un ratio ajustable entre parts égales et proportionnelles.

- **Synergie dynamique** — beaucoup de coopération fait croître l'économie, peu la fait rétrécir
- **Lobbying** — les champions dépensent du capital pour tirer les règles de redistribution vers eux
- **Érosion endogène** — quand l'économie se contracte, le capital dormant perd de la valeur
- **Ombre du futur** — pas de fin annoncée, les joueurs planifient dans le flou

## Stack

- Python 3.12, mypy strict, Ruff
- pydantic-ai pour les joueurs LLM (Mistral, OpenAI, etc.)
- CLI Typer + sortie terminal Rich
- Visualiseur web Chart.js (drag & drop de replays JSON)

## Ce que j'ai appris

Le dilemme des biens publics est un vrai dilemme — même avec l'érosion,
les défecteurs purs gagnent quand même dans les grands groupes. L'intérêt,
c'est de trouver les **conditions** où la coopération émerge : petits groupes,
répétition, tournois.

Le lobbying s'est révélé être un piège à capital : les lobbyistes agressifs
se saignent dans un bras de fer pendant que les passifs accumulent tranquilles.

Le truc le plus intéressant, c'est les joueurs LLM. En one-shot,
tous les modèles que j'ai testés (Mistral, GPT, etc.) coopèrent
à fond — 100% de contribution, chaque tour, quoi qu'il arrive.
Mais dès qu'on leur file une mémoire long terme (un fichier qu'ils écrivent
après chaque partie avec ce qu'ils ont retenu de leurs scores),
tout bascule. En 1 à 5 parties, chaque modèle converge vers la défection
totale — zéro contribution, chaque tour, et l'économie s'effondre.
De l'optimisme naïf au parasitisme assumé en quelques rounds.

## Statut

Jouable. Champions algorithmiques, bots LLM, tournois round-robin,
export de replays JSON avec visualiseur web.
