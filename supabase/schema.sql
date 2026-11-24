-- Base compartida de la prueba de tickets. Ejecutar una vez en Supabase > SQL Editor.
-- Cada ticket se guarda completo (con su seguimiento) como JSON.

create table if not exists public.tickets (
  id          bigint primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now(),
  updated_by  text
);

create index if not exists tickets_updated_at on public.tickets (updated_at);

-- updated_at lo pone la base, no el navegador
create or replace function public.tickets_touch() returns trigger
language plpgsql as $$
begin
  new.updated_at := clock_timestamp();
  return new;
end $$;

drop trigger if exists tickets_touch on public.tickets;
create trigger tickets_touch before insert or update on public.tickets
for each row execute function public.tickets_touch();

-- Solo usuarios con sesión iniciada leen y escriben. Sin sesión no se ve nada.
alter table public.tickets enable row level security;

drop policy if exists tickets_leer on public.tickets;
create policy tickets_leer on public.tickets for select to authenticated using (true);

drop policy if exists tickets_crear on public.tickets;
create policy tickets_crear on public.tickets for insert to authenticated with check (true);

drop policy if exists tickets_editar on public.tickets;
create policy tickets_editar on public.tickets for update to authenticated using (true) with check (true);

-- Sin política de borrado: nadie puede borrar tickets desde la app.

-- Para empezar de cero (borra todo; la próxima vez que alguien entre se cargan los datos de ejemplo):
-- truncate public.tickets;
