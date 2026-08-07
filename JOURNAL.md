# Journal de bord

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
