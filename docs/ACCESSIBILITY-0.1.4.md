# ODISSEO 0.1.4-preview — targeted accessibility changes

- Keyboard skip link targets the main application area.
- Screen and wizard-step changes focus their heading; same-screen actions restore the activating control when it still exists.
- Status messages use a dedicated polite region. Validation errors use a separate assertive region and focus invalid wizard fields.
- Existing reduced-motion rules remain enabled.
- The 121 controls, NC state rules, IDs and generation engine are unchanged.

Validation: core regression suite (24 checks), JavaScript syntax, browser keyboard/focus and validation flows. This is not a claim of overall WCAG conformity or a screen-reader certification.
