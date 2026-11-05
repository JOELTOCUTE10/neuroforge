# NeuroForge

An original, local-first cognitive practice platform with 12 interactive activities, adaptive challenge levels, guided plans, progress analytics, exportable history and an optional Supabase authentication/synchronization layer.

NeuroForge is independent and does not copy BrainHQ's proprietary source code, branding, interface assets or exercises.

## Run locally
Serve the repository root with a static HTTP server such as Python's built-in server on port 8000, then open http://localhost:8000.

## Activities
- Memory: Sequence Recall, Pattern Matrix, Word Recall, Working Memory 2-Back
- Spatial: Direction Span
- Attention: Focus Grid, Visual Search, Color Conflict
- Speed: Reaction Lab, Number Sprint
- Flexibility: Rule Shift
- Reasoning: Pattern Logic

## Features
- Five-round activity sessions and activity-specific scoring.
- Difficulty levels from 1–10 based on recent results.
- Balanced, memory, focus, speed and flexibility training plans.
- Weekly charts, session history, accuracy and personal-best tracking.
- Local-first storage, JSON export and optional PWA offline caching.
- Responsive layout and reduced-motion support.
- Optional Supabase Auth and per-user cloud history, inactive until configured.

## Enable cloud accounts and cross-device sync
1. Create or select a Supabase project.
2. Apply supabase/migrations/202611050001_neuroforge_core.sql to the database.
3. Copy supabase-config.example.js to supabase-config.js.
4. Set supabaseUrl and the project's publishable key in supabase-config.js.
5. Add the deployed site URL to Supabase Auth's allowed Site URL and redirect URLs.
6. Deploy again. Email/password registration and sign-in will then synchronize sessions for the authenticated user.

Only use a publishable/anon browser key. Never put a Supabase secret or service-role key in this repository. Row-level security restricts session records to auth.uid(). Existing guest sessions are not automatically uploaded to a newly connected account.

## Deploy
A GitHub Pages workflow is included at .github/workflows/pages.yml. In repository Settings → Pages, choose GitHub Actions as the build and deployment source. Commits to main then trigger deployments.

Cloudflare Pages can also be used after the Cloudflare connection is reauthorized and a Pages project is linked to this repository.

## Smoke tests
Run: node tests/smoke.test.mjs

## Limitations and evidence
Scores represent performance on NeuroForge activities. They are not IQ scores, clinical assessments, diagnoses, or evidence that training transfers to everyday cognition. Adaptive levels are product difficulty controls, not validated measures of cognitive ability.

## License
MIT. See LICENSE.