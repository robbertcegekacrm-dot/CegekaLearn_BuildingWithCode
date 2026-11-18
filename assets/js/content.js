/* =========================================================================
   Inhoud van de training "Bouwen met Claude Code in Dataverse".
   Alle teksten, prompts, stappen en screenshots staan in dit bestand.
   Aanpassen = dit bestand bewerken; app.js hoeft niet te veranderen.
   ========================================================================= */

const CONFIG = {
  title: 'Bouwen met Claude Code in Dataverse',
  storageKey: 'cegeka-ccd-training-v1',
  totalDuration: 'circa 3,5 uur',
  solutionName: 'HardwareManager',
  publisherPrefix: 'cgk',
  envUrlExample: 'https://<jouw-org>.crm4.dynamics.com',
  repoName: 'hardware-manager',
  caseVideo: 'video/hardware-manager-case.mp4',
  skills: {
    plan: {
      folder: 'cegeka-building-plan',
      name: 'Building plan skill',
      file: 'skills/cegeka-building-plan/SKILL.md',
      download: 'cegeka-building-plan-SKILL.md'
    },
    standards: {
      folder: 'cegeka-building-standards',
      name: 'Building standards skill',
      file: 'skills/cegeka-building-standards/SKILL.md',
      download: 'cegeka-building-standards-SKILL.md'
    }
  }
};

/* -------------------------------------------------------------------------
   Prompts. Worden inline in stappen getoond (via prompt: 'id') en
   allemaal samen op de pagina Voorbeeldprompts.
   ------------------------------------------------------------------------- */
const PROMPTS = [
  {
    id: 'check-installaties',
    title: 'Installaties laten controleren',
    where: 'Claude Code',
    module: 1,
    text:
`Controleer of mijn laptop klaar is voor deze training. Kijk of Node.js (versie 18 of hoger), Git en de Power Platform CLI (pac) geïnstalleerd zijn en geef per onderdeel de versie.
Stel daarna Git in met mijn naam "[Voornaam Achternaam]" en e-mail "[voornaam.achternaam@cegeka.com]", tenzij dat al goed staat.
Ontbreekt er iets, leg dan in één zin uit hoe ik het installeer.`,
    tip: 'Je vraagt om het resultaat (is alles er?) in plaats van losse commando\'s. Claude kiest zelf de juiste checks voor jouw besturingssysteem en jij keurt alleen goed.'
  },
  {
    id: 'bouwplan',
    title: 'Bouwplan maken',
    where: 'Microsoft 365 Copilot of Claude (chat)',
    module: 2,
    text:
`Je bent een ervaren Power Platform solution architect bij Cegeka.
Gebruik de building plan skill (cegeka-building-plan) als die beschikbaar is.

Maak op basis van de bijgevoegde input een bouwplan in Markdown voor een Dataverse-oplossing "Hardware Manager".
Input:
- transcript van de casevideo van Mark (Hardware Manager)
- mijn eigen notities
- samenvatting uit Work IQ (indien beschikbaar)

Gebruik precies deze hoofdstukken:
1. Doel en scope (wat zit er wel en niet in)
2. Rollen en gebruikers
3. Datamodel: tabellen, kolommen (met datatype), keuzelijsten
4. Relaties: 1:N en N:N, inclusief gedrag bij verwijderen
5. Security: security roles en wie wat mag zien en doen
6. App: model-driven app met navigatie, views en formulieren
7. Flows: per flow de trigger, stappen en uitkomst
8. Acceptatiecriteria in de vorm Gegeven / Wanneer / Dan
9. Aannames en open vragen voor de klant

Regels:
- Verzin geen eisen die niet in de input staan. Zet alles wat je aanneemt onder "Aannames".
- Gebruik Nederlandse labels en houd het compact: tabellen en opsommingen, geen lappen tekst.
- Sluit af met een lijst van maximaal 5 vragen die ik aan Mark moet voorleggen.`,
    tip: 'Je geeft een rol, een vaste structuur en harde regels. Daardoor krijg je een plan dat je kunt reviewen met de klant, en zie je meteen welke aannames de AI heeft gedaan in plaats van dat die verstopt zitten in de tekst.'
  },
  {
    id: 'project-setup',
    title: 'Projectstructuur laten maken',
    where: 'Claude Code',
    module: 3,
    text:
`Zet dit project klaar volgens de building standards skill:
- maak de mappen docs/, solution/ en .claude/skills/
- verplaats building-plan.md naar docs/building-plan.md
- zet cegeka-building-plan-SKILL.md in .claude/skills/cegeka-building-plan/SKILL.md
- zet cegeka-building-standards-SKILL.md in .claude/skills/cegeka-building-standards/SKILL.md
- maak een .gitignore die dist/ en tijdelijke bestanden uitsluit
Laat daarna de mappenstructuur zien.`,
    tip: 'Je beschrijft de gewenste eindsituatie, niet de commando\'s. Claude doet het werk en laat het resultaat zien, zodat jij in één oogopslag kunt controleren of alles op de goede plek staat.'
  },
  {
    id: 'claude-md',
    title: 'CLAUDE.md laten maken',
    where: 'Claude Code',
    module: 3,
    text:
`Maak een CLAUDE.md in de root van dit project volgens de building standards skill, met:
- Dev environment URL: [plak hier de URL van je dev-omgeving]
- Solution (unique name): HardwareManager
- Publisher: Cegeka Training, prefix: cgk
- Werkwijze: lees altijd eerst docs/building-plan.md en de skills, plan eerst en vraag akkoord voor elke bouwstap, alles in de solution HardwareManager, controleer de omgeving voordat je iets wijzigt, sluit elke stap af met een samenvatting en een commit.
- Standaarden: schemanamen met prefix cgk_, Nederlandse labels, geen secrets in de repo.
Laat me de inhoud zien voordat je het bestand opslaat.`,
    tip: 'CLAUDE.md is het geheugen van je project: Claude leest het bij elke sessie. Door de inhoud eerst te laten tonen, weet je zeker dat de omgeving-URL en prefix kloppen.'
  },
  {
    id: 'commit',
    title: 'Committen en pushen',
    where: 'Claude Code',
    module: 3,
    text:
`Commit alle wijzigingen van deze stap met een korte, duidelijke commit message in het Nederlands en push naar GitHub. Laat me de commit message zien voordat je commit.`,
    tip: 'Eén vaste zin na elke bouwstap. Claude schrijft een commit message die beschrijft wat er echt veranderd is, en jij houdt een nette geschiedenis waar je altijd naar terug kunt.'
  },
  {
    id: 'verbinden',
    title: 'Verbinden met Dataverse',
    where: 'Claude Code',
    module: 4,
    text:
`Maak een verbinding met mijn dev-omgeving uit CLAUDE.md, volgens de building standards skill.
Als er een aanmeldvenster opent, wacht dan tot ik ben ingelogd.
Controleer daarna met welke omgeving en welk account je verbonden bent en laat me de URL zien, zodat ik kan bevestigen dat het de juiste omgeving is.`,
    tip: 'Jij doet alleen wat een mens moet doen (inloggen), Claude doet de rest. De controle achteraf voorkomt dat je later in de verkeerde omgeving bouwt.'
  },
  {
    id: 'solution',
    title: 'Publisher en solution laten maken',
    where: 'Claude Code',
    module: 4,
    text:
`Zorg dat de publisher (prefix cgk) en de solution HardwareManager uit CLAUDE.md bestaan in de dev-omgeving, volgens de building standards skill:
- bestaan ze al, gebruik ze dan
- bestaan ze niet, maak ze aan
Haal daarna de solution op in de map solution/ zodat we hem in de repo kunnen bijhouden.
Vertel me wat je hebt aangetroffen en wat je hebt aangemaakt.`,
    tip: '"Bestaat het al, gebruik het dan" maakt de prompt veilig om opnieuw uit te voeren. Je hoeft niet zelf in de maker portal te klikken of te weten welke PAC-commando\'s erbij horen.'
  },
  {
    id: 'skills-check',
    title: 'Skills controleren',
    where: 'Claude Code',
    module: 5,
    text:
`Welke skills heb je in dit project beschikbaar? Vat per skill in twee zinnen samen wat je eruit gaat gebruiken bij het bouwen van de Hardware Manager.`,
    tip: 'Een snelle check of Claude de Cegeka skills echt gevonden en gelezen heeft, voordat je gaat bouwen.'
  },
  {
    id: 'eerste-claude',
    title: 'Eerste Claude Code prompt: lezen en plannen',
    where: 'Claude Code (terminal in VS Code)',
    module: 5,
    text:
`Lees CLAUDE.md, alle skills in .claude/skills/ en docs/building-plan.md.

Maak daarna een implementatieplan in docs/implementation-plan.md met:
- de bouwstappen in volgorde (datamodel, relaties, model-driven app, flows voor onboarding en bestelling, bestelactiviteit)
- per stap welke componenten je maakt, met schemanamen volgens de building standards
- hoe elk component in de solution HardwareManager terechtkomt
- per stap hoe ik kan controleren dat het gelukt is

Bouw nog niets. Stel eerst vragen als iets in het bouwplan onduidelijk of tegenstrijdig is.`,
    tip: '"Bouw nog niets" is het belangrijkste deel. Je dwingt de agent eerst de context te lezen en een plan te maken dat jij kunt controleren. Zo houd jij de regie en ontdek je misverstanden voordat er iets in je omgeving staat.'
  },
  {
    id: 'datamodel',
    title: 'Bouwstap: datamodel',
    where: 'Claude Code',
    module: 5,
    text:
`Voer stap 1 uit het implementatieplan uit: het datamodel.
Maak de tabellen, kolommen en keuzelijsten uit docs/building-plan.md in de solution HardwareManager, volgens de building standards skill.

Werkwijze:
1. Toon eerst een overzicht van wat je gaat aanmaken (tabel, schemanaam, kolommen, datatypes).
2. Wacht op mijn akkoord.
3. Voer het uit en controleer daarna dat alles in de omgeving bestaat.
4. Sluit af met een korte samenvatting en een voorstel voor een commit message.`,
    tip: 'Eén bouwstap per prompt houdt de wijzigingen klein en reviewbaar. Het ingebouwde akkoordmoment voorkomt dat de agent doorbouwt op een verkeerde aanname.'
  },
  {
    id: 'relaties',
    title: 'Bouwstap: relaties',
    where: 'Claude Code',
    module: 5,
    text:
`Voer stap 2 uit het implementatieplan uit: de relaties.
Leg de relaties uit hoofdstuk 4 van docs/building-plan.md aan (bijvoorbeeld apparaat aan medewerker, onboarding aan medewerker en manager, bestelling aan onboarding).
Benoem per relatie het type (1:N of N:N), de lookup-kolom en het gedrag bij verwijderen.
Toon eerst je voorstel, wacht op akkoord, voer uit, controleer en stel een commit message voor.`,
    tip: 'Door het gedrag bij verwijderen expliciet te vragen, voorkom je dat er straks per ongeluk apparaten of bestellingen mee verdwijnen.'
  },
  {
    id: 'app',
    title: 'Bouwstap: model-driven app',
    where: 'Claude Code',
    module: 5,
    text:
`Voer stap 3 uit het implementatieplan uit: de model-driven app "Hardware Manager".
Maak de app met navigatie, de views en de formulieren uit hoofdstuk 6 van docs/building-plan.md.
Zorg dat Mark op het formulier van een medewerker direct de gekoppelde apparaten en onboardings ziet.
Volg de building standards voor naamgeving en formulierindeling.
Toon eerst je voorstel, wacht op akkoord, voer uit, publiceer de wijzigingen en stel een commit message voor.`,
    tip: 'Je beschrijft wat de gebruiker moet zien in plaats van hoe het technisch moet. Dat laat de agent de juiste componenten kiezen en houdt de prompt herbruikbaar.'
  },
  {
    id: 'flows',
    title: 'Bouwstap: onboarding- en bestelflow',
    where: 'Claude Code',
    module: 5,
    text:
`Voer stap 4 uit het implementatieplan uit: de flows.
- Onboardingflow: als er een onboarding wordt aangemaakt, krijgt de manager van de nieuwe medewerker een taak of goedkeuring om een apparaat te kiezen.
- Bestelflow: als de manager een apparaat kiest, wordt er een bestelling aangemaakt die gekoppeld is aan de onboarding en de medewerker.
Gebruik connection references en environment variables volgens de building standards. Zet alles in de solution HardwareManager.
Toon eerst per flow de trigger, de stappen en de uitkomst, wacht op akkoord, bouw, test en stel een commit message voor.`,
    tip: 'Trigger, stappen en uitkomst zijn de drie dingen die je ook in een functioneel ontwerp zou willen zien. Door ze eerst te laten tonen, review je de logica voordat er iets draait.'
  },
  {
    id: 'activiteit',
    title: 'Bouwstap: bestelactiviteit',
    where: 'Claude Code',
    module: 5,
    text:
`Voer stap 5 uit het implementatieplan uit: de bestelactiviteit.
Zorg dat bij elke nieuwe bestelling een activiteit zichtbaar wordt in de tijdlijn van de bestelling en de medewerker, met daarin het gekozen apparaat, de status en de besteldatum.
Kies of dit een eigen activiteitstabel wordt of een bestaande activiteit (zoals een taak) en leg je keuze in twee zinnen uit, op basis van het bouwplan en de building standards.
Toon eerst je voorstel, wacht op akkoord, voer uit, test met één bestelling en stel een commit message voor.`,
    tip: 'Je vraagt de agent een ontwerpkeuze te onderbouwen. Zo leer je van de afweging en kun je bijsturen als de keuze niet past bij de klant.'
  },
  {
    id: 'review',
    title: 'Review tegen de building standards',
    where: 'Claude Code',
    module: 5,
    text:
`Controleer de volledige solution HardwareManager tegen de building standards skill en docs/building-plan.md.
Maak een tabel met de kolommen: eis of standaard | status (OK / afwijking / ontbreekt) | bewijs (component of bestand) | voorstel.
Pas nog niets aan. Ik kies daarna welke punten je oplost.`,
    tip: 'Door review en aanpassen te scheiden blijft de agent een kritische controleur in plaats van een bouwer die zijn eigen werk goedkeurt. De tabel maakt het makkelijk om punten af te vinken.'
  },
  {
    id: 'deploy',
    title: 'Deployen via PAC CLI',
    where: 'Claude Code',
    module: 6,
    text:
`Deploy de solution HardwareManager naar de dev-omgeving uit CLAUDE.md, volgens de building standards skill:
1. Controleer dat je met de juiste omgeving verbonden bent en meld de URL.
2. Pak de solution uit de map solution/ in naar dist/HardwareManager.zip.
3. Importeer de solution en publiceer de wijzigingen.
Vraag mijn akkoord voor de import en vat het resultaat samen.`,
    tip: 'De omgevingscheck vooraf voorkomt de klassieke fout: importeren in de verkeerde omgeving. Je hoeft de PAC-commando\'s niet te kennen: de skill beschrijft hoe het moet, jij keurt alleen goed.'
  },
  {
    id: 'fix',
    title: 'Fout laten oplossen',
    where: 'Claude Code',
    module: 6,
    text:
`Ik krijg deze foutmelding:
[plak hier de volledige foutmelding]

Wat ik deed: [stap of commando]
Wat ik verwachtte: [verwacht resultaat]

Zoek de oorzaak. Leg in maximaal drie zinnen uit wat er misgaat, stel een oplossing voor en voer die pas uit na mijn akkoord. Controleer daarna dat het probleem echt is opgelost.`,
    tip: 'Volledige foutmelding, wat je deed en wat je verwachtte: met die drie dingen kan de agent gericht zoeken. Uitleg vóór de oplossing zorgt dat jij begrijpt wat er misging.'
  }
];

/* -------------------------------------------------------------------------
   Woordenlijst
   ------------------------------------------------------------------------- */
const GLOSSARY = [
  { term: 'Claude Code', def: 'De AI-coding agent van Anthropic die in je terminal of in VS Code draait. Claude Code leest bestanden in je project, voert zelf de benodigde commando\'s uit (zoals Git en de PAC CLI) en bouwt stap voor stap. Jij geeft opdrachten in gewone taal en keurt elke actie goed.' },
  { term: 'PAC CLI', def: 'De Power Platform command line interface (commando: pac). Hiermee verbind je met een omgeving, maak je solutions aan en pak je ze in en uit. In deze training gebruikt Claude Code de PAC CLI voor je: jij vraagt het in gewone taal, de building standards skill beschrijft hoe Claude het doet.' },
  { term: 'Solution', def: 'Een pakket in Power Platform waarin alle onderdelen van een oplossing zitten: tabellen, apps, flows, security roles. Via een solution breng je je werk van de ene naar de andere omgeving (ALM).' },
  { term: 'Skill', def: 'Een map met een SKILL.md-bestand met instructies en best practices die Claude automatisch gebruikt als ze relevant zijn. Cegeka levert twee skills: de building plan skill en de building standards skill. Ze staan in .claude/skills/<skill-naam>/SKILL.md.' },
  { term: 'CLAUDE.md', def: 'Een bestand in de root van je repo dat Claude Code bij elke sessie leest. Hierin zet je projectcontext: de omgeving-URL, de publisher prefix, de solutionnaam en de afspraken over werkwijze en standaarden.' },
  { term: 'Bouwplan (building plan)', def: 'Het functioneel en technisch plan voor de oplossing: datamodel, relaties, security, app, flows en acceptatiecriteria. Je maakt het eerst met de klant (docs/building-plan.md) en Claude Code bouwt er daarna op voort.' },
  { term: 'Dataverse', def: 'Het dataplatform onder Power Platform en Dynamics 365. Data staat in tabellen met kolommen en relaties, met ingebouwde security, auditing en API\'s.' },
  { term: 'Repo (repository)', def: 'Een map met versiebeheer via Git, in deze training gehost op GitHub. Claude maakt de commits en pusht ze voor je. Alles van je project staat erin: bouwplan, skills, CLAUDE.md en de solution.' },
  { term: 'Commit', def: 'Een vastgelegd moment in je repo met een korte beschrijving van wat er veranderd is. Na elke bouwstap laat je Claude committen, zodat je altijd terug kunt naar een werkende versie.' }
];

/* -------------------------------------------------------------------------
   Modules en stappen.
   Per stap:
     goal   : doel van de stap
     mark   : (optioneel) tekstballon van Mark
     do     : lijst van acties. Een actie is een string, of een object:
              { text, code, lang }  -> codeblok met kopieerknop
              { text, prompt: id }  -> prompt uit PROMPTS met kopieerknop
              { text, codes: [{label, code}] } -> meerdere codeblokken
     img    : { file, caption } -> screenshot in /img
     check  : hoe weet je dat het gelukt is
     help   : troubleshooting tip
   ------------------------------------------------------------------------- */
const MODULES = [
  {
    id: 'm0',
    number: 0,
    title: 'Welkom',
    duration: '10 min',
    badge: 'Kick-off',
    intro: 'Maak kennis met Mark, de nieuwe Hardware Manager van Cegeka, en ontdek wat je vandaag bouwt en hoe.',
    mark: 'Hoi! Ik ben Mark, de nieuwe Hardware Manager. Ik raak het overzicht kwijt over wie welke laptop heeft. Help jij me?',
    steps: [
      {
        id: 'm0-s1',
        title: 'Bekijk de casevideo van Mark',
        goal: 'Je begrijpt de vraag van de klant voordat je iets gaat bouwen.',
        mark: 'In deze video vertel ik waar ik tegenaan loop. Let goed op: alles wat je straks bouwt, begint bij mijn verhaal.',
        video: true,
        do: [
          'Start de video hieronder en kijk hem helemaal uit.',
          'Noteer de wensen die je hoort, bijvoorbeeld: hardware registreren, apparaten koppelen aan medewerkers, onboarding, bestellen.',
          'Schrijf ook op wat je níet hoort maar wel wilt weten. Dat zijn je open vragen voor later.'
        ],
        img: null,
        check: 'Je hebt minstens vier wensen en twee open vragen genoteerd.',
        help: 'Speelt de video niet af? Vraag de trainer om het transcript. Dat heb je in module 2 toch nodig.'
      },
      {
        id: 'm0-s2',
        title: 'Wat ga je bouwen?',
        goal: 'Je weet welk eindresultaat je aan het einde van de training in je omgeving hebt staan.',
        do: [
          'Lees de onderdelen van de Hardware Manager-oplossing: <strong>een datamodel</strong> voor apparaten, medewerkers, onboardings en bestellingen; <strong>relaties</strong> tussen die tabellen; <strong>een model-driven app</strong> voor Mark; <strong>een onboardingflow</strong> waarmee de manager een apparaat kiest; <strong>een bestelflow</strong> en <strong>een bestelactiviteit</strong> in de tijdlijn.',
          'Bekijk de schets van het eindresultaat in de afbeelding hieronder.',
          'Bedenk welk onderdeel jij het spannendst vindt om te bouwen.'
        ],
        img: { file: 'm0-s2-eindresultaat-app.png', caption: 'De model-driven app Hardware Manager met een medewerkerformulier, daarop de gekoppelde apparaten en een bestelactiviteit in de tijdlijn.' },
        check: 'Je kunt in één zin uitleggen wat de oplossing voor Mark doet.',
        help: 'Twijfel je wat een model-driven app is? Kijk in de woordenlijst of vraag het je buurman.'
      },
      {
        id: 'm0-s3',
        title: 'De aanpak: eerst plannen, dan bouwen',
        goal: 'Je kent de werkwijze en de tijdsindeling van de training.',
        mark: 'Ik heb liever een goed plan dan een snelle app die niet doet wat ik vroeg.',
        do: [
          '<strong>Plan eerst.</strong> Je maakt met Copilot of Claude een bouwplan op basis van de casevideo, en controleert dat plan zoals je dat met een klant zou doen.',
          '<strong>Bouw daarna.</strong> Claude Code bouwt de oplossing stap voor stap in Dataverse, met de Cegeka skills als vakmanschap en het bouwplan als opdracht.',
          '<strong>Jij houdt de regie.</strong> Na elke stap review je het resultaat en laat je Claude een commit maken.',
          '<strong>Je bouwt vanuit een gesprek.</strong> Je typt geen commando\'s: je vraagt Claude wat je wilt, Claude stelt de acties voor en jij keurt ze goed. De Cegeka skills beschrijven hoe Claude het doet.',
          `Duur: ${'circa 3,5 uur'}, verdeeld over 8 modules. Vink elke stap af met <em>Markeer als klaar</em>; je voortgang wordt in deze browser bewaard.`
        ],
        img: { file: 'm0-s3-aanpak-plan-bouw.png', caption: 'Schema van de aanpak: input (video, notities, Work IQ), bouwplan, review met klant, bouwen met Claude Code en skills, testen.' },
        check: 'Je weet waarom het bouwplan vóór het bouwen komt.',
        help: 'Je kunt de training op elk moment onderbreken. Je voortgang blijft bewaard zolang je dezelfde browser gebruikt.'
      }
    ]
  },

  {
    id: 'm1',
    number: 1,
    title: 'Voorbereiding',
    duration: '20 min',
    badge: 'Klaar voor de start',
    intro: 'Installeer de VS Code-extensies, start Claude Code en laat Claude controleren of je laptop klaar is.',
    mark: 'Voordat je begint: gereedschap op orde. Goed nieuws: het meeste controleert Claude voor je.',
    steps: [
      {
        id: 'm1-s1',
        title: 'Installeer de VS Code-extensies',
        goal: 'VS Code heeft de Claude Code-extensie en de Power Platform Tools.',
        do: [
          'Open VS Code en klik links op het blokjesicoon <kbd>Extensions</kbd> (of druk <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>).',
          'Zoek op <strong>Claude Code</strong> (uitgever Anthropic) en klik <kbd>Install</kbd>.',
          'Zoek op <strong>Power Platform Tools</strong> (uitgever Microsoft) en klik <kbd>Install</kbd>. Deze extensie brengt ook de PAC CLI mee, die Claude straks gebruikt.',
          'Herstart VS Code.'
        ],
        img: { file: 'm1-s1-vscode-extensies.png', caption: 'Het Extensions-paneel in VS Code met Claude Code en Power Platform Tools allebei geïnstalleerd.' },
        check: 'Beide extensies staan onder <em>Installed</em>, en je ziet het Claude-icoon en het Power Platform-icoon in VS Code.',
        help: 'Kun je geen extensies installeren? Vraag de trainer of je laptop extensies uit de Marketplace mag installeren.'
      },
      {
        id: 'm1-s2',
        title: 'Open Claude Code en meld je aan',
        goal: 'Claude Code draait in VS Code en is gekoppeld aan je Cegeka Claude-account.',
        do: [
          'Maak een nieuwe map voor de training, bijvoorbeeld <code>claude-training</code>, en open die via <kbd>File</kbd> &gt; <kbd>Open Folder</kbd>.',
          'Klik rechtsboven in de editor op het <strong>Claude-icoon</strong> om Claude Code te openen.',
          'Bij de eerste keer vraagt Claude je om in te loggen. Kies je <strong>Claude-account</strong> en meld je in de browser aan met je Cegeka-account.',
          'Ga terug naar VS Code en typ een eerste bericht, bijvoorbeeld: "Hoi Claude, wat kun je voor me doen in dit project?"'
        ],
        img: { file: 'm1-s2-claude-code-open.png', caption: 'VS Code met het Claude Code-paneel open, het aangemelde account zichtbaar en een eerste antwoord van Claude.' },
        check: 'Claude antwoordt op je bericht zonder opnieuw om een login te vragen.',
        help: 'Zie je geen Claude-icoon? Open het opdrachtenpalet met <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> en zoek op <em>Claude Code</em>. Zie je een melding over je licentie, vraag dan de trainer om toegang.'
      },
      {
        id: 'm1-s3',
        title: 'Laat Claude je installaties controleren',
        goal: 'Node.js, Git en de PAC CLI zijn aanwezig en Git is ingesteld met jouw naam.',
        mark: 'Vanaf nu werk je zo: jij vraagt, Claude doet, jij keurt goed. Commando\'s typen hoeft niet.',
        do: [
          { text: 'Kopieer de prompt, vul je naam en e-mail in en stuur hem naar Claude.', prompt: 'check-installaties' },
          'Claude vraagt toestemming om commando\'s uit te voeren. Lees wat Claude wil doen en klik <kbd>Yes</kbd> (of <kbd>Allow</kbd>).',
          'Lees de samenvatting die Claude geeft.'
        ],
        img: { file: 'm1-s3-installaties-gecontroleerd.png', caption: 'Het Claude Code-paneel met de samenvatting: versies van Node.js, Git en pac, en de bevestiging dat Git is ingesteld.' },
        check: 'Claude meldt voor Node.js, Git en pac een versienummer en dat je Git-naam en e-mail zijn ingesteld.',
        help: 'Ontbreekt iets? Volg het installatieadvies van Claude (Node.js LTS via nodejs.org, Git via git-scm.com, pac via de Power Platform Tools-extensie), herstart VS Code en stuur dezelfde prompt nog een keer.'
      },
      {
        id: 'm1-s4',
        title: 'Meld je aan bij GitHub',
        goal: 'VS Code kan namens jou bij GitHub, zodat Claude straks kan pushen.',
        do: [
          'Klik linksonder in VS Code op het persoonsicoon <kbd>Accounts</kbd> en kies <kbd>Sign in with GitHub</kbd>.',
          'Rond de aanmelding af in de browser en geef VS Code toegang.'
        ],
        img: { file: 'm1-s4-github-login.png', caption: 'Het Accounts-menu linksonder in VS Code met het aangemelde GitHub-account.' },
        check: 'Onder <kbd>Accounts</kbd> zie je je GitHub-gebruikersnaam.',
        help: 'Heb je nog geen GitHub-account? Maak er een aan op github.com met je Cegeka-mailadres en vraag de trainer om toegang tot de organisatie als dat nodig is.'
      }
    ]
  },

  {
    id: 'm2',
    number: 2,
    title: 'Het bouwplan maken',
    duration: '30 min',
    badge: 'Architect',
    intro: 'Verzamel input, laat Copilot of Claude een bouwplan maken met de building plan skill en review het kritisch.',
    mark: 'Laat me eerst zien wát je gaat bouwen. Dan zeg ik of het klopt, voordat er iets gebouwd wordt.',
    steps: [
      {
        id: 'm2-s1',
        title: 'Verzamel je input',
        goal: 'Je hebt alle bronnen voor het bouwplan bij elkaar.',
        do: [
          'Download het <strong>transcript van de casevideo</strong> van Mark (je krijgt het van de trainer).',
          'Pak je <strong>notities</strong> uit module 0 erbij: wensen en open vragen.',
          'Optioneel: vraag in Microsoft 365 Copilot via <strong>Work IQ</strong> naar relevante mails, chats of documenten over hardwarebeheer en onboarding, en kopieer de samenvatting.',
          'Zet alles in één map of in één document, zodat je het straks in één keer kunt toevoegen.'
        ],
        img: { file: 'm2-s1-input-verzamelen.png', caption: 'Een map met het transcript van de casevideo, een notitiebestand en de Work IQ-samenvatting.' },
        check: 'Je hebt minstens het transcript en je eigen notities klaarstaan.',
        help: 'Geen Work IQ beschikbaar? Geen probleem: het transcript en je notities zijn genoeg voor deze training.'
      },
      {
        id: 'm2-s2',
        title: 'Open Copilot of Claude chat',
        goal: 'Je hebt een chat open waarin de building plan skill beschikbaar is.',
        do: [
          'Kies je tool: <strong>Claude</strong> (claude.ai) of <strong>Microsoft 365 Copilot</strong>.',
          'In Claude: controleer onder <kbd>Settings</kbd> &gt; <kbd>Capabilities</kbd> &gt; <kbd>Skills</kbd> dat de building plan skill aan staat. Staat hij er niet tussen, upload dan de skill van de <a href="#skills">Skills-pagina</a>.',
          'In Copilot: voeg het bestand <code>cegeka-building-plan-SKILL.md</code> toe als bijlage, samen met je input.',
          'Start een nieuwe chat en voeg je input toe (transcript, notities, Work IQ-samenvatting).'
        ],
        img: { file: 'm2-s2-chat-met-input.png', caption: 'Een nieuwe chat in Claude of Copilot met het transcript, de notities en (bij Copilot) SKILL.md als bijlagen.' },
        check: 'Je bijlagen staan in de chat en zijn nog niet verstuurd.',
        help: 'Kun je geen bestanden toevoegen? Plak de tekst van het transcript en je notities direct in de chat.'
      },
      {
        id: 'm2-s3',
        title: 'Voer de bouwplan-prompt uit',
        goal: 'Je hebt een eerste versie van het bouwplan in Markdown.',
        mark: 'Let op het hoofdstuk aannames. Daar zie je wat de AI zelf heeft ingevuld. Dat wil ik zeker weten!',
        do: [
          { text: 'Kopieer de prompt en plak hem in de chat, onder je bijlagen. Verstuur.', prompt: 'bouwplan' },
          'Wacht tot het volledige plan klaar is.',
          'Vraag Claude of Copilot het plan in één Markdown-codeblok te zetten als dat nog niet zo is.'
        ],
        img: { file: 'm2-s3-bouwplan-resultaat.png', caption: 'Het gegenereerde bouwplan in de chat met de negen hoofdstukken, met het datamodel als tabel zichtbaar.' },
        check: 'Het plan heeft alle negen hoofdstukken, inclusief aannames en open vragen.',
        help: 'Mist er een hoofdstuk? Vraag: "Vul hoofdstuk X aan op basis van de input. Verander de rest niet."'
      },
      {
        id: 'm2-s4',
        title: 'Review het plan en sla het op',
        goal: 'Je bouwplan klopt met de casus en staat als building-plan.md klaar.',
        do: [
          '<strong>Tabellen:</strong> zijn apparaat, medewerker, onboarding en bestelling aanwezig? Hebben de kolommen logische datatypes?',
          '<strong>Relaties:</strong> kan één medewerker meerdere apparaten hebben? Hangt de bestelling aan de onboarding?',
          '<strong>Security:</strong> wie mag apparaten zien en wie mag bestellen? Klopt dat met wat Mark zei?',
          '<strong>App en flows:</strong> staat de keuze door de manager erin, en de bestelling die daaruit volgt?',
          '<strong>Acceptatiecriteria:</strong> kun je elk criterium straks echt testen?',
          'Laat ontbrekende punten aanvullen in de chat. Kopieer daarna het plan en sla het op als <code>building-plan.md</code>.'
        ],
        img: { file: 'm2-s4-building-plan-md.png', caption: 'Het bestand building-plan.md geopend in VS Code met de Markdown-preview ernaast.' },
        check: 'Je hebt een bestand <code>building-plan.md</code> en je kunt elke tabel en flow uitleggen.',
        help: 'In een echt project bespreek je het plan nu met de klant. In deze training is de trainer de klant: twijfel je, vraag het hem of haar.'
      }
    ]
  },

  {
    id: 'm3',
    number: 3,
    title: 'Je project klaarzetten',
    duration: '25 min',
    badge: 'Op orde',
    intro: 'Maak een repo, zet je bouwplan en de skills erin en laat Claude de structuur, CLAUDE.md en de eerste commit maken.',
    mark: 'Een opgeruimde werkplaats bouwt beter. Dat geldt voor mijn magazijn en voor jouw repo.',
    steps: [
      {
        id: 'm3-s1',
        title: 'Maak een GitHub-repo en open hem in VS Code',
        goal: 'Je hebt een lege repo op GitHub, geopend in VS Code.',
        do: [
          'Ga naar github.com en klik <kbd>New</kbd> (nieuwe repository).',
          'Naam: <code>hardware-manager</code>. Kies <kbd>Private</kbd> en vink <kbd>Add a README file</kbd> aan. Klik <kbd>Create repository</kbd>.',
          'Klik op de groene knop <kbd>Code</kbd> en kopieer de HTTPS-URL.',
          'Ga in VS Code naar <kbd>Source Control</kbd> (linkerbalk) en klik <kbd>Clone Repository</kbd>. Plak de URL, kies je trainingsmap en klik <kbd>Open</kbd>.'
        ],
        img: { file: 'm3-s1-github-nieuwe-repo.png', caption: 'Het scherm Create a new repository op GitHub met naam hardware-manager, Private en Add a README file aangevinkt.' },
        check: 'VS Code toont de map <code>hardware-manager</code> met een README.md in de Explorer.',
        help: 'Vraagt VS Code om in te loggen bij het clonen? Meld je aan met je GitHub-account uit module 1.'
      },
      {
        id: 'm3-s2',
        title: 'Zet je bouwplan en de skills in de projectmap',
        goal: 'De bestanden die Claude nodig heeft staan in je project.',
        mark: 'Die skills zijn het vakmanschap van Cegeka. Daarmee bouwt Claude zoals jullie dat afspraken.',
        do: [
          'Download beide skills van de <a href="#skills">Skills-pagina</a>. Ze heten <code>cegeka-building-plan-SKILL.md</code> en <code>cegeka-building-standards-SKILL.md</code>.',
          'Sleep de twee skillbestanden en je <code>building-plan.md</code> uit module 2 naar de Explorer van VS Code, in de root van <code>hardware-manager</code>.',
          'Je hoeft niets te verplaatsen of te hernoemen: dat doet Claude in de volgende stap.'
        ],
        img: { file: 'm3-s2-bestanden-in-project.png', caption: 'De Explorer in VS Code met README.md, building-plan.md, cegeka-building-plan-SKILL.md en cegeka-building-standards-SKILL.md in de root van hardware-manager.' },
        check: 'Je ziet de drie bestanden naast README.md in de Explorer.',
        help: 'Heeft je browser het bestand opgeslagen met <code>.txt</code> erachter? Geen probleem, Claude herkent het. Noem het in de volgende prompt wel even.'
      },
      {
        id: 'm3-s3',
        title: 'Laat Claude de projectstructuur maken',
        goal: 'Je repo heeft de mappen docs/, solution/ en .claude/skills/ met alles op de juiste plek.',
        do: [
          'Open Claude Code in het project <code>hardware-manager</code> via het Claude-icoon.',
          { text: 'Stuur deze prompt:', prompt: 'project-setup' },
          'Keur de acties goed die Claude voorstelt.',
          'Bekijk de structuur die Claude laat zien.'
        ],
        img: { file: 'm3-s3-projectstructuur.png', caption: 'De Explorer met .claude/skills/cegeka-building-plan/SKILL.md, .claude/skills/cegeka-building-standards/SKILL.md, docs/building-plan.md en de map solution, met daarnaast de samenvatting van Claude.' },
        check: 'Elke skill staat in een eigen map als <code>SKILL.md</code>, en het bouwplan staat in <code>docs/building-plan.md</code>.',
        help: 'Iets op de verkeerde plek? Zeg het gewoon tegen Claude, bijvoorbeeld: "De skill staat nog in de root, zet hem in de juiste map."'
      },
      {
        id: 'm3-s4',
        title: 'Laat Claude CLAUDE.md maken',
        goal: 'Claude Code kent je omgeving, publisher en afspraken.',
        do: [
          'Zoek de URL van je dev-omgeving op: open make.powerapps.com, kies je dev-omgeving, klik op het tandwiel &gt; <kbd>Session details</kbd> en kopieer de <em>Instance url</em>.',
          { text: 'Plak de URL in de prompt en stuur hem naar Claude:', prompt: 'claude-md' },
          'Controleer de inhoud die Claude laat zien en geef akkoord.'
        ],
        img: { file: 'm3-s4-claude-md.png', caption: 'CLAUDE.md geopend in VS Code met de ingevulde omgeving-URL, solutionnaam HardwareManager en publisher prefix cgk.' },
        check: '<code>CLAUDE.md</code> staat in de root (naast README.md) en bevat jouw omgeving-URL.',
        help: 'Wil je later iets toevoegen aan CLAUDE.md? Vraag het Claude: "Voeg aan CLAUDE.md toe dat..."'
      },
      {
        id: 'm3-s5',
        title: 'Laat Claude de eerste commit maken',
        goal: 'Je startpunt is vastgelegd in GitHub.',
        do: [
          { text: 'Stuur de commit-prompt. Deze gebruik je na elke bouwstap opnieuw.', prompt: 'commit' },
          'Keur de commit message en de push goed.',
          'Ververs je repo op github.com.'
        ],
        img: { file: 'm3-s5-eerste-commit-github.png', caption: 'De repo op github.com met de mappen .claude, docs, het bestand CLAUDE.md en de eerste commit-melding.' },
        check: 'Op GitHub zie je <code>.claude</code>, <code>docs</code> en <code>CLAUDE.md</code>. De lege map <code>solution</code> zie je nog niet; dat is normaal.',
        help: 'Lukt het pushen niet? Controleer of je in VS Code bent aangemeld bij GitHub (module 1, stap 4) en vraag Claude: "De push mislukt, wat is de oorzaak?"'
      }
    ]
  },

  {
    id: 'm4',
    number: 4,
    title: 'Verbinden met Dataverse',
    duration: '15 min',
    badge: 'Verbonden',
    intro: 'Laat Claude verbinding maken met je dev-omgeving en de publisher en solution klaarzetten.',
    mark: 'Bijna bouwen! Eerst zeker weten dat je in de goede omgeving zit. Ik wil geen laptops in productie zien verdwijnen.',
    steps: [
      {
        id: 'm4-s1',
        title: 'Laat Claude verbinden met je dev-omgeving',
        goal: 'Claude is verbonden met de juiste dev-omgeving.',
        do: [
          { text: 'Stuur deze prompt naar Claude:', prompt: 'verbinden' },
          'Er opent een aanmeldvenster in je browser. Meld je aan met je Cegeka-account.',
          'Vergelijk de URL die Claude teruggeeft met de URL in je CLAUDE.md en bevestig.'
        ],
        img: { file: 'm4-s1-verbonden-met-omgeving.png', caption: 'Het Claude Code-paneel met de bevestiging van de verbinding: omgeving-URL, omgevingsnaam en aangemeld account.' },
        check: 'Claude meldt een URL die exact gelijk is aan de URL in je CLAUDE.md.',
        help: 'Opent er geen aanmeldvenster? Vraag Claude: "Er opent geen browservenster, gebruik een andere manier om in te loggen." Verkeerde omgeving? Zeg: "Dit is de verkeerde omgeving, maak verbinding met de URL uit CLAUDE.md."'
      },
      {
        id: 'm4-s2',
        title: 'Laat Claude de publisher en solution klaarzetten',
        goal: 'De solution HardwareManager met publisher prefix cgk bestaat en staat ook in je repo.',
        do: [
          { text: 'Stuur deze prompt naar Claude:', prompt: 'solution' },
          'Lees wat Claude heeft aangetroffen en aangemaakt.',
          'Open make.powerapps.com &gt; <kbd>Solutions</kbd> en controleer dat <strong>Hardware Manager</strong> in de lijst staat.',
          { text: 'Laat Claude committen:', prompt: 'commit' }
        ],
        img: { file: 'm4-s2-solution-klaar.png', caption: 'make.powerapps.com met de solution Hardware Manager in de lijst, en in VS Code de map solution/ met de opgehaalde solution.' },
        check: 'De solution staat in make.powerapps.com én in de map <code>solution/</code> van je repo.',
        help: 'Is de prefix al in gebruik door een andere publisher? Claude meldt dat. Overleg met de trainer of je die publisher gebruikt of een eigen prefix kiest, en laat Claude CLAUDE.md bijwerken.'
      }
    ]
  },

  {
    id: 'm5',
    number: 5,
    title: 'Bouwen met Claude Code',
    duration: '75 min',
    badge: 'Bouwer',
    intro: 'Laat Claude Code eerst plannen en bouw daarna stap voor stap: datamodel, relaties, app, flows en bestelactiviteit. Na elke stap: review en commit.',
    mark: 'Nu wordt het leuk! Bouw rustig stap voor stap. Ik kijk mee.',
    steps: [
      {
        id: 'm5-s1',
        title: 'Controleer of Claude de skills kent',
        goal: 'Claude Code werkt in je project en heeft beide Cegeka skills gevonden.',
        do: [
          'Open Claude Code in het project <code>hardware-manager</code> via het Claude-icoon.',
          { text: 'Stuur deze prompt:', prompt: 'skills-check' }
        ],
        img: { file: 'm5-s1-skills-check.png', caption: 'Het Claude Code-paneel in het project hardware-manager met de samenvatting van de building plan skill en de building standards skill.' },
        check: 'Claude noemt beide Cegeka skills en vat ze kloppend samen.',
        help: 'Kent Claude de skills niet? Vraag: "Controleer of de skills in .claude/skills/<naam>/SKILL.md staan en zet ze goed als dat niet zo is." Sluit daarna het Claude-paneel en open het opnieuw.'
      },
      {
        id: 'm5-s2',
        title: 'Eerste prompt: lezen en plannen',
        goal: 'Claude Code heeft een implementatieplan gemaakt, zonder iets te bouwen.',
        mark: 'Dit is mijn favoriete stap. Plan eerst, dan weet iedereen wat er gaat gebeuren.',
        do: [
          { text: 'Kopieer de prompt en plak hem in Claude Code. Druk <kbd>Enter</kbd>.', prompt: 'eerste-claude' },
          'Geef toestemming als Claude bestanden wil lezen.',
          'Beantwoord de vragen die Claude stelt.'
        ],
        img: { file: 'm5-s2-implementatieplan.png', caption: 'Claude Code in de terminal tijdens het lezen van CLAUDE.md, de skills en het bouwplan, en daarna docs/implementation-plan.md geopend in de editor.' },
        check: 'Er staat een nieuw bestand <code>docs/implementation-plan.md</code> en er is nog niets gewijzigd in je omgeving.',
        help: 'Begint Claude toch te bouwen? Druk op <kbd>Esc</kbd> om te stoppen en herhaal: "Stop. Bouw nog niets, maak alleen het plan."'
      },
      {
        id: 'm5-s3',
        title: 'Review het implementatieplan',
        goal: 'Het implementatieplan klopt met je bouwplan en de building standards.',
        do: [
          'Open <code>docs/implementation-plan.md</code>.',
          'Controleer: staan de stappen in een logische volgorde? Gebruiken de schemanamen de prefix <code>cgk_</code>? Komt alles in de solution HardwareManager?',
          'Vergelijk met het bouwplan: mist er een tabel, relatie of flow?',
          'Vraag Claude om aanpassingen als dat nodig is, bijvoorbeeld: "Voeg aan stap 1 een keuzelijst Status toe aan Apparaat."',
          { text: 'Laat Claude het plan committen:', prompt: 'commit' }
        ],
        img: { file: 'm5-s3-plan-review.png', caption: 'docs/implementation-plan.md naast docs/building-plan.md in VS Code (split view) voor de review.' },
        check: 'Je bent het eens met elke stap in het plan en het plan is gecommit.',
        help: 'Vind je het plan te groot of te vaag? Vraag Claude: "Splits stap X op in kleinere stappen die ik apart kan controleren."'
      },
      {
        id: 'm5-s4',
        title: 'Bouw het datamodel',
        goal: 'De tabellen, kolommen en keuzelijsten staan in de solution.',
        do: [
          { text: 'Geef Claude de prompt voor het datamodel:', prompt: 'datamodel' },
          'Lees het voorstel. Klopt het met het plan? Geef akkoord.',
          'Keur de acties goed die Claude wil uitvoeren. Lees eerst wat Claude gaat doen.',
          'Open de solution in make.powerapps.com en bekijk de tabellen.',
          { text: 'Laat Claude committen:', prompt: 'commit' }
        ],
        img: { file: 'm5-s4-datamodel-tabellen.png', caption: 'De solution HardwareManager in make.powerapps.com met de nieuwe tabellen (Apparaat, Onboarding, Bestelling) en hun kolommen.' },
        check: 'Je ziet de nieuwe tabellen met prefix <code>cgk_</code> in de solution.',
        help: 'Lukt een stap niet? Gebruik de <a href="#prompts">fix-prompt</a> en plak de volledige foutmelding.'
      },
      {
        id: 'm5-s5',
        title: 'Leg de relaties aan',
        goal: 'De tabellen zijn aan elkaar gekoppeld zoals in het bouwplan.',
        do: [
          { text: 'Geef Claude de prompt voor de relaties:', prompt: 'relaties' },
          'Controleer vooral het gedrag bij verwijderen. Wat gebeurt er met een apparaat als een medewerker vertrekt?',
          'Geef akkoord, laat bouwen en controleer in make.powerapps.com onder de tabel &gt; <kbd>Relationships</kbd>.',
          { text: 'Laat Claude committen:', prompt: 'commit' }
        ],
        img: { file: 'm5-s5-relaties.png', caption: 'Het tabblad Relationships van de tabel Apparaat met de relatie naar medewerker (lookup) zichtbaar.' },
        check: 'Elke relatie uit het bouwplan staat onder <kbd>Relationships</kbd> van de betreffende tabel.',
        help: 'Twijfel je over N:N of 1:N? Vraag Claude: "Leg in twee zinnen uit waarom je voor dit relatietype kiest."'
      },
      {
        id: 'm5-s6',
        title: 'Bouw de model-driven app',
        goal: 'Mark heeft een app met navigatie, views en formulieren.',
        do: [
          { text: 'Geef Claude de prompt voor de app:', prompt: 'app' },
          'Review het voorstel voor navigatie en formulieren en geef akkoord.',
          'Open de app via <kbd>Apps</kbd> in make.powerapps.com en klik door de navigatie.',
          { text: 'Laat Claude committen:', prompt: 'commit' }
        ],
        img: { file: 'm5-s6-model-driven-app.png', caption: 'De model-driven app Hardware Manager met de navigatie links (Apparaten, Medewerkers, Onboardings, Bestellingen) en een lijstweergave van apparaten.' },
        check: 'De app opent en je kunt naar alle tabellen navigeren.',
        help: 'Zie je oude formulieren? Vraag Claude: "Publiceer alle wijzigingen in de solution." en ververs de app.'
      },
      {
        id: 'm5-s7',
        title: 'Bouw de onboarding- en bestelflow',
        goal: 'Een onboarding leidt tot een keuze van de manager en een bestelling.',
        mark: 'Dit is waar ik van droom: nieuwe collega, manager kiest een laptop, bestelling staat klaar. Zonder Excel!',
        do: [
          { text: 'Geef Claude de prompt voor de flows:', prompt: 'flows' },
          'Review de trigger, stappen en uitkomst per flow en geef akkoord.',
          'Maakt Claude connection references aan, dan vraagt Claude je mogelijk één keer een verbinding te kiezen of in te loggen. Volg die aanwijzing.',
          { text: 'Laat Claude committen:', prompt: 'commit' }
        ],
        img: { file: 'm5-s7-flows.png', caption: 'De solution met de twee cloud flows (Onboarding en Bestelling) en de flow designer van de onboardingflow met trigger en stappen.' },
        check: 'Beide flows staan <em>Aan</em> in de solution.',
        help: 'Staat een flow uit? Vraag Claude: "Waarom staat de flow uit en wat is er nodig om hem aan te zetten?" Vaak moet je één keer een verbinding kiezen.'
      },
      {
        id: 'm5-s8',
        title: 'Bouw de bestelactiviteit en review',
        goal: 'Bestellingen zijn zichtbaar in de tijdlijn en de solution voldoet aan de standaarden.',
        do: [
          { text: 'Geef Claude de prompt voor de bestelactiviteit:', prompt: 'activiteit' },
          'Beoordeel de uitleg van de ontwerpkeuze en geef akkoord.',
          { text: 'Laat daarna de hele solution controleren:', prompt: 'review' },
          'Kies welke punten Claude moet oplossen en laat dat doen.',
          { text: 'Laat Claude committen:', prompt: 'commit' }
        ],
        img: { file: 'm5-s8-review-tabel.png', caption: 'Claude Code met de reviewtabel: eis of standaard, status, bewijs en voorstel, met een paar punten op afwijking.' },
        check: 'De reviewtabel heeft geen punten meer op <em>ontbreekt</em>, en je laatste commit staat in je repo.',
        help: 'Veel afwijkingen? Prima: dat is het nut van een review. Los ze één voor één op en commit tussendoor.'
      }
    ]
  },

  {
    id: 'm6',
    number: 6,
    title: 'Deployen en testen',
    duration: '30 min',
    badge: 'Live',
    intro: 'Pak de solution in, importeer hem via de PAC CLI en test het scenario van Mark van begin tot eind.',
    mark: 'Het moment van de waarheid. Ik heb een nieuwe collega die maandag begint...',
    steps: [
      {
        id: 'm6-s1',
        title: 'Laat Claude de solution deployen',
        goal: 'De solution is ingepakt en geïmporteerd in je dev-omgeving.',
        do: [
          { text: 'Laat Claude de deploy uitvoeren:', prompt: 'deploy' },
          'Controleer de omgeving-URL die Claude meldt voordat je akkoord geeft voor de import.'
        ],
        img: { file: 'm6-s1-deploy-geslaagd.png', caption: 'Het Claude Code-paneel met de samenvatting van de deploy: gecontroleerde omgeving, ingepakte solution en geslaagde import.' },
        check: 'De import eindigt zonder fouten en <code>dist/HardwareManager.zip</code> bestaat.',
        help: 'Mislukt de import, bijvoorbeeld door een ontbrekende afhankelijkheid? Claude ziet de fout zelf ook. Vraag: "Los deze fout op" of gebruik de <a href="#prompts">fix-prompt</a>.'
      },
      {
        id: 'm6-s2',
        title: 'Open de app in de omgeving',
        goal: 'Je kunt de app gebruiken zoals Mark dat zou doen.',
        do: [
          'Ga naar make.powerapps.com &gt; <kbd>Apps</kbd> en open <strong>Hardware Manager</strong>.',
          'Klik door alle onderdelen in de navigatie.',
          'Zet de app als favoriet, zodat je hem snel terugvindt.'
        ],
        img: { file: 'm6-s2-app-geopend.png', caption: 'De Hardware Manager-app geopend in de browser, met het dashboard of de lijst met apparaten als startpagina.' },
        check: 'Alle onderdelen in de navigatie openen zonder fouten.',
        help: 'Geen toegang? Controleer of je de security role uit het bouwplan hebt. Vraag Claude: "Welke security role heb ik nodig voor de app en hoe wijs ik die toe?"'
      },
      {
        id: 'm6-s3',
        title: 'Test het scenario van Mark',
        goal: 'De oplossing doet wat Mark vroeg, van begin tot eind.',
        mark: 'Laat maar zien! Als dit werkt, trakteer ik op de koffie.',
        do: [
          '<strong>Registreer een laptop:</strong> maak een nieuw apparaat aan, bijvoorbeeld een laptop met serienummer.',
          '<strong>Koppel hem aan een medewerker:</strong> vul de medewerker in op het apparaat en controleer dat het apparaat op het formulier van de medewerker staat.',
          '<strong>Start een onboarding:</strong> maak een onboarding aan voor een nieuwe medewerker met een manager.',
          '<strong>De manager kiest een apparaat:</strong> controleer dat de manager een taak of goedkeuring krijgt en kies een apparaat.',
          '<strong>Bestelling en activiteit:</strong> controleer dat er een bestelling is aangemaakt en dat de bestelactiviteit in de tijdlijn staat.',
          'Loop de acceptatiecriteria in <code>docs/building-plan.md</code> na en vink ze af.'
        ],
        img: { file: 'm6-s3-testscenario-tijdlijn.png', caption: 'Het formulier van een bestelling met de gekoppelde onboarding en medewerker, en de bestelactiviteit zichtbaar in de tijdlijn.' },
        check: 'Alle vijf de stappen van het scenario werken en alle acceptatiecriteria zijn afgevinkt.',
        help: 'Start een flow niet? Open de flow en kijk onder <kbd>Run history</kbd>. Geen run: controleer de trigger. Mislukte run: kopieer de fout naar de fix-prompt.'
      }
    ]
  },

  {
    id: 'm7',
    number: 7,
    title: 'Afronden',
    duration: '15 min',
    badge: 'Afgerond',
    intro: 'Leg alles vast, vergelijk het resultaat met het bouwplan en kijk terug op de samenwerking met de agent.',
    mark: 'Wat een verschil met mijn oude Excel-lijst. Dank je wel!',
    steps: [
      {
        id: 'm7-s1',
        title: 'Laatste commit en push',
        goal: 'Je volledige oplossing staat in GitHub.',
        do: [
          { text: 'Laat Claude de laatste wijzigingen vastleggen:', prompt: 'commit' },
          'Vraag daarna: "Laat de commitgeschiedenis van dit project zien, één regel per commit."'
        ],
        img: { file: 'm7-s1-commitgeschiedenis.png', caption: 'Het Claude Code-paneel met de commitgeschiedenis: een commit per bouwstap, van projectstructuur tot afronding.' },
        check: 'Je ziet op GitHub een commit per bouwstap en de map <code>solution/</code> met inhoud.',
        help: 'Push geweigerd? Vraag Claude: "De push is geweigerd, haal eerst de laatste wijzigingen op en probeer het opnieuw."'
      },
      {
        id: 'm7-s2',
        title: 'Vergelijk het resultaat met het bouwplan',
        goal: 'Je weet wat er wel en niet volgens plan is gebouwd.',
        do: [
          'Open <code>docs/building-plan.md</code> en loop elk hoofdstuk langs.',
          'Markeer wat klaar is, wat afwijkt en wat ontbreekt.',
          'Optioneel: vraag Claude "Vergelijk de solution met docs/building-plan.md en zet de verschillen in docs/opleververslag.md."'
        ],
        img: { file: 'm7-s2-vergelijking.png', caption: 'docs/building-plan.md naast de app, of een opleververslag met per hoofdstuk de status klaar, afwijking of ontbreekt.' },
        check: 'Je kunt per hoofdstuk van het bouwplan zeggen of het klaar is.',
        help: 'Afwijkingen zijn niet erg, zolang je ze kunt uitleggen. In een echt project bespreek je ze met de klant.'
      },
      {
        id: 'm7-s3',
        title: 'Reflecteer en doe een bonusuitdaging',
        goal: 'Je weet wat jij deed en wat de agent deed, en je kunt verder oefenen.',
        do: [
          '<strong>Reflectie:</strong> waar hield jij de regie (plan, review, akkoord, commit)? Wat deed de agent zelfstandig? Waar moest je bijsturen?',
          'Deel één inzicht met de groep.',
          '<strong>Bonus 1, dashboard:</strong> laat Claude een dashboard maken met apparaten per status en openstaande bestellingen.',
          '<strong>Bonus 2, voorraadmelding:</strong> laat een flow een melding sturen als er minder dan drie laptops op voorraad zijn.',
          '<strong>Bonus 3, Copilot-agent voor Mark:</strong> maak in Copilot Studio een agent waaraan Mark kan vragen: "Welke apparaten heeft Sanne?"',
          'Klaar? Haal je <a href="#certificaat">certificaat</a> op!'
        ],
        img: { file: 'm7-s3-bonus-dashboard.png', caption: 'Een bonusresultaat: het dashboard in de Hardware Manager-app met een grafiek van apparaten per status.' },
        check: 'Je hebt je reflectie gedeeld en weet welke bonusuitdaging je als volgende oppakt.',
        help: 'Begin een bonus weer met plan eerst: laat Claude het bouwplan aanvullen voordat er iets gebouwd wordt.'
      }
    ]
  }
];
