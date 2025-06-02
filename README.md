<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  

</head>
<body>
  <h1>📄 Documentación Think & Job v1.1</h1>

  <div class="section">
    <h2>🚀 Stack Tecnológico</h2>
    <h3>Frontend</h3>
    <ul>
      <li><strong>React 18.x:</strong> Biblioteca JavaScript para construir interfaces de usuario</li>
      <li><strong>Vite 5.x:</strong> Bundler y herramienta de desarrollo</li>
      <li><strong>TailwindCSS 3.x:</strong> Framework CSS utility-first</li>
      <li><strong>React Router 6.x:</strong> Enrutamiento para React</li>
      <li><strong>Headless UI:</strong> Componentes accesibles sin estilos</li>
      <li><strong>Heroicons:</strong> Set de iconos SVG</li>
    </ul>

    <h3>Gestión de Paquetes</h3>
    <ul>
      <li><strong>PNPM:</strong> Gestor de paquetes rápido y eficiente en espacio</li>
      <li>Ventajas:
        <ul>
          <li>Almacenamiento eficiente</li>
          <li>Instalaciones más rápidas</li>
          <li>Links simbólicos para dependencias</li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="section">
    <h2>📁 Estructura del Proyecto</h2>
    <pre><code>client/
├── public/               # Archivos estáticos
├── src/
│   ├── assets/          # Recursos (imágenes, SVGs)
│   ├── components/      # Componentes reutilizables
│   ├── context/         # Contextos de React
│   ├── lib/             # Utilidades y helpers
│   ├── pages/           # Páginas/Rutas principales
│   ├── services/        # Servicios y APIs
│   └── utils/           # Utilidades generales
├── .gitignore
├── package.json
└── vite.config.js</code></pre>
  </div>

  <div class="section">
    <h2>🔐 Características Principales</h2>
    <h3>Sistema de Autenticación</h3>
    <ul>
      <li>Manejo de roles: <code>admin</code>, <code>manager</code>, <code>employee</code></li>
      <li>Tokens JWT</li>
      <li>Protección de rutas por roles</li>
      <li>Persistencia con <code>localStorage</code></li>
    </ul>

    <h3>Enrutamiento</h3>
    <pre><code>&lt;Routes&gt;
  &lt;Route path="/" element={&lt;LandingPage /&gt;} /&gt;
  &lt;Route path="/login" element={&lt;Login /&gt;} /&gt;
  &lt;Route path="/admin" element={&lt;ProtectedRoute&gt;&lt;AdminDashboard /&gt;&lt;/ProtectedRoute&gt;} /&gt;
  &lt;Route path="/manager" element={&lt;ProtectedRoute&gt;&lt;ManagerDashboard /&gt;&lt;/ProtectedRoute&gt;} /&gt;
  &lt;Route path="/employee" element={&lt;ProtectedRoute&gt;&lt;EmployeeDashboard /&gt;&lt;/ProtectedRoute&gt;} /&gt;
&lt;/Routes&gt;</code></pre>
  </div>

  <div class="section">
    <h2>🧩 Componentes Principales</h2>
    <h3>ProtectedRoute</h3>
    <ul>
      <li>Verifica autenticación</li>
      <li>Valida roles de usuario</li>
      <li>Redirecciona según permisos</li>
    </ul>

    <h3>AuthContext</h3>
    <ul>
      <li>Estado centralizado de autenticación</li>
      <li>Métodos <code>login</code> y <code>logout</code></li>
      <li>Persistencia con <code>localStorage</code></li>
    </ul>

    <h3>Dashboard</h3>
    <ul>
      <li>Navegación responsive</li>
      <li>Sidebar configurable</li>
      <li>Menú de usuario</li>
      <li>Tema oscuro/claro</li>
    </ul>
  </div>

  <div class="section">
    <h2>⚙️ Configuración del Proyecto</h2>
    <h3>Instalación</h3>
    <pre><code># Clonar repositorio
git clone [url-repositorio]

# Instalar dependencias
pnpm install

# Ejecutar entorno de desarrollo
pnpm dev</code></pre>

    <h3>Scripts</h3>
    <pre><code>{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}</code></pre>
  </div>

  <div class="section">
    <h2>📦 Dependencias</h2>
    <pre><code>{
  "@headlessui/react": "^2.0.0",
  "@heroicons/react": "^2.0.0",
  "bcryptjs": "^2.4.3",
  "react": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "tailwindcss": "^3.0.0"
}</code></pre>
  </div>

  <div class="section">
    <h2>🧪 Servicios Mock</h2>
    <p>Ejemplo de usuarios simulados con bcrypt:</p>
    <pre><code>const users = [
  {
    email: 'admin@test.com',
    password: '[hashed]admin123',
    role: 'admin'
  },
  // otros usuarios...
];</code></pre>
  </div>

  <div class="section">
    <h2>🔒 Consideraciones de Seguridad</h2>
    <ul>
      <li>Contraseñas con <code>bcrypt</code></li>
      <li>Rutas protegidas</li>
      <li>Tokens JWT seguros</li>
      <li>Validación y sanitización de datos</li>
    </ul>
  </div>

  <div class="section">
    <h2>🎨 Estilos y UI</h2>
    <ul>
      <li>TailwindCSS y clases utilitarias</li>
      <li>Diseño consistente</li>
      <li>Componentes responsivos</li>
      <li>Modo oscuro habilitado</li>
    </ul>
  </div>

  <div class="section">
    <h2>✅ Mejores Prácticas</h2>
    <ul>
      <li>Código modular y reutilizable</li>
      <li>Separación de responsabilidades</li>
      <li>Manejo de errores</li>
      <li>Documentación inline</li>
      <li>Nombres descriptivos de componentes</li>
      <li>Logs para depuración</li>
      <li><em>Testing pendiente de implementación</em></li>
    </ul>
  </div>

  <div class="section">
    <h2>🧑‍💼 Portal del Candidato</h2>
    <p>El portal del candidato es una interfaz dedicada a los usuarios con el rol de "candidato". Les permite gestionar su información personal, documentos, buscar oportunidades de empleo y generar reportes sobre su actividad en la plataforma.</p>

    <h3>DashboardCandidato</h3>
    <ul>
      <li><strong>Propósito:</strong> Es la página principal del candidato al iniciar sesión. Proporciona una vista general y acceso a las diferentes secciones del portal.</li>
      <li><strong>Características Clave:</strong>
        <ul>
          <li>Presenta un resumen de la actividad reciente o información relevante.</li>
          <li>Navegación principal a través de un menú lateral (SidebarCandidato) que enlaza a Perfil, Portal de Empleo, Documentos y Crear Reporte.</li>
          <li>Muestra contenido dinámico en una sección principal (DashboardSection) dependiendo de la opción seleccionada en el menú.</li>
        </ul>
      </li>
    </ul>

    <h3>PerfilSection</h3>
    <ul>
      <li><strong>Propósito:</strong> Permite al candidato ver y actualizar su información personal y profesional.</li>
      <li><strong>Características Clave:</strong>
        <ul>
          <li>Visualización de datos como nombre, información de contacto, experiencia laboral, educación, etc.</li>
          <li>Formularios para editar y guardar los cambios en el perfil.</li>
          <li>Posibilidad de subir o cambiar foto de perfil.</li>
        </ul>
      </li>
    </ul>

    <h3>PortalEmpleoSection</h3>
    <ul>
      <li><strong>Propósito:</strong> Facilita la búsqueda y postulación a ofertas de empleo disponibles en la plataforma.</li>
      <li><strong>Características Clave:</strong>
        <ul>
          <li>Listado de ofertas de empleo con filtros y opciones de búsqueda.</li>
          <li>Visualización detallada de cada oferta (descripción, requisitos, empresa).</li>
          <li>Funcionalidad para que el candidato se postule a las ofertas de su interés.</li>
        </ul>
      </li>
    </ul>

    <h3>DocumentosSection</h3>
    <ul>
      <li><strong>Propósito:</strong> Permite al candidato cargar y gestionar documentos relevantes para su perfil y postulaciones.</li>
      <li><strong>Características Clave:</strong>
        <ul>
          <li>Subida de archivos (CV, cartas de presentación, certificados, etc.).</li>
          <li>Listado de documentos subidos con opciones para ver o eliminar.</li>
          <li>Organización de documentos.</li>
        </ul>
      </li>
    </ul>

    <h3>CrearReporte</h3>
    <ul>
      <li><strong>Propósito:</strong> Ofrece al candidato la funcionalidad de generar reportes sobre su actividad o información específica dentro del portal.</li>
      <li><strong>Características Clave:</strong>
        <ul>
          <li>Selección de parámetros o tipo de reporte a generar (ej. historial de postulaciones, perfil completo en formato PDF).</li>
          <li>Generación y descarga del reporte.</li>
        </ul>
      </li>
    </ul>
  </div>

</body>
</html>
