# Yorkshire Technologies Incorporated

> Site vitrine rétro, maquette web de 2004 assumée. Zéro framework,
> zéro dépendance de rendu.

![Status](https://img.shields.io/badge/status-Live-blue) [![Site](https://img.shields.io/badge/site-yti--website.pages.dev-blue)](https://yti-website.pages.dev)

## Le truc

Un projet à deux, avec un pote. Une fausse boîte de tech dont le
manifeste tient en une ligne : on construit des projets pour la
recherche, le fun, l'optimisation, et surtout pour la légende et la
gloire du Yorkshire terrier. Le reste du manifeste : « Time does not
matter. We procrastinate. »

Le site est un terrain de jeu. Un tore ASCII qui tourne en page
d'accueil, un manège de projets dont un seul existe, un zine, un
séquenceur, et SAM, le synthétiseur vocal de 1982, qui lit le site à
voix haute et chante.

Sous le capot : Vite, TypeScript strict, Web Components natifs en
light DOM. Tout le visuel est du canvas procédural écrit à la main,
le WebGL propre est justement le piège. Les grosses données ASCII
sont générées par script avec assertions, jamais retapées. Build
GitLab CI, déployé sur Cloudflare Pages.

## Thalweg dedans

Le seul cheval du manège qui existe pour de vrai :
[thalweg](/dev/lab/thalweg.md), le moteur Rust compilé en
WebAssembly, tourne plus bas dans la page. Le monde de chaque
visiteur dort dans son IndexedDB.

## Statut

En ligne, projet dominant de l'été 2026. Procrastination illimitée
assumée, c'est dans le manifeste.
