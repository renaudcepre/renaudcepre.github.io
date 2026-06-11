# Lightfall

> Jeu spatial 2D pixel art, asynchrone et lent (5 min/jour suffisent).
> Univers procédural, et une économie de NPC qui tourne — que quelqu'un
> regarde ou non.

![Status](https://img.shields.io/badge/status-exploration_active-brightgreen) ![Repo](https://img.shields.io/badge/repo-privé-lightgrey)

## Le truc

Backend **Rust autoritatif** : axum, WebSocket binaire (Protobuf),
event sourcing (la vérité est un log d'events append-only, l'état chaud
se reconstruit par replay), architecture hexagonale. Front React +
PixiJS. Et un principe pour les NPC : **ils ne trichent pas** — ils
passent par les systèmes joueurs (vrais astres générés, vraie déplétion
des gisements, vrais cycles de minage). Des mineurs alimentent des
dépôts, des convois circulent, des gisements s'épuisent.

## L'histoire intéressante : tuer sa feature préférée

Pendant des semaines, le code a dérivé vers la fidélité physique :
relativité simulée, gravité n-corps, retard lumière. Au playtest, le
constat : la gravité ajoutait de la friction et **aucune décision de
jeu**. Pivot documenté dans le journal : gravité coupée, light-time
parqué, et un garde-fou écrit noir sur blanc — *avant d'ajouter de la
simulation, nommer la décision de jeu qu'elle crée*. C'est l'entrée de
journal dont je suis le plus fier, et elle ne contient pas une ligne
de code.

## La question ouverte

L'émergence a besoin d'une foule — qu'un jeu indie n'aura pas tôt.
La piste actuelle : gagner le solo d'abord (l'économie NPC comme monde
vivant, façon Dwarf Fortress), et faire du multijoueur un **gradient** :
traces asynchrones partagées d'abord, monde commun ensuite, seulement
si le cœur solo tient.

## Statut

Exploration active. ~16k lignes de Rust, clippy pedantic en `-D
warnings`, journal de bord tenu commit par commit — pivots et erreurs
compris.
