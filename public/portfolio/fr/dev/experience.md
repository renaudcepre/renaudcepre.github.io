# Expérience

## Araiko
**Mars 2025 → aujourd'hui**

Backend Python sur une plateforme de gestion de connaissances augmentée par IA (Generic RAG).
~110 PRs mergées sur l'année, principal contributeur backend.

- Conçu et monté le système complet de tracking et analytics utilisateurs
- Gros refacto : migration Pydantic Settings, DI avec Unit of Work modulaire, hiérarchie d'exceptions métier unifiée
- Infra Kubernetes : HPA en prod, tuning Celery (pool prefork, concurrency, connexions DB fraîches par worker), connection pooling PostgreSQL
- Pipeline média de bout en bout : ordering, nommage auto, stockage S3-first, conversion audio, validation de types
- Migration du chatbot et du vector store vers Pydantic AI, mise en place du framework d'evals LLM
- Observabilité : intégration Logfire, passage au logging standard Python, nettoyage des faux positifs

`FastAPI` `Celery` `Kubernetes` `PostgreSQL` `Pydantic AI` `LlamaIndex` `S3` `Logfire` `Docker`

---

## Autajon
**Mai 2024 → Janvier 2025**

Modernisation de legacy. Nouvelle architecture from scratch, couche d'abstraction propre
par-dessus l'ERP existant — pour pouvoir développer de nouveaux services sans toucher au vieux code.

`FastAPI` `Nuxt` `PostgreSQL` `Architecture hexagonale` `Docker`

---

## Ponant Technologies
**Mai 2022 → Octobre 2023**

Framework unifié de tests fonctionnels pour du hardware varié.
Couche d'abstraction pour que les ingénieurs écrivent des scripts de test haut niveau
sans se soucier des spécificités matérielles. Pipeline CI/CD complet avec Jenkins
pour du hardware-in-the-loop.

`Python` `C` `C++` `Jenkins` `CI/CD` `pytest`

---

## Groupe Bernard
**Stage — 6 mois**

Backend sur un ERP interne : suivi budgétaire, commandes, demandes d'investissement, factures.
Revues de sécurité.

`Java`

---

## École 42 Lyon
**2018 → Octobre 2021**

École de dev sans profs ni cours — tout en peer-to-peer. Tronc commun bouclé,
stage de 6 mois, branche algorithmie. Niveau 16.

Projets notables : Core War (VM + assembleur en C), réimplémentation de malloc / printf / libc,
Abstract-VM (machine à pile en C++), et pas mal de projets d'algo.

`C` `C++` `Algorithmie` `Théorie des graphes` `Assembleur`
