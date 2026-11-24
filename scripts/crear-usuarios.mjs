// Crea las cuentas de prueba en Supabase Auth.
// Uso (Node 18+), con la service_role key SOLO en la terminal, nunca en el repo:
//   SUPABASE_URL=https://xxxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=... node scripts/crear-usuarios.mjs
// Imprime correo y contraseña de cada cuenta una sola vez; compártelas por un canal privado.
import { randomBytes } from 'node:crypto';

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) {
  console.error('Faltan SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

// Los nombres deben coincidir con los responsables de los datos de ejemplo (js/seed.js).
const CUENTAS = [
  { email: 'mario.ruiz@prueba-tickets.test', nombre: 'Mario Ruiz', rol: 'op' },
  { email: 'luis.perez@prueba-tickets.test', nombre: 'Luis Pérez', rol: 'op' },
  { email: 'jorge.diaz@prueba-tickets.test', nombre: 'Jorge Díaz', rol: 'op' },
  { email: 'ramon.cruz@prueba-tickets.test', nombre: 'Ramón Cruz', rol: 'op' },
  { email: 'sofia.leon@prueba-tickets.test', nombre: 'Sofía León', rol: 'sup' },
  { email: 'patricia.vega@prueba-tickets.test', nombre: 'Patricia Vega', rol: 'adm' },
];

for (const c of CUENTAS) {
  const password = randomBytes(9).toString('base64url');
  const r = await fetch(`${URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: c.email, password, email_confirm: true, user_metadata: { nombre: c.nombre, rol: c.rol } }),
  });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) {
    console.log(`✗ ${c.email}: ${body.msg || body.error_description || r.status}`);
    continue;
  }
  console.log(`✓ ${c.nombre.padEnd(14)} ${c.rol.padEnd(4)} ${c.email}  ${password}`);
}
