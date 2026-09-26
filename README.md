# FibroMotýľ 🦋

Súkromná webová aplikácia (PWA-ready) na sledovanie fibromyalgie v slovenčine.

Umožňuje:
- sledovať bolesť, únavu, spánok a symptómy (denný tracker)
- viesť si osobný denník
- evidovať lieky a ich dávkovanie
- uchovávať výsledky vyšetrení
- mať prehľad kontaktov na lekársky tím
- vidieť trendy na prehľadnej nástenke (dashboard)

## Ako appku spustiť

Appka je čistá webová stránka (HTML/CSS/JavaScript) bez potreby inštalácie čohokoľvek.
Stačí otvoriť súbor `index.html` v ľubovoľnom prehliadači (Chrome, Safari, Edge...).

Dáta sa ukladajú priamo vo vašom prehliadači (tzv. localStorage) – zostávajú
uložené aj po zatvorení appky, ale iba na tom istom zariadení a v tom istom
prehliadači, v ktorom ste ich zadali.

## Súbory projektu

- `index.html` – štruktúra appky (všetky obrazovky)
- `style.css` – vzhľad appky (fialová farebná téma, motýlik)
- `app.js` – logika appky (ukladanie dát, prepínanie obrazoviek, graf trendov)
- `manifest.json` – nastavenia pre budúcu inštaláciu appky na telefón (PWA)

## Plánované rozšírenia

- Ikony appky a plnohodnotná inštalácia na iOS/Android (PWA)
- Zálohovanie dát (napr. export/import)
