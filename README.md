<div align="center">
  <img src="/frontend/public/assets/default-profile.png" alt="Logo de CuchipuGo" width="150">

  <h1>CuchipuGo - Tu Guía de Transporte Público</h1>
  <p><i>Un proyecto de Cuchipu Entertainment</i></p>

  <img src="/frontend/public/assets/CuchipuEntreteinment(DS)V1.jpg" alt="Logo Cuchipu Entertainment" width="100">

  <p>
    Una plataforma web para visualizar rutas de transporte público en un mapa interactivo y consultar saldos de tarjetas preferenciales.
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
  </p>
</div>
Este proyecto es una aplicación web diseñada para ayudar a los usuarios a consultar las rutas del transporte público de la ciudad, ver su trazado en un mapa interactivo y gestionar la información de su tarjeta de saldo preferencial.

## ✨ Características Principales

* **Visualización de Rutas:** Mapa interactivo que muestra el trazado de todas las rutas de transporte.
* **Búsqueda y Filtro:** Permite buscar rutas específicas por nombre o número.
* **Gestión de Usuarios:** Sistema de registro e inicio de sesión para usuarios.
* **Consulta de Saldo:** Los usuarios registrados pueden vincular su tarjeta preferencial y consultar su saldo.
* **Geolocalización:** Ubica al usuario en el mapa para encontrar las paradas más cercanas.

***

## 🛠️ Tecnologías Utilizadas

Este proyecto está construido como un **monorepo** utilizando una pila tecnológica moderna basada en JavaScript.

### **Frontend**
* **React:** Biblioteca para construir la interfaz de usuario.
* **Vite:** Herramienta de desarrollo para un entorno de trabajo rápido y optimizado.
* **Leaflet & React-Leaflet:** Para la creación de mapas interactivos.
* **Axios/Fetch:** Para la comunicación con la API del backend.

### **Backend**
* **Node.js:** Entorno de ejecución para JavaScript en el servidor.
* **Express.js:** Framework para construir la API RESTful de forma rápida y minimalista.
* **CORS:** Middleware para permitir las solicitudes desde el frontend.
* **Dotenv:** Para la gestión de variables de entorno de forma segura.

### **Base de Datos**
* **PostgreSQL:** Sistema de gestión de bases de datos relacional y de objetos.
* **PostGIS:** Extensión para PostgreSQL que añade soporte para objetos geográficos y consultas espaciales.
* **pg (node-postgres):** Driver para conectar la aplicación de Node.js con la base de datos PostgreSQL.



***

## 🚀 Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### **Prerrequisitos**

* **Node.js** (versión 18.x o superior)
* **npm** (se instala con Node.js)
* **PostgreSQL** (con la extensión **PostGIS** activada)
* **Git**

### **Instalación**

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd transporte-app
    ```

2.  **Instala las dependencias del Backend:**
    ```bash
    cd backend
    npm install
    cd ..
    ```

3.  **Instala las dependencias del Frontend:**
    ```bash
    cd frontend
    npm install
    cd ..
    ```

4.  **Configura las variables de entorno del Backend:**
    * En la carpeta `backend`, crea un archivo llamado `.env`.
    * Añade las credenciales de tu base de datos:
        ```env
        DB_USER=transport_user
        DB_HOST=localhost
        DB_DATABASE=transport_db
        DB_PASSWORD=tu_contraseña_segura
        DB_PORT=5432
        ```

### **Ejecución del Proyecto**

Para trabajar en el proyecto, necesitas **dos terminales abiertas** en la raíz del proyecto (`transporte-app`).

* **En la Terminal 1 (para iniciar el Backend):**
    ```bash
    cd backend
    npm run dev
    ```
    El servidor se estará ejecutando en `http://localhost:3000` (o el puerto que configures).

* **En la Terminal 2 (para iniciar el Frontend):**
    ```bash
    cd frontend
    npm run dev
    ```
    La aplicación de React se abrirá en tu navegador, generalmente en `http://localhost:5173`.

---