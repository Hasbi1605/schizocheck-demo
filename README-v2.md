# SchizoCheck — Static Demo (Original UI, Working Screening)

A static mirror of **SchizoCheck**, a schizophrenia early-screening expert
system (Laravel), rendered from the original application itself — same Blade
views, same Bootstrap template, same assets — with the screening flow fully
working in the browser.

The inference is the app's own logic, ported 1:1 to JavaScript: Forward
Chaining over the original knowledge base (5 diagnoses, 30 symptoms, 47 rules
extracted verbatim from the app's `ScreeningSeeder`) combined with the
Certainty Factor method exactly as implemented in the original
`ScreeningController` — cross-checked against the PHP logic on 300 randomized
answer sets (300/300 identical), including the per-diagnosis CF detail tables
on the result page.

- Live demo: https://portofolio-hasbi.web.id/schizocheck-demo/
- Original application: https://github.com/Hasbi1605/ES-Skizofrenia

Note: educational demo only, not a medical diagnosis tool.
