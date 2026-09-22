# Anatole

> Flashcards à répétition espacée. Anciennement jeveuxmonbrevet.

![Status](https://img.shields.io/badge/status-Live-blue)

## Aperçu

Parti comme un petit truc pour ma fille qui passait le Brevet.
Sauf que quand je m'amuse à construire un projet, j'ai tendance à
m'emballer, résultat c'est devenu une vraie app déployée, toutes
les matières du Brevet en répétition espacée.

Le Brevet est passé. En juillet 2026 l'app a pivoté vers des
flashcards généralistes et pris le nom Anatole : culture générale,
scolaire jusqu'au lycée, et mes propres decks (climat, électricité
et chaux pour la réno). Premier utilisateur : moi. Le produit se
construit sur mon usage réel.

Philosophie « UI zen / textes qui piquent » : interface épurée,
formulations qui ne prennent personne de haut.

![](dashboard_screenshot.webp)

![](card.webm)

## Fonctionnalités

- **Répétition espacée** — FSRS, notation 4 boutons à la Anki
- **Mode Auto** — budget de cartes dynamique, s'adapte au rythme
- **Gamification** — streaks, XP, niveaux de maîtrise, confettis sur les "Facile"
- **Clavier first** — espace pour retourner, 1-4 pour noter
- **Mobile** — coque Capacitor, rappel quotidien « X cartes à réviser »
  calculé à l'avance sur l'appareil, zéro backend de notifications
- **PWA + Google OAuth** — hors-ligne, progression synchronisée

## Stack

- Nuxt 4 · Vue 3 · TypeScript
- Supabase (PostgreSQL + Google OAuth)
- Nuxt Content (decks JSON statiques)
- Capacitor (coque mobile, notifications locales)
- KaTeX (rendu mathématique)
- Netlify

## Statut

En ligne sur [app-anatole.fr](https://app-anatole.fr), v2.3.0. Le
constat qui pilote la suite, noté dans le journal : sans
notification, on n'ouvre pas l'app.
