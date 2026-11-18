# Agentic bouwen in het Power Platform

Trainingsportaal (Nederlands) in Microsoft Learn-stijl en Cegeka-huisstijl. De site opent op een startpagina met alle trainingen. De eerste training is actief: deelnemers bouwen de **Hardware Manager**-case in Dataverse met VS Code, Claude Code, GitHub en de PAC CLI. Canvas apps en Power Pages staan klaar als "binnenkort".

Werkwijze: deelnemers bouwen vanuit een gesprek met Claude. Ze typen geen commando's; Claude voert Git- en PAC CLI-acties uit op basis van de building standards skill en de deelnemer keurt goed.

Plain HTML, CSS en JavaScript. Geen build-stap, geen dependencies.

## Structuur

```
index.html                         Single-page app met hash-routing (#trainingen, #start, #m3-s2, #skills, ...)
assets/css/style.css               Layout en Cegeka-huisstijl (Nunito Sans, Cegeka Blue)
assets/js/content.js               ALLE inhoud: trainingen, modules, stappen, prompts, woordenlijst, config
assets/js/app.js                   Logica: startpagina, sidebar, voortgang, kopieerknoppen, tips, certificaat
content/transcript-overleg-mark.txt  Fictief transcript van de intake met Mark (input voor het bouwplan)
skills/cegeka-building-plan/SKILL.md       Skill voor het bouwplan (gebruikt in de chat, module 2)
skills/cegeka-building-standards/SKILL.md  Skill met bouwstandaarden (in het project, module 3 tot 6)
img/                               Logo, icoon, achtergrondfoto, certificaatillustratie en screenshots
video/                             hardware-manager-case.mp4 (introvideo, nog toe te voegen)
screenshots.md                     Checklist van alle screenshots met bestandsnaam en omschrijving
tools/generate-screenshots-md.js   Genereert screenshots.md opnieuw uit content.js
```

## Inhoud aanpassen

Alles staat in `assets/js/content.js`:

- `CONFIG`: titel, solutionnaam, prefix, skills, transcript, link naar de voorbereidingshandleiding, pad naar de video.
- `TRAININGS`: de kaarten op de startpagina. Zet `active: true` en een `href` als een nieuwe training klaar is.
- `PROMPTS`: alle voorbeeldprompts met tip. Een stap verwijst ernaar met `{ text, prompt: 'id' }`.
- `MODULES`: modules en stappen (doel, acties, tip, screenshot, controle, hulp). Module 0 (`info: true`) is alleen om te lezen en telt niet mee voor de voortgang. `certLabel` is de tekst op het certificaat.
- `GLOSSARY`: de woordenlijst.

Skills en transcript worden door de site ingelezen en via kopieerknoppen aangeboden; wijzig ze dus alleen in hun eigen bestand.

## Screenshots en video toevoegen

1. Zet de bestanden in `img/` en `video/` met exact de namen uit `screenshots.md`.
2. Ververs de pagina: de placeholder verdwijnt vanzelf.
3. `node tools/generate-screenshots-md.js` vinkt de aanwezige bestanden af.

## Lokaal bekijken

De site laadt skills en transcript met `fetch`, dus gebruik een simpele webserver in plaats van het bestand direct te openen:

```
npx serve .
```

## Hosten

**GitHub Pages:** push de repo, ga naar *Settings > Pages*, kies *Deploy from a branch*, branch `main`, map `/ (root)`. Het bestand `.nojekyll` staat er al. Let op: bij een private repo is Pages alleen beschikbaar met een betaald GitHub-plan, en de site zelf is dan alsnog openbaar tenzij je organisatie *private Pages* ondersteunt.

**SharePoint:** SharePoint Online toont `.html`-bestanden uit een documentbibliotheek als download in plaats van als webpagina. Host op GitHub Pages of Azure Static Web Apps en embed de URL met het *Embed*-webonderdeel op een SharePoint-pagina (het domein moet op de lijst met toegestane domeinen staan), of zet alleen een link vanaf SharePoint.

## Voortgang en certificaat

Voortgang en de naam op het certificaat worden per browser opgeslagen in `localStorage` (sleutel `cegeka-ccd-training-v1`). Er gaat niets naar een server. Het certificaat is altijd te downloaden als PNG en toont welke onderdelen zijn afgerond.
