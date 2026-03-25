# jeveuxmonbrevet

> Application de flashcards pour les collégiens préparant le Brevet.

![Status](https://img.shields.io/badge/status-Live-blue)

## Aperçu

J'ai construit ça pour ma fille qui va passer le Brevet
— l'examen de fin de collège.
C'était censé être un petit truc. Mais j'ai tendance à m'emballer
quand je m'amuse à construire quelque chose — du coup c'est devenu
une vraie app déployée avec de vrais utilisateurs. Je me suis même
surpris à l'utiliser régulièrement parce que c'est honnêtement
un bon moyen de rafraîchir sa culture générale.

Outil d'apprentissage par répétition espacée couvrant toutes les matières du Brevet —
Histoire, Géographie, Maths, Français, Sciences, EMC. Construit autour d'une philosophie
« UI zen / textes savoureux » : interface minimaliste, textes piquants qui parlent
aux ados sans être condescendants.

![](dashboard_screenshot.webp)

![](card.webm)

## Fonctionnalités

- **Répétition espacée** — algorithme SM-2, notation 4 boutons style Anki
- **Mode Auto** — budget dynamique de cartes qui s'adapte au rythme d'apprentissage
- **Gamification** — streaks, XP, niveaux de maîtrise, confettis sur les ratings "Facile"
- **Clavier d'abord** — espace pour retourner, 1-4 pour noter
- **PWA** — fonctionne hors-ligne, installable sur mobile
- **Google OAuth** — progression synchronisée au backend par utilisateur

## Stack

- Nuxt 4 · Vue 3 · TypeScript
- Supabase (PostgreSQL + Google OAuth)
- Nuxt Content (fichiers JSON statiques de flashcards)
- KaTeX (rendu mathématique)
- Netlify

## Statut

En ligne sur [jeveuxmonbrevet.com](https://jeveuxmonbrevet.com) — v0.1.21, activement développé.
