# 42 School — C / C++ Projects

> Low-level programming from my time at 42 Lyon.
> Memory, graphs, VMs, security, system calls — the hard way.

![42](https://img.shields.io/badge/42-School-blue)

These are old projects. The code is probably terrible.
But they taught me how computers actually work.

---

## malloc [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/malloc)

Reimplementation of `malloc`, `realloc` and `free` in C.
All the tests I wrote pass, it works on many programs — but
big software like vim eventually segfaults. Honestly it
doesn't work that well, but building it was incredibly
valuable for understanding memory management at a low level,
and by extension every language built on top of C.

## Corewar [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/corewar)

*with [rgermain](https://github.com/remigermain) & [loiberti](https://github.com/loiberti)*

A virtual arena where champions (written in assembly) fight
by writing over each other's memory. Group project — I built
the assembler (with clang-like error messages) and the SDL
visualizer. First time doing graphics in C, and I went all in:
the visualizer is gorgeous, has an 80's fullscreen mode, and
it's even **sonore**. The code is probably horrifying but the
performance was great and it looked amazing.

## Snow Crash [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/snow-crash)

Reverse engineering and security project. Binary exploitation,
shellcode, ELF analysis, debugging, assembly, Perl/Python/shell
scripting. A CTF-style introduction to offensive security.

## Abstract VM [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/abstract-vm)

My first C++ project. A simple virtual machine that interprets
programs written in a basic assembly language — stack-based,
with typed operands (int8 to double), arithmetic operations,
assertions, and a dump command.

## ft_ls [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/ft_ls)

Reimplementation of the `ls` command. First steps into system
programming — filesystem traversal, stat calls, Unix permissions,
sorting, formatting. Basic but foundational.

## Lem-in [![Gitlab](https://img.shields.io/badge/gitlab-repo-orange?logo=gitlab)](https://gitlab.com/rcepre/lemin)

Graph traversal project. Route N ants from a start room to an
end room through an arbitrary graph in the fewest turns possible,
where no two ants can occupy the same room at once. The core
challenge is finding the optimal combination of node-disjoint
paths — not just the shortest path, but the best set of
non-overlapping ones that minimizes total throughput time.

We precompute a compatibility matrix: for every pair of paths,
check whether they share intermediate rooms, and encode the
result as a single bit in a `__uint128_t`. Then a recursive
search explores valid combinations by AND-ing bitmasks together
— one bitwise operation prunes entire branches of the search
space at once. Each surviving combination is scored by
simulating ant distribution across its paths, and the best one
wins.

This one nearly killed us. I can't understand a single line of
the code we wrote back then — 128-bit bitmask matrices and
bitwise operators everywhere. Absolute brain-melting experience.

---

And many others — ft_printf, libft (stdlib reimplementation),
a partial reimplementation of the C++ STL (vector, array...),
networking projects, and more. Two years of C and C++ the hard way :) .

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
