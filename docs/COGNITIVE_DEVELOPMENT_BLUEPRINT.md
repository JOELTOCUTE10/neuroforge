# NeuroForge Cognitive Development Blueprint

**Version:** 1.0  
**Status:** Product and research architecture  
**Last reviewed:** 2026-11-06  
**Primary principle:** Develop a broad range of cognitive abilities while measuring what the evidence actually supports.

## 1. Mission and scientific boundary

NeuroForge is intended to help people practice, understand, and monitor a broad range of cognitive abilities and applied intellectual skills. It should be more than a library of reaction games. It should combine carefully designed practice, personalized progression, learning methods, unfamiliar transfer challenges, and transparent evidence notes.

The ambition is broad cognitive development. The scientific promise must remain precise:

- NeuroForge can measure performance on its own tasks and help users practice the skills those tasks engage.
- Some training methods improve performance on the trained task or closely related tasks. Transfer to distant, everyday abilities is less certain and must be tested rather than assumed.
- No current app can reliably reveal a person's absolute maximum intellectual capacity, unlock unlimited intelligence, or guarantee that practice makes someone smarter in every domain.
- NeuroForge must not present its scores as IQ, clinical tests, diagnoses, school-placement measures, or validated population rankings.
- A user's score is not their worth, potential, or a fixed limit. The product should describe skills as developing and context-dependent.

**Product promise:** Help people develop a wider set of mental skills through structured practice, useful learning strategies, and honest measurement of progress.

## 2. The model: three development layers plus two support systems

There is no universally accepted scientific list containing every possible "type of intelligence." NeuroForge should use a well-established cognitive-abilities taxonomy as its backbone, then add valuable higher-level skills without falsely presenting every category as an independent intelligence.

### Layer A — Broad cognitive abilities (CHC-informed foundation)

The Cattell–Horn–Carroll (CHC) framework is a widely used, empirically informed way to organize cognitive abilities. Its exact broad-ability list varies across versions and authors. The following are practical targets for NeuroForge, not a claim that this app implements a standardized CHC assessment.

| Ability | What it broadly involves | Possible practice and assessment formats |
|---|---|---|
| Fluid reasoning (Gf) | Solving unfamiliar problems, identifying relations, induction and deduction | Novel matrix problems, rule discovery, analogies, multi-step logic; use unseen forms for transfer checks |
| Comprehension–knowledge (Gc) | Acquired verbal, conceptual and cultural knowledge | Vocabulary in context, explanation, concept relationships, reading comprehension; track learning separately from prior knowledge |
| Working memory (Gwm) | Holding and manipulating information in active attention | Updating, complex span-like tasks, mental manipulation, dual-task challenges |
| Learning efficiency / long-term learning (Gl) | Encoding, retaining and consolidating new information over time | Learn unfamiliar material, test immediately and after delays, compare retention across sessions |
| Retrieval fluency (Gr) | Accessing stored verbal and nonverbal information efficiently | Timed category fluency, cue-based recall, generative retrieval; separate speed from accuracy |
| Visual processing (Gv) | Perceiving, imagining, transforming and remembering visual-spatial information | Mental rotation, visual patterns, spatial transformations, map and route tasks |
| Auditory processing (Ga) | Discriminating, remembering and reasoning about sounds and speech-like signals | Tone patterns, sound discrimination, auditory working-memory tasks; provide non-audio alternatives |
| Processing speed (Gs) | Fast and accurate performance on simple, repetitive cognitive tasks | Visual scanning, symbol comparison, target detection; report accuracy and speed separately |
| Reaction / decision speed (Gt) | Speed of making simple decisions when stimuli appear | Choice reaction tasks and signal detection; distinguish reaction time from motor release time and device latency |
| Quantitative knowledge (Gq) | Mathematical knowledge and learned quantitative procedures | Number sense, estimation, arithmetic fluency, quantitative relationships and applied problem solving |
| Reading and writing (Grw) | Skills and knowledge involved in written language | Reading comprehension, concise explanation, written reasoning and editing for clarity |
| Domain-specific knowledge (Gkn) | Knowledge developed in particular fields | Short science, history, technology or everyday knowledge learning modules; do not confuse knowledge with general reasoning |

The CHC literature also discusses additional sensory, motor and specialized abilities. NeuroForge can consider these later when there are meaningful, accessible tasks and sound measurement plans. Avoid making the initial profile look more precise than its task coverage allows.

**Important distinctions:** processing speed is not identical to reaction/decision speed; reaction-time tasks also depend on motor response and hardware. Working memory, long-term learning and retrieval are related but should not be collapsed into one generic "memory score." Knowledge depends partly on experience, education, language and opportunity.

### Layer B — Executive control

Executive functions are cross-cutting control processes that help people direct thinking and behavior toward goals. A practical core set is:

1. **Inhibitory control:** resisting an automatic or distracting response when the task requires a different response.
2. **Working-memory updating:** replacing or revising information currently held in mind.
3. **Cognitive flexibility / shifting:** changing rules, perspectives or strategies when conditions change.

Planning, goal management, monitoring, error correction and sustained task engagement can be included as applied executive skills. These processes overlap with the broad abilities above; NeuroForge should not double-count them as completely independent kinds of intelligence.

### Layer C — Higher-level and applied thinking

These areas matter for real intellectual work, but they are not all separate, universally agreed psychometric intelligences. They should appear as skill-development tracks with their own task definitions and evidence labels.

| Track | Skills to develop | Example of a meaningful task |
|---|---|---|
| Critical and analytical thinking | Evaluate claims, distinguish evidence from assumptions, identify invalid reasoning and compare explanations | Review a short argument, find the unsupported step, choose what evidence would change the conclusion |
| Creative thinking | Generate varied ideas, make remote associations, reframe a problem and improve original concepts | Produce several possible uses or solutions, then apply constraints and evaluate usefulness and originality |
| Strategic thinking and decision-making | Plan, compare trade-offs, anticipate consequences, update plans when information changes | Multi-step planning scenarios with changing constraints and feedback on outcomes |
| Metacognition | Estimate what is known, notice uncertainty, select strategies and evaluate learning | Predict confidence before a test, compare it with results, and choose a better next study strategy |
| Learning and study skill | Build durable knowledge through retrieval, spacing, feedback and appropriate interleaving | Learn unfamiliar content, retrieve it after delays, and apply it to new questions |
| Social cognition | Consider perspectives, interpret context, reason about social situations and recognize ambiguity | Context-rich scenarios with multiple plausible interpretations and explanations |
| Emotional skill | Identify emotional cues, understand context, regulate responses and choose constructive actions | Non-diagnostic scenario practice and reflection; avoid claiming to read internal states from faces |
| Communication | Explain clearly, listen for meaning, adapt explanations and structure information | Explain a complex idea to different audiences and assess clarity against a rubric |
| Practical / domain reasoning | Apply knowledge to unfamiliar but realistic problems in science, mathematics, language, technology and daily life | Transfer challenge requiring the user to combine knowledge and reasoning rather than repeat a memorized puzzle |

Creativity, social cognition and emotional intelligence should be described carefully. Their constructs and measurements vary, and evidence of improvement on a trained component does not prove a broad increase in intelligence.

### Support system 1 — Learning science

NeuroForge should teach and use evidence-based learning methods:

- **Retrieval practice:** actively recalling information, not only rereading it.
- **Spacing:** revisiting material across time rather than massing all practice into one sitting.
- **Interleaving:** mixing related problem types when it helps learners discriminate which method applies.
- **Feedback:** explain why an answer is correct or incorrect and give a useful next step.
- **Elaboration and self-explanation:** prompt learners to explain relationships, not merely select an option.
- **Transfer practice:** ask learners to use knowledge in a new format, situation or context.

These are learning methods, not additional forms of intelligence. Their effectiveness depends on content, timing, task design and learner success.

### Support system 2 — Cognitive-health guidance

Sleep, physical activity and general well-being can affect attention, learning and cognitive performance. They should be optional educational guidance, not gamified intelligence scores or medical advice. For adolescent users, the CDC summarizes the recommendation of 8–10 hours of sleep per night for ages 13–18. An umbrella review of exercise research found benefits for general cognition, memory and executive function across a very large body of reviews and trials. NeuroForge should encourage healthy, age-appropriate habits without prescribing intense exercise, restricting food, or implying that an individual is deficient.

## 3. Evidence labels and claim rules

Every ability page, exercise and training plan must show an evidence label. Evidence for a construct's existence or measurement is not the same as evidence that a particular app exercise improves it.

- **Established framework:** a recognized theory or taxonomy helps define the ability. This does not validate NeuroForge's test or prove trainability.
- **Supported learning method:** a strategy such as retrieval practice or spacing has evidence in relevant learning settings. Effectiveness varies with content and implementation.
- **Task-specific evidence:** studies support improvement on a practiced task or a closely related outcome. Do not claim broad real-world transfer.
- **Promising / developing:** findings are encouraging but limited by sample, measurement, heterogeneity or risk of bias.
- **Uncertain / not established:** evidence does not justify a strong claim. Present it as an experimental feature or do not ship the claim.

**Claim rules:**

1. Say "practice this task" or "train this skill" rather than "increase your intelligence" unless a suitable independent study supports the exact claim.
2. Distinguish near transfer (similar tasks) from far transfer (different abilities or real-world outcomes).
3. Never convert an internal NeuroForge game score into an IQ score or population percentile.
4. Do not infer ADHD, autism, memory disorders, giftedness, learning disabilities or any diagnosis from game performance.
5. Do not promise that a specific ability is a user's weakness based on one short session.
6. Display evidence sources, study populations, caveats and last-reviewed dates in the app.

## 4. Assessment and measurement architecture

### 4.1 Establish a baseline, not a label

The initial profile should be a multi-session orientation, not a single high-stakes test. Use several short tasks per target ability, varied stimulus sets and more than one session when feasible. Capture context that materially affects interpretation, such as input device, screen size, audio availability, language and interruptions. Allow users to skip modalities they cannot or do not want to use.

Until NeuroForge has validated age-appropriate norms and reliability data, show personal task history and broad within-user trends only. Do not compare users to one another or publish percentiles.

### 4.2 Store separate performance dimensions

For a task where they apply, record:

- accuracy and number of valid trials;
- response-time distribution (not just the fastest attempt);
- omissions, false alarms and premature responses;
- task difficulty and stimulus version;
- consistency across rounds and sessions;
- hints, retries and interruptions;
- device/input modality and timing-quality flags.

Use speed and accuracy together. A faster score obtained by making many more errors is not necessarily improvement. Prefer medians and distributions over one best trial when summarizing reaction speed.

### 4.3 Timing integrity: Reaction Lab standard

Reaction Lab must be rebuilt around a precise event definition:

1. Require the input to be fully released before a round can arm.
2. Present a variable, unpredictable waiting interval.
3. Record the actual stimulus-onset timestamp using a monotonic high-resolution clock.
4. Accept only a new press event after onset; a button already held before onset is invalid.
5. Record release events separately. Never silently count a release as a press reaction.
6. Flag early responses, held inputs, duplicate events, focus loss, tab visibility changes and implausible timing outliers for review.
7. Keep raw trial records so summaries can be recomputed; do not silently rewrite a result.
8. Treat browser/device latency as a measurement limitation. Do not claim lab-grade measurement without an appropriate validation study and controlled hardware.

An 8 ms result should be marked as a timing anomaly or a different event type until independently validated, not described as a verified human visual reaction time.

### 4.4 Reliability and fairness

Use multiple parallel task forms so repeated tests do not simply measure memory for the same items. Version every task and scoring rule. Check that language, color vision, hearing, motor control, device speed and display characteristics do not unfairly determine a score. Provide keyboard, touch and non-audio alternatives where practical. Do not make a score depend on a single sensory channel unless that is explicitly the construct being practiced.

## 5. Training engine

### 5.1 Personalized, balanced practice

Recommend training using a combination of user goals, recent practice, performance trends, confidence in the measurement, preferred modalities and the need for balanced coverage. Do not permanently label a user as "weak" or keep them trapped in low-scoring categories. Let the user choose goals and pause or change the plan.

### 5.2 Progressive overload with multiple dimensions

Difficulty can change through:

- more items or longer sequences;
- shorter presentation time or longer retention delay;
- more similar distractors;
- more complex rules or additional rule changes;
- greater interference or divided attention;
- more steps in a reasoning problem;
- less scaffolding or fewer hints;
- novel stimulus sets and new task formats.

Change difficulty based on a run of valid observations, not one unusually good or bad round. Keep accuracy, speed, omissions and false alarms visible. Avoid time pressure when speed is not part of the target ability. Adaptive thresholds are product parameters until validated; label them as such.

### 5.3 Session design

A session should have a clear target, concise instructions, a short practice/check round, varied trials, immediate explanatory feedback where appropriate, a recovery break option, and a summary that explains what was practiced. A daily plan should rotate across related but distinct skills and include spaced review rather than maximizing minutes or streaks. The app should never pressure users to practice when tired or to sacrifice sleep, school, relationships or physical activity.

### 5.4 Progress profile

Use a multi-dimensional profile, not a single "brain power" number. For each area, show:

- what the task measures and what it does not measure;
- baseline and recent performance on comparable versions;
- accuracy, speed and error patterns separately;
- practice volume and last-practiced date;
- confidence / data sufficiency indicator;
- trained-task progress versus unfamiliar transfer results;
- evidence status and known limitations.

A profile should say "not enough data" when appropriate. No percentile or population ranking without a properly sampled, age-appropriate norming study.

## 6. Transfer: the defining NeuroForge system

A training task and its outcome must be kept separate. Every major training track should eventually have at least one transfer check that uses new materials, a different surface format or a realistic application. Example: after practicing sequence memory, test learning and later recall of a new set of instructions; after practicing pattern reasoning, test a new problem type with different visual styling; after learning content, test delayed recall and application to a novel question.

Transfer checks must not reuse the same exact stimuli or teach the answer immediately before testing. Report the distance of transfer:

- **Level 0 — practiced task:** same task and format;
- **Level 1 — near transfer:** different items, same core task structure;
- **Level 2 — related transfer:** different format, similar ability;
- **Level 3 — applied transfer:** unfamiliar, practical or academic task.

Do not call Level 0 improvement "general intelligence growth." A transfer result is still an observation, not proof of causation, unless the study design supports a causal conclusion.

## 7. Scientific validation plan

Before claiming NeuroForge improves broad cognition, conduct a properly designed evaluation. A future study should:

1. Define one primary ability and one primary outcome before data collection.
2. Use independent, validated measures appropriate to the target age group where possible; app tasks alone cannot validate themselves.
3. Include a comparison condition that controls for time, engagement and expectations (an active control when feasible).
4. Use random assignment when the study design and ethics permit it.
5. Use alternate forms, blinded scoring where possible, and pre/post measurement.
6. Include a delayed follow-up to assess durability.
7. Plan sample size using a power analysis rather than selecting a convenient number.
8. Pre-register hypotheses and analysis; report null results, attrition and adverse effects as well as positive findings.
9. Obtain appropriate ethics review, parental/guardian permission and participant assent for research involving minors.
10. Have an independent researcher review methods and conclusions before making public efficacy claims.

Early product analytics can improve usability and identify broken tasks, but they are not clinical validation or proof of cognitive enhancement.

## 8. Product architecture and data model

Keep the current app running while moving toward clear modules. Suggested logical modules (not a mandate to rewrite everything in one release):

- `ability-catalog`: definitions, aliases, overlap notes and taxonomy version;
- `evidence-library`: sources, evidence labels, populations, findings, caveats and review dates;
- `assessment-engine`: baseline and repeat assessment orchestration;
- `task-engine`: versioned task definitions, stimulus banks and scoring rules;
- `adaptive-engine`: difficulty selection from valid multidimensional observations;
- `transfer-engine`: unfamiliar-task checks and transfer-distance labels;
- `profile-engine`: ability-specific summaries, confidence and trends;
- `plan-engine`: balanced personalized training schedules and spaced review;
- `accessibility`: alternate input/output modes and task accommodations;
- `privacy`: data minimization, export/delete controls and consent-aware sync.

Core records should include: ability definitions; task definitions and versions; item/stimulus identifiers; assessment sessions; trial-level attempts; completed training sessions; transfer assessments; plan recommendations and their reasons; evidence-source records; and user consent/preferences. Store the timing and scoring metadata needed to reproduce a result. Keep personally identifying information separate from cognitive performance data where possible.

## 9. Delivery roadmap

### Phase 0 — Measurement trust (first)

- Fix Reaction Lab press/release semantics and held-button detection.
- Record trial-level accuracy, response time, premature inputs, omissions and false alarms where relevant.
- Add timing-quality flags and task-version metadata.
- Add automated tests for each task's scoring and invalid-input paths.
- Run real browser tests across desktop, Chromebook, mobile and keyboard/touch input.

### Phase 1 — Cognitive map and baseline

- Add a versioned ability catalog based on the CHC-informed foundation above.
- Map every existing activity to the ability or abilities it plausibly engages; document overlaps and limits.
- Build a multi-session baseline with no IQ score or false population percentiles.
- Replace the broad "Intelligence" bucket with explicit, understandable skills while preserving historical session records.

### Phase 2 — Deep task library

- Improve existing tasks before simply increasing the activity count.
- Add varied item banks, parallel forms, better feedback and multiple difficulty dimensions.
- Add underrepresented abilities such as language comprehension, quantitative reasoning, auditory processing and learning efficiency, with accessibility alternatives.
- Give every activity a written construct definition, scoring specification, confounds and evidence note.

### Phase 3 — Adaptive personal training

- Build a balanced plan across user-selected goals and measured development needs.
- Use accuracy, response-time distributions, error patterns and measurement confidence.
- Add spaced practice, retrieval practice and progress reviews.
- Make recommendations explainable and user-controllable.

### Phase 4 — Transfer and applied intelligence

- Add unfamiliar-task assessments for each mature training track.
- Build applied reasoning, creative thinking, critical thinking, metacognition, communication and social-cognition scenarios.
- Separate practice improvement from transfer evidence in all charts and claims.

### Phase 5 — Validation and responsible release

- Audit accessibility, privacy, security and data retention.
- Conduct independent reliability and transfer studies.
- Publish methods, limitations and results, including findings that do not support the intended effect.
- Upgrade evidence labels only when the accumulated evidence justifies it.

**Priority rule:** fix measurement before adaptive personalization; establish constructs before adding games; measure transfer before claiming broad development.

## 10. Current NeuroForge status

The current application provides 29 original activities, six product groupings, saved progress, courses and a rule-based adaptive difficulty system. These are a prototype foundation. They do not yet constitute a validated multi-ability assessment, a validated training intervention or proof of broad intelligence improvement.

The next engineering release should therefore begin with Phase 0 and Phase 1—not another large batch of superficially different games.
