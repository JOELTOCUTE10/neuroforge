-- NeuroForge core schema. Apply to a Supabase project before enabling cloud accounts.
-- User-owned records are protected with row-level security and auth.uid() policies.
create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default 'NeuroForge athlete' check (char_length(display_name)<=32),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.training_sessions (
 id text primary key,
 user_id uuid not null references auth.users(id) on delete cascade,
 activity_id text not null check (char_length(activity_id)<=64),
 activity_name text not null check (char_length(activity_name)<=100),
 area text not null check (area in ('Memory','Attention','Speed','Reasoning','Flexibility','Spatial')),
 level smallint not null check (level between 1 and 10),
 accuracy smallint not null check (accuracy between 0 and 100),
 duration_seconds integer not null check (duration_seconds between 1 and 86400),
 correct_count integer not null default 0 check (correct_count>=0),
 item_count integer not null default 0 check (item_count>=0),
 metrics jsonb not null default '{}'::jsonb,
 completed_at timestamptz not null,
 created_at timestamptz not null default now()
);
create index if not exists training_sessions_user_completed_idx on public.training_sessions(user_id,completed_at desc);
alter table public.profiles enable row level security;
alter table public.training_sessions enable row level security;
drop policy if exists "Profiles are readable by owner" on public.profiles;
create policy "Profiles are readable by owner" on public.profiles for select to authenticated using ((select auth.uid())=id);
drop policy if exists "Profiles are insertable by owner" on public.profiles;
create policy "Profiles are insertable by owner" on public.profiles for insert to authenticated with check ((select auth.uid())=id);
drop policy if exists "Profiles are updatable by owner" on public.profiles;
create policy "Profiles are updatable by owner" on public.profiles for update to authenticated using ((select auth.uid())=id) with check ((select auth.uid())=id);
drop policy if exists "Sessions are readable by owner" on public.training_sessions;
create policy "Sessions are readable by owner" on public.training_sessions for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists "Sessions are insertable by owner" on public.training_sessions;
create policy "Sessions are insertable by owner" on public.training_sessions for insert to authenticated with check ((select auth.uid())=user_id);
drop policy if exists "Sessions are deletable by owner" on public.training_sessions;
create policy "Sessions are deletable by owner" on public.training_sessions for delete to authenticated using ((select auth.uid())=user_id);
grant select,insert,update on public.profiles to authenticated;
grant select,insert,delete on public.training_sessions to authenticated;
-- No privileges are granted to anon. Never expose a secret/service-role key client-side.