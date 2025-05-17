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

</body>
</html>
