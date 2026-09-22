# thalweg

> Monde géophysique émergent sur grille hexagonale, en Rust. Des
> règles locales sur une cellule et ses six voisines, et des rivières,
> des lacs et des saisons qui émergent.

![Status](https://img.shields.io/badge/status-actif-brightgreen) [![Github](https://img.shields.io/badge/github-thalweg-blue?logo=github)](https://github.com/renaudcepre/thalweg)

## Le truc

Pas de joueur, pas d'objectif, rien à gagner. Je voulais un monde qui
tourne tout seul, et regarder ce qu'il fait. Pour l'instant ça donne
des rivières qui creusent leur lit, des lacs qui se remplissent et se
vident, de la neige qui tient sur les faces nord et fond sur les
faces sud, des forêts qui mettent deux siècles à atteindre le climax.
Rien n'est dessiné. Le terrain sort d'une seed, le reste sort de la
physique.

Rust, ~6200 hexagones, un tick = une heure, double-buffering,
déterministe à partir d'un seed. Le monde est un terrarium : clos,
eau et énergie conservées. Si un total dérive, c'est un bug, et un
test échoue. La physique est écrite en unités SI strictes, W/m², Pa,
constantes nommées et sourcées dans le code.

Le même moteur compile en WebAssembly et tourne dans le navigateur
avec un front three.js. Il est embarqué dans
[le site de Yorkshire Tech](/dev/projects/yti/README.md). Le plan :
le faire tourner ici aussi.

## L'aveu

J'ai pas les compétences en physique pour écrire ça, ni en météo, ni
en érosion. Le code est largement écrit par Claude, dirigé vers les
bons modèles. Du coup la question du projet c'est pas « est-ce que je
sais l'écrire » mais « est-ce que je peux dire quand c'est faux ».

## La vérification

- des invariants de conservation testés en continu (eau, énergie)
- des outils de diagnostic : clusters de nuages, attracteurs de pluie,
  flux d'eau, cycles, bassins versants. Des chiffres, pas des
  impressions visuelles
- des hypothèses testées contre les données : l'hypothèse
  « cellule-lac » est tombée en mesure directe (0 lac sur les 6
  cellules suspectes)
- un pont MCP : depuis une session Claude, on interroge la simulation
  qui tourne

## Statut

Actif. Repris en juillet 2026 après deux mois de pause, publié en
miroir MIT sous le nom thalweg (v0.13.0 en septembre). Cap : des
agents sur la carte, pour voir s'ils s'organisent. Le sol n'est pas
prêt pour ça.
