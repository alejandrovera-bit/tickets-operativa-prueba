/* Configuración de la base compartida (Supabase).
   Vacío = modo demo: cada navegador guarda sus propios datos.
   La llave "anon/publishable" es pública por diseño; lo que protege los datos es el login
   y las reglas de la tabla (supabase/schema.sql). NUNCA pongas aquí la service_role key. */
window.SB_CONF = {
  url: '',
  key: ''
};

/* Modo demo con cuentas: correo + contraseña → perfil. Solo se guarda el hash SHA-256 de
   "correo|contraseña" (no el correo ni la contraseña). Es una puerta para la prueba, no seguridad real:
   los datos son ficticios y se guardan en el navegador de cada quien. */
window.DEMO_CUENTAS = [
  { h: '254713cefe15bdd4492f5611ff0b764eb91a9c2446d0e24d25621dc6ab31a06b', rol: 'op', nombre: 'Mario Ruiz' },
  { h: 'd0352b6615817fad5f9017707dcbaa5196e58ea78836c29958ba4ecde8aa6eaf', rol: 'sup', nombre: 'Sofía León' },
  { h: '9d4c1d52a3b7d1c99baebe905aba3e222fe6a394cb26b0c35c5ec7bd22b05029', rol: 'adm', nombre: 'Patricia Vega' }
];
