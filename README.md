# Think & Job v1.1

"Think & Job" is a web application designed to streamline job searching and candidate management processes. It provides features for user authentication, role-based access, and dashboard functionalities tailored for different user types, including administrators, managers, and employees. This README outlines the project's technical details, setup instructions, and development practices.

## 🚀 Tech Stack

### Frontend
*   **React 18.x:** A JavaScript library for building user interfaces.
*   **Vite 5.x:** A modern frontend build tool and development server.
*   **TailwindCSS 3.x:** A utility-first CSS framework for rapid and responsive UI development.
*   **React Router 6.x:** For declarative routing in a React application.
*   **Headless UI:** A library of unstyled, fully accessible UI components for maximum customization.
*   **Heroicons:** A collection of high-quality SVG icons.

## 📁 Project Structure
A brief overview of the main directories within the project:
```text
client/
├── public/               # Static assets (e.g., favicon, images)
├── src/
│   ├── assets/          # Component-specific assets (images, SVGs)
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context API providers (e.g., AuthContext)
│   ├── lib/             # Third-party libraries or adapters
│   ├── pages/           # Page components (main views for routes)
│   ├── services/        # Logic for API communication or external services (e.g., fakeAuthService)
│   └── utils/           # General utility functions
├── .gitignore            # Specifies intentionally untracked files that Git should ignore
├── package.json          # Project metadata, including dependencies and scripts
└── vite.config.js        # Vite configuration file (also includes Vitest test runner settings)
```

## ✨ Key Features

### Authentication System
*   **Role-Based Access Control (RBAC):** Defines distinct permissions for user roles such as `admin`, `manager`, and `employee`. (The mock service also demonstrates other roles like `supermaster`, `master`, `encargado`, `colaborador`, `candidato`).
*   **JWT Tokens:** Utilizes JSON Web Tokens for securing user sessions.
*   **Protected Routes:** Ensures that only authenticated users with appropriate roles can access specific parts of the application.
*   **Session Persistence:** User sessions are maintained using `localStorage` in the browser.

### Routing Example
An illustrative example of the application's routing configuration:
```javascript
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
  <Route path="/manager" element={<ProtectedRoute><ManagerDashboard /></ProtectedRoute>} />
  <Route path="/employee" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
</Routes>
```

## 🧩 Core Components

### ProtectedRoute
*   A component (often a higher-order component or wrapper) that verifies a user's authentication status before rendering a specific route.
*   Validates if the authenticated user possesses the necessary role(s) for access.
*   Redirects unauthenticated or unauthorized users to a designated page (e.g., the login page or an access denied page).

### AuthContext
*   Provides a centralized React context for managing authentication state (e.g., user object, authentication status, JWT token).
*   Exposes methods like `login` and `logout` to control the authentication lifecycle.
*   Handles the persistence of authentication state, typically using `localStorage`.

### Dashboard
*   Features responsive navigation suitable for various screen sizes and devices.
*   Includes a configurable sidebar for convenient access to different application modules.
*   Contains a user menu for profile management and logout actions.
*   Supports both Dark and Light themes to cater to user preferences.

## ⚙️ Project Setup and Usage

### Prerequisites
*   **Node.js:** LTS version (e.g., 18.x or 20.x) is recommended. Download from [nodejs.org](https://nodejs.org/).
*   **npm:** (Node Package Manager) Usually bundled with Node.js. Version 6.x or higher is advisable. Consider using a Node version manager like `nvm` to manage multiple Node.js versions.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd [NOMBRE_DE_LA_CARPETA_DEL_PROYECTO]
    ```
    *(Replace `[URL_DEL_REPOSITORIO]` with the actual repository URL and `[NOMBRE_DE_LA_CARPETA_DEL_PROYECTO]` with your local project folder name).*

2.  **Install dependencies:**
    *(Ensure you are in the project's root directory where `package.json` is located)*
    ```bash
    npm install
    ```

### Available Scripts

The following scripts are available and can be run using `npm run <script-name>`:

*   `dev`:
    *   Starts the application in development mode using Vite.
    *   Enables hot module replacement (HMR) for a fast and efficient development workflow.
    *   Typically, the application will be accessible at `http://localhost:5173`.
*   `build`:
    *   Builds the application for production deployment.
    *   Optimized output is generated in the `dist/` folder.
    *   This command also executes `scripts/copyHtaccess.js`, a custom script to copy a `.htaccess` file to the build output, potentially for Apache server configurations.
*   `lint`:
    *   Runs ESLint to statically analyze the codebase for identifying and reporting on patterns, potential errors, and style guide adherence.
*   `preview`:
    *   Serves the production build (from the `dist/` folder) locally.
    *   Useful for verifying the integrity and functionality of the production build before deployment.
*   `test`, `test:ui`, `test:coverage`:
    *   Scripts for executing tests using Vitest. Refer to the "🧪 Testing" section below for detailed information.

## 🧪 Testing
This project employs [Vitest](https://vitest.dev/) as its test runner, complemented by [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for rendering components and facilitating interaction within a simulated test environment.

### Running Tests

The following scripts are provided for test execution:

*   `npm test`: Executes all tests within the console.
*   `npm run test:ui`: Launches Vitest in UI mode, offering an interactive browser-based interface to run, view, and debug tests.
*   `npm run test:coverage`: Runs all tests and generates a code coverage report, typically found in a `coverage/` directory at the project root.

### Test File Location

Test files are conventionally located in `__tests__` subdirectories within the respective module or component's folder (e.g., `src/components/ui/__tests__/HeaderText.test.jsx`). Test files adhere to `.test.js` or `.test.jsx` naming conventions.

### Test Setup

Global test setup configurations are defined in `src/setupTests.js`. This file is referenced in `vite.config.js` under the `setupFiles` option for Vitest. It is currently used to import `@testing-library/jest-dom`, which extends Vitest's `expect` assertion library with additional DOM-specific matchers.

## 📦 Key Dependencies
For a comprehensive list of dependencies, refer to the `package.json` file. Noteworthy dependencies include:
*   React & React DOM
*   React Router DOM
*   TailwindCSS
*   Headless UI
*   Heroicons
*   Vitest (for testing)
*   ESLint (for linting)
*   `@testing-library/react` & `@testing-library/jest-dom` (for testing utilities and matchers)
*   `bcryptjs` (for password hashing in the mock authentication service)
*   `jsonwebtoken` (potentially for decoding JWTs on the client-side or for mock token generation)

## 🧪 Mock Services / Seed Data
For development and testing, the application utilizes a mock authentication service located at `src/services/fakeAuthService.js`. This service simulates user data and authentication logic, removing the dependency on a live backend.

Example of the simulated user data structure:
```javascript
const users = [
  {
    id: 1,
    email: 'admin@test.com',
    password: bcrypt.hashSync('admin123', 10), // Passwords are pre-hashed
    role: 'admin',
    name: 'Admin User'
  },
  // ... other user roles such as supermaster, master, encargado, colaborador, candidato
];
```
**Note**: Passwords within the mock service are stored as bcrypt hashes to emulate a more realistic security practice.

## 🔒 Security Considerations
*   **Password Hashing**: User passwords (both in mock data and for any future backend integration) should always be stored hashed (e.g., using `bcryptjs`). Never store plain-text passwords.
*   **Protected Routes**: Role-based access control is critical for ensuring users can only access authorized sections and data.
*   **JWT Security**: Authentication relies on JSON Web Tokens. For production environments, ensure tokens are transmitted securely via HTTPS, stored appropriately (e.g., HttpOnly cookies or secure browser storage mechanisms if applicable), and have reasonable expiration times to limit their attack window.
*   **Input Validation**: All user inputs and data from external sources must be validated and sanitized on both the client-side and, crucially, on the server-side (once a backend is integrated) to prevent common web vulnerabilities such as Cross-Site Scripting (XSS) and injection attacks.
*   **Dependency Management**: Regularly audit and update project dependencies to patch known vulnerabilities. Tools like `npm audit` can assist in this process.

## 🎨 Styling and UI
*   The user interface is constructed with **TailwindCSS**, adhering to a utility-first methodology that allows for rapid UI development and extensive customization.
*   The project aims for a **consistent and responsive design** across all components and various screen sizes.
*   Includes support for a **dark mode theme**, which users can typically toggle based on their preference.

## ✅ Best Practices & TODOs
*   **Code Quality**:
    *   Strive for modular, reusable components and functions.
    *   Maintain a clear separation of concerns (e.g., UI rendering, state management, business logic, service interactions).
    *   Implement robust error handling mechanisms throughout the application.
    *   Employ descriptive and consistent naming conventions for variables, functions, and components.
    *   Provide inline documentation (comments) for complex or non-obvious code sections.
    *   Manage console logs effectively: use them for debugging during development but ensure they are removed or conditionally disabled in production builds to avoid leaking sensitive information or impacting performance.
*   **Testing**:
    *   Unit and integration tests are implemented using Vitest and React Testing Library. The testing setup includes configuration for DOM-specific matchers via `src/setupTests.js`, enhancing assertion capabilities.
*   **Future Considerations/TODOs**:
    *   Integrate with a full backend service for persistent data storage and real authentication.
    *   Enhance form validation with more comprehensive and user-friendly feedback.
    *   Conduct thorough accessibility (a11y) reviews and implement necessary improvements to ensure inclusivity.
    *   Develop a suite of end-to-end tests to validate complete user flows.
    *   Establish CI/CD (Continuous Integration/Continuous Deployment) pipelines for automated testing and deployment processes.
```
