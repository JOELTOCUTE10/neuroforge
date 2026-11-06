import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const progression = require('../training-engine.js');
const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const html = read('../index.html');
const app = read('../app.js');
const fixes = read('../game-fixes.js');
const css = read('../styles.css');
const sw = read('../service-worker.js');
const manifest = JSON.parse(read('../manifest.webmanifest'));
const ids = ['sequence','pattern','words','spatial','nback','focus','search','stroop','reaction','math','switch','logic','dual','rotate'];
const session = (level, accuracy, stage = 0, completedAt = 1) => ({
  id: 's-' + completedAt, level, accuracy, completedAt,
  metrics: { challengeStage: stage }
});

test('all primary application views exist', () => {
  for (const view of ['home','training','plans','progress','settings','game','summary']) {
    assert.ok(html.includes('id="view-' + view + '"'), 'Missing ' + view + ' view');
  }
});

test('fourteen original activity IDs are registered', () => {
  const table = app.split('const A=[')[1].split('].map')[0];
  const found = [...table.matchAll(/\['([a-z]+)'/g)].map(match => match[1]);
  assert.deepEqual(found, ids);
});

test('all fourteen activities are connected to a round engine', () => {
  for (const id of ids) {
    assert.ok(app.includes(id + ':'), 'Missing route for ' + id);
    assert.ok(app.includes("case'" + id + "'") || ['rotate','dual'].includes(id), 'Missing scoring route for ' + id);
  }
});

test('progression engine starts new activities at Level 1, Stage 1/5', () => {
  const result = progression.getProgression([]);
  assert.equal(result.level, 1);
  assert.equal(result.stage, 0);
  assert.equal(progression.STAGE_COUNT, 5);
});

test('two strong sessions advance one within-level stage', () => {
  const result = progression.getProgression([
    session(4, 90, 1, 1), session(4, 88, 1, 2)
  ]);
  assert.equal(result.level, 4);
  assert.equal(result.stage, 2);
  assert.equal(result.change, 'stage-up');
});

test('two low sessions ease one within-level stage', () => {
  const result = progression.getProgression([
    session(4, 52, 3, 1), session(4, 50, 3, 2)
  ]);
  assert.equal(result.level, 4);
  assert.equal(result.stage, 2);
  assert.equal(result.change, 'stage-down');
});

test('one low session does not immediately regress a stage', () => {
  const result = progression.getProgression([
    session(4, 94, 2, 1), session(4, 20, 2, 2)
  ]);
  assert.equal(result.stage, 2);
  assert.equal(result.change, 'steady');
});

test('three strong sessions advance one level', () => {
  const result = progression.getProgression([
    session(5, 90, 4, 1), session(5, 88, 4, 2), session(5, 91, 4, 3)
  ]);
  assert.equal(result.level, 6);
  assert.equal(result.stage, 0);
  assert.equal(result.change, 'level-up');
});

test('strong scores at an early stage do not skip the remaining stages', () => {
  const result = progression.getProgression([
    session(2, 92, 0, 1), session(2, 91, 0, 2), session(2, 90, 0, 3)
  ]);
  assert.equal(result.level, 2);
  assert.equal(result.stage, 1);
  assert.equal(result.change, 'stage-up');
});

test('three weak sessions reduce one level', () => {
  const result = progression.getProgression([
    session(5, 45, 0, 1), session(5, 40, 0, 2), session(5, 48, 0, 3)
  ]);
  assert.equal(result.level, 4);
  assert.equal(result.stage, 0);
  assert.equal(result.change, 'level-down');
});

test('progression cannot drop below the starting level or first stage', () => {
  const result = progression.getProgression([
    session(1, 30, 0, 1), session(1, 25, 0, 2), session(1, 20, 0, 3)
  ]);
  assert.equal(result.level, 1);
  assert.equal(result.stage, 0);
  assert.equal(result.change, 'steady');
});

test('progression remains bounded at the maximum level and stage', () => {
  const levelResult = progression.getProgression([
    session(10, 95, 0, 1), session(10, 95, 0, 2), session(10, 95, 0, 3)
  ]);
  const stageResult = progression.getProgression([
    session(3, 95, 4, 1), session(3, 95, 4, 2)
  ]);
  assert.equal(levelResult.level, 10);
  assert.equal(stageResult.stage, 4);
});

test('progression uses only consecutive sessions at the current level and stage', () => {
  const result = progression.getProgression([
    session(2, 20, 0, 1), session(3, 99, 0, 2), session(3, 90, 1, 3)
  ]);
  assert.equal(result.level, 3);
  assert.equal(result.stage, 1);
  assert.equal(result.change, 'steady');
});

test('Sequence Recall and Direction Span overrides keep five-stage overload', () => {
  assert.match(fixes, /challengeStage/);
  assert.match(fixes, /challengeStage\*35/);
  assert.match(fixes, /challengeStage\*120/);
  assert.match(fixes, /active\.sel\.push/);
});

test('activity difficulty controls respond to the five-stage progression', () => {
  for (const token of ['challengeStage*3','challengeStage*4','challengeStage*5','challengeStage*65','challengeStage*105','challengeStage*150']) {
    assert.ok(app.includes(token), 'Missing difficulty parameter ' + token);
  }
  assert.ok(app.includes('count=Math.min(7,1+Math.floor((level-1)/2)+challengeStage)'));
  assert.match(app, /reactionLimitMs/);
  assert.ok(app.includes('lag=Math.min(4,2+Math.floor((level-1)/4)+Math.floor(challengeStage/3))'));
  assert.ok(app.includes('lag=Math.min(4,2+Math.floor((level-1)/4)+Math.floor(challengeStage/3))'));
  const nback = app.split('function nbackRound()')[1].split('\n')[0];
  assert.equal(nback.includes(String.fromCharCode(92)), false);
});

test('custom sessions can select up to eight activities', () => {
  assert.ok(html.includes('custom-activity-list'));
  assert.ok(html.includes('start-custom-plan'));
  assert.match(app, /customSelection\.size>=8/);
  assert.match(app, /function startPlan/);
});

test('activity library search is wired to filtering', () => {
  assert.ok(html.includes('id="activity-search"'));
  assert.match(app, /searchQuery=e\.target\.value/);
  assert.match(app, /\.toLowerCase\(\)\.includes\(q\)/);
});

test('progress view shows recent accuracy and recommendations', () => {
  assert.ok(html.includes('id="accuracy-trend"'));
  assert.ok(html.includes('id="progression-insight"'));
  assert.match(app, /function progressionFor/);
  assert.match(app, /mean\(rows\.slice\(-3\)\)/);
});

test('JSON backup import validates and merges session history', () => {
  assert.ok(html.includes('id="import-data"'));
  assert.match(app, /async function importDataFile/);
  assert.match(app, /data\?\.version!==2/);
  assert.match(app, /new Map\(S\.sessions\.map/);
  assert.match(app, /slice\(-1500\)/);
});

test('account controls keep sign-out and per-account local storage separation', () => {
  assert.ok(html.includes('auth-signout'));
  assert.ok(app.includes('USER_KEY'));
  assert.ok(app.includes('switchDataSpace'));
  assert.ok(app.includes('async function signOutAccount'));
});

test('round submissions require complete inputs', () => {
  assert.ok(app.includes('let complete=false'));
  assert.ok(app.includes('D.responses.length===D.expected.length'));
  assert.ok(app.includes('Finish the round before submitting.'));
});

test('database migration enables owner-scoped row-level security', () => {
  const sql = read('../supabase/migrations/202611050001_neuroforge_core.sql');
  assert.match(sql, /enable row level security/gi);
  assert.match(sql, /auth\.uid\(\)/g);
  assert.match(sql, /with check/gi);
});

test('privilege migration removes anonymous access from application tables', () => {
  const sql = read('../supabase/migrations/202611050002_secure_neuroforge_privileges.sql');
  assert.match(sql, /revoke all privileges on table public\.profiles from anon, authenticated/i);
  assert.match(sql, /revoke all privileges on table public\.training_sessions from anon, authenticated/i);
  assert.match(sql, /grant select, insert, update on table public\.profiles to authenticated/i);
  assert.match(sql, /grant select, insert, delete on table public\.training_sessions to authenticated/i);
});

test('public browser config uses a publishable key and contains no secrets', () => {
  const config = read('../supabase-config.js');
  assert.match(config, /supabaseUrl:\s*'https:\/\/[a-z0-9]+\.supabase\.co'/);
  assert.match(config, /supabasePublishableKey:\s*'sb_publishable_[A-Za-z0-9_-]+'/);
  assert.doesNotMatch(config, /service_role|sb_secret_|eyJ[a-zA-Z0-9_-]{20,}/i);
});

test('training engine loads before app and is cached offline', () => {
  assert.ok(html.indexOf('training-engine.js') < html.indexOf('app.js'));
  assert.match(sw, /neuroforge-static-v7/);
  assert.match(sw, /training-engine\.js/);
});

test('PWA manifest and mobile accessibility features exist', () => {
  assert.equal(manifest.name, 'NeuroForge');
  assert.ok(existsSync(new URL('../service-worker.js', import.meta.url)));
  assert.match(css, /@media\(max-width:720px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /button:focus-visible/);
});

test('signup confirmation redirects to the app subdirectory', () => {
  assert.match(app, /emailRedirectTo:new URL\('\.\/',location\.href\)\.href/);
});
