# hexmap

> Simulateur de monde émergent sur grille hexagonale. Automate
> cellulaire géophysique : rivières, microclimats et saisons émergent
> de règles locales de propagation.

![Status](https://img.shields.io/badge/status-en_pause-yellow) ![Repo](https://img.shields.io/badge/repo-privé-lightgrey)

## Le truc

Rust. ~500 hexagones, double-buffering (l'ordre des cellules n'influence
pas le résultat), déterminisme total par seed. Le modèle est un
**terrarium** : monde clos, eau et énergie conservées — si un total
dérive, c'est un bug, et un test le dit avant moi.

## L'aveu

Je n'ai pas les compétences en physique pour écrire ça. Ni en météo, ni
en érosion. Le code est largement écrit par Claude, que j'ai dirigé vers
les études et les modèles. La question intéressante n'est donc pas
« est-ce que je sais l'écrire ? » (non) mais « **est-ce que je peux dire
si c'est faux ?** ». C'est devenu le vrai sujet du projet.

## L'appareil de vérification

- **Invariants de conservation** testés en continu (eau, énergie)
- **5 outils de diagnostic structurel** : clusters de nuages,
  attracteurs de pluie, flux d'eau, cycles temporels, bassins
  versants — des mesures chiffrées, pas des impressions visuelles
- **Des hypothèses qui meurent face aux données** : l'hypothèse
  « cellule-lac » a été invalidée par mesure directe (0 des 6
  attracteurs suspects étaient des lacs). Même outillage qui a révélé
  que la simulation était strictement périodique d'une année sur
  l'autre (corrélation 0.998) — diagnostic chiffré, issue ouverte,
  plan de correction posé

## Statut

En pause — proprement : tag `v0.6.1-pause`, issues triées honnêtement
(« mieux vaut un état honnête qu'un faux nettoyage »), point de reprise
documenté avec sa métrique de validation déjà installée. Pas un
abandon : un arrêt daté et motivé.
