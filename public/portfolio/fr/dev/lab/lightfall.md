# Lightfall

> Jeu spatial 2D pixel art, asynchrone et lent (5 min/jour suffisent).
> Univers procédural, économie de NPC autonome.

![Status](https://img.shields.io/badge/status-exploration_active-brightgreen) ![Repo](https://img.shields.io/badge/repo-privé-lightgrey)

## Le truc

Backend Rust autoritatif : axum, WebSocket binaire (Protobuf), event
sourcing, architecture hexagonale. Front React + PixiJS. Les NPC
passent par les systèmes joueurs : vrais astres générés, vraie
déplétion des gisements, vrais cycles de minage. Des mineurs
alimentent des dépôts, des convois circulent, des gisements
s'épuisent.

## Le pivot

Pendant des semaines le code a dérivé vers la fidélité physique :
relativité simulée, gravité, retard lumière. Au playtest, la gravité
ajoutait de la friction et aucune décision de jeu. Tout est coupé
(gravité off, light-time parqué) et la règle est notée dans le
journal : avant d'ajouter de la sim, nommer la décision de jeu
qu'elle crée.

## La question ouverte

L'émergence demande du monde, et un jeu indie n'a pas de foule. Piste
actuelle : gagner le solo d'abord, avec l'économie NPC comme monde
vivant, façon Dwarf Fortress. Le multijoueur en gradient : traces
asynchrones partagées d'abord, monde commun ensuite.

## Statut

Exploration active. ~16k lignes de Rust, clippy pedantic en
`-D warnings`, journal tenu commit par commit.
