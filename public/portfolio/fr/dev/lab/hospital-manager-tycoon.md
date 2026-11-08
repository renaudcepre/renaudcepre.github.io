# hospital-manager-tycoon

> Trame de planning pour une équipe d'infirmiers anesthésistes. Un cycle
> de 1 à 12 semaines, une ligne par personne, toutes les règles de la
> cadre, et chacun pile à ses heures.

![Status](https://img.shields.io/badge/status-arrêté-red) ![Repo](https://img.shields.io/badge/repo-privé-lightgrey)

## Le truc

Une cadre de santé de mon entourage devait sortir une trame annuelle
pour 20 personnes : 18 IADE, 2 IDE, des temps pleins et des 80 %.
Blocs de week-end, nuits suivies de deux repos, 44 h max sur 7 jours
glissants, 12 h entre deux postes, deux repos par semaine, et 37,5 h
de moyenne sur le cycle.

Le solveur est CP-SAT (OR-Tools), en trois phases : les week-ends,
puis les heures exactes, puis le reste. Le front dessine la meilleure
trame trouvée pendant que ça calcule, avec un bouton stop. Export
PDF, versions, prévisionnel à 15 jours réparé avec le minimum de
changements.

Trois jours de travail, du 4 au 6 novembre 2026.

![La trame sur 12 semaines, une ligne par personne](/portfolio/dev/lab/hospital-manager-tycoon/roster.webp)

## Comment j'ai bossé

Le code est écrit par Claude Code, dirigé par moi. J'ai fait les recherches et l'état de l'art.
Un vérificateur indépendant du solveur repasse
chaque règle sur chaque solution, et un audit écrit pour chaque règle
le cas le plus serré comme un calcul à refaire à la main. Tests avec
[apte](https://github.com/renaudcepre/apte), couverture 100 % sur les
modules purs, ty en strict.

![L'audit, règle par règle](/portfolio/dev/lab/hospital-manager-tycoon/audit.webp)

## Ce que le solveur a tranché

L'équipe devait voter entre « une nuit puis deux repos » et « deux
nuits puis deux repos », parce que la première option rendait les
heures soi-disant impossibles. Calculé : les deux tiennent, avec zéro
écart aux heures dues pour les 20 personnes.

Un canon (chaque ligne est celle du dessus décalée d'une semaine)
sort en une seconde. Il n'est juste entre temps pleins et 80 % qu'en
doublant les nuits du week-end, 36 h de doublons par semaine.

## Statut

La direction a fait son canon de 9 semaines à la main, sans regarder
les PDF. L'app n'a pas servi. Repo privé, parce que la doc contient
les règles et les citations d'une vraie équipe.
