# Tickets de operación · prueba

Prototipo navegable del rediseño de tickets para el área operativa, con tres perfiles:

| Perfil | Página | Qué hace |
|---|---|---|
| Operador | `operador.html` | Sus tickets: avance, notas internas, comentarios al residente, terminar. |
| Supervisor | `supervisor.html` | Tickets del equipo: revisar, devolver, terminar, reasignar, equipo. |
| Administrador | `admin.html` | Resumen, tickets y equipo de todos los condominios; exportar a Excel. |

Funciona en computadora y en celular (se adapta al ancho de la pantalla).

**No se conecta a Vivook.** Los datos son de ejemplo y ficticios.

## Dos modos

1. **Demo** (por defecto, sin Supabase en `js/config.js`). Se entra con correo y contraseña de las
   cuentas de `DEMO_CUENTAS` (en el repo solo está su hash) y la contraseña elige el perfil.
   Los cambios se guardan solo en ese navegador. Sirve para ver la propuesta sin configurar nada.
2. **Compartido** (con Supabase). Cada quien entra con su cuenta y todos ven los mismos tickets:
   lo que registra el operador en su celular lo ve el supervisor en el suyo. Los cambios se guardan
   solos y la lista se actualiza cada 8 segundos.

## Activar el modo compartido

1. Crear un proyecto gratuito en [supabase.com](https://supabase.com).
2. En **SQL Editor**, ejecutar `supabase/schema.sql`.
3. En **Authentication › Sign In / Providers**, dejar Email activo y **desactivar "Allow new users to sign up"**
   (las cuentas las creamos nosotros).
4. Crear las cuentas de prueba (la service_role key va solo en la terminal, nunca en el repo):

   ```bash
   SUPABASE_URL=https://xxxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=... node scripts/crear-usuarios.mjs
   ```

   Imprime correo y contraseña de cada cuenta: Mario Ruiz, Luis Pérez, Jorge Díaz y Ramón Cruz
   (operadores), Sofía León (supervisor) y Patricia Vega (administrador).
5. Poner en `js/config.js` la URL del proyecto y la **anon / publishable key** (es pública por diseño).
6. La primera persona que entre carga los datos de ejemplo.

### Seguridad

- Sin sesión no se puede leer ni escribir nada: la tabla tiene RLS y solo permite a usuarios autenticados.
- No hay registro abierto ni consulta de contraseñas desde el navegador; el login es el de Supabase Auth.
- Nadie puede borrar tickets desde la app.
- Para empezar de cero: `truncate public.tickets;` en el SQL Editor.

## Probar en local

```bash
python -m http.server 8000
# abrir http://localhost:8000
```

## Limitaciones de la prueba

- Si dos personas cambian el mismo ticket al mismo tiempo, gana el último que guarda.
- Los avisos (pestaña Avisos) son de ejemplo y no se comparten.
- Sin conexión no se guarda en la base (solo en modo demo, que es local).
