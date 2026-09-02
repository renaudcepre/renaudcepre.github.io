## 2026-09-02 — chore: fichier de validation Google Search Console

Ajout de public/google34e621da30da2acf.html pour valider la propriété
https://renaudcepre.github.io/ dans Search Console (compte Renaud). But :
soumettre le sitemap de la doc apte (/apte/sitemap.xml), la propriété racine
couvre les sous-chemins. Ne jamais supprimer ce fichier, Google revérifie.

# Journal de bord

## 2026-08-08 — feat(seo): passage en SSG, le site n'était plus une coquille vide pour les robots

Renaud demande un "gros check SEO" en repartant de la décision de juin
(mémoire `project_blog_seo_ssg`) : portoide était une SPA pure (`ssr: false`),
donc tout robot sans JS (previews Twitter/Slack/LinkedIn, la plupart des
scrapers) voyait un `<body>` vide, sans même un `<title>`. Vérifié en prod
via `curl` avant de toucher au code : `<body><div id="__nuxt"></div>...`,
rien d'autre. Pas de `robots.txt`, pas de `sitemap.xml` non plus.

**Décision** : plutôt qu'un patch cosmétique, faire le passage en SSG prévu
"plus tard" par la mémoire de juin. Le code était déjà largement prêt pour
ça (accès `window`/`document`/`localStorage` déjà tous derrière `onMounted`
ou `import.meta.server` dans les composables), donc le pari de flip
`ssr:false` → SSR + prerender semblait raisonnable.

**Pivots pendant l'implémentation** (rien n'a marché du premier coup) :
- Le contenu par fichier (`usePortfolioFiles.loadContent`) est chargé par un
  `watch(..., { immediate: true })` sur le client, jamais awaited par le SSR
  → le HTML prérendu aurait eu la structure mais pas le texte de l'article.
  Fix : `onServerPrefetch` dédié dans `usePortfolioNavigation`, qui attend la
  même promesse que `usePortfolioFiles` (exposée via `filesReady`) avant de
  charger le fichier actif.
- Le fetch de contenu (`$fetch(entry.path)` vers `/portfolio/**` dans
  `public/`) renvoyait des 404 en boucle pendant le prerender avec le preset
  `github_pages` : `public/` n'est copié dans `.output/public` qu'*après* la
  passe de prerender, donc les assets statiques n'existent pas encore côté
  serveur interne au moment du fetch. Fix : nouvelle route serveur
  `server/routes/portfolio-content.get.ts` qui lit directement depuis le
  `public/` source (pas la destination du build), utilisée seulement côté
  serveur.
- `AudioPlayer.vue` faisait `new Audio()` dans un `watch(..., {immediate:
  true})` → crash SSR (`Audio` n'existe pas côté Node) sur toute page
  audio. Vu la logique de détection de pistes disponibles déjà fragile (cf.
  entrée du 07/08), pas touché à cette logique : `AudioPlayer` est
  maintenant rendu dans un `<ClientOnly>` dans `EditorPane.vue`, comme avant
  côté UX, juste jamais tenté côté SSR.
- Aucun `<a href>` réel dans l'explorateur de fichiers (tout est `@click`),
  donc le crawler de Nitro ne découvre aucune route par lui-même. Liste de
  routes à prérendre générée explicitement dans `nuxt.config.ts` à partir des
  YAML de `content/portfolio/**` (parsing maison, pas de dépendance YAML
  ajoutée — les fichiers sont plats, `key: value`).
- `nuxt typecheck` cassait sur les nouveaux fichiers `server/` : pas de
  `@types/node` dans le projet (jamais eu besoin de Node natif côté serveur
  avant). Ajouté en devDependency.

**Reste non résolu, pas bloquant** : le build affiche deux `EEXIST` non
fatals sur `/en/hello-world.html` et `/fr/hello-world.html` (`mkdir` sur un
chemin où un fichier existe déjà) — écriture concurrente de la page et de
son `_payload.json`, cause exacte pas identifiée. `failOnError: false` sur
le prerender absorbe ça, le build sort en exit 0 et le contenu final est
correct (vérifié fichier par fichier après build). À creuser si ça devient
gênant un jour.

**Ajouté aussi** : titre/description/OG/canonical par page (nouveaux champs
optionnels `title`/`description` dans `content.config.ts`, remplis pour
l'article `blog/apte.md` pour l'instant, le reste retombe sur le générique
i18n) ; `robots.txt` ; `sitemap.xml` généré dynamiquement
(`server/routes/sitemap.xml.get.ts`) à partir de la même liste de routes.

**Pas fait, à faire à la main** : le canonical de l'article Dev.to pointe
toujours vers Dev.to (décision de juin, tant que portoide n'était pas
crawlable). Le code est prêt côté portoide (canonical vers
`renaudcepre.github.io`), mais rebasculer le canonical *sur Dev.to* est une
édition d'un article déjà publié sur une plateforme externe — pas fait
depuis ici.

**Pas vérifié** : `nuxt dev` en local n'a pas pu être testé proprement dans
cet environnement — un processus externe au projet ping `/diagnostics` en
boucle dès le démarrage du serveur et casse le canal IPC de vite-node dès
que le SSR est sollicité (`ssr:false` masquait ce problème puisque le SSR ne
tournait jamais en dev). Le build de prod (`nuxt build --preset
github_pages`), lui, a été vérifié en détail (contenu, meta, hydration
guards). À tester avec `pnpm dev` en dehors de ce sandbox avant de considérer
le sujet clos.

## 2026-08-07 — fix(audio): boucle infinie dans la détection de fichiers audio manquants

Renaud signale que Mistral Vibe (commit `bf42019`, "Hide play buttons for
albums without audio files") a cassé la lecture audio : "No audio files
available" sur les albums en navigant dans le site, alors qu'un reload direct
sur l'URL de l'album fonctionne.

**Pistes explorées et écartées** (avant de trouver la vraie cause) :
- fichiers `.webm` mal encodés / duration manquante → non, `ffprobe` montre
  une durée correcte, et Chromium/WebKit chargent les métadonnées sans
  problème.
- Safari incompatible avec le conteneur WebM/Opus → non vérifiable
  directement (pas de Safari.app dans l'environnement de test), mais le
  moteur WebKit de Playwright rapporte `canPlayType` = "probably" sur cette
  version de macOS, donc peu probable.
- assets manquants en prod (build `github_pages`, cache CDN) → non, `curl` et
  Playwright confirment que les fichiers présents sont servis correctement
  en prod avec le bon `Content-Type`.

**Cause réelle** : `onMetadataError` dans `AudioPlayer.vue` faisait
`el.src = ''` sur l'élément `<audio>` déjà en erreur pour "nettoyer" — mais
le listener `error` restait attaché, donc ça redéclenchait un nouvel
événement `error`, qui rappelait le handler, qui refaisait `el.src = ''` :
boucle infinie. Sous Firefox cette boucle est synchrone et gèle le thread JS
dès qu'un seul fichier audio référencé dans un `.antres` manque — ce qui est
le cas dans les 3 albums (1 piste manquante sur 2 pour Reterraform, 5/6 pour
Space Dust, 3/3 pour Junkyard). Une fois le thread gelé, plus aucune
navigation SPA ne s'exécute : d'où "ça marche au reload direct, plus après
avoir cliqué ailleurs".

Repro confirmée sur le site live avec Firefox réel (via Playwright) :
des milliers de messages "Invalid URI. Load of media resource failed" par
seconde, en boucle continue, y compris sans aucune navigation. Le fix
supprime simplement le `el.src = ''` dans `onMetadataError` (le cleanup au
changement d'album / démontage s'en charge déjà correctement).

Reste non résolu, pas un bug : sur 11 pistes au total à travers les 3
albums, seules 2 ont un fichier audio réellement présent dans le repo
(inchangé depuis la migration de mars 2026). Le message "No audio files
available" pour Junkyard est donc correct en l'état.
