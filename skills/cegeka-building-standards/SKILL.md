---
name: cegeka-building-standards
description: Cegeka standards for building Power Platform and Dataverse solutions with Claude Code. Use for any Dataverse build in this repo, from project setup, connecting and creating the solution to tables, choices, apps, flows, pages, review and deploy.
---

# Cegeka building standards

The user builds by talking to you. They never type commands: you choose and run them, explain in one line what you are about to do, and the user approves. These rules win over anything the building plan leaves open.

## Working style
- Read `CLAUDE.md` and `docs/building-plan.md` first. Settings in `CLAUDE.md` (environment URL, solution, prefix) win over the defaults here.
- Plan first: write the build steps to `docs/implementation-plan.md` and build nothing until the user agrees.
- Build one step at a time. Show what you will create, get one approval, then build the whole step without further questions. Decide small things yourself and log them in the plan.
- End every step with a short summary, how the user can check it, and a proposed commit message. Commit and push when the user agrees.
- Before any change in Dataverse, confirm the connected environment matches `CLAUDE.md`.
- Never put passwords, tokens, connection strings or customer data in the repo.

## Project setup
- Structure: `docs/` (building plan, implementation plan), `solution/` (unpacked solution), `scripts/` (build scripts), `.claude/skills/`, `CLAUDE.md`, `README.md`, `.gitignore`.
- `.gitignore` covers at least `dist/`, `node_modules/`, `.token-cache.json`.
- `CLAUDE.md` holds: environment URL, solution unique name, publisher name and prefix, working style (plan first, approval per step, commit per step) and standards (prefix, Dutch labels, no secrets).

## Connect, publisher and solution
- Connect with `pac auth create --environment <url>`. If no browser window opens, use `--deviceCode`.
- Interactive logins (device code): start them in the background and immediately show the user the URL and code, then wait until they confirm.
- Check with `pac org who` and show the URL to the user.
- Publisher: use the existing Cegeka publisher with prefix `cgk` if it exists. Only create it when it does not. Read the option value prefix from the publisher.
- Solution: use the solution from `CLAUDE.md` if it exists, otherwise create it with that publisher. Then `pac solution clone` it into `solution/`.
- After every build step, run `pac solution sync` so `solution/` matches the environment before committing.

## How to build
- Prefer Dataverse Web API scripts (Node) over hand-written solution XML. Use solution XML only for settings the Web API does not expose.
- Web API auth: `@azure/msal-node` device code flow, public client id `51f81489-12ee-4a9e-aaae-a2591f45987d`, scope `<envUrl>/.default`, token cache in `.token-cache.json`.
- Every metadata call sends the header `MSCRM.SolutionUniqueName: <solution>`, so nothing lands in the Default Solution.
- Scripts are idempotent (safe to run twice) and live in `scripts/`. Put reusable helpers (auth, choices, publish, batch) in `scripts/lib/`.
- Create a table with its columns in one call where possible. Publish once per step, not after every change. Seed data with `$batch`.
- Some things cannot be scripted (for example prompt columns, adding data sources to a canvas app). Do not try: list them as a manual step with exact instructions.

## Which component
- Back office and admin work: model-driven app.
- End users doing a simple task: canvas app or code app, only if the plan asks for it.
- Automation: cloud flows in the solution, with connection references and environment variables.
- Conversations: Copilot Studio agent, topic based, with description and instructions filled in.
- If two types fit equally well, ask the user once while planning.

## Data model
- Schema names use the prefix, display names and labels in Dutch, singular table names.
- For status, use the standard Status Reason (`statuscode`) with custom values mapped to Active or Inactive. Never add a custom "Status" choice.
- Local choices unless shared across tables. Global choices get a unique display name (for example "HW Apparaattype", not "Type").
- Explicit option values: choices from `<option prefix>0000` in plan order, status reasons from `<option prefix>0100`. Ordinal scales get ascending values.
- Every option of every choice column gets a color from the tints below. Set the color via the Web API when you create the choice.

## Apps, views and forms
- Model-driven app with standard modern look, no custom theme. Set the app setting `HeaderAndNavigationRefresh` to Yes and read it back.
- Views: Power Apps grid control with colored option sets enabled. Every table gets a default active view with explicit columns and widths, plus the views from the plan.
- Forms: one main form per table, logical tabs and sections. Choice fields use the OptionSet Wrapper control so colors show. Subgrids show related records only.
- Every model-driven app opens on a start page, built as a separate last step (see Pages). Use an HTML web resource that reads data with `Xrm.WebApi` (fully scriptable), set as the first item in the sitemap, unless the plan asks for a custom page.

## Review checklist
Use this when the user asks for a review. Report as a table: rule | OK / deviation / missing | evidence | proposal. Change nothing until the user chooses.
- All components in the solution, prefix everywhere, Dutch labels
- Status via Status Reason, choice options colored with a tint
- Relations and delete behavior as in the plan
- Views with grid control, forms with OptionSet Wrapper, related-only subgrids
- Flows use connection references, are on, and are in the solution
- Every acceptance criterion from the plan can be tested
- No secrets in the repo, `solution/` in sync

## Deploy
- Confirm the target environment and show its URL.
- `pac solution pack` from `solution/` to `dist/<solution>.zip`, then `pac solution import --publish-changes`. Ask approval before the import and summarize the result.

## Brand
Background always white. Font Nunito Sans (fallback Aptos, Segoe UI) in standalone pages; inside model-driven apps use the app font.

| Name | Hex | Use |
|---|---|---|
| Cegeka Blue | `#00C7F9` | Leading accent, primary buttons. Never as text; black text on top. |
| Sea Blue | `#0095BB` | Navigation, section headers. White text on top. |
| Dark Blue | `#00647D` | Text color in blue, links. |
| Darkest Blue | `#00323E` | Text on light blue. |
| Purple | `#632064` | Badges, attention. White text on top. |
| Red | `#F04B4C` | Problems only. |
| Greys | `#F1F1F1` cards, `#DCDCDC` dividers, `#3D3D3D` body, `#000000` headings | |

Choice option colors (always the light tint, consistent across tables):

| Meaning | Examples | Tint |
|---|---|---|
| New, open | Nieuw, Ingediend, Open | `#B2DFEB` |
| In progress, active | In behandeling, Actief, Besteld | `#B2EEFD` |
| Waiting, attention | Wacht op manager, Verloopt binnenkort | `#D0BCD0` |
| Done, approved | Afgerond, Goedgekeurd, Geleverd | `#B2D0D8` |
| Problem, rejected | Afgewezen, Defect, Verlopen | `#FAC9C9` |
| Inactive, other | Inactief, Uit dienst, Overig | `#D7D7D7` |
| Categories | Type, Afdeling | cycle `#B2EEFD`, `#B2DFEB`, `#D0BCD0`, `#B2D0D8`, `#D9F7FE` |

## Pages
- Inside a model-driven app (custom pages, generative pages, web resources): look like the app. Fluent UI v9 components and tokens, app font, neutral background, white cards (8 px radius, light shadow), 24 px padding. No color bands or hero banners. Brand colors only as accents: Sea Blue for charts and selection, Dark Blue for the primary button and links, tint badges for status. One primary button per page.
- Standalone (code apps, portals): white page, light grey cards, Sea Blue or Cegeka Blue header band, Purple KPI badges.
- KPI tiles: label, big number, one context line; the tile links to the matching view.
- Charts: blues by default (`#0095BB`, `#00C7F9`, `#00647D`, `#00323E`), at most five colors, red only for a problem.
- Loading with skeletons, a calm sentence when empty, a message bar on errors. WCAG AA contrast. Dutch date and number formats (27 okt 2026, 1.234).
