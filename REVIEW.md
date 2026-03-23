# Code Review — Portoide

## Haute priorite

- [x] **`useBreakpoint` non SSR-safe** — Accès direct à `window` hors lifecycle hook. Wraper dans `onMounted`, initialiser le ref à `false`.
- [x] **Interfaces `Track`/`Album` dupliquées** — Définies dans `useAudioPlayer.ts` ET `AudioPlayer.vue`. Extraire dans `app/types/audio.ts`.
- [x] **`formatTime()` dupliquée** — Même fonction dans `AudioPlayer.vue` et `PlayerBar.vue`. Extraire dans `app/utils/format.ts`.
- [x] **Constante `CHARS` dupliquée** — Identique dans `useScrambleHover.ts`, `useScrambleReveal.ts`, `useQuote.ts`. Extraire dans `app/utils/scramble.ts`.

## Moyenne priorite

- [x] **`portfolio.ts` monolithique** — Themes, tokenizers, types, font dans un seul fichier. Splitter en `utils/themes.ts`, `utils/tokenizers.ts`, `utils/types.ts`.
- [ ] **Keyboard handlers dispersés** — Raccourcis dans 4 fichiers différents (`[...path].vue` x2, `EditorPane.vue`, `useTheme.ts`). Centraliser dans un composable `useKeyboardShortcuts`.
- [ ] **Pas de gestion d'erreur data fetching** — `usePortfolioFiles.ts` ignore le `error` de `useAsyncData` et le `$fetch` n'a pas de try/catch.
- [ ] **Styles non-scopés `EditorPane.vue`** — `<style>` global au lieu de `<style scoped>`. Passer en scoped avec `:deep()` pour les sélecteurs `v-html`.
- [ ] **Double `onMounted` dans `[...path].vue`** — Deux hooks séparés (lignes 14 et 67). Fusionner en un seul.
- [ ] **Page `[...path].vue` trop chargée** — 135 lignes de logique (tabs, routing, shortcuts, sidebar, audio). Extraire dans un composable `useEditorLayout` ou `usePortfolioNavigation`.

## Basse priorite

- [ ] **Module-level state dans `useAudioPlayer.ts`** — State global via variables module au lieu de `useState()` Nuxt. Migrer vers `useState` ou Pinia pour la compatibilité SSR.
- [ ] **Module-level state dans `useSpectrumAnalyser.ts`** — `connectedElements` WeakSet au niveau module. Même problème.
- [ ] **Inline styles partout** — Tous les composants utilisent `:style` avec les valeurs de `C`. Généraliser l'approche CSS custom properties (déjà utilisée pour les scrollbars dans `useTheme.ts`) à toutes les couleurs du thème.
- [ ] **Cast `as any` dans `EditorPane.vue:336`** — Pour les CSS custom properties dans `:style`. Augmenter le type `CSSProperties` ou utiliser un helper typé.
- [ ] **Double cast `as unknown as` dans `portfolio.ts:130`** — `getAnsiFg()` retourne `C.ansi as unknown as Record<number, string>`. Aligner les types directement.
- [ ] **Audio preload sans cleanup dans `AudioPlayer.vue`** — Les éléments `Audio` créés pour les métadonnées ne sont jamais cleanup dans `onUnmounted`.
- [ ] **`fileIcon()` appelée 2x dans le template `Netrw.vue`** — Une fois pour `v-if`, une fois pour `:src`. Cacher via computed ou variable locale.
- [ ] **Nom mono-mot `Netrw.vue`** — Viole la règle essentielle Vue. Renommer en `NetrwExplorer` ou `FileNetrw`.
- [ ] **Non-null assertion `Netrw.vue:239`** — `fileIcon(node.name)!` protégé par `v-if` mais reste un anti-pattern.
- [ ] **Supprimer `base.jsx`** — Dead code (backup React) à la racine du projet.
- [ ] **Commentaire sécurité sur `v-html`** — `EditorPane.vue` utilise `v-html` à deux endroits. Documenter que le contenu est trusted (portfolio files only).
- [ ] **Variable mal nommée `useQuote.ts:29`** — `frameId` est un retour de `setInterval`, pas de `requestAnimationFrame`.