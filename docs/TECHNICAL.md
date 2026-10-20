# Guida tecnica


## Architettura
HTML/CSS/JavaScript nativi, nessuna dipendenza runtime esterna. Stato in memoria: pianificazioni, sopralluoghi, risposte, NC, notifiche simulate, fotografie dimostrative e contatore progressivo. `core.js` implementa il motore; `app.js` gestisce il DOM.

Il plugin aggiuntivo `odisseo-lab-integration` usa `do_shortcode_tag` sullo shortcode `mm_grc_lab`, solo nella pagina slug `lab`: selettore + HTML TITANIUM intatto + ODISSEO. CSS/JS sono limitati al Lab. L’iframe si carica all’avvio o tramite #odisseo e ha sandbox senza allow-same-origin. L’app è apribile anche in una scheda distinta.

## WordPress
Richiede WordPress 6.0+, PHP 7.4+, pagina /lab/ con lo shortcode TITANIUM già funzionante. Esegui un backup e un collaudo prima delle modifiche. Carica lo ZIP plugin da Plugin → Aggiungi → Carica. Attivalo solo quando è autorizzata la pubblicazione: rende subito visibile la sezione. Non creare un secondo shortcode o riscrivere TITANIUM.

Rollback: disattiva esclusivamente ODISSEO — Integrazione GRC Lab. Nessuna migrazione applicativa o tabella aggiunta. Gli utenti devono esportare il lavoro prima di chiudere/ricaricare.

## Dati
Esiti: Conforme / Non Conforme / N/A. Solo Non Conforme genera NC; nota minima 12 caratteri. ID stabili e deduplicazione per sopralluogo/controllo. Stati: Aperta → In Lavorazione → In Attesa di Ricambi → Risolta; sono selezioni manuali, non una macchina che impone questa sequenza. Solo le risolte possono essere archiviate; storico e dati sono conservati.

Import JSON: massimo 5 MB; limiti 500 sopralluoghi, 2.500 NC e 500 piani; schema odisseo-demo-1. Il controllo non è un sistema completo di certificazione di provenienza o bonifica universale: importa solo file affidabili e sintetici. Export JSON conserva la sessione; CSV/XLSX sono proiezioni tabellari e non backup completi. CSV neutralizza prefissi formula. Le immagini PNG/JPEG/WebP hanno limiti locali (3, meno di 700 KB ciascuna).

## Sicurezza e limiti
CSP connect-src none; no fetch, backend o storage persistente progettato nell’app. La CSP non controlla WordPress, estensioni o software del dispositivo. L’assenza di storage non è stata verificata con uno strumento runtime nel QA originario. Non usare la demo come archivio di dati reali.

Il browser genera i PDF; disponibilità e dialoghi dipendono dal dispositivo. Le conferme di archiviazione/importazione sono dialoghi nativi. La stampa nell’iframe può differire dall’apertura in scheda: usa quest’ultima in caso di limitazioni.

## Build e versionamento
Esegui `node scripts/package.mjs` (Node.js, nessun pacchetto npm): genera dist/standalone/ODISSEO/index.html dagli stessi file dell’app, usando hash CSP per script/stile incorporati. Non modifica il sito. Comprimi la cartella wordpress/odisseo-lab-integration come ZIP installabile; lo standalone come cartella ODISSEO. Includi licenza e avvisi in ogni distribuzione.
