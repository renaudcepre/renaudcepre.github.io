# 42 School — Projets C / C++

> Du bas niveau, du vrai. Mémoire, graphes, VMs, sécu, appels système — à la dure.

![42](https://img.shields.io/badge/42-School-blue)

C'est vieux. Le code est sûrement atroce.
Mais c'est là que j'ai compris comment un ordi marche pour de vrai.

---

## malloc [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/malloc)

Réimplémentation de `malloc`, `realloc` et `free` en C.
Ça passe mes tests, ça tourne sur pas mal de programmes — mais les gros
logiciels comme vim finissent par segfault. Honnêtement c'est pas fou,
mais le construire m'a énormément appris sur la gestion mémoire bas niveau,
et par extension sur tous les langages qui reposent sur le C.

## Corewar [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/corewar)

*avec [rgermain](https://github.com/remigermain) & [loiberti](https://github.com/loiberti)*

Une arène virtuelle où des champions (écrits en assembleur) se battent
en écrasant la mémoire des autres. Projet de groupe — j'ai fait
l'assembleur (messages d'erreur à la clang) et le visualiseur SDL.
Ma première fois en graphisme C, et j'y suis allé à fond :
le rendu est propre, y'a un mode plein écran années 80, et c'est
même **sonore**. Le code doit être terrifiant, mais les perfs
étaient au rendez-vous et visuellement c'était dingue.

## Snow Crash [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/snow-crash)

Reverse engineering et sécurité. Exploitation de binaires,
shellcode, analyse ELF, debugging, assembleur, scripting Perl/Python/shell.
Du CTF en guise d'intro à la sécu offensive.

## Abstract VM [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/abstract-vm)

Mon premier projet C++. Une VM simple qui interprète des programmes
en langage assembleur basique — pile, opérandes typés (int8 à double),
arithmétique, assertions, et une commande dump.

## ft_ls [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/ft_ls)

Réimplémentation de `ls`. Premiers pas en prog système — parcours
de filesystem, appels stat, permissions Unix, tri, formatage.
Basique mais fondateur.

## Lem-in [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/lemin)

Parcours de graphes. Faire passer N fourmis d'un point A à un point B
dans un graphe arbitraire, en un minimum de tours — deux fourmis
ne peuvent pas être dans la même salle en même temps. Le vrai défi :
trouver la meilleure combinaison de chemins nœud-disjoints — pas juste
le plus court, mais l'ensemble qui minimise le temps total de traversée.

On précalcule une matrice de compatibilité : pour chaque paire de chemins,
on regarde s'ils partagent des salles, et on encode ça en un bit
dans un `__uint128_t`. Ensuite une recherche récursive explore
les combinaisons valides en ANDant des bitmasks — une seule opération
bitwise élague des branches entières. Chaque combinaison survivante
est scorée en simulant la répartition des fourmis, et la meilleure gagne.

Celui-là a failli nous achever. Je comprends plus une seule ligne
du code qu'on a pondu — des matrices de bitmasks 128 bits et du bitwise
dans tous les sens. Truc absolument crâne-fondant.

---

Et plein d'autres — ft_printf, libft (réimplémentation de la stdlib),
une réimplémentation partielle de la STL C++ (vector, array...),
des projets réseau, et j'en passe. Deux ans de C et C++ à la dure :) .

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
