# jeveuxmonbrevet

> Application de flashcards pour les collégiens préparant le Brevet.

![Status](https://img.shields.io/badge/status-Live-blue)

## Aperçu

J'ai fait ça pour ma fille qui passe le Brevet
— l'examen de fin de collège.
C'était censé être un petit truc. Sauf que quand je m'amuse
à construire un projet, j'ai tendance à m'emballer — résultat,
c'est devenu une vraie app déployée avec de vrais utilisateurs.
Je me suis même surpris à l'utiliser moi-même régulièrement,
c'est honnêtement pas mal pour se rafraîchir la culture G.

Révisions par répétition espacée sur toutes les matières du Brevet —
Histoire, Géo, Maths, Français, Sciences, EMC. Philosophie
« UI zen / textes qui piquent » : interface épurée, formulations
qui parlent aux ados sans les prendre de haut.

![](dashboard_screenshot.webp)

![](card.webm)

## Fonctionnalités

- **Répétition espacée** — algo SM-2, notation 4 boutons à la Anki
- **Mode Auto** — budget de cartes dynamique, s'adapte au rythme
- **Gamification** — streaks, XP, niveaux de maîtrise, confettis sur les "Facile"
- **Clavier first** — espace pour retourner, 1-4 pour noter
- **PWA** — marche hors-ligne, installable sur mobile
- **Google OAuth** — progression synchronisée par utilisateur

## Stack

- Nuxt 4 · Vue 3 · TypeScript
- Supabase (PostgreSQL + Google OAuth)
- Nuxt Content (fichiers JSON statiques de flashcards)
- KaTeX (rendu mathématique)
- Netlify

## Statut

En ligne sur [jeveuxmonbrevet.com](https://jeveuxmonbrevet.com) — v0.1.21, activement développé.
