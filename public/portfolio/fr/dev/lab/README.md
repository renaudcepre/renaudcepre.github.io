# Le laboratoire

> Rien ici n'est fini. C'est pas vraiment le but non plus.

Dans `projects/` il y a des trucs qui marchent et que des gens
utilisent. Ici c'est le reste : des explorations, des simulations, des
questions que je traîne. Certaines avancent, d'autres sont en pause.

## Le bingo

Un pote a un bingo pour quand je lui dis « j'ai une idée » : graphe,
hexagones, émergent, tests. Le pire c'est qu'il gagne à chaque fois.

Mais à force de poser ces projets côte à côte, je crois que le fil
rouge est ailleurs. Les graphes et les tests, c'est l'outillage. Ce qui
revient tout le temps, c'est l'émergence : plein d'agents, des règles
simples, et regarder ce qui se passe. Le jeu de la vie, en gros.
[The Commons Arena](https://github.com/renaudcepre/the-commons-arena),
c'est la version théorie des jeux. [hexmap](hexmap.md), la version
météo. [lightfall](lightfall.md), la version habitée.

## Le code est écrit avec Claude, autant le dire

Une partie de ces projets touche des domaines où j'ai aucun bagage —
la géophysique d'hexmap, typiquement. Le code, c'est Claude qui
l'écrit. Moi je pilote. Ça pose une vraie question : si je sais pas
écrire le code, comment je sais qu'il est pas faux ?

C'est devenu ma règle de travail : pas besoin de savoir l'écrire, mais
il faut que je puisse dire quand c'est faux. Concrètement : des
invariants testés (si un total d'eau dérive dans hexmap, un test
gueule), des mesures plutôt que des impressions, et un journal de bord
qui note les erreurs et les pivots autant que ce qui marche. Je viens
de la musique : le sampling a posé la même question il y a trente ans.
La réponse a été la même — le talent se déplace de l'instrument vers
l'oreille.
