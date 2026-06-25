# hexmap

> Automate cellulaire géophysique sur grille hexagonale. Des règles
> locales de propagation, et des rivières, des microclimats et des
> saisons qui émergent.

![Status](https://img.shields.io/badge/status-en_pause-yellow) ![Repo](https://img.shields.io/badge/repo-privé-lightgrey)

## Le truc

Rust. ~500 hexagones, double-buffering, déterministe à partir d'un
seed. Le monde est un terrarium : clos, eau et énergie conservées.
Si un total dérive, c'est un bug, et un test échoue.

## L'aveu

J'ai pas les compétences en physique pour écrire ça, ni en météo, ni
en érosion. Le code est largement écrit par Claude, dirigé vers les
bons modèles. Du coup la question du projet c'est pas « est-ce que je
sais l'écrire » mais « est-ce que je peux dire quand c'est faux ».

## La vérification

- des invariants de conservation testés en continu (eau, énergie)
- 5 outils de diagnostic : clusters de nuages, attracteurs de pluie,
  flux d'eau, cycles, bassins versants. Des chiffres, pas des
  impressions visuelles
- des hypothèses testées contre les données : l'hypothèse
  « cellule-lac » est tombée en mesure directe (0 lac sur les 6
  cellules suspectes). Le même outillage a montré une simulation
  quasi périodique d'une année sur l'autre (corrélation 0.998),
  issue ouverte, fix spécifié

## Statut

En pause depuis mai 2026 : tag `v0.6.1-pause`, issues triées, point
de reprise documenté avec sa métrique de validation.
