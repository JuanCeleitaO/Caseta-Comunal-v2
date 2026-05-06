-- database/migrations/01_create_admin_table.sql

-- Crear tabla de administradores (solo habrá 3 registros)
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL, -- Usaremos email para el login técnico
    password_hash VARCHAR(255) NOT NULL, -- Contraseña encriptada con bcrypt
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar los 3 administradores iniciales
-- importante cambiar contraseñas para cuando salga el proyecto a producción
INSERT INTO admins (nombre, email, password_hash) VALUES 
('Juan David Admin', 'juan@caseta.com', '$2a$10$X8O5O1mN8f/3eR1G1r3uOeN8Z4Jg8m4q/1eR1G1r3uOeN8Z4Jg8m4q'), //password123
('Admin Dos', 'admin2@caseta.com', '$2b$10$WmYq7LJblFm6BuohckYFCOVq/eB56CXqmaRZwBU9XfrtKZM90qM4S'), //contraseña123
('Admin Tres', 'admin3@caseta.com', '$2a$10$X8O5O1mN8f/3eR1G1r3uOeN8Z4Jg8m4q/1eR1G1r3uOeN8Z4Jg8m4q') //password123
ON CONFLICT (email) DO NOTHING;