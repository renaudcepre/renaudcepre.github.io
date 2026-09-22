# Anatole

> Spaced-repetition flashcards. Formerly jeveuxmonbrevet.

![Status](https://img.shields.io/badge/status-Live-blue)

## Overview

Started as a small thing for my daughter who was taking the Brevet,
the French end-of-middle-school exam. But I tend to get carried away
when I'm having fun building something, so it turned into a real
deployed app, every Brevet subject in spaced repetition.

The Brevet is over. In July 2026 the app pivoted to general-purpose
flashcards and took the name Anatole: general knowledge, school
curriculum up to high school, and my own decks (climate, electrical
work and lime for the renovation). First user: me. The product is
built on my actual usage.

"Chill UI / Savage Copy" philosophy: minimal interface, copy that
doesn't talk down to anyone.

![Anatole dashboard: card decks by subject, each showing its card count and how many are due for review](dashboard_screenshot.webp)

![A maths flashcard, question on the front, flipping over to reveal the answer](card.webm)

## Features

- **Spaced repetition** — FSRS, 4-button Anki-style grading
- **Auto mode** — dynamic card budget, adapts to your pace
- **Gamification** — streaks, XP, mastery levels, confetti on "Easy"
- **Keyboard first** — space to flip, 1-4 to grade
- **Mobile** — Capacitor shell, daily "X cards due" reminder
  computed ahead of time on the device, no notification backend
- **PWA + Google OAuth** — offline, progress synced

## Stack

- Nuxt 4 · Vue 3 · TypeScript
- Supabase (PostgreSQL + Google OAuth)
- Nuxt Content (static JSON decks)
- Capacitor (mobile shell, local notifications)
- KaTeX (math rendering)
- Netlify

## Status

Live at [app-anatole.fr](https://app-anatole.fr), v2.3.0. The finding
that drives what's next, noted in the journal: without a
notification, nobody opens the app.
