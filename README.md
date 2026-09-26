# FibroMotýľ 🦋

Súkromná webová aplikácia (PWA-ready) na sledovanie fibromyalgie v slovenčine.

Umožňuje:
- denné sledovanie bolesti a únavy (škála 0–10), kvality spánku a príznakov
- viesť si osobný denník
- evidovať lieky s tlačidlom "vziať dnes"
- uchovávať výsledky vyšetrení
- mať prehľad kontaktov na lekársky tím (vopred pripravené špecializácie)
- vidieť trendy na domovskej obrazovke za posledných 7 dní

## Ako appku spustiť

Appka je jedna samostatná webová stránka (HTML/CSS/JavaScript) bez potreby
inštalácie čohokoľvek. Stačí otvoriť súbor `index.html` v ľubovoľnom
prehliadači (Chrome, Safari, Edge...) na počítači alebo v telefóne.

Dáta sa ukladajú priamo vo vašom prehliadači (tzv. localStorage) – zostávajú
uložené aj po zatvorení appky, ale iba na tom istom zariadení a v tom istom
prehliadači, v ktorom ste ich zadali.

## Súbory projektu

- `index.html` – celá appka (štruktúra, vzhľad aj logika v jednom súbore)
- `manifest.json` – nastavenia pre budúcu inštaláciu appky na telefón (PWA)

## Plánované rozšírenia

- Ikony appky a plnohodnotná inštalácia na iOS/Android (PWA)
- Zálohovanie dát (napr. export/import), prípadne zdieľanie medzi zariadeniami
