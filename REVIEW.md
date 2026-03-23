# Code Review — Portoide

## Haute priorite

- [x] **`useBreakpoint` non SSR-safe** — Accès direct à `window` hors lifecycle hook. Wraper dans `onMounted`, initialiser le ref à `false`.
- [x] **Interfaces `Track`/`Album` dupliquées** — Définies dans `useAudioPlayer.ts` ET `AudioPlayer.vue`. Extraire dans `app/types/audio.ts`.
- [x] **`formatTime()` dupliquée** — Même fonction dans `AudioPlayer.vue` et `PlayerBar.vue`. Extraire dans `app/utils/format.ts`.
- [x] **Constante `CHARS` dupliquée** — Identique dans `useScrambleHover.ts`, `useScrambleReveal.ts`, `useQuote.ts`. Extraire dans `app/utils/scramble.ts`.

## Moyenne priorite

- [x] **`portfolio.ts` monolithique** — Themes, tokenizers, types, font dans un seul fichier. Splitter en `utils/themes.ts`, `utils/tokenizers.ts`, `utils/types.ts`.
- [x] **Keyboard handlers dispersés** — Raccourcis dans 4 fichiers différents (`[...path].vue` x2, `EditorPane.vue`, `useTheme.ts`). Centraliser dans un composable `useKeyboardShortcuts`.
- [x] **Pas de gestion d'erreur data fetching** — `usePortfolioFiles.ts` ignore le `error` de `useAsyncData` et le `$fetch` n'a pas de try/catch.
- [x] **Styles non-scopés `EditorPane.vue`** — `<style>` global au lieu de `<style scoped>`. Passer en scoped avec `:deep()` pour les sélecteurs `v-html`.
- [x] **Double `onMounted` dans `[...path].vue`** — Deux hooks séparés (lignes 14 et 67). Fusionner en un seul.
- [x] **Page `[...path].vue` trop chargée** — 135 lignes de logique (tabs, routing, shortcuts, sidebar, audio). Extraire dans un composable `useEditorLayout` ou `usePortfolioNavigation`.

## Basse priorite

- [ ] **Module-level state dans `useAudioPlayer.ts`** — State global via variables module au lieu de `useState()` Nuxt. Migrer vers `useState` ou Pinia pour la compatibilité SSR.
- [ ] **Module-level state dans `useSpectrumAnalyser.ts`** — `connectedElements` WeakSet au niveau module. Même problème.
- [ ] **Inline styles partout** — Tous les composants utilisent `:style` avec les valeurs de `C`. Généraliser l'approche CSS custom properties (déjà utilisée pour les scrollbars dans `useTheme.ts`) à toutes les couleurs du thème.
- [x] **Cast `as any` dans `EditorPane.vue:336`** — Pour les CSS custom properties dans `:style`. Remplacé par array style binding avec `Record<string, string>`.
- [x] **Double cast `as unknown as` dans `portfolio.ts:130`** — `getAnsiFg()` retourne `C.ansi as unknown as Record<number, string>`. Aligné via `ThemeColors` mapped type.
- [x] **Audio preload sans cleanup dans `AudioPlayer.vue`** — Les éléments `Audio` créés pour les métadonnées sont maintenant cleanup dans `onUnmounted` et au changement d'album.
- [x] **`fileIcon()` appelée 2x dans le template `Netrw.vue`** — Icon calculé une fois dans `tree` computed, stocké dans `node.icon`.
- [x] **Nom mono-mot `Netrw.vue`** — Renommé en `NetrwExplorer.vue`.
- [x] **Supprimer `base.jsx`** — Dead code supprimé.
- [x] **Commentaire sécurité sur `v-html`** — `EditorPane.vue` : deux `v-html` documentés avec trust model (contenu statique portfolio uniquement).
- [x] **Variable mal nommée `useQuote.ts:29`** — `frameId` renommé en `scrambleId`.