# Panel de productos protegido

Este es un pequeño proyecto que permite al usuario autenticarse para acceder a un panel de productos donde puede crear, modicar, eliminar y ver un catálogo de productos por medio de llamados a APIs.

![project overview](/public/readme-images/project-overview.png)

# Contenidos
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
  - [Patrones de diseño](#patrones-de-diseño)
  - [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
    - [Prerequisitos](#prerequisitos)
    - [Pasos](#pasos)
    - [Acceso a la aplicación](#acceso-a-la-aplicación)
- [Testing](#testing)

# Tecnologías

* Principal: Next.js 15.4 y TypeScript 5
* Cliente de API: Axios 1.10
* Encriptación y validaciones: Jose 6 y Zod 4
* Estilos: Tailwind CSS 4 y Material UI
* Testing: Jest 30

# Arquitectura

El proyecto es un cliente-servidor creado con Nest.js 15 App Router, utilzando una combinación de componentes de cliente y servidor para manejar lo que son componentes interactivos y estáticos, respectivamente. El proyecto utiliza también los siguientes patrones de diseño:

## Patrones de diseño
1.  **Patrón factory**:
    - El servicio de `FakeApiService` se encarga del manejo de las entidades de productos.
2.  **Patrón observador**:
    - Los componentes de cliente de react lo utilizan para el manejo y actualización del estado.
3.  **Patrón de manejo de estado de formulario**:
    - Se utilizan esquemas de validación y manejo de errores para el manejo de los llamados a las APIs
4.  **Patrón facade**:
    - `FakeApiService` funciona como una fachada para todas las interacciones con las APIs

## Estructura del proyecto

1. **(app)**: Contiene todas las rutas protegidas, aquellas que solo se pueden acceder al iniciar sesión. Contiene las rutas hacia las páginas de vista, creación y edición de productos.
2. **actions**: Contiene la lógica de login y logout.
3. **login**: Contiene la única ruta pública del proyecto, donde el usuario hace login para poder ingresar.
4. **components**: Contiene algunos componentes globales de la aplicación.
5. **helpers**: Contiene clases y funciones que dan apoyo a otras en la aplicación.
6. **lib**: Se encarga de gran parte de la lógica de manejo de criptografía, manejo de la sesión así como de su verificación en diferentes partes del código.
7. **services**: Contiene lógica que se conecta a servicios externos.
8. **middleware**: Se encarga de la protección de rutas basado en la sesión

```text
src/
├── app/
│   ├── (app)/
│   │   ├── layout.tsx
│   │   └── products/
│   │       ├── page.tsx
│   │       ├── [id]/
│   │       ├── components/
│   │       └── create/
│   ├── actions/
│   └── login/
│       ├── layout.tsx
│       └── page.tsx
├── components/
│   ├── Header.tsx
│   └── LogoutButton.tsx
├── helpers/
│   ├── Cookies.ts
│   └── tokenGenerator.ts
├── lib/
│   ├── Cryptography.ts
│   ├── dal.ts
│   └── Session.ts
├── services/
│    └── FakeApiService.ts
└── middelware.ts
```

# Instalación
### Prerequisitos
- Node.js
- NPM
### Pasos
1.  **Clonar el repositorio**:
    ```
    git clone https://github.com/salvarez96/frontend-tech-test.git
    cd frontend-tech-test
    ```

2.  **Instalar dependencias**:
    ```
    npm install
    ```
3.  **Copiar el archivo de variables de entorno**:
	```
	cp .env.example .env
    ```
4.  **Configurar variables de entorno**:
    -   Abrir el archivo  `.env` y configurar las variables vacías.
    -   Ejemplo:
        ```
        NEXT_PUBLIC_ENVIRONMENT=local

        SESSION_SECRET='una-clave-secreta'
        ACCESS_TOKEN_LIFETIME=90 # minutes

        VALID_USERNAME=usuario@prueba.com
        VALID_PASSWORD=abc123

        NEXT_PUBLIC_FAKE_STORE_API=https://fakestoreapi.com
        ```
    - Si tiene instalado _openssl_, se puede correr el comando `openssl rand -base64 32 se` para obtener una llave segura y copiarla en `SESSION_SECRET`
9. **Correr la aplicación**:
    ```
    npm run dev
    ```
    - Si se tiene node v22 (más eficiente):
    ```
    node --run dev
    ```
### Acceso a la aplicación

-   Abrir el navegador y dirigirse a `http://localhost:3000`.

# Testing
La aplicación posee una prueba unitaria utilizando Jest. Esta se puede correr con el comando:
```
npm run test
```
- Con node v22:
```
node --run test
```