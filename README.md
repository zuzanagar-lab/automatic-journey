# FibroMotýľ 🦋

Súkromná webová aplikácia (PWA-ready) na sledovanie fibromyalgie v slovenčine.

Umožňuje:
- denné sledovanie bolesti a únavy (škála 0–10), kvality spánku a príznakov
- viesť si osobný denník
- evidovať lieky s tlačidlom "vziať dnes"
- uchovávať výsledky vyšetrení
- mať prehľad kontaktov na lekársky tím (vopred pripravené špecializácie)
- vidieť trendy na domovskej obrazovke za posledných 7 dní
- sledovať stravu: vyhľadať potravinu (databáza Open Food Facts) s automatickým
  doplnením kalórií, alebo pridať jedlo ručne, a vidieť súčet kalórií za deň
- sledovať náladu/stres (škála 0–10), pitný režim (počítadlo pohárov) a počasie
  (teplota a tlak vzduchu podľa polohy)
- sledovať menštruačný cyklus (deň cyklu, história záznamov)
- zaškrtnúť si sprievodné diagnózy, ktoré sa bežne spájajú s fibromyalgiou
  (napr. IBS, migréna, depresia, hypotyreóza...), alebo pridať vlastnú
- pripraviť si súhrn posledných 14 dní pre lekára a vytlačiť ho alebo uložiť ako PDF
- nastaviť pripomienky na lieky (ak appku máte otvorenú v prehliadači)
- stiahnuť si zálohu všetkých dát ako súbor a neskôr ju znova nahrať
- appku si nainštalovať na plochu telefónu (ikona, funguje čiastočne aj offline)

## Ako appku spustiť

Appka je jedna samostatná webová stránka (HTML/CSS/JavaScript) bez potreby
inštalácie čohokoľvek. Stačí otvoriť súbor `index.html` v ľubovoľnom
prehliadači (Chrome, Safari, Edge...) na počítači alebo v telefóne.

Dáta sa ukladajú priamo vo vašom prehliadači (tzv. localStorage) – zostávajú
uložené aj po zatvorení appky, ale iba na tom istom zariadení a v tom istom
prehliadači, v ktorom ste ich zadali.

Vyhľadávanie potravín (Strava) potrebuje pripojenie na internet, keďže si
appka pýta údaje z voľnej databázy Open Food Facts. Bez internetu, alebo ak sa
potravina nenájde, je stále možné pridať jedlo ručne so zadaním kalórií.

Pripomienky na lieky a krokomer fungujú len počas behu appky v prehliadači,
nie sú to skutočné notifikácie na pozadí (najmä na iPhone to nie je spoľahlivé).

## Súbory projektu

- `index.html` – celá appka (štruktúra, vzhľad aj logika v jednom súbore)
- `manifest.json` – nastavenia appky pre inštaláciu na telefón (PWA), vrátane ikon
- `icon-192.png`, `icon-512.png` – ikony appky
- `sw.js` – service worker pre základnú offline funkčnosť

## Plánované rozšírenia

- Zdieľanie appky/dát medzi viacerými zariadeniami alebo s inou osobou
