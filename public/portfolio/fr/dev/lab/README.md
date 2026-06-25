# Le laboratoire

> Rien ici n'est fini.

Dans `projects/` il y a des trucs qui marchent et que des gens
utilisent. Ici c'est le reste : des explorations, des simulations, des
questions que je traîne.

## Le bingo

Un pote a un bingo pour quand je lui dis « j'ai une idée » : graphe,
hexagones, émergent, tests. Il gagne à chaque fois.

Cela dit, en posant ces projets côte à côte, le fil rouge est plus
simple que ça. Ce qui revient tout le temps, c'est l'émergence : plein
d'agents, des règles simples, et regarder ce qui se passe.
[The Commons Arena](https://github.com/renaudcepre/the-commons-arena)
en version théorie des jeux, [hexmap](hexmap.md) en version météo,
[lightfall](lightfall.md) en version jeu.

## Le code est écrit avec Claude

Une partie de ces projets touche des domaines où j'ai aucun bagage,
la géophysique d'hexmap typiquement. Le code, c'est Claude qui
l'écrit. Si je sais pas écrire le code, comment je sais qu'il est
pas faux ?

Ma règle : pouvoir dire quand c'est faux. Des invariants testés (si
un total d'eau dérive dans hexmap, un test échoue), des mesures
plutôt que des impressions, et un journal de bord qui note aussi les
erreurs et les pivots.
