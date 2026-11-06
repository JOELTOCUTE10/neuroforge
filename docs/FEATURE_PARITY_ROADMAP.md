# NeuroForge feature-parity roadmap

**Status:** v0.6 foundation · 16 original interactive activities · 6 canonical domains

## Product goal

Build an independently designed cognitive-practice platform with the breadth of a mature exercise library, adaptive short-form sessions, structured programs, detailed personal progress, accessible interaction, and optional cross-device synchronization. All activities, prompts, visuals, audio, scoring, and interface patterns must be original NeuroForge work. The goal is functional breadth in the same general problem space—not a renamed copy of another product.

## Domain coverage

| Domain | Available now | Next original activity concepts |
|---|---|---|
| Memory | Sequence Recall; Pattern Matrix; Word Recall; Working Memory N-Back | Story Detail Recall; Rhythm Sequence Memory |
| Attention | Focus Grid; Visual Search; Color Conflict; Dual Focus | Moving Target Tracking; Signal Filtering |
| Brain Speed | Reaction Lab; Number Sprint | Rapid Visual Discrimination; Audio-Visual Match; Processing Sweep |
| People Skills | Context Signals | Perspective Shift; Conversation Context; Expression-in-Context; Synthetic Voice Tone |
| Intelligence | Rule Shift; Pattern Logic | Verbal Analogy; Quantitative Reasoning |
| Navigation | Direction Span; Mental Rotation; Route Map Recall | Landmark Orientation; Map Route Planning |

**Activity target:** at least 30 complete, original activities. A catalog entry does not count toward that target until it has a playable task, validated scoring, bounded difficulty controls, accessible instructions, a summary, and automated tests.

## Capability roadmap

### Foundation — current build

- [x] Local-first sessions and saved history
- [x] Six canonical training domains and searchable library
- [x] Six-domain balanced rotation plus memory, attention, speed, intelligence, navigation, and custom sessions
- [x] Per-activity level and five-stage difficulty progression
- [x] Activity-specific challenge parameters for the current 16 exercises
- [x] Personal practice history, averages, best scores, recent accuracy, and activity recommendations
- [x] JSON backup export/import and optional Supabase session sync
- [x] Offline application shell

### Next — exercise depth and reliable personalization

- [ ] Expand to 30+ complete original activities, with no placeholder cards
- [ ] Add a baseline calibration for each activity and store baseline separately from best performance
- [ ] Replace accuracy-only progression decisions with a documented blend of accuracy, response time where meaningful, consistency, and error patterns
- [ ] Add a user-facing explanation of every challenge adjustment and a way to pause or manually ease difficulty
- [ ] Add structured multi-week courses assembled from short activities, with progress and completion states
- [ ] Add an activity-level progress map with completed stages and personal mastery markers; avoid population percentiles until a valid, consented reference cohort exists

### Later — accessibility, personalization, and community

- [ ] Add audio-based original activities using synthesized or user-authorized audio, with visual alternatives
- [ ] Add keyboard-only controls, screen-reader announcements, adjustable text size, contrast options, and reduced-motion settings across every activity
- [ ] Add properly reviewed translations; do not label a language supported until all interface strings and exercise content are translated and tested
- [ ] Add optional schedules and reminders with explicit user control
- [ ] Explore private practice groups with consent, minimal shared data, and scores private by default
- [ ] Verify account creation, sign-in, session sync, recovery, and sign-out in real browsers and on multiple devices

## Quality gates for every new activity

1. It teaches one clear task and uses original prompts, content, design, and interaction.
2. Its scoring is defined, bounded from 0–100%, and tested against correct, incorrect, partial, and incomplete responses.
3. At least three difficulty parameters change gradually and remain within safe, playable bounds where the task supports them.
4. Repeated random generation cannot create invalid answers, ambiguous correct options, or impossible rounds.
5. The user can understand instructions before starting; keyboard and touch interaction are supported.
6. A completed session records activity ID, domain, level, challenge stage, score, duration, and meaningful task metrics.
7. Automated tests cover the activity engine. Browser-level tests cover the full playthrough before the activity is called release-ready.

## Measurement and safety boundaries

NeuroForge scores describe performance within NeuroForge tasks. They are not IQ scores, diagnoses, clinical assessments, or proof that practice improves performance in daily life. Avoid population comparisons without a suitable validated dataset and clear consent. Keep social-training prompts fictional and contextual; they should teach careful interpretation, not claim to reveal another person's inner state.

## Release sequence

- **v0.6:** modular exercise catalog, six-domain taxonomy, Context Signals, Route Map Recall, updated documentation and tests.
- **v0.7:** add the next memory, attention, and people-skills activities; validate generation and scoring with browser-level tests.
- **v0.8:** baseline calibration, richer adaptive metrics, activity-level mastery map, and course structure.
- **v0.9+:** reach 30+ complete activities, then accessibility and language coverage, reminders, private teams, and broader cross-device QA.
