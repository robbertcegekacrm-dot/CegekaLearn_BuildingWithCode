# Screenshots en media checklist

Zet elk bestand in de map `img/` met **exact** deze bestandsnaam (PNG, bij voorkeur 1600 px breed). De site toont het automatisch; zolang het bestand ontbreekt, zie je een placeholder met deze beschrijving.

Deze lijst wordt gegenereerd met `node tools/generate-screenshots-md.js` (vinkjes = bestand staat al in de repo).

## Algemeen

| | Bestand | Wat moet erop te zien zijn |
|---|---|---|
| [x] | `img/cegeka-logo.png` | Officieel Cegeka-logo (gekleurde versie) voor de header en het certificaat. Favicon: `img/cegeka-icon.png`. |
| [ ] | `video/hardware-manager-case.mp4` | De casevideo van Mark, de Hardware Manager (MP4, H.264). Module 0, stap 1. |
| [ ] | `img/skills-mappenstructuur.png` | Skills-pagina: de Explorer in VS Code met .claude/skills/cegeka-building-standards/SKILL.md. |

## Module 0 – Introductie

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m0-s2-eindresultaat-app.png` | Wat ga je bouwen? | De model-driven app Hardware Manager met een medewerkerformulier, daarop de gekoppelde apparaten en een bestelactiviteit in de tijdlijn. |
| [ ] | `img/m0-s3-aanpak-plan-bouw.png` | De aanpak: eerst plannen, dan bouwen | Schema van de aanpak: input (transcript, notities, Work IQ), bouwplan, review met klant, bouwen met Claude Code en skills, testen. |

## Module 1 – Voorbereiding

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m1-s1-power-platform-tools.png` | Installeer de Power Platform Tools | Het Extensions-paneel in VS Code met Power Platform Tools van Microsoft geïnstalleerd, en het Power Platform-icoon in de linkerbalk. |
| [ ] | `img/m1-s2-klaar-voor-de-start.png` | Laat Claude controleren of je klaar bent | Het Claude Code-paneel met de samenvatting: versies van Node.js, Git en pac, en de ingestelde Git-naam en e-mail. |

## Module 2 – Het bouwplan maken

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m2-s2-chat-met-input.png` | Open Copilot of Claude chat | Een nieuwe chat in Claude of Copilot met de geplakte building plan skill en het transcript in het berichtveld. |
| [ ] | `img/m2-s3-bouwplan-resultaat.png` | Voer de bouwplan-prompt uit | Het gegenereerde bouwplan in de chat met de elf hoofdstukken, met het datamodel als tabel zichtbaar. |
| [ ] | `img/m2-s4-plan-kopieren.png` | Review het plan en kopieer het | Het definitieve bouwplan in de chat, met de kopieerknop van het Markdown-blok gemarkeerd. |

## Module 3 – Je project klaarzetten

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m3-s1-projectmap-geopend.png` | Maak je projectmap | VS Code met de lege map hardware-manager geopend in de Explorer. |
| [ ] | `img/m3-s2-bestanden-in-project.png` | Plak je bouwplan en de skill in je project | De Explorer in VS Code met docs/building-plan.md en .claude/skills/cegeka-building-standards/SKILL.md, met het geplakte bouwplan geopend. |
| [ ] | `img/m3-s3-projectstructuur.png` | Laat Claude de projectstructuur maken | De Explorer met .claude/skills/cegeka-building-standards/SKILL.md, docs/building-plan.md en de map solution, met daarnaast de samenvatting van Claude. |
| [ ] | `img/m3-s4-claude-md.png` | Laat Claude CLAUDE.md maken | CLAUDE.md geopend in VS Code met de ingevulde omgeving-URL, solutionnaam HardwareManager en publisher prefix cgk. |
| [ ] | `img/m3-s5-publish-branch.png` | Eerste commit en publiceren op GitHub | Het Source Control-paneel in VS Code met de knop Publish Branch en de keuze voor een private repository. |

## Module 4 – Verbinden met Dataverse

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m4-s1-verbonden-met-omgeving.png` | Laat Claude verbinden met je dev-omgeving | Het Claude Code-paneel met de bevestiging van de verbinding: omgeving-URL, omgevingsnaam en aangemeld account. |
| [ ] | `img/m4-s2-solution-klaar.png` | Laat Claude de publisher en solution klaarzetten | make.powerapps.com met de solution Hardware Manager in de lijst, en in VS Code de map solution/ met de opgehaalde solution. |

## Module 5 – Bouwen met Claude Code

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m5-s1-skills-check.png` | Controleer of Claude de skill kent | Het Claude Code-paneel in het project hardware-manager met de samenvatting van de building plan skill en de building standards skill. |
| [ ] | `img/m5-s2-implementatieplan.png` | Eerste prompt: lezen en plannen | Claude Code in de terminal tijdens het lezen van CLAUDE.md, de building standards skill en het bouwplan, en daarna docs/implementation-plan.md geopend in de editor. |
| [ ] | `img/m5-s3-plan-review.png` | Review het implementatieplan | docs/implementation-plan.md naast docs/building-plan.md in VS Code (split view) voor de review. |
| [ ] | `img/m5-s4-datamodel-tabellen.png` | Bouw het datamodel | De solution HardwareManager in make.powerapps.com met de nieuwe tabellen (Apparaat, Onboarding, Bestelling) en hun kolommen. |
| [ ] | `img/m5-s5-relaties.png` | Leg de relaties aan | Het tabblad Relationships van de tabel Apparaat met de relatie naar medewerker (lookup) zichtbaar. |
| [ ] | `img/m5-s6-model-driven-app.png` | Bouw de model-driven app | De model-driven app Hardware Manager met de navigatie links (Apparaten, Medewerkers, Onboardings, Bestellingen) en een lijstweergave van apparaten. |
| [ ] | `img/m5-s7-flows.png` | Bouw de onboarding- en bestelflow | De solution met de twee cloud flows (Onboarding en Bestelling) en de flow designer van de onboardingflow met trigger en stappen. |
| [ ] | `img/m5-s8-startpagina.png` | Bouw de startpagina en review | De startpagina van de Hardware Manager-app: KPI-tegels bovenaan, de lijst Wat aandacht nodig heeft en de laatste bestellingen, in de stijl van de app. |

## Module 6 – Deployen en testen

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m6-s1-deploy-geslaagd.png` | Laat Claude de solution deployen | Het Claude Code-paneel met de samenvatting van de deploy: gecontroleerde omgeving, ingepakte solution en geslaagde import. |
| [ ] | `img/m6-s2-app-geopend.png` | Open de app in de omgeving | De Hardware Manager-app geopend in de browser, met de startpagina met KPI-tegels en de lijst Wat aandacht nodig heeft. |
| [ ] | `img/m6-s3-testscenario-tijdlijn.png` | Test het scenario van Mark | Het formulier van een bestelling met de gekoppelde onboarding en medewerker, en de bestelactiviteit zichtbaar in de tijdlijn. |

## Module 7 – Afronden

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m7-s1-commitgeschiedenis.png` | Laatste commit en push | Het Claude Code-paneel met de commitgeschiedenis: een commit per bouwstap, van projectstructuur tot afronding. |
| [ ] | `img/m7-s2-vergelijking.png` | Vergelijk het resultaat met het bouwplan | docs/building-plan.md naast de app, of een opleververslag met per hoofdstuk de status klaar, afwijking of ontbreekt. |
| [ ] | `img/m7-s3-bonus-agent.png` | Reflecteer en doe een bonusuitdaging | Een bonusresultaat: de Copilot-agent voor Mark die antwoord geeft op de vraag welke apparaten een medewerker heeft. |

---

Totaal: 29 screenshots, 1 logo en 1 video.

**Tips**

- Gebruik een schone demo-omgeving zonder klantnamen of persoonsgegevens.
- Verberg tokens, wachtwoorden en tenant-ID's (blur of crop).
- Zoom VS Code in (Ctrl + =) zodat tekst leesbaar is op de site.
- Markeer de belangrijkste knop of regel eventueel met een kader in Cegeka Blue (#00C7F9).
