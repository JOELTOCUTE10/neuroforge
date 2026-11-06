# NeuroForge feature-parity roadmap

**Status:** v0.7 foundation · 29 original interactive activities · 6 canonical domains

## Product goal

Build an independently designed cognitive-practice platform with the breadth of a mature exercise library, short and varied activities, adaptive challenge, structured courses, detailed personal progress, accessibility, and cross-device continuity. All activities, prompts, visuals, audio, scoring, and interface patterns must be original NeuroForge work. This is functional breadth in the same problem space, not a renamed copy of another product.

## Domain coverage

| Domain | Current original activities | Next original activity concepts |
|---|---|---|
| Memory | Sequence Recall; Pattern Matrix; Word Recall; Working Memory N-Back; Tone Sequence; Scene Snapshot; Task Recall | Story Detail Recall; Rhythm Pattern Recall |
| Attention | Focus Grid; Visual Search; Color Conflict; Dual Focus; Peripheral Watch | Moving Target Tracking; Signal Filtering |
| Brain Speed | Reaction Lab; Number Sprint; Quick Compare; Pitch Match; Rapid Sweep | Audio-Visual Matching; Processing Sweep |
| People Skills | Context Signals; Profile Recall; Expression Cues; Conversation Clues | Perspective Shift; Longer multi-turn context memory |
| Intelligence | Rule Shift; Pattern Logic; Number Weave; Logic Lab | Verbal Analogy; Multi-rule Deduction |
| Navigation | Direction Span; Mental Rotation; Route Map Recall; Landmark Compass | Landmark Orientation; Map Route Planning |

## Current product systems

- [x] Six-domain catalog and searchable/filterable library
- [x] 29 original activity handlers with task-specific controls and scoring
- [x] History-informed Personal Trainer recommending one activity per domain
- [x] Seven resumable 12-session courses (six domain courses and one balanced course)
- [x] Saved activity level and five within-level stages
- [x] Within-session challenge staircase that can raise/ease difficulty after consecutive results
- [x] Ten selectable levels per exercise in a clickable progress map
- [x] Personal baseline, best, average and attempt counts per level
- [x] Personal session history, charts, custom workouts and JSON backups
- [x] Local-first storage, optional Supabase sync and offline application shell

## Remaining work for genuine product parity

### Exercise and interaction quality

- [ ] Repeatedly play-test every activity at level 1, middle levels and maximum level; test random-generation edge cases.
- [x] Add an exercise preview for each selectable level before starting.
- [ ] Replace short fixed round sets with varied level content and longer practice banks where useful.
- [ ] Add more audio and visual-perception activities, with visual alternatives for audio tasks.
- [ ] Ensure task-specific accuracy, response-time, omission and false-alarm measures are retained separately rather than reduced to a single score only.

### Personalization and measurement

- [ ] Add a distinct baseline-calibration session for each activity and preserve it when the user changes levels.
- [ ] Use accuracy, reaction time where relevant, consistency and error patterns in the adaptive decision; explain the reason for every adjustment.
- [ ] Add adjustable session length and a configurable weekly schedule.
- [ ] Add personal mastery markers and a drill-down for any activity-level cell.
- [ ] Do not implement population-percentile comparisons without an appropriate validated reference cohort and consent.

### Courses and progress

- [x] Resumable 12-session training courses
- [x] Clickable exercise-by-level map with baseline/best/average and preview-before-start flow
- [ ] Add course overview pages with module previews, estimated duration and session prerequisites.
- [ ] Add milestones and course completion summaries.
- [ ] Add explicit session durations around brief training bites while supporting longer user-selected workouts.

### Release quality and accessibility

- [ ] Run end-to-end browser tests for a full playthrough of all 29 activities, course progression, backup restore and map-level launch.
- [ ] Test sign-up, email confirmation, sign-in, sync, sign-out and recovery across real browsers/devices.
- [ ] Add keyboard-only operation, screen-reader announcements, adjustable text size and high-contrast settings to every game.
- [ ] Review reduced-motion settings for all activity animations.
- [ ] Add reviewed translations only after all exercises and interface strings are fully translated.
- [ ] Add optional reminders and private practice groups with strict privacy-by-default.

## Quality gates for each activity

1. A complete, original task with varied stimuli and no copied protected assets or expression.
2. Bounded, tested task generation: correct, incorrect, partial, repeated and edge-case answers.
3. Difficulty settings change relevant game parameters gradually without ambiguous or impossible rounds.
4. Instructions, replay/preview where appropriate, accessible controls and clear feedback.
5. Distinct records for accuracy, response time where relevant, missed targets, false alarms and level context.
6. A complete result summary and saved history record.
7. Unit/smoke tests plus an actual browser playthrough at multiple difficulty levels.

## Measurement and safety boundaries

NeuroForge scores describe performance within NeuroForge tasks. They are not IQ scores, diagnoses, clinical assessments, or proof that practice improves performance in daily life. Never infer a person's real-world social state from a simple expression label. Social activities use fictional people and scenarios, and interpretive cues should be treated as uncertain context, not mind-reading.

## Release sequence

- **v0.7:** 29-activity catalog, in-session staircase, Personal Trainer, 12-session courses, level map, preview-before-start, import preservation and light UI pass.
- **v0.8:** level previews, calibrated baseline, richer score analytics, course overview and milestones.
- **v0.9:** browser E2E and accessibility coverage, audio alternatives and user-configurable practice schedule.
- **v1.0:** reliability-tested 29-exercise release with verified accounts, cross-device sync and documented limitations.
