
# 🚀 ft_transcendence Project Setup Guide

Welcome to the ft_transcendence project! This guide will walk you through setting up the project, including installing all necessary dependencies and configuring the environment for both frontend and backend development.

---

## 📋 Prerequisites

### ✅ Node.js Installation (using nvm)

- **Install nvm (Node Version Manager)**
    ```sh
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
    ```
- **Source your shell configuration file** (e.g., `.bashrc`, `.zshrc`) or open a new terminal.
- **Install Node.js version 20**
    ```sh
    nvm install 20
    ```
- **Use Node.js version 20**
    ```sh
    nvm use 20
    ```
- **Set Node.js version 20 as default (optional)**
    ```sh
    nvm alias default 20
    ```
- **Verify installation**
    ```sh
    node -v
    ```
    (Should output v20.x.x)

### 🐳 Docker and Docker Compose

- Ensure Docker and Docker Compose are installed on your system.

---

## 🛠️ Project Installation

### 1. Set Up Frontend Project (Vite + TypeScript)

- **Create the Frontend Project:**
    ```sh
    # Navigate to your project root
    cd /path/to/your/ft_transcendence
    npm create vite@latest frontend -- --template vanilla-ts
    ```
- **Install Frontend Dependencies:**
    ```sh
    cd frontend
    npm install
    ```

- **Install Tailwind CSS:**
    ```sh
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```
- **Configure Tailwind:** Add the following content to your `tailwind.config.js`:
    ```js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```
- **Add Tailwind to your CSS:** Replace the content of `src/style.css` with:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

### 2. Set Up Backend Project

- **Install Backend Dependencies:**
    ```sh
    cd ../backend
    npm install
    ```

---

## 🚀 Running the Application with Docker

- From the project root directory:
    - **Start all services:**
        ```sh
        make up
        ```
    - **Stop all services:**
        ```sh
        make down
        ```
    - **Rebuild and restart:**
        ```sh
        make re
        ```

---

## 👨‍💻 Development Mode (Local without Docker)

### Frontend Development

- **Run the Vite Development Server:**
    ```sh
    cd frontend
    npm run dev
    ```
- The frontend will be available at `http://localhost:5173`.

### Backend Development

- **Run the Fastify Development Server:**
    ```sh
    cd backend
    npm run dev
    ```
- The backend will be available at `http://localhost:3000`.

---

## 🗄️ Database (SQLite)

- Managed by the `database` service in `docker-compose.yml`.
- To access the database:
    ```sh
    docker exec -it sqlite-db sh
    ```
    ```sh
    sqlite3 /data/database.db
    ```

---

## 🎨 Color Palette

- Palette inspiration: [https://coolors.co/e71d36-242424-333333-ff9f1c-dcc48e](https://coolors.co/e71d36-242424-333333-ff9f1c-dcc48e)

---

## 📚 Technologies & Resources

- **Fastify:** Fast, low overhead web framework for Node.js.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.

Happy coding! 🚀
