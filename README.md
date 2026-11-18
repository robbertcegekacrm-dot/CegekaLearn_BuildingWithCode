# Agentic bouwen in het Power Platform

Responsive trainingswebsite (Nederlands) in Microsoft Learn-stijl en Cegeka-huisstijl. Deelnemers bouwen de **Hardware Manager**-case in Dataverse met VS Code, Claude Code, GitHub en de PAC CLI.

Werkwijze: deelnemers bouwen vanuit een gesprek met Claude. Ze typen geen commando's; Claude voert Git- en PAC CLI-acties uit op basis van de building standards skill en de deelnemer keurt goed.

Plain HTML, CSS en JavaScript. Geen build-stap, geen dependencies.

## Structuur

```
index.html                  Single-page app (hash-routing: #/stap/m3-s2, #/skills, ...)
assets/css/style.css        Layout en Cegeka-huisstijl (Nunito Sans, Cegeka Blue)
assets/js/content.js        ALLE inhoud: modules, stappen, prompts, woordenlijst, config
assets/js/app.js            Logica: sidebar, voortgang, kopieerknoppen, badges, certificaat
img/                        Screenshots (zie screenshots.md), cegeka-logo.png en cegeka-icon.png (favicon)
video/                      hardware-manager-case.mp4 (casevideo van Mark)
skills/<skill-naam>/SKILL.md  De twee Cegeka skills (nu placeholders)
screenshots.md              Checklist van alle screenshots met bestandsnaam en omschrijving
tools/generate-screenshots-md.js  Genereert screenshots.md opnieuw uit content.js
```

## Inhoud aanpassen

Alles staat in `assets/js/content.js`:

- `CONFIG`: titel, solutionnaam, prefix, map- en bestandsnamen van de skills, pad naar de video.
- `PROMPTS`: alle voorbeeldprompts met tip. Een stap verwijst ernaar met `{ text, prompt: 'id' }`.
- `MODULES`: modules en stappen (doel, acties, screenshot, controle, hulp, tekstballon van Mark).
- `GLOSSARY`: de woordenlijst.

Heten de skills anders? Pas `CONFIG.skills` aan en hernoem de mappen in `skills/`. Voer daarna `node tools/generate-screenshots-md.js` uit als je stappen of screenshots wijzigt.

## Screenshots, logo en video toevoegen

1. Zet de bestanden in `img/` en `video/` met exact de namen uit `screenshots.md`.
2. Ververs de pagina: de placeholder verdwijnt vanzelf.
3. `node tools/generate-screenshots-md.js` vinkt de aanwezige bestanden af.

## Lokaal bekijken

Open `index.html` direct in de browser, of start een simpele server (beter voor de video en downloads):

```
npx serve .
```

## Hosten

**GitHub Pages:** push de repo, ga naar *Settings > Pages*, kies *Deploy from a branch*, branch `main`, map `/ (root)`. Het bestand `.nojekyll` staat er al. Let op: bij een private repo is Pages alleen beschikbaar met een betaald GitHub-plan, en de site zelf is dan alsnog openbaar tenzij je organisatie *private Pages* ondersteunt.

**SharePoint:** SharePoint Online toont `.html`-bestanden uit een documentbibliotheek standaard als download in plaats van als webpagina (custom scripts zijn meestal geblokkeerd). Opties: host op GitHub Pages of Azure Static Web Apps en embed de URL met het *Embed*-webonderdeel op een SharePoint-pagina (het domein moet dan op de lijst met toegestane domeinen staan), of zet alleen een link vanaf SharePoint.

## Voortgang

Voortgang, badges en de naam op het certificaat worden per browser opgeslagen in `localStorage` (sleutel `cegeka-ccd-training-v1`). Er gaat niets naar een server. Op de overzichtspagina staat een knop om de voortgang te wissen.
