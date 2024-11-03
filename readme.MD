# API Endpoints

Esta API incluye rutas para gestionar sesiones, usuarios y tareas.

## Rutas

### Sesiones
- `POST /init_session` - Inicia una sesión y genera un token de autenticación.
- `POST /create_user` - Crea un nuevo usuario.
- `GET /token` - Verifica y devuelve el token de sesión activo.

### Usuarios
- `GET /lista_user` - Devuelve una lista de todos los usuarios (requiere permisos de administrador).

### Tareas
- `POST /create_tarea` - Crea una nueva tarea (requiere permisos de administrador).
- `POST /lista_tarea` - Devuelve una lista de todas las tareas.
- `POST /update_tarea` - Actualiza una tarea existente.
- `DELETE /delete_tarea` - Elimina una tarea (requiere permisos de administrador).
