# Lightfall

> Simulation spatiale full-émergente, 2D pixel art, lente. Pas de
> joueur : des machines, et un spectateur.

![Status](https://img.shields.io/badge/status-en_pause-yellow) ![Repo](https://img.shields.io/badge/repo-privé-lightgrey)

## Le truc

On lance des machines dans un univers procédural. Elles savent se
déplacer, miner, raffiner, construire. Elles doivent survivre (le
carburant, la chaleur, l'usure), avec comme but... d'en créer
d'autres. Il n'y a rien d'autre à faire que regarder.

![Le pont, vue d'un système](/portfolio/dev/lab/lightfall/bridge.webp)

Au départ, chaque machine a une position, un vaisseau, un trousseau
de clés vide. Pas de factions, pas de rôles, pas de territoires. Une
machine peut miner, transporter ou attaquer selon ses modules, elle
ne devient jamais « mineur » ou « pirate ». Les groupes se forment tout
seuls, grâce à un système de clés d'échange et de communication :
qui a la clé d'un dépôt en fait partie.

![Inspection d'une machine qui construit une usine](/portfolio/dev/lab/lightfall/inspection.webp)

Backend Rust, WebSocket binaire (Protobuf), front React + PixiJS. Le
front est un observatoire, il n'envoie aucun ordre. Relativité
restreinte simulée : chaque vaisseau a son temps propre, et les
machines se voient avec le retard de la lumière.

## Ce que ça donne pour l'instant

Le monde meurt. Mesuré sur un banc de dix univers : à 60 heures
simulées il ne meurt plus, à 180 heures il meurt encore. Chaque tour
de boucle est une mesure, pas un correctif : rejouer une seed, lire
les compteurs (machines à sec, épaves, naissances), rouvrir l'issue.

![Le pont en mouvement](/portfolio/dev/lab/lightfall/bridge.webm)

