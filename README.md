# Think & Job v1.1

"Think & Job" es una aplicación web diseñada para optimizar los procesos de búsqueda de empleo y gestión de candidatos. Proporciona funcionalidades para la autenticación de usuarios, acceso basado en roles y paneles de control (dashboards) adaptados a diferentes tipos de usuarios, incluyendo administradores, gerentes y empleados. Este README describe los detalles técnicos del proyecto, las instrucciones de configuración y las prácticas de desarrollo.

## 🚀 Stack Tecnológico

### Frontend
*   **React 18.x:** Biblioteca de JavaScript para construir interfaces de usuario.
*   **Vite 5.x:** Moderna herramienta de construcción (build tool) y servidor de desarrollo para el frontend.
*   **TailwindCSS 3.x:** Framework CSS utility-first para el desarrollo rápido y responsivo de interfaces de usuario.
*   **React Router 6.x:** Para el enrutamiento declarativo en aplicaciones React.
*   **Headless UI:** Biblioteca de componentes de UI no estilizados y completamente accesibles para una máxima personalización.
*   **Heroicons:** Colección de iconos SVG de alta calidad.

## 📁 Estructura del Proyecto
Un breve resumen de los principales directorios dentro del proyecto:
```text
client/
├── public/               # Activos estáticos (p. ej., favicon, imágenes)
├── src/
│   ├── assets/          # Activos específicos de componentes (imágenes, SVGs)
│   ├── components/      # Componentes de UI reutilizables
│   ├── context/         # Proveedores de React Context API (p. ej., AuthContext)
│   ├── lib/             # Bibliotecas de terceros o adaptadores
│   ├── pages/           # Componentes de página (vistas principales para las rutas)
│   ├── services/        # Lógica para la comunicación con APIs o servicios externos (p. ej., fakeAuthService)
│   └── utils/           # Funciones de utilidad generales
├── .gitignore            # Especifica archivos y carpetas que Git debe ignorar intencionalmente
├── package.json          # Metadatos del proyecto, incluyendo dependencias y scripts
└── vite.config.js        # Archivo de configuración de Vite (también incluye la configuración del ejecutor de pruebas Vitest)
```

## ✨ Características Principales

### Sistema de Autenticación
*   **Control de Acceso Basado en Roles (RBAC):** Define permisos distintos para roles de usuario como `admin`, `manager` y `employee`. (El servicio mock también demuestra otros roles como `supermaster`, `master`, `encargado`, `colaborador`, `candidato`).
*   **Tokens JWT:** Utiliza JSON Web Tokens para asegurar las sesiones de usuario.
*   **Rutas Protegidas:** Asegura que solo los usuarios autenticados con los roles apropiados puedan acceder a partes específicas de la aplicación.
*   **Persistencia de Sesión:** Las sesiones de usuario se mantienen utilizando `localStorage` en el navegador.

### Ejemplo de Enrutamiento
Un ejemplo ilustrativo de la configuración de enrutamiento de la aplicación:
```javascript
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
  <Route path="/manager" element={<ProtectedRoute><ManagerDashboard /></ProtectedRoute>} />
  <Route path="/employee" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
</Routes>
```

## 🧩 Componentes Centrales

### ProtectedRoute
*   Un componente (a menudo un componente de orden superior o wrapper) que verifica el estado de autenticación de un usuario antes de renderizar una ruta específica.
*   Valida si el usuario autenticado posee el/los rol(es) necesarios para el acceso.
*   Redirige a los usuarios no autenticados o no autorizados a una página designada (p. ej., la página de login o una página de acceso denegado).

### AuthContext
*   Proporciona un contexto de React centralizado para gestionar el estado de autenticación (p. ej., objeto de usuario, estado de autenticación, token JWT).
*   Expone métodos como `login` y `logout` para controlar el ciclo de vida de la autenticación.
*   Maneja la persistencia del estado de autenticación, típicamente utilizando `localStorage`.

### Dashboard
*   Presenta una navegación responsiva adecuada para diversos tamaños de pantalla y dispositivos.
*   Incluye una barra lateral (sidebar) configurable para un acceso conveniente a diferentes módulos de la aplicación.
*   Contiene un menú de usuario para la gestión del perfil y acciones de cierre de sesión.
*   Soporta temas Oscuro y Claro para satisfacer las preferencias del usuario.

## ⚙️ Configuración y Uso del Proyecto

### Prerrequisitos
*   **Node.js:** Se recomienda la versión LTS (p. ej., 18.x o 20.x). Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
*   **npm:** (Node Package Manager) Generalmente viene incluido con Node.js. Es aconsejable la versión 6.x o superior. Considera usar un gestor de versiones de Node como `nvm` para administrar múltiples versiones de Node.js.

### Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd [NOMBRE_DE_LA_CARPETA_DEL_PROYECTO]
    ```
    *(Reemplaza `[URL_DEL_REPOSITORIO]` con la URL real del repositorio y `[NOMBRE_DE_LA_CARPETA_DEL_PROYECTO]` con el nombre de tu carpeta de proyecto local).*

2.  **Instalar dependencias:**
    *(Asegúrate de estar en el directorio raíz del proyecto donde se encuentra `package.json`)*
    ```bash
    npm install
    ```

### Scripts Disponibles

Los siguientes scripts están disponibles y se pueden ejecutar usando `npm run <nombre-del-script>`:

*   `dev`:
    *   Inicia la aplicación en modo de desarrollo utilizando Vite.
    *   Habilita Hot Module Replacement (HMR) para un flujo de trabajo de desarrollo rápido y eficiente.
    *   Típicamente, la aplicación estará accesible en `http://localhost:5173`.
*   `build`:
    *   Construye la aplicación para el despliegue en producción.
    *   La salida optimizada se genera en la carpeta `dist/`.
    *   Este comando también ejecuta `scripts/copyHtaccess.js`, un script personalizado para copiar un archivo `.htaccess` a la salida de la compilación, útil para ciertas configuraciones del servidor Apache.
*   `lint`:
    *   Ejecuta ESLint para analizar estáticamente el código base, identificando y reportando patrones, errores potenciales y adherencia a las guías de estilo.
*   `preview`:
    *   Sirve la compilación de producción (desde la carpeta `dist/`) localmente.
    *   Útil para verificar la integridad y funcionalidad de la compilación de producción antes del despliegue.
*   `test`, `test:ui`, `test:coverage`:
    *   Scripts para ejecutar pruebas utilizando Vitest. Consulta la sección "🧪 Pruebas (Testing)" a continuación para información detallada.

## 🧪 Pruebas (Testing)
Este proyecto emplea [Vitest](https://vitest.dev/) como su ejecutor de pruebas (test runner), complementado por [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) para renderizar componentes y facilitar la interacción dentro de un entorno de prueba simulado.

### Ejecución de Pruebas

Los siguientes scripts están disponibles para la ejecución de pruebas:

*   `npm test`: Ejecuta todas las pruebas en la consola.
*   `npm run test:ui`: Lanza Vitest en modo UI, ofreciendo una interfaz interactiva basada en navegador para ejecutar, ver y depurar pruebas.
*   `npm run test:coverage`: Ejecuta todas las pruebas y genera un informe de cobertura de código, que típicamente se encuentra en un directorio `coverage/` en la raíz del proyecto.

### Ubicación de Archivos de Prueba

Los archivos de prueba se encuentran convencionalmente en subdirectorios `__tests__` dentro de la carpeta del módulo o componente respectivo (p. ej., `src/components/ui/__tests__/HeaderText.test.jsx`). Los archivos de prueba utilizan las extensiones `.test.js` o `.test.jsx`.

### Configuración de Pruebas

La configuración global para las pruebas se define en `src/setupTests.js`. Este archivo se referencia en `vite.config.js` bajo la opción `setupFiles` para Vitest. Actualmente se utiliza para importar `@testing-library/jest-dom`, que extiende la librería de aserciones `expect` de Vitest con matchers adicionales específicos del DOM.

## 📦 Dependencias Clave
Para una lista completa de dependencias, consulta el archivo `package.json`. Algunas dependencias notables incluyen:
*   React & React DOM
*   React Router DOM
*   TailwindCSS
*   Headless UI
*   Heroicons
*   Vitest (para pruebas)
*   ESLint (para linting)
*   `@testing-library/react` & `@testing-library/jest-dom` (para utilidades de prueba y matchers)
*   `bcryptjs` (para el hashing de contraseñas en el servicio de autenticación mock)
*   `jsonwebtoken` (potencialmente para decodificar JWTs en el lado del cliente o para la generación de tokens mock)

## 🧪 Servicios Mock / Datos de Ejemplo (Seed Data)
Para desarrollo y pruebas, la aplicación utiliza un servicio de autenticación mock ubicado en `src/services/fakeAuthService.js`. Este servicio simula datos de usuario y lógica de autenticación, eliminando la dependencia de un backend real.

Ejemplo de la estructura de datos de usuario simulada:
```javascript
const users = [
  {
    id: 1,
    email: 'admin@test.com',
    password: bcrypt.hashSync('admin123', 10), // Las contraseñas están pre-hasheadas
    role: 'admin',
    name: 'Admin User'
  },
  // ... otros roles de usuario como supermaster, master, encargado, colaborador, candidato
];
```
**Nota**: Las contraseñas dentro del servicio mock se almacenan como hashes de bcrypt para emular una práctica de seguridad más realista.

## 🔒 Consideraciones de Seguridad
*   **Hashing de Contraseñas**: Las contraseñas de los usuarios (tanto en datos mock como para cualquier integración futura de backend) siempre deben almacenarse hasheadas (p. ej., usando `bcryptjs`). Nunca almacenes contraseñas en texto plano.
*   **Rutas Protegidas**: El control de acceso basado en roles es crítico para asegurar que los usuarios solo puedan acceder a las secciones y datos autorizados.
*   **Seguridad de JWT**: La autenticación se basa en JSON Web Tokens. Para entornos de producción, asegúrate de que los tokens se transmitan de forma segura vía HTTPS, se almacenen apropiadamente (p. ej., cookies HttpOnly o mecanismos seguros de almacenamiento en el navegador si aplica), y tengan tiempos de expiración razonables para limitar su ventana de ataque.
*   **Validación de Entradas**: Todas las entradas de usuario y datos de fuentes externas deben ser validados y sanitizados tanto en el lado del cliente como, crucialmente, en el lado del servidor (una vez que se integre un backend) para prevenir vulnerabilidades web comunes como Cross-Site Scripting (XSS) y ataques de inyección.
*   **Gestión de Dependencias**: Audita y actualiza regularmente las dependencias del proyecto para parchear vulnerabilidades conocidas. Herramientas como `npm audit` pueden asistir en este proceso.

## 🎨 Estilos e Interfaz de Usuario (UI)
*   La interfaz de usuario está construida con **TailwindCSS**, adhiriendo a una metodología utility-first que permite un desarrollo rápido de UI y una amplia personalización.
*   El proyecto apunta a un **diseño consistente y responsivo** a través de todos los componentes y diversos tamaños de pantalla.
*   Incluye soporte para un **tema oscuro**, que los usuarios típicamente pueden alternar según su preferencia.

## ✅ Mejores Prácticas y Tareas Pendientes (TODOs)
*   **Calidad del Código**:
    *   Procurar crear componentes y funciones modulares y reutilizables.
    *   Mantener una clara separación de responsabilidades (p. ej., renderizado de UI, gestión de estado, lógica de negocio, interacciones con servicios).
    *   Implementar mecanismos robustos de manejo de errores en toda la aplicación.
    *   Emplear convenciones de nomenclatura descriptivas y consistentes para variables, funciones y componentes.
    *   Proporcionar documentación inline (comentarios) para secciones de código complejas o no obvias.
    *   Gestionar los `console.log` eficazmente: úsalos para depuración durante el desarrollo pero asegúrate de que se eliminen o deshabiliten condicionalmente en las compilaciones de producción para evitar filtrar información sensible o impactar el rendimiento.
*   **Pruebas (Testing)**:
    *   Se implementan pruebas unitarias y de integración utilizando Vitest y React Testing Library. La configuración de pruebas incluye la configuración para matchers específicos del DOM vía `src/setupTests.js`, mejorando las capacidades de aserción.
*   **Consideraciones Futuras/TODOs**:
    *   Integrar con un servicio backend completo para almacenamiento de datos persistente y autenticación real.
    *   Mejorar la validación de formularios con retroalimentación más completa y amigable para el usuario.
    *   Realizar revisiones exhaustivas de accesibilidad (a11y) e implementar las mejoras necesarias para asegurar la inclusividad.
    *   Desarrollar un conjunto de pruebas de extremo a extremo (end-to-end) para validar flujos de usuario completos.
    *   Establecer pipelines de CI/CD (Integración Continua/Despliegue Continuo) para procesos automatizados de prueba y despliegue.
```
