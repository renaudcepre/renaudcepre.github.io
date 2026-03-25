# 42 School — Projets C / C++

> Programmation bas niveau de mon passage à 42 Lyon.
> Mémoire, graphes, VMs, sécurité, appels système — à la dure.

![42](https://img.shields.io/badge/42-School-blue)

Ce sont de vieux projets. Le code est probablement horrible.
Mais ils m'ont appris comment les ordinateurs fonctionnent vraiment.

---

## malloc [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/malloc)

Réimplémentation de `malloc`, `realloc` et `free` en C.
Tous les tests que j'ai écrits passent, ça marche sur beaucoup de programmes — mais
les gros logiciels comme vim finissent par segfault. Honnêtement ça
ne marche pas si bien que ça, mais le construire a été incroyablement
formateur pour comprendre la gestion mémoire à bas niveau,
et par extension chaque langage construit au-dessus du C.

## Corewar [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/corewar)

*avec [rgermain](https://github.com/remigermain) & [loiberti](https://github.com/loiberti)*

Une arène virtuelle où des champions (écrits en assembleur) se battent
en écrasant la mémoire des autres. Projet de groupe — j'ai construit
l'assembleur (avec des messages d'erreur style clang) et le
visualiseur SDL. Première fois que je faisais du graphisme en C, et j'ai tout donné :
le visualiseur est magnifique, a un mode plein écran années 80, et
il est même **sonore**. Le code est probablement horrifiant mais les
performances étaient super et le rendu incroyable.

## Snow Crash [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/snow-crash)

Projet de reverse engineering et sécurité. Exploitation de binaires,
shellcode, analyse ELF, debugging, assembleur, scripting Perl/Python/shell.
Une introduction style CTF à la sécurité offensive.

## Abstract VM [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/abstract-vm)

Mon premier projet en C++. Une machine virtuelle simple qui interprète
des programmes écrits dans un langage assembleur basique — basé sur une pile,
avec des opérandes typés (int8 à double), opérations arithmétiques,
assertions, et une commande dump.

## ft_ls [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/ft_ls)

Réimplémentation de la commande `ls`. Premiers pas en programmation
système — parcours de système de fichiers, appels stat, permissions Unix,
tri, formatage. Basique mais fondateur.

## Lem-in [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/lemin)

Projet de parcours de graphes. Acheminer N fourmis d'une salle de départ
à une salle d'arrivée à travers un graphe arbitraire en un minimum de tours,
sachant que deux fourmis ne peuvent pas occuper la même salle en même temps.
Le défi principal est de trouver la combinaison optimale de chemins
nœud-disjoints — pas juste le plus court chemin, mais le meilleur ensemble
de chemins non-chevauchants qui minimise le temps total de passage.

On précalcule une matrice de compatibilité : pour chaque paire de chemins,
on vérifie s'ils partagent des salles intermédiaires, et on encode le
résultat comme un seul bit dans un `__uint128_t`. Ensuite une recherche
récursive explore les combinaisons valides en faisant des AND de bitmasks
— une seule opération bit à bit élague des branches entières de l'espace
de recherche. Chaque combinaison survivante est évaluée en simulant
la distribution des fourmis sur ses chemins, et la meilleure gagne.

Celui-là a failli nous tuer. Je ne comprends plus une seule ligne du
code qu'on a écrit à l'époque — des matrices de bitmasks 128 bits et
des opérateurs bitwise partout. Expérience absolument fondante pour le cerveau.

---

Et beaucoup d'autres — ft_printf, libft (réimplémentation de la stdlib),
une réimplémentation partielle de la STL C++ (vector, array...),
des projets réseau, et plus encore. Deux ans de C et C++ à la dure :) .

```
# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    42-school.md                                       :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: rcepre  rcepre@student.42.fr               +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/01/01 00:00:42 by rcepre            #+#    #+#              #
#    Updated: 2026/03/23 13:37:42 by rcepre           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #
```
