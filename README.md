# ODISSEO — Inspection Lab

Demo indipendente per pianificare sopralluoghi, compilare checklist e gestire non conformità. Interfaccia italiana, dati sintetici, nessun account o backend.

**[Prova nel Lab WordPress](https://manfredimarrocco.blog/lab/#odisseo)** · **[Download v0.1.4-preview](https://github.com/manfredimarrocco/odisseo-lab/releases/tag/v0.1.4-preview)** · **[Guida tecnica](docs/TECHNICAL.md)**

## Funzioni
- Quattro checklist originali e generiche: Tronchini 29, Siti 34, Parcheggi 30, Stazioni 28: 121 controlli.
- Esiti Conforme, Non Conforme e N/A; note richieste per le NC.
- Pianificazione e anteprime locali delle assegnazioni, senza inviare email.
- Generazione delle NC, responsabili, note, storico, lavorazione, ricambi, risoluzione e archivio.
- Dashboard con quattro grafici; report singoli e riepilogativi; stampa PDF tramite browser.
- Export CSV e XLSX tabellari, JSON completo per riprendere il lavoro. Il formato Excel è un export, non un template di importazione: l’importazione disponibile è JSON.

## Avvio
Scarica `ODISSEO-0.1.4-preview-standalone.zip`, estrailo e apri `ODISSEO/index.html` in un browser aggiornato. Avvia la demo oppure una sessione vuota. Prima di chiudere, usa **Salva sessione**: non c’è salvataggio automatico.

WordPress ospita il Lab; GitHub ospita sorgenti, cronologia e pacchetti. Non è necessario GitHub Pages né un servizio a pagamento.

## Riservatezza e limiti
Dati in memoria nel browser; nessun invio di email, connessione a sistemi operativi o salvataggio cloud. Le fotografie facoltative sono lette localmente e incluse nel JSON: usa soltanto materiale sintetico. Export e PDF contengono ciò che inserisci; proteggili di conseguenza.

La pagina WordPress circostante, le estensioni del browser e il dispositivo hanno un comportamento distinto dall’app. La CSP dell’app vieta connessioni di rete.

Questa è una **pre-release dimostrativa**, non un sistema operativo ufficiale, una certificazione, una garanzia di conformità o una prova di risultati professionali. Non contiene loghi di aziende clienti, codice Apps Script storico, moduli o dati operativi. Le checklist sono generiche e non riproducono procedure ufficiali.

## Sorgenti e verifiche
App e integrazione: `wordpress/odisseo-lab-integration/`. Test: `node tests/core.test.cjs`. Pacchetti: `node scripts/package.mjs`.

Il collaudo HTTPS ha verificato il ciclo sopralluoghi/NC, pianificazione, export/import JSON, CSV/XLSX, report e generazione PDF, grafici, tastiera e viewport mobile a 390 px. L’apertura diretta del file offline non è stata verificata nell’ambiente di controllo, che vieta file://. Vedi [QA](docs/QA.md).

## Contribuire
Apri un’issue con versione, browser, passaggi riproducibili e soli esempi sintetici. Non allegare nomi, email reali, dati clienti, credenziali, documenti o sistemi interni. Nessuna telemetria o integrazione esterna senza valutazione esplicita.

## Licenza
Codice e documentazione originali: [MIT](LICENSE), anche per riuso commerciale secondo le relative condizioni. I dati importati rimangono soggetti ai propri diritti. Consulta [gli avvisi](THIRD-PARTY-NOTICES.md).
