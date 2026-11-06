# NeuroForge

An original, local-first cognitive-practice platform with 16 interactive activities, independently adaptive difficulty, guided and custom sessions, progress insights, exportable history, and optional Supabase accounts with cross-device session sync.

NeuroForge is independent. It does not copy BrainHQ's proprietary source code, branding, interface assets, or exercises.

## Six training domains and current activities

- **Memory:** Sequence Recall, Pattern Matrix, Word Recall, Working Memory N-Back
- **Attention:** Focus Grid, Visual Search, Color Conflict, Dual Focus
- **Brain Speed:** Reaction Lab, Number Sprint
- **People Skills:** Context Signals
- **Intelligence:** Rule Shift, Pattern Logic
- **Navigation:** Direction Span, Mental Rotation, Route Map Recall

The library uses six canonical domains. Older saved sessions are grouped by their activity ID so earlier Spatial, Speed, Reasoning, and Flexibility records still appear under the updated domain labels.

## Training and progression

Every activity has its own Level (1–10) and five within-level challenge stages. Sequence Recall increases sequence load and presentation pace; Pattern Matrix and Word Recall shorten study time while increasing memory load; Working Memory N-Back advances from 2-back toward 4-back; Focus Grid and Visual Search add more items; Color Conflict adds more conflicting stimuli; Reaction Lab tightens the response window; Number Sprint introduces harder operations; Mental Rotation increases shape complexity; and Dual Focus adds distractors.

Progression uses that activity's own saved accuracy history:

- After two sessions at the same stage averaging at least 85%, the next session moves up one stage.
- After two sessions at the same stage averaging below 55%, the next session eases down one stage.
- After three consecutive sessions at the same level averaging at least 88% while already at Stage 5/5, the next session advances one level. Strong early-stage results cannot skip the remaining stages.
- After three consecutive sessions at the same level averaging below 50%, the next session drops one level.
- A single difficult session does not automatically lower the stage. Changes are bounded to five stages and ten levels.

These are product difficulty rules, not validated cognitive measurements. They use performance inside each NeuroForge activity.

## Features

- Five-round sessions with activity-specific scoring and completion checks.
- Sixteen original activities across Memory, Attention, Brain Speed, People Skills, Intelligence, and Navigation, including variable-lag N-Back, Dual Focus, Mental Rotation, Context Signals, and Route Map Recall.
- Balanced, memory, focus, speed, and flexibility plans, plus a custom session builder for one to eight activities.
- Activity search and skill-area filters.
- Daily practice goal, weekly minutes chart, streak, total sessions, and average accuracy.
- Recent-session accuracy trend and practice recommendations based on the user's own activity results.
- Per-activity average accuracy, personal best, session count, and next challenge.
- Local-first storage, JSON export, and JSON backup import that merges valid session records without replacing existing history.
- Optional offline PWA shell.
- Optional email/password accounts and per-user cloud session synchronization.
- Guest and signed-in account histories use separate browser storage spaces.

## Run locally

Serve the repository root with a static HTTP server, then open the address it prints. For example: python -m http.server 8000

Open http://localhost:8000/.

## Supabase cloud accounts and synchronization

The public GitHub Pages build is configured to use the NeuroForge Supabase project. supabase-config.js contains only the project URL and a publishable client key. Publishable keys are intended for browser use; never place a Supabase secret or service-role key in this repository.

The database migrations are stored in supabase/migrations/ and must be applied in order to a fresh project:

1. 202611050001_neuroforge_core.sql creates profiles and training_sessions, enables row-level security, and defines owner-scoped policies.
2. 202611050002_secure_neuroforge_privileges.sql removes broad default grants from these application tables and gives authenticated users only the operations the app needs.

Both application tables have row-level security enabled. Session rows are scoped to auth.uid(). The anonymous database role has no table privileges on these two tables. The app synchronizes completed training sessions; local guest data is kept separate until the user chooses to sign in.

Email confirmation may be required before a new account can sign in. The deployed GitHub Pages URL must be included in Supabase Auth's allowed redirect URLs before signup confirmation can be tested end to end.

## Deploy

The repository includes a GitHub Actions workflow at .github/workflows/pages.yml. In repository Settings → Pages, use GitHub Actions as the deployment source. Commits to main trigger the workflow.

## Smoke tests

Run: node --test tests/smoke.test.mjs

## Limitations and evidence

Scores describe performance on NeuroForge activities. They are not IQ scores, clinical assessments, diagnoses, or evidence that training transfers to everyday cognition. NeuroForge has not been clinically validated. The adaptive system adjusts app difficulty from activity results; it does not measure general intelligence or establish real-world cognitive improvement. Cloud sign-in and synchronization still require real-browser testing against the configured Supabase Auth redirect settings.


## Feature-parity development roadmap

See [docs/FEATURE_PARITY_ROADMAP.md](docs/FEATURE_PARITY_ROADMAP.md) for the original 30-plus-activity target, six-domain coverage plan, and release quality gates. The current build is an early foundation, not a complete substitute for any established cognitive-training service.
