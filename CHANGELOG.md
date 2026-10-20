# Changelog

## 1.0.0 — 2026-10-20 · stable demonstration

- Validate full imported session shape, NC relationships, dates, times, history and resource limits.
- Generate unique notification IDs for repeated planning previews.
- Reject changes exceeding the 5 MB session limit without modifying existing work.
- Keep report tables within narrow screens.
- Add 18 regression checks and a standalone CSP packaging check; preserve all 24 existing checks.
- Official demonstration distribution; added disclaimer, privacy-clean packaging and declared compatibility. Original code remains MIT licensed.


## 0.1.3-preview — 15 ottobre 2026
- Prima distribuzione pubblica GitHub della demo già integrata nel Lab WordPress.
- Integrazione aggiuntiva con TITANIUM, senza sostituirne shortcode o HTML.
- Checklist originali generiche, pianificazione, NC, grafici, report ed export.
- Correzioni QA pubblicate: rifiuto di risposte duplicate e contatore ID incoerente nei JSON; grafici e avanzamento con classi CSS compatibili con la CSP.
- Pacchetto standalone generato dagli stessi sorgenti dell’app WordPress, con script e stile incorporati e hash CSP.
- Non indica la trasformazione in una release stabile o un riesame indipendente completato.

## 0.1.4-preview — 2026-10-17

- Added keyboard skip link, focus management for screen and wizard-step changes.
- Dedicated status/error announcements replace the live region on the entire main area.
- Invalid wizard fields receive focus and an accessible invalid state.
- Preserved the 121-control catalog, NC identifiers, state rules and existing reduced-motion support.

## 0.1.5-preview — 2026-10-17

- Versioned application asset URLs prevent browsers from reusing pre-update JavaScript and CSS.
- Standalone packaging accepts versioned asset references; application engine remains unchanged.
