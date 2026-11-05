# NeuroForge

An original, browser-based cognitive training platform focused on structured practice, adaptive challenge, and transparent performance tracking. NeuroForge is inspired by the broad category of cognitive-training products; it does not copy BrainHQ's proprietary code, branding, or exercises.

## Current status

The first MVP includes five original training activities, a daily session flow, adaptive difficulty, local progress history, and a responsive dashboard. Progress is stored in the current browser using `localStorage`; accounts and cloud sync are not implemented yet.

## Run locally

No build step or dependencies are required. Clone the repository and open `index.html` in a modern browser, or serve the folder with any static HTTP server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Activities

- **Sequence Recall** — reproduce an increasingly long sequence of highlighted tiles.
- **Focus Grid** — find a target among changing visual distractors.
- **Reaction Lab** — respond when a visual signal appears; premature responses are recorded as false starts.
- **Pattern Matrix** — remember and reproduce a briefly displayed spatial pattern.
- **Rule Shift** — classify symbols using a changing rule and practice cognitive flexibility.

## Product principles

- Original exercises and interface; no proprietary BrainHQ assets or content.
- Difficulty changes gradually based on recent performance, not a single result.
- Metrics describe performance inside these activities. They are not IQ scores, diagnoses, or proof of real-world cognitive improvement.
- Keyboard-accessible controls, reduced-motion support, and responsive layouts.

## Roadmap

1. Validate and expand the exercise library.
2. Add richer training plans and longitudinal analytics.
3. Add optional accounts and secure cloud synchronization.
4. Add automated tests, accessibility audits, and deployment workflows.
5. Review research evidence before making any claims about transfer to everyday abilities.

## License

MIT. See `LICENSE`.