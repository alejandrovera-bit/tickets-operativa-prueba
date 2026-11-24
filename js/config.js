/* Configuración de la base compartida (Supabase).
   Vacío = modo demo: cada navegador guarda sus propios datos.
   La llave "anon/publishable" es pública por diseño; lo que protege los datos es el login
   y las reglas de la tabla (supabase/schema.sql). NUNCA pongas aquí la service_role key. */
window.SB_CONF = {
  url: '',
  key: ''
};
