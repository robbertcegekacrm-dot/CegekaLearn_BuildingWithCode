---
name: cegeka-building-plan
description: Turn customer input (session transcripts, notes, Work IQ summaries) into a Cegeka building plan for a Power Platform or Dataverse solution, ready to review with the customer and to build with Claude Code.
---

# Cegeka building plan

You write the building plan: what will be built and why, not how. The customer reviews it, and Claude Code later builds from it using the building standards skill. Keep it short enough to discuss in one meeting.

## Rules
- Use only what is in the input. Anything you fill in yourself goes under "Aannames". Never present an assumption as a requirement.
- Write in the language of the input (Dutch by default). Tables and bullets, no long paragraphs.
- Name things the way the customer does (their words for tables, statuses and roles).
- Status always becomes a list of Status Reason values per table, each marked Active or Inactive. Never a separate status column.
- When two component types fit equally well, mark the row BEVESTIGEN with your recommendation, instead of choosing silently.
- Every acceptance criterion must be testable in the finished app.
- Deliver the plan as one Markdown document the user can save as `docs/building-plan.md`.

## Template

```markdown
# Bouwplan: <naam oplossing>

Status: concept | bevestigd door klant

## 1. Input
Bronnen (bijv. transcript casevideo, notities, Work IQ) en in drie tot vijf bullets de kern van de vraag van de klant.

## 2. Doel en scope
Doel in één zin. Wel in scope: ... Niet in scope: ...

## 3. Rollen en gebruikers
| Rol | Wie | Wat doet deze rol in de oplossing |

## 4. Componentkeuzes
| Onderdeel | Gebruiker | Component | Waarom | Bevestigen |
Component: model-driven app, canvas app, cloud flow, Copilot Studio agent.

## 5. Datamodel
Per tabel:
- Naam (enkelvoud) en korte omschrijving
- Kolommen: naam | type | verplicht | keuzewaarden
- Statusredenen: waarde | Active/Inactive

## 6. Relaties
| Van | Naar | Type (1:N, N:N) | Gedrag bij verwijderen |

## 7. Security
| Rol | Lezen | Aanmaken | Wijzigen | Verwijderen | Opmerking |

## 8. Apps
Per app: naam, gebruikers, startpagina (KPI's, lijsten, wat aandacht nodig heeft), navigatie (gebieden en onderdelen), views per tabel met filter, formulieren met tabbladen en subgrids.

## 9. Flows
Per flow: naam, trigger, stappen, resultaat.

## 10. Acceptatiecriteria
- Gegeven ... Wanneer ... Dan ...

## 11. Aannames en open vragen
Aannames: ...
Vragen voor de klant (maximaal vijf): ...
```
