# Screenshots en media checklist

Zet elk bestand in de map `img/` met **exact** deze bestandsnaam (PNG, bij voorkeur 1600 px breed). De site toont het automatisch; zolang het bestand ontbreekt, zie je een placeholder met deze beschrijving.

Deze lijst wordt gegenereerd met `node tools/generate-screenshots-md.js` (vinkjes = bestand staat al in de repo).

## Algemeen

| | Bestand | Wat moet erop te zien zijn |
|---|---|---|
| [ ] | `img/cegeka-logo.svg` | Officieel Cegeka-logo (gekleurde versie) voor de header. Zonder dit bestand toont de site de tekst "Cegeka". |
| [ ] | `video/hardware-manager-case.mp4` | De casevideo van Mark, de Hardware Manager (MP4, H.264). Module 0, stap 1. |
| [ ] | `img/skills-mappenstructuur.png` | Skills-pagina: de Explorer in VS Code met .claude/skills en daarin de mappen cegeka-building-plan en cegeka-building-standards, elk met een SKILL.md. |

## Module 0 – Welkom

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m0-s2-eindresultaat-app.png` | Wat ga je bouwen? | De model-driven app Hardware Manager met een medewerkerformulier, daarop de gekoppelde apparaten en een bestelactiviteit in de tijdlijn. |
| [ ] | `img/m0-s3-aanpak-plan-bouw.png` | De aanpak: eerst plannen, dan bouwen | Schema van de aanpak: input (video, notities, Work IQ), bouwplan, review met klant, bouwen met Claude Code en skills, testen. |

## Module 1 – Voorbereiding

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m1-s1-versies-terminal.png` | Controleer je installaties | De terminal in VS Code met de output van node -v, git --version, pac en claude --version, alle vier zonder fouten. |
| [ ] | `img/m1-s2-vscode-extensies.png` | Installeer de VS Code-extensies | Het Extensions-paneel in VS Code met Power Platform Tools en Claude Code allebei geïnstalleerd. |
| [ ] | `img/m1-s3-claude-login.png` | Meld je aan bij Claude | De terminal met Claude Code na een geslaagde login: de welkomstmelding met het aangemelde account. |
| [ ] | `img/m1-s4-github-login.png` | Meld je aan bij GitHub | Het Accounts-menu linksonder in VS Code met het aangemelde GitHub-account. |

## Module 2 – Het bouwplan maken

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m2-s1-input-verzamelen.png` | Verzamel je input | Een map met het transcript van de casevideo, een notitiebestand en de Work IQ-samenvatting. |
| [ ] | `img/m2-s2-chat-met-input.png` | Open Copilot of Claude chat | Een nieuwe chat in Claude of Copilot met het transcript, de notities en (bij Copilot) SKILL.md als bijlagen. |
| [ ] | `img/m2-s3-bouwplan-resultaat.png` | Voer de bouwplan-prompt uit | Het gegenereerde bouwplan in de chat met de negen hoofdstukken, met het datamodel als tabel zichtbaar. |
| [ ] | `img/m2-s4-building-plan-md.png` | Review het plan en sla het op | Het bestand building-plan.md geopend in VS Code met de Markdown-preview ernaast. |

## Module 3 – Je project klaarzetten

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m3-s1-github-nieuwe-repo.png` | Maak een GitHub-repo en clone hem | Het scherm Create a new repository op GitHub met naam hardware-manager, Private en Add a README file aangevinkt. |
| [ ] | `img/m3-s2-mappenstructuur.png` | Maak de mappenstructuur | De Explorer in VS Code met de mappen .claude/skills, docs en solution en het bestand README.md. |
| [ ] | `img/m3-s3-docs-building-plan.png` | Zet het bouwplan in docs/ | De Explorer met docs/building-plan.md geselecteerd en de Markdown-preview geopend. |
| [ ] | `img/m3-s4-skills-mappen.png` | Zet de Cegeka skills in .claude/skills/ | De Explorer met .claude/skills/cegeka-building-plan/SKILL.md en .claude/skills/cegeka-building-standards/SKILL.md uitgeklapt. |
| [ ] | `img/m3-s5-claude-md.png` | Maak CLAUDE.md | CLAUDE.md geopend in VS Code met de ingevulde omgeving-URL, solutionnaam en publisher prefix. |
| [ ] | `img/m3-s6-eerste-commit-github.png` | Maak je eerste commit | De repo op github.com met de mappen .claude, docs, het bestand CLAUDE.md en de eerste commit-melding. |

## Module 4 – Verbinden met Dataverse

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m4-s1-pac-auth-create.png` | Maak een PAC-verbinding | De terminal met de output van pac auth create en pac auth list, met de actieve verbinding naar de dev-omgeving gemarkeerd. |
| [ ] | `img/m4-s2-pac-org-who.png` | Controleer met pac org who | De output van pac org who met Org URL, Unique Name, User en Environment ID van de dev-omgeving. |
| [ ] | `img/m4-s3-nieuwe-solution.png` | Maak of kies de publisher en solution | Het paneel New solution in make.powerapps.com met naam HardwareManager en de publisher met prefix cgk geselecteerd. |

## Module 5 – Bouwen met Claude Code

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m5-s1-claude-start.png` | Start Claude Code | Claude Code gestart in de terminal van VS Code, in de map hardware-manager, met de twee Cegeka skills in de lijst. |
| [ ] | `img/m5-s2-implementatieplan.png` | Eerste prompt: lezen en plannen | Claude Code in de terminal tijdens het lezen van CLAUDE.md, de skills en het bouwplan, en daarna docs/implementation-plan.md geopend in de editor. |
| [ ] | `img/m5-s3-plan-review.png` | Review het implementatieplan | docs/implementation-plan.md naast docs/building-plan.md in VS Code (split view) voor de review. |
| [ ] | `img/m5-s4-datamodel-tabellen.png` | Bouw het datamodel | De solution HardwareManager in make.powerapps.com met de nieuwe tabellen (Apparaat, Onboarding, Bestelling) en hun kolommen. |
| [ ] | `img/m5-s5-relaties.png` | Leg de relaties aan | Het tabblad Relationships van de tabel Apparaat met de relatie naar medewerker (lookup) zichtbaar. |
| [ ] | `img/m5-s6-model-driven-app.png` | Bouw de model-driven app | De model-driven app Hardware Manager met de navigatie links (Apparaten, Medewerkers, Onboardings, Bestellingen) en een lijstweergave van apparaten. |
| [ ] | `img/m5-s7-flows.png` | Bouw de onboarding- en bestelflow | De solution met de twee cloud flows (Onboarding en Bestelling) en de flow designer van de onboardingflow met trigger en stappen. |
| [ ] | `img/m5-s8-review-tabel.png` | Bouw de bestelactiviteit en review | Claude Code met de reviewtabel: eis of standaard, status, bewijs en voorstel, met een paar punten op afwijking. |

## Module 6 – Deployen en testen

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m6-s1-pac-import.png` | Pak in en importeer via de PAC CLI | De terminal met de output van pac solution pack en pac solution import, eindigend met een geslaagde import. |
| [ ] | `img/m6-s2-app-geopend.png` | Open de app in de omgeving | De Hardware Manager-app geopend in de browser, met het dashboard of de lijst met apparaten als startpagina. |
| [ ] | `img/m6-s3-testscenario-tijdlijn.png` | Test het scenario van Mark | Het formulier van een bestelling met de gekoppelde onboarding en medewerker, en de bestelactiviteit zichtbaar in de tijdlijn. |

## Module 7 – Afronden

| | Bestand | Stap | Wat moet erop te zien zijn |
|---|---|---|---|
| [ ] | `img/m7-s1-git-log.png` | Laatste commit en push | De output van git log --oneline met de commits per bouwstap, van projectstructuur tot afronding. |
| [ ] | `img/m7-s2-vergelijking.png` | Vergelijk het resultaat met het bouwplan | docs/building-plan.md naast de app, of een opleververslag met per hoofdstuk de status klaar, afwijking of ontbreekt. |
| [ ] | `img/m7-s3-bonus-dashboard.png` | Reflecteer en doe een bonusuitdaging | Een bonusresultaat: het dashboard in de Hardware Manager-app met een grafiek van apparaten per status. |

---

Totaal: 34 screenshots, 1 logo en 1 video.

**Tips**

- Gebruik een schone demo-omgeving zonder klantnamen of persoonsgegevens.
- Verberg tokens, wachtwoorden en tenant-ID's (blur of crop).
- Zoom VS Code in (Ctrl + =) zodat tekst leesbaar is op de site.
- Markeer de belangrijkste knop of regel eventueel met een kader in Cegeka Blue (#00C7F9).
