import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read=(path)=>readFileSync(new URL(path,import.meta.url),'utf8');
const html=read('../index.html'),app=read('../app.js'),fixes=read('../game-fixes.js'),css=read('../styles.css');
const manifest=JSON.parse(read('../manifest.webmanifest'));
test('all primary application views exist',()=>{for(const v of ['home','training','plans','progress','settings','game','summary'])assert.match(html,new RegExp('id="view-'+v+'"'));});
test('the twelve original activity IDs are registered',()=>{const table=app.split('const A=[')[1].split('const PLANS=')[0];const ids=[...table.matchAll(/\['([a-z]+)','/g)].map(m=>m[1]);assert.deepEqual(ids,['sequence','pattern','words','spatial','nback','focus','search','stroop','reaction','math','switch','logic']);});
test('all twelve activity engines are wired to the score switch',()=>{for(const id of ['sequence','pattern','words','spatial','nback','focus','search','stroop','reaction','math','switch','logic'])assert.ok(app.includes("case'"+id+"'"),'Missing score route: '+id);});
test('input fix is loaded after the main app and supports repeated choices',()=>{assert.match(html,/src="game-fixes\.js" defer/);assert.match(fixes,/function seqRound/);assert.match(fixes,/function spatialRound/);assert.doesNotMatch(fixes,/b\.disabled\s*=\s*true/);});
test('database migration enables owner-scoped row-level security',()=>{const sql=read('../supabase/migrations/202611050001_neuroforge_core.sql');assert.match(sql,/enable row level security/gi);assert.match(sql,/auth\.uid\(\)/g);assert.match(sql,/with check/gi);});
test('privilege migration removes anonymous access from application tables',()=>{const sql=read('../supabase/migrations/202611050002_secure_neuroforge_privileges.sql');assert.match(sql,/revoke all privileges on table public\.profiles from anon, authenticated/i);assert.match(sql,/revoke all privileges on table public\.training_sessions from anon, authenticated/i);assert.match(sql,/grant select, insert, update on table public\.profiles to authenticated/i);assert.match(sql,/grant select, insert, delete on table public\.training_sessions to authenticated/i);});
test('public client config uses a publishable key and contains no secrets',()=>{const c=read('../supabase-config.js');assert.match(c,/supabaseUrl:\s*'https:\/\/[a-z0-9]+\.supabase\.co'/);assert.match(c,/supabasePublishableKey:\s*'sb_publishable_[A-Za-z0-9_-]+'/);assert.doesNotMatch(c,/service_role|sb_secret_|eyJ[a-zA-Z0-9_-]{20,}/i);});
test('signup confirmation redirects to the app subdirectory',()=>{assert.match(app,/emailRedirectTo:new URL\('\.\/',location\.href\)\.href/);});
test('PWA manifest and service worker include application assets',()=>{assert.equal(manifest.name,'NeuroForge');assert.ok(existsSync(new URL('../service-worker.js',import.meta.url)));const sw=read('../service-worker.js');assert.match(sw,/game-fixes\.js/);assert.match(sw,/neuroforge-static-v5/);});
test('responsive and reduced-motion styles exist',()=>{assert.match(css,/@media\(max-width:720px\)/);assert.match(css,/prefers-reduced-motion:reduce/);});

test('dashboard shows live daily-goal progress from the saved preference',()=>{assert.ok(html.includes('today-goal-label'));assert.ok(html.includes('today-goal-fill'));assert.ok(app.includes('todaySeconds'));assert.ok(app.includes('S.profile.goal'));});
test('account controls include sign-out and per-account local storage separation',()=>{assert.ok(html.includes('auth-signout'));assert.ok(app.includes('USER_KEY'));assert.ok(app.includes('switchDataSpace'));assert.ok(app.includes('async function signOutAccount'));});
test('round submissions are blocked until required inputs are complete',()=>{assert.ok(app.includes('let complete=false'));assert.ok(app.includes('D.responses.length===D.expected.length'));assert.ok(app.includes('Finish the round before submitting.'));});
test('adaptive difficulty advances from the last level and supports all ten levels',()=>{assert.ok(app.includes('previous+1'));assert.ok(app.includes('Math.min(10,previous+1)'));});
test('multi-select answers can be removed after a misclick',()=>{assert.ok(app.includes('D.sel=D.sel.filter'));assert.ok(app.includes('aria-pressed'));});

test('initial session restore does not merge an unassigned cache into another account',()=>{assert.ok(app.includes('function switchDataSpace(nextUser,carryGuest=false)'));assert.ok(app.includes('switchDataSpace(nextUser,!user&&!!nextUser)'));assert.ok(app.includes('else if(nextUser){S={version:2,sessions:[],profile:{name:\'Guest athlete\',goal:10}};}'));});
