# NeuroForge

An original, local-first cognitive-practice platform with 12 interactive activities, adaptive challenge levels, guided plans, progress analytics, exportable history, and optional Supabase accounts and cross-device session sync.

NeuroForge is independent and does not copy BrainHQ's proprietary source code, branding, interface assets, or exercises.

## Run locally

Serve the repository root with a static HTTP server, then open the local address it prints. For example:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/`.

## Activities

- **Memory:** Sequence Recall, Pattern Matrix, Word Recall, Working Memory 2-Back
- **Spatial:** Direction Span
- **Attention:** Focus Grid, Visual Search, Color Conflict
- **Speed:** Reaction Lab, Number Sprint
- **Flexibility:** Rule Shift
- **Reasoning:** Pattern Logic

## Features

- Five-round sessions and activity-specific scoring.
- Difficulty levels from 1–10 based on recent results.
- Balanced, memory, focus, speed, and flexibility plans.
- Weekly charts, session history, accuracy and personal-best tracking.
- Local-first storage, JSON export, and an optional offline PWA shell.
- Optional email/password accounts and per-user cloud session synchronization.
- Responsive layout and reduced-motion support.

## Supabase cloud accounts and synchronization

The public GitHub Pages build is configured to use the NeuroForge Supabase project in US East (Ohio). The browser configuration in `supabase-config.js` contains only the project URL and a publishable client key. Publishable keys are intended for browser use; never place a Supabase secret or service-role key in this repository.

The database migrations are stored in `supabase/migrations/` and must be applied in order to a fresh project:

1. `202611050001_neuroforge_core.sql` creates `profiles` and `training_sessions`, enables row-level security, and defines owner-scoped policies.
2. `202611050002_secure_neuroforge_privileges.sql` removes broad default grants from these application tables and gives authenticated users only the operations the app needs.

Both application tables have row-level security enabled. Session rows are scoped to `auth.uid()`. The anonymous database role has no table privileges on these two tables. The app currently synchronizes completed training sessions; guest sessions created before signing in are not automatically uploaded to a new account.

Email confirmation may be required before a new account can sign in. Local development URLs must be added to Supabase Auth's allowed redirect URLs if you test signup on localhost.

## Deploy

The repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`. In repository Settings → Pages, use GitHub Actions as the deployment source. Commits to `main` trigger the workflow.

## Smoke tests

Run:

```bash
node tests/smoke.test.mjs
```

## Limitations and evidence

Scores describe performance on NeuroForge activities. They are not IQ scores, clinical assessments, diagnoses, or evidence that training transfers to every-day cognition. Adaptive levels are product difficulty controls, not validated measures of cognitive ability.

## License

MIT. See `LICENSE`.
