/* =========================================================================
   Inhoud van de training "Agentic bouwen in het Power Platform".
   Alle teksten, prompts, stappen en screenshots staan in dit bestand.
   Aanpassen = dit bestand bewerken; app.js hoeft niet te veranderen.
   ========================================================================= */

const CONFIG = {
  title: 'Agentic bouwen in het Power Platform',
  storageKey: 'cegeka-ccd-training-v1',
  totalDuration: 'circa 1 uur',
  solutionName: 'HardwareManager',
  publisherPrefix: 'cgk',
  envUrlExample: 'https://<jouw-org>.crm4.dynamics.com',
  repoName: 'hardware-manager',
  prepGuideUrl: 'https://cegekagroup-my.sharepoint.com/:w:/g/personal/daan_degraaff_cegeka_com/IQBshG45kfB5RpKY2jZrgvwVAQN4xo6hzj7-HWJvicc_UtA?e=g1doad',
  caseVideo: 'video/hardware-manager-case.mp4',
  transcript: { file: 'content/transcript-overleg-mark.txt', name: 'Transcript intake met Mark' },
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
   Trainingen op de startpagina. Alleen de actieve training heeft een link.
   ------------------------------------------------------------------------- */
const TRAININGS = [
  {
    title: 'Agentic bouwen in het Power Platform',
    subtitle: 'Dataverse en model-driven apps',
    description: 'Bouw de Hardware Manager voor Mark: van intake en bouwplan tot datamodel, app, flows en startpagina, gebouwd door een coding agent.',
    tags: ['Dataverse', 'Model-driven app', 'Cloud flows', 'Claude Code'],
    icon: 'database',
    href: '#start',
    active: true
  },
  {
    title: 'Canvas apps bouwen met een coding agent',
    subtitle: 'Canvas apps',
    description: 'Laat een coding agent een canvas app voor eindgebruikers ontwerpen en bouwen, met de Cegeka-standaarden als basis.',
    tags: ['Canvas app', 'Power Fx', 'Claude Code'],
    icon: 'phone',
    active: false
  },
  {
    title: 'Power Pages bouwen met een coding agent',
    subtitle: 'Power Pages',
    description: 'Bouw een portaal voor klanten of partners in Power Pages, van bouwplan tot gepubliceerde site.',
    tags: ['Power Pages', 'Portaal', 'Claude Code'],
    icon: 'globe',
    active: false
  }
];

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
`Controleer of mijn laptop klaar is voor de training "Agentic bouwen in het Power Platform":
- Node.js (versie 18 of hoger), Git en de Power Platform CLI (pac): geef per onderdeel de versie
- Git: staan mijn naam en e-mailadres ingesteld? Laat zien wat er staat.
Pas niets aan. Ontbreekt er iets, vertel me dan in één zin wat ik moet doen.`,
    tip: 'Je vraagt om het resultaat (is alles er?) in plaats van losse commando\'s. "Pas niets aan" houdt het een veilige controle: Claude kijkt alleen, jij beslist wat er moet gebeuren.'
  },
  {
    id: 'bouwplan',
    title: 'Bouwplan maken',
    where: 'Microsoft 365 Copilot of Claude (chat)',
    module: 2,
    text:
`Volg de regels en het sjabloon van de building plan skill hierboven.

Maak op basis van de bijgevoegde input het bouwplan voor de oplossing "Hardware Manager".
Input:
- transcript van de intake met Mark (Hardware Manager), hieronder geplakt
- mijn eigen notities (indien aanwezig)

Zet het hele plan in één Markdown-blok, zodat ik het kan opslaan als building-plan.md.`,
    tip: 'De skill bevat de vaste structuur en de regels, zoals "verzin geen eisen" en "zet aannames apart". Daardoor blijft de prompt kort, krijgt iedereen hetzelfde soort plan, en zie je meteen welke aannames de AI heeft gedaan.'
  },
  {
    id: 'project-setup',
    title: 'Projectstructuur laten maken',
    where: 'Claude Code',
    module: 3,
    text:
`Zet dit project klaar volgens de building standards skill:
- zet de map onder versiebeheer met Git
- maak een README.md met één zin over dit project
- maak de map solution/ (docs/ en .claude/skills/ staan er al)
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
- Werkwijze: lees altijd eerst docs/building-plan.md en de building standards skill, plan eerst en vraag akkoord voor elke bouwstap, alles in de solution HardwareManager, controleer de omgeving voordat je iets wijzigt, sluit elke stap af met een samenvatting en een commit.
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
`Commit alle wijzigingen van deze stap met een korte, duidelijke commit message in het Nederlands en push naar GitHub (als de repo al op GitHub staat). Laat me de commit message zien voordat je commit.`,
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
`Welke skills heb je in dit project beschikbaar? Vat de building standards skill samen in maximaal vijf punten: wat ga je eruit gebruiken bij het bouwen van de Hardware Manager?`,
    tip: 'Een snelle check of Claude de building standards skill echt gevonden en gelezen heeft, voordat je gaat bouwen.'
  },
  {
    id: 'eerste-claude',
    title: 'Eerste Claude Code prompt: lezen en plannen',
    where: 'Claude Code (terminal in VS Code)',
    module: 5,
    text:
`Lees CLAUDE.md, de building standards skill in .claude/skills/ en docs/building-plan.md.

Maak daarna een implementatieplan in docs/implementation-plan.md met:
- de bouwstappen in volgorde (datamodel, relaties, model-driven app, flows voor onboarding en bestelling, startpagina)
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
Maak de bestelactiviteit als activiteitstabel, zodat bestellingen straks in de tijdlijn verschijnen.

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
Leg de relaties uit hoofdstuk 6 van docs/building-plan.md aan (bijvoorbeeld apparaat aan medewerker, onboarding aan medewerker en manager, bestelling aan onboarding).
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
Maak de app met navigatie, de views en de formulieren uit hoofdstuk 8 van docs/building-plan.md.
Zorg dat Mark op het formulier van een medewerker direct de gekoppelde apparaten en onboardings ziet, en dat bestelactiviteiten in de tijdlijn staan.
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
    id: 'startpagina',
    title: 'Bouwstap: startpagina',
    where: 'Claude Code',
    module: 5,
    text:
`Voer de laatste stap uit het implementatieplan uit: een startpagina voor de app "Hardware Manager".
Maak een overzichtspagina die Mark als eerste ziet als hij de app opent, volgens de building standards skill (onderdeel Pages, pagina binnen een model-driven app):
- een rij KPI-tegels, bijvoorbeeld apparaten in gebruik, apparaten op voorraad, lopende onboardings en openstaande bestellingen; elke tegel linkt naar de bijbehorende view
- een lijst "Wat aandacht nodig heeft": onboardings waarvoor de manager nog geen apparaat heeft gekozen en bestellingen die nog niet zijn geleverd
- de laatste vijf bestellingen
Zet de pagina als eerste onderdeel in de navigatie van de app.
Toon eerst een schets van de indeling en welke data elke tegel en lijst gebruikt, wacht op akkoord, bouw, publiceer en stel een commit message voor.`,
    tip: 'Je beschrijft wat Mark in één oogopslag moet zien, en de skill zorgt dat de pagina eruitziet als onderdeel van de app. Door eerst een schets te vragen, controleer je de inhoud voordat er iets gebouwd wordt.'
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
  { term: 'Skill', def: 'Een map met een SKILL.md-bestand met instructies en best practices die Claude automatisch gebruikt als ze relevant zijn. Cegeka levert twee skills: de building plan skill gebruik je in de chat (Copilot of Claude) voor het bouwplan, de building standards skill zet je in je project in .claude/skills/cegeka-building-standards/SKILL.md, zodat Claude Code ermee bouwt.' },
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
     tip    : (optioneel) tip met het Cegeka-icoon; tipLabel wijzigt het label
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
    title: 'Introductie',
    info: true,
    duration: '5 min',
    badge: 'Kick-off',
    intro: 'Maak kennis met Mark, de nieuwe Hardware Manager van Cegeka, ontdek wat je vandaag bouwt en hoe, en zorg dat je de voorbereiding uit de handleiding hebt gedaan.',
    tip: 'Alles wat je vandaag bouwt, begint bij de vraag van de klant.',
    steps: [
      {
        id: 'm0-s1',
        title: 'Bekijk de introvideo',
        goal: 'Je weet wie Mark is en waar de training over gaat.',
        tip: 'De video is de introductie. De wensen van Mark staan in het transcript van de intake, dat je in module 2 als input voor je bouwplan gebruikt.',
        video: true,
        do: [
          'Start de video hieronder en maak kennis met Mark, de nieuwe Hardware Manager van Cegeka.',
          'Mark heeft al een intakeoverleg gehad met een Cegeka-consultant. Het transcript daarvan gebruik je in module 2 om het bouwplan te maken.'
        ],
        img: null,
        check: 'Je hebt minstens vier wensen en twee open vragen genoteerd.',
        help: 'Speelt de video niet af? Geen probleem: alles wat je nodig hebt, staat in het transcript in module 2.'
      },
      {
        id: 'm0-s2',
        title: 'Wat ga je bouwen?',
        goal: 'Je weet welk eindresultaat je aan het einde van de training in je omgeving hebt staan.',
        do: [
          'Lees de onderdelen van de Hardware Manager-oplossing: <strong>een datamodel</strong> voor apparaten, medewerkers, onboardings en bestellingen; <strong>relaties</strong> tussen die tabellen; <strong>een model-driven app</strong> voor Mark; <strong>een onboardingflow</strong> waarmee de manager een apparaat kiest; <strong>een bestelflow</strong> met een bestelactiviteit in de tijdlijn; en <strong>een startpagina</strong> met een overzicht voor Mark.',
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
        goal: 'Je kent de werkwijze van de training.',
        tip: 'Een goed plan is sneller dan een snelle app die niet doet wat de klant vroeg.',
        do: [
          '<strong>Plan eerst.</strong> Je maakt met Copilot of Claude een bouwplan op basis van het transcript van de intake met Mark, en controleert dat plan zoals je dat met een klant zou doen.',
          '<strong>Bouw daarna.</strong> Claude Code bouwt de oplossing stap voor stap in Dataverse, met de building standards skill als vakmanschap en het bouwplan als opdracht.',
          '<strong>Jij houdt de regie.</strong> Na elke stap review je het resultaat en laat je Claude een commit maken.',
          '<strong>Je bouwt vanuit een gesprek.</strong> Je typt geen commando\'s: je vraagt Claude wat je wilt, Claude stelt de acties voor en jij keurt ze goed. De building standards skill beschrijft hoe Claude het doet.',
          'De training bestaat uit 8 modules. Vink elke stap af met <em>Markeer als klaar</em>; je voortgang wordt in deze browser bewaard.'
        ],
        img: { file: 'm0-s3-aanpak-plan-bouw.png', caption: 'Schema van de aanpak: input (transcript, notities, Work IQ), bouwplan, review met klant, bouwen met Claude Code en skills, testen.' },
        check: 'Je weet waarom het bouwplan vóór het bouwen komt.',
        help: 'Je kunt de training op elk moment onderbreken. Je voortgang blijft bewaard zolang je dezelfde browser gebruikt.'
      },
      {
        id: 'm0-s4',
        lead: `Doe deze voorbereiding vóór de training, met de handleiding <a href="${CONFIG.prepGuideUrl}" target="_blank" rel="noopener"><strong>Aan de slag met Claude Code in VS Code</strong></a>. Daarin staan deze stappen:`,
        title: 'Voorbereiding vooraf: de handleiding',
        goal: 'Je licentie is actief en Claude Code, Node.js, Git en GitHub werken op je laptop.',
        do: [
          '<strong>Licentie aanvragen</strong> voor Claude via Horizon (Manage Software).',
          '<strong>VS Code, Node.js en Git installeren</strong> via de Company Portal. Herstart VS Code daarna.',
          '<strong>Claude Code toevoegen</strong> als extensie in VS Code en inloggen met je Cegeka-account.',
          '<strong>Git en GitHub koppelen:</strong> je naam en noreply-mailadres instellen en in VS Code inloggen met GitHub.',
          '<strong>Een werkmap inrichten buiten OneDrive</strong>, bijvoorbeeld <code>C:\\Users\\jouwnaam\\Projecten</code>.',
          '<strong>De testopdracht uitvoeren</strong> en de testmap publiceren als private repository.'
        ],
        img: null,
        check: 'Je kunt alles van de checklist in de handleiding afvinken: licentie actief, VS Code, Node.js en Git geïnstalleerd, Claude Code ingelogd, Git en GitHub gekoppeld, werkmap buiten OneDrive en de testopdracht gelukt.',
        help: 'Vragen over je licentie? Kijk in het artikel <em>Requesting an AI platform license</em> op ONE. Loop je vast bij het installeren, meld het dan vóór de training bij de trainer, zodat je op de dag direct kunt beginnen.'
      }
    ]
  },

  {
    id: 'm1',
    number: 1,
    title: 'Voorbereiding',
    badge: 'Klaar voor de start',
    certLabel: 'Visual Studio Code, Claude Code, Node.js en GitHub opzetten',
    intro: 'Voeg de Power Platform Tools toe en laat Claude controleren of alles klaarstaat. De handleiding uit de introductie heb je dan al doorlopen.',
    tip: 'Het meeste gereedschap heb je al geïnstalleerd met de handleiding. Hier komen alleen de Power Platform Tools erbij.',
    steps: [
      {
        id: 'm1-s1',
        title: 'Installeer de Power Platform Tools',
        goal: 'VS Code heeft de Power Platform Tools, met daarin de PAC CLI die Claude gebruikt om met Dataverse te werken.',
        do: [
          'Open Extensions met <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd> of via het blokjesicoon in de linkerbalk.',
          'Zoek op <strong>Power Platform Tools</strong> (uitgever Microsoft) en klik <kbd>Install</kbd>.',
          'Sluit VS Code helemaal af en start opnieuw. Pas dan kan Claude de PAC CLI vinden.'
        ],
        img: { file: 'm1-s1-power-platform-tools.png', caption: 'Het Extensions-paneel in VS Code met Power Platform Tools van Microsoft geïnstalleerd, en het Power Platform-icoon in de linkerbalk.' },
        check: 'Power Platform Tools staat onder <em>Installed</em> en je ziet het Power Platform-icoon in de linkerbalk.',
        help: 'Kun je de extensie niet installeren? Vraag de trainer of je laptop extensies uit de Marketplace mag installeren.'
      },
      {
        id: 'm1-s2',
        title: 'Laat Claude controleren of je klaar bent',
        goal: 'Claude bevestigt dat Node.js, Git, de PAC CLI en je Git-instellingen in orde zijn.',
        tip: 'Vanaf nu werk je zo: jij vraagt, Claude doet, jij keurt goed. Commando\'s typen hoeft niet.',
        do: [
          'Open in VS Code je werkmap (bijvoorbeeld <code>Projecten</code>) via <kbd>File</kbd> &gt; <kbd>Open Folder</kbd>.',
          'Open het Claude Code-paneel via het <strong>Spark-icoon (✱)</strong> rechtsboven in de editor, of rechtsonder in de statusbalk via <strong>✱ Claude Code</strong>.',
          { text: 'Stuur deze prompt naar Claude:', prompt: 'check-installaties' },
          'Claude vraagt toestemming om opdrachten uit te voeren. Lees wat Claude wil doen en geef akkoord.'
        ],
        img: { file: 'm1-s2-klaar-voor-de-start.png', caption: 'Het Claude Code-paneel met de samenvatting: versies van Node.js, Git en pac, en de ingestelde Git-naam en e-mail.' },
        check: 'Claude meldt voor Node.js, Git en pac een versienummer en bevestigt dat je Git-naam en e-mail zijn ingesteld.',
        help: 'Vindt Claude <code>pac</code> niet? Herstart VS Code helemaal en stuur de prompt opnieuw. Ontbreekt iets anders, ga dan terug naar de betreffende stap in de handleiding.'
      }
    ]
  },

  {
    id: 'm2',
    number: 2,
    title: 'Het bouwplan maken',
    duration: '10 min',
    badge: 'Architect',
    certLabel: 'Een bouwplan maken met AI',
    intro: 'Verzamel input, laat Copilot of Claude een bouwplan maken met de building plan skill en review het kritisch.',
    tip: 'Laat het plan eerst controleren door de klant, voordat er iets gebouwd wordt. Aanpassen op papier is sneller dan in de app.',
    steps: [
      {
        id: 'm2-s1',
        title: 'Verzamel je input',
        tipLabel: 'In de praktijk',
        tip: 'In een echt project heb je vaak meer input dan één transcript. Vraag dan in Microsoft 365 Copilot via Work IQ naar relevante mails, chats, Teams-opnames en documenten van de klant, en geef die samenvatting mee aan het bouwplan.',
        goal: 'Je hebt alle bronnen voor het bouwplan bij elkaar.',
        do: [
          'Lees het <strong>transcript van de intake</strong> met Mark: een opgenomen Teams-overleg waarin hij zijn probleem en wensen bespreekt met consultant Lotte en Ahmed van de servicedesk.',
          { text: 'Kopieer het transcript. Je plakt het in de volgende stap in de chat.', copyfile: 'transcript', view: true },
          'Optioneel: schrijf je eigen notities en vragen erbij.',
                  ],
        img: null,
        check: 'Je hebt het transcript gelezen en gekopieerd, en weet wat Mark belangrijk vindt.',
        help: 'Lukt kopiëren niet? Klap het transcript open, selecteer de tekst en kopieer met <kbd>Ctrl</kbd>+<kbd>C</kbd>.'
      },
      {
        id: 'm2-s2',
        title: 'Open Copilot of Claude chat',
        goal: 'Je hebt een nieuwe chat open met de building plan skill en je input.',
        do: [
          'Open <strong>Claude</strong> (claude.ai) of <strong>Microsoft 365 Copilot</strong> en start een nieuwe chat.',
          { text: 'Kopieer de building plan skill en plak hem in het berichtveld:', copyfile: 'plan' },
          'Plak het transcript eronder, met eventueel je eigen notities. Verstuur nog niets.'
        ],
        img: { file: 'm2-s2-chat-met-input.png', caption: 'Een nieuwe chat in Claude of Copilot met de geplakte building plan skill en het transcript in het berichtveld.' },
        check: 'De skill en je input staan in het berichtveld en zijn nog niet verstuurd.',
        help: 'Is het bericht te lang voor Copilot? Verstuur de skill dan eerst met de zin "Gebruik deze instructies voor mijn volgende vraag." en stuur daarna je input met de prompt.'
      },
      {
        id: 'm2-s3',
        title: 'Voer de bouwplan-prompt uit',
        goal: 'Je hebt een eerste versie van het bouwplan in Markdown.',
        tip: 'Lees het hoofdstuk aannames extra goed. Daar staat wat de AI zelf heeft ingevuld.',
        do: [
          { text: 'Kopieer de prompt en plak hem onder de skill en je input. Verstuur.', prompt: 'bouwplan' },
          'Wacht tot het volledige plan klaar is.',
          'Vraag Claude of Copilot het plan in één Markdown-codeblok te zetten als dat nog niet zo is.'
        ],
        img: { file: 'm2-s3-bouwplan-resultaat.png', caption: 'Het gegenereerde bouwplan in de chat met de elf hoofdstukken, met het datamodel als tabel zichtbaar.' },
        check: 'Het plan heeft alle elf hoofdstukken, van input tot aannames en open vragen.',
        help: 'Mist er een hoofdstuk? Vraag: "Vul hoofdstuk X aan op basis van de input. Verander de rest niet."'
      },
      {
        id: 'm2-s4',
        title: 'Review het plan en kopieer het',
        goal: 'Je bouwplan klopt met de casus en je hebt de definitieve versie gekopieerd.',
        do: [
          '<strong>Componentkeuzes:</strong> staat er ergens BEVESTIGEN? Neem een besluit en laat het plan aanpassen.',
          '<strong>Tabellen:</strong> zijn apparaat, medewerker, onboarding en bestelling aanwezig? Hebben de kolommen logische datatypes?',
          '<strong>Relaties:</strong> kan één medewerker meerdere apparaten hebben? Hangt de bestelling aan de onboarding?',
          '<strong>Security:</strong> wie mag apparaten zien en wie mag bestellen? Klopt dat met wat Mark zei?',
          '<strong>App en flows:</strong> staat de keuze door de manager erin, en de bestelling die daaruit volgt?',
          '<strong>Acceptatiecriteria:</strong> kun je elk criterium straks echt testen?',
          'Laat ontbrekende punten aanvullen in de chat.',
          'Kopieer het definitieve plan met de kopieerknop van het Markdown-blok in de chat. Laat de chat open: in module 3 plak je het plan in VS Code.'
        ],
        img: { file: 'm2-s4-plan-kopieren.png', caption: 'Het definitieve bouwplan in de chat, met de kopieerknop van het Markdown-blok gemarkeerd.' },
        check: 'Je kunt elke tabel en flow in het plan uitleggen, en de chat met het definitieve plan staat nog open.',
        help: 'In een echt project bespreek je het plan nu met de klant. In deze training is de trainer de klant: twijfel je, vraag het hem of haar.'
      }
    ]
  },

  {
    id: 'm3',
    number: 3,
    title: 'Je project klaarzetten',
    duration: '10 min',
    badge: 'Op orde',
    certLabel: 'Project, skill en GitHub-repo opzetten',
    intro: 'Maak een projectmap, zet je bouwplan en de building standards skill erin, laat Claude de structuur, CLAUDE.md en de eerste commit maken en publiceer het op GitHub.',
    tip: 'Een vaste structuur in je repo helpt Claude: het weet dan precies waar het plan, de skill en de solution staan.',
    steps: [
      {
        id: 'm3-s1',
        title: 'Maak je projectmap',
        goal: 'Je hebt een lege projectmap in je werkmap, geopend in VS Code.',
        do: [
          'Maak in je werkmap (buiten OneDrive, bijvoorbeeld <code>C:\\Users\\jouwnaam\\Projecten</code>) een nieuwe map <code>hardware-manager</code>.',
          'Open de map in VS Code via <kbd>File</kbd> &gt; <kbd>Open Folder</kbd>.',
          'Vraagt VS Code of je de makers van de map vertrouwt? Kies <kbd>Yes, I trust the authors</kbd>. Zonder dat vertrouwen werkt Claude Code niet.'
        ],
        img: { file: 'm3-s1-projectmap-geopend.png', caption: 'VS Code met de lege map hardware-manager geopend in de Explorer.' },
        check: 'VS Code toont de map <code>hardware-manager</code> in de Explorer.',
        help: 'Staat je map toch in OneDrive, Documenten of op je bureaublad? Verplaats hem naar je werkmap. Synchronisatie botst met Git.'
      },
      {
        id: 'm3-s2',
        title: 'Plak je bouwplan en de skill in je project',
        goal: 'De bestanden die Claude nodig heeft staan in je project.',
        tip: 'De skill is het vakmanschap van Cegeka. Daarmee bouwt Claude volgens onze afspraken.',
        do: [
          'Klik in de Explorer van VS Code op het icoon <kbd>New File</kbd> (of rechtermuisknop &gt; <kbd>New File</kbd>).',
          'Typ als naam <code>docs/building-plan.md</code> en druk <kbd>Enter</kbd>. VS Code maakt de map <code>docs</code> er vanzelf bij.',
          'Plak je bouwplan uit de chat van module 2 (<kbd>Ctrl</kbd>+<kbd>V</kbd>) en sla op (<kbd>Ctrl</kbd>+<kbd>S</kbd>).',
          'Maak op dezelfde manier een tweede bestand: <code>.claude/skills/cegeka-building-standards/SKILL.md</code>.',
          { text: 'Kopieer de building standards skill, plak hem in het nieuwe bestand en sla op:', copyfile: 'standards' }
        ],
        img: { file: 'm3-s2-bestanden-in-project.png', caption: 'De Explorer in VS Code met docs/building-plan.md en .claude/skills/cegeka-building-standards/SKILL.md, met het geplakte bouwplan geopend.' },
        check: 'Je ziet <code>docs/building-plan.md</code> en <code>.claude/skills/cegeka-building-standards/SKILL.md</code> in de Explorer, allebei gevuld en opgeslagen.',
        help: 'Ziet het plan er rommelig uit? Controleer of je het hele Markdown-blok hebt gekopieerd. Klik rechtsboven op het preview-icoon om het opgemaakt te zien. Let op: het skillbestand heet exact <code>SKILL.md</code>, in hoofdletters.'
      },
      {
        id: 'm3-s3',
        title: 'Laat Claude de projectstructuur maken',
        goal: 'Je repo heeft de mappen docs/, solution/ en .claude/skills/ met alles op de juiste plek.',
        do: [
          'Open het Claude Code-paneel via het <strong>Spark-icoon (✱)</strong>.',
          { text: 'Stuur deze prompt:', prompt: 'project-setup' },
          'Keur de acties goed die Claude voorstelt.',
          'Bekijk de structuur die Claude laat zien.'
        ],
        img: { file: 'm3-s3-projectstructuur.png', caption: 'De Explorer met .claude/skills/cegeka-building-standards/SKILL.md, docs/building-plan.md en de map solution, met daarnaast de samenvatting van Claude.' },
        check: 'Claude toont de structuur met <code>docs</code>, <code>solution</code>, <code>.claude/skills</code>, README.md en .gitignore.',
        help: 'Iets op de verkeerde plek? Zeg het gewoon tegen Claude, bijvoorbeeld: "Het bouwplan staat niet in docs/, zet het daar."'
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
        check: '<code>CLAUDE.md</code> staat in de hoofdmap van je project en bevat jouw omgeving-URL.',
        help: 'Wil je later iets toevoegen aan CLAUDE.md? Vraag het Claude: "Voeg aan CLAUDE.md toe dat..."'
      },
      {
        id: 'm3-s5',
        title: 'Eerste commit en publiceren op GitHub',
        goal: 'Je startpunt is vastgelegd en staat als private repository op GitHub.',
        do: [
          { text: 'Laat Claude de eerste commit maken. Deze prompt gebruik je na elke bouwstap opnieuw.', prompt: 'commit' },
          'Open <kbd>Source Control</kbd> (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd>) en klik <kbd>Publish Branch</kbd>.',
          'Kies <strong>private repository</strong> en houd de naam <code>hardware-manager</code>.',
          'Open de repo op github.com via de melding rechtsonder.'
        ],
        img: { file: 'm3-s5-publish-branch.png', caption: 'Het Source Control-paneel in VS Code met de knop Publish Branch en de keuze voor een private repository.' },
        check: 'Op GitHub staat de private repo <code>hardware-manager</code> met <code>.claude</code>, <code>docs</code> en <code>CLAUDE.md</code>. De lege map <code>solution</code> zie je nog niet; dat is normaal.',
        help: 'Zie je geen Publish Branch? Controleer of je in VS Code bent ingelogd met GitHub (handleiding, stap 5). Let op: zet nooit wachtwoorden, API-sleutels, connection strings of klantdata in de repo.'
      }
    ]
  },

  {
    id: 'm4',
    number: 4,
    title: 'Verbinden met Dataverse',
    duration: '5 min',
    badge: 'Verbonden',
    certLabel: 'Verbinden met het Power Platform',
    intro: 'Laat Claude verbinding maken met je dev-omgeving en de publisher en solution klaarzetten.',
    tip: 'Controleer altijd eerst in welke omgeving je zit, voordat je iets bouwt.',
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
    duration: '20 min',
    badge: 'Bouwer',
    certLabel: 'Datamodel, app, flows en startpagina laten bouwen door een coding agent',
    intro: 'Laat Claude Code eerst plannen en bouw daarna stap voor stap: datamodel, relaties, app, flows en een startpagina. Na elke stap: review en commit.',
    tip: 'Bouw rustig stap voor stap: review na elke stap en laat Claude committen. Zo kun je altijd terug.',
    steps: [
      {
        id: 'm5-s1',
        title: 'Controleer of Claude de skill kent',
        goal: 'Claude Code werkt in je project en heeft de building standards skill gevonden.',
        do: [
          'Open het Claude Code-paneel via het <strong>Spark-icoon (✱)</strong>.',
          { text: 'Stuur deze prompt:', prompt: 'skills-check' }
        ],
        img: { file: 'm5-s1-skills-check.png', caption: 'Het Claude Code-paneel in het project hardware-manager met de samenvatting van de building plan skill en de building standards skill.' },
        check: 'Claude noemt de building standards skill en vat die kloppend samen.',
        help: 'Kent Claude de skill niet? Vraag: "Controleer of de skill in .claude/skills/cegeka-building-standards/SKILL.md staat en zet hem goed als dat niet zo is." Sluit daarna het Claude-paneel en open het opnieuw.'
      },
      {
        id: 'm5-s2',
        title: 'Eerste prompt: lezen en plannen',
        goal: 'Claude Code heeft een implementatieplan gemaakt, zonder iets te bouwen.',
        tip: 'Dit is de belangrijkste stap: met een goed implementatieplan weet je precies wat Claude gaat doen.',
        do: [
          { text: 'Kopieer de prompt en plak hem in Claude Code. Druk <kbd>Enter</kbd>.', prompt: 'eerste-claude' },
          'Geef toestemming als Claude bestanden wil lezen.',
          'Beantwoord de vragen die Claude stelt.'
        ],
        img: { file: 'm5-s2-implementatieplan.png', caption: 'Claude Code in de terminal tijdens het lezen van CLAUDE.md, de building standards skill en het bouwplan, en daarna docs/implementation-plan.md geopend in de editor.' },
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
        tip: 'Laat Claude eerst per flow de trigger, stappen en uitkomst tonen. Zo controleer je de logica voordat er iets draait.',
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
        title: 'Bouw de startpagina en review',
        goal: 'Mark opent de app op een overzichtspagina, en de solution voldoet aan de standaarden.',
        do: [
          { text: 'Geef Claude de prompt voor de startpagina:', prompt: 'startpagina' },
          'Beoordeel de schets: staan de juiste tegels en lijsten erop? Geef akkoord.',
          'Open de app en bekijk de startpagina. Klik op een tegel: kom je bij de juiste view?',
          { text: 'Laat daarna de hele solution controleren:', prompt: 'review' },
          'Kies welke punten Claude moet oplossen en laat dat doen.',
          { text: 'Laat Claude committen:', prompt: 'commit' }
        ],
        img: { file: 'm5-s8-startpagina.png', caption: 'De startpagina van de Hardware Manager-app: KPI-tegels bovenaan, de lijst Wat aandacht nodig heeft en de laatste bestellingen, in de stijl van de app.' },
        check: 'De app opent op de startpagina, de tegels linken naar de juiste views, de reviewtabel heeft geen punten meer op <em>ontbreekt</em> en je laatste commit staat in je repo.',
        help: 'Ziet de pagina eruit als een losse website? Vraag Claude: "Laat de startpagina aansluiten bij de stijl van de app, volgens het onderdeel Pages van de building standards." Veel afwijkingen in de review? Los ze één voor één op en commit tussendoor.'
      }
    ]
  },

  {
    id: 'm6',
    number: 6,
    title: 'Deployen en testen',
    duration: '5 min',
    badge: 'Live',
    certLabel: 'De oplossing deployen en testen',
    intro: 'Pak de solution in, importeer hem via de PAC CLI en test het scenario van Mark van begin tot eind.',
    tip: 'Test met het scenario dat Mark in de intake beschreef: dan weet je of de oplossing doet wat de klant vroeg.',
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
        img: { file: 'm6-s2-app-geopend.png', caption: 'De Hardware Manager-app geopend in de browser, met de startpagina met KPI-tegels en de lijst Wat aandacht nodig heeft.' },
        check: 'Alle onderdelen in de navigatie openen zonder fouten.',
        help: 'Geen toegang? Controleer of je de security role uit het bouwplan hebt. Vraag Claude: "Welke security role heb ik nodig voor de app en hoe wijs ik die toe?"'
      },
      {
        id: 'm6-s3',
        title: 'Test het scenario van Mark',
        goal: 'De oplossing doet wat Mark vroeg, van begin tot eind.',
        tip: 'Loop het scenario helemaal door, van laptop registreren tot bestelactiviteit. Vink daarna de acceptatiecriteria af.',
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
    duration: '5 min',
    badge: 'Afgerond',
    certLabel: 'Resultaat reviewen en vastleggen in GitHub',
    intro: 'Leg alles vast, vergelijk het resultaat met het bouwplan en kijk terug op de samenwerking met de agent.',
    tip: 'Kijk terug: waar hield jij de regie en wat deed de agent? Dat is de kern van werken met Claude Code.',
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
          '<strong>Bonus 1, voorraadmelding:</strong> laat een flow een melding sturen als er minder dan drie laptops op voorraad zijn.',
          '<strong>Bonus 2, app voor medewerkers:</strong> laat Claude een eenvoudige canvas app maken waarin een medewerker een defect apparaat kan melden.',
          '<strong>Bonus 3, Copilot-agent voor Mark:</strong> maak in Copilot Studio een agent waaraan Mark kan vragen: "Welke apparaten heeft Sanne?"',
          'Klaar? Haal je <a href="#certificaat">certificaat</a> op!'
        ],
        img: { file: 'm7-s3-bonus-agent.png', caption: 'Een bonusresultaat: de Copilot-agent voor Mark die antwoord geeft op de vraag welke apparaten een medewerker heeft.' },
        check: 'Je hebt je reflectie gedeeld en weet welke bonusuitdaging je als volgende oppakt.',
        help: 'Begin een bonus weer met plan eerst: laat Claude het bouwplan aanvullen voordat er iets gebouwd wordt.'
      }
    ]
  }
];
