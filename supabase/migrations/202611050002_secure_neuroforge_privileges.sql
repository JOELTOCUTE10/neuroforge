-- Tighten NeuroForge table privileges.
-- Project defaults granted broad privileges to anon and authenticated;
-- remove those defaults from these app tables, then grant only required operations.
revoke all privileges on table public.profiles from anon, authenticated;
revoke all privileges on table public.training_sessions from anon, authenticated;
grant select, insert, update on table public.profiles to authenticated;
grant select, insert, delete on table public.training_sessions to authenticated;
