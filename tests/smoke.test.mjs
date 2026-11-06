import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const progression = require('../training-engine.js');
const catalog = require('../exercise-catalog.js');
const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const html = read('../index.html');
const app = read('../app.js');
const fixes = read('../game-fixes.js');
const css = read('../styles.css');
const sw = read('../service-worker.js');
const manifest = JSON.parse(read('../manifest.webmanifest'));
const ids = ['sequence','pattern','words','spatial','nback','focus','search','stroop','reaction','math','switch','logic','dual','rotate','tone','route','tones','scene','tasks','peripheral','compare','pitch','sweep','profiles','expressions','conversations','weave','logiclab','landmark'];
const session = (level, accuracy, stage = 0, completedAt = 1) => ({
  id: 's-' + completedAt, level, accuracy, completedAt,
  metrics: { challengeStage: stage }
});

test('all primary application views exist', () => {
  for (const view of ['home','training','plans','progress','settings','game','summary']) {
    assert.ok(html.includes('id="view-' + view + '"'), 'Missing ' + view + ' view');
  }
});

test('six canonical training domains and twenty-nine original activities are registered', () => {
  assert.deepEqual(catalog.domains.map(domain => domain.name), ['Memory','Attention','Brain Speed','People Skills','Intelligence','Navigation']);
  assert.deepEqual(catalog.activities.map(activity => activity.id), ids);
  const counts = Object.fromEntries(catalog.domains.map(domain => [domain.name,catalog.activities.filter(activity => activity.area===domain.name).length]));
  assert.deepEqual(counts, {'Memory':7,'Attention':5,'Brain Speed':5,'People Skills':4,'Intelligence':4,'Navigation':4});
  assert.equal(catalog.areaForSession({activityId:'spatial',area:'Spatial'}), 'Navigation');
  assert.equal(catalog.areaForSession({activityId:'reaction',area:'Speed'}), 'Brain Speed');
});

test('all twenty-nine activities are connected to a round engine and scoring path', () => {
  for (const id of ids) {
    assert.ok(app.includes(id + ':'), 'Missing route for ' + id);
    assert.ok(app.includes("case'" + id + "'") || ['rotate','dual'].includes(id), 'Missing scoring route for ' + id);
  }
});

test('new activities have dedicated playable handlers and adaptive parameters', () => {
  for (const handler of ['toneSequenceRound','sceneRound','taskRecallRound','peripheralRound','quickCompareRound','pitchMatchRound','rapidSweepRound','profileRecallRound','expressionCueRound','conversationRecallRound','numberWeaveRound','logicLabRound','landmarkRound']) assert.match(app,new RegExp('function '+handler+'\\('));
  assert.match(app, /function playNote\(/);
  assert.match(app, /AudioContext/);
  assert.ok(css.includes('.route-grid'));
  assert.ok(css.includes('.tone-prompt'));
  assert.ok(css.includes('.peripheral-grid'));
});

test('within-session adaptive staircase raises and eases challenge after consecutive results', () => {
  assert.match(app, /if\(result>=\.85\)/);
  assert.match(app, /if\(strongRun>=2&&runDifficulty<10\)/);
  assert.match(app, /if\(weakRun>=2&&runDifficulty>1\)/);
  assert.match(app, /adaptiveTrace:\[\.\.\.adaptiveTrace\]/);
  assert.match(fixes, /runDifficulty/);
});

test('course library stores 12-session progress and allows sequential review', () => {
  assert.ok(html.includes('id=\"course-library\"'));
  assert.match(app, /const COURSES=\[/);
  assert.match(app, /activities:\[[^\]]{20,}/);
  assert.match(app, /function startCourse\(/);
  assert.match(app, /courseReviewMode/);
  assert.match(app, /courseStepInProgress/);
});

test('exercise progress map has selectable levels and personal baseline/best metrics', () => {
  assert.ok(html.includes('id=\"exercise-level-map\"'));
  assert.ok(html.includes('id=\"level-detail\"'));
  assert.match(app, /function renderLevelMap\(/);
  assert.match(app, /function levelStats\(/);
  assert.match(app, /data-map-preview-level/);
  assert.match(app, /Baseline is your first recorded score/);
  assert.ok(html.includes('id=\"exercise-preview-dialog\"'));
  assert.ok(html.includes('id=\"preview-level\"'));
  assert.ok(html.includes('id=\"preview-start\"'));
  assert.match(app, /function openExercisePreview\(/);
  assert.match(app, /data-preview/);
  assert.match(app, /function previewLevelDescription\(/);
});

test('all twenty-nine round generators initialize without throwing', () => {
  const start = app.indexOf('const rint=');
  const end = app.indexOf('function f1(', start);
  assert.ok(start >= 0 && end > start, 'Could not isolate exercise round engines');
  const engineSource = app.slice(start, end);
  const factory = new Function(`
    const elements = new Map();
    function $(selector) {
      if (!elements.has(selector)) elements.set(selector, {innerHTML:'',textContent:'',disabled:false,value:'',style:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},addEventListener(){}});
      return elements.get(selector);
    }
    function $$(selector) { return []; }
    let D={},runDifficulty=1,level=1,challengeStage=0,round=1,timer=null;
    const COLORS=[['red','#f00'],['blue','#00f'],['green','#0f0'],['yellow','#ff0']];
    const SHAPES=['●','▲','■','◆','✦','⬟','○','△','◇','□'];
    const DIRS=['↑','→','↓','←'];
    const WORDS=['cedar','orbit','silver','harbor','velvet','canyon','lantern','meadow','copper','island','marble','ribbon','planet','window','garden','pencil','thunder','pocket','mirror','ticket'];
    const window={};
    const setTimeout=()=>1,clearTimeout=()=>{};
    ${engineSource}
    return [seqRound,patternRound,wordRound,spatialRound,nbackRound,focusRound,searchRound,stroopRound,reactionRound,mathRound,switchRound,logicRound,dualRound,rotateRound,toneRound,routeRound,toneSequenceRound,sceneRound,taskRecallRound,peripheralRound,quickCompareRound,pitchMatchRound,rapidSweepRound,profileRecallRound,expressionCueRound,conversationRecallRound,numberWeaveRound,logicLabRound,landmarkRound].map(fn=>[fn.name,()=>{D={};round=1;runDifficulty=1;challengeStage=0;fn();}]);
  `);
  const run = factory();
  assert.equal(run.length,29);
  for (const [name,execute] of run) assert.doesNotThrow(execute,name+' should initialize a round');
});

test('course and progress-map renderers generate valid counts and personal level details', () => {
  const courseStart=app.indexOf('const COURSES=');
  const courseEnd=app.indexOf('];',courseStart)+2;
  const rendererStart=app.indexOf('function renderCourses(){');
  const rendererEnd=app.indexOf('function renderCustomPlan(){',rendererStart);
  const mapStart=app.indexOf('function levelStats(');
  const mapEnd=app.indexOf('function exportData(){',mapStart);
  assert.ok(courseStart>=0&&courseEnd>courseStart&&rendererEnd>rendererStart&&mapEnd>mapStart);
  const courseSource=app.slice(courseStart,courseEnd);
  const courseRenderer=app.slice(rendererStart,rendererEnd);
  const mapRenderer=app.slice(mapStart,mapEnd);
  const make=new Function('catalog',`const A=catalog.activities,DOMAINS=catalog.domains;let S={sessions:[{id:'a',activityId:'sequence',level:1,accuracy:84,completedAt:1},{id:'b',activityId:'sequence',level:1,accuracy:95,completedAt:2}]};let mapSelectedActivity='sequence',mapSelectedLevel=1;const elements={};const $=s=>elements[s]||(elements[s]={innerHTML:'',textContent:''});const history=id=>S.sessions.filter(x=>x.activityId===id);const escape=s=>String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'}[c]));const activity=id=>A.find(x=>x.id===id);${courseSource}\n${courseRenderer}\n${mapRenderer}\nrenderCourses();renderLevelMap();return {courses:$('#course-library').innerHTML,map:$('#exercise-level-map').innerHTML,detail:$('#level-detail').innerHTML};`);
  const output=make(catalog);
  assert.equal((output.courses.match(/class="course-card"/g)||[]).length,7);
  assert.equal((output.map.match(/class="map-level /g)||[]).length,290);
  assert.match(output.detail,/84%/);
  assert.match(output.detail,/95%/);
  assert.match(output.detail,/Baseline/);
  assert.match(output.detail,/Best/);
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
  assert.ok(app.includes('count=Math.min(7,1+Math.floor((runDifficulty-1)/2)+challengeStage)')); 
  assert.match(app, /reactionLimitMs/);
  assert.ok(app.includes('lag=Math.min(4,2+Math.floor((runDifficulty-1)/4)+Math.floor(challengeStage/3))'));
  assert.ok(app.includes('lag=Math.min(4,2+Math.floor((runDifficulty-1)/4)+Math.floor(challengeStage/3))'));
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
  assert.match(app, /adaptiveTrace:Array\.isArray\(m\.adaptiveTrace\)/);
  assert.match(app, /courseId:typeof m\.courseId/);
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
  assert.ok(html.indexOf('training-engine.js') < html.indexOf('exercise-catalog.js'));
  assert.ok(html.indexOf('exercise-catalog.js') < html.indexOf('app.js'));
  assert.match(sw, /neuroforge-static-v9/);
  assert.match(sw, /training-engine\.js/);
  assert.match(sw, /exercise-catalog\.js/);
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
