# Expérience

## Araiko
**Mars 2025 → aujourd'hui**

Backend Python sur une plateforme de gestion de connaissances augmentée par IA (Generic RAG).
~110 PRs mergées sur l'année, contributeur principal côté backend.

- Conception et implémentation complète du système de tracking et analytics utilisateurs
- Refactoring en profondeur : migration Pydantic Settings, injection de dépendances avec Unit of Work modulaire, hiérarchie d'exceptions métier unifiée
- Infra Kubernetes : mise en place du HPA en production, optimisation Celery (pool prefork, concurrency, connexions DB fraîches par worker), connection pooling PostgreSQL
- Pipeline média complet : ordering, naming automatique, stockage S3-first, conversion audio, validation de types
- Migration du chatbot et du vector store vers Pydantic AI, mise en place du framework d'evals LLM
- Observabilité : intégration Logfire, passage au logging standard Python, suppression des faux positifs

`FastAPI` `Celery` `Kubernetes` `PostgreSQL` `Pydantic AI` `LlamaIndex` `S3` `Logfire` `Docker`

---

## Autajon
**Mai 2024 → Janvier 2025**

Modernisation de legacy. Conception d'une nouvelle architecture from scratch et construction
d'une couche d'abstraction propre au-dessus de l'ERP existant, pour que les nouveaux services
puissent être développés sans toucher au code legacy.

`FastAPI` `Nuxt` `PostgreSQL` `Architecture hexagonale` `Docker`

---

## Ponant Technologies
**Mai 2022 → Octobre 2023**

Conception d'un framework unifié de tests fonctionnels pour des dispositifs hardware variés.
Construction d'une couche d'abstraction hardware pour que les ingénieurs puissent écrire
des scripts de test simples et haut niveau au lieu de gérer directement les spécificités hardware.
Mise en place d'un pipeline CI/CD complet avec Jenkins pour les tests hardware-in-the-loop.

`Python` `C` `C++` `Jenkins` `CI/CD` `pytest`

---

## Groupe Bernard
**Stage — 6 mois**

Développement backend sur un ERP interne : suivi budgétaire, commandes, demandes d'investissement, factures.
Revues de sécurité.

`Java`

---

## École 42 Lyon
**2018 → Octobre 2021**

École d'ingénierie logicielle en peer-to-peer. Tronc commun complété,
stage de 6 mois, et branche algorithmie. Niveau 16.

Projets notables : Core War (machine virtuelle + assembleur en C), réimplémentation de malloc / printf / libc,
Abstract-VM (machine à pile en C++), et divers projets algorithmiques.

`C` `C++` `Algorithmie` `Théorie des graphes` `Assembleur`
