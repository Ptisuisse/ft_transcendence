# ft_transcendence Project Setup Guide

## 1. Prerequisites

### Node.js Installation (using nvm)
- Install nvm (Node Version Manager):
  ```sh
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  ```
- Source your shell configuration file (e.g., `.bashrc`, `.zshrc`) or open a new terminal.

- Install Node.js version 20:
  ```sh
  nvm install 20
  ```
- Use Node.js version 20:
  ```sh
  nvm use 20
  ```
- Set Node.js version 20 as default (optional):
  ```sh
  nvm alias default 20
  ```
- Verify installation:
  ```sh
  node -v
  ```
  (Should output v20.x.x)

### Docker and Docker Compose

- Ensure Docker and Docker Compose are installed on your system.

## 2. Project Installation

1.  **Set up Frontend Project (Vite + Vanilla TypeScript):**

    - Navigate to the directory where you want to create the frontend project (e.g., project root):
      ```sh
      # cd /path/to/your/ft_transcendence
      ```
    - Create the Vite project named `frontend` using the `vanilla-ts` template:
      ```sh
      npm create vite@latest frontend -- --template vanilla-ts
      ```
    - This will create a `frontend` directory with the basic Vite and TypeScript setup.
    - Install npm packages:
      ```sh
      npm install
      ```
    - This will read the `package.json` (e.g., `frontend/conf/package.json`) and install dependencies.

2.  **Install Backend Dependencies:**

    - Install npm packages:
      ```sh
      npm install
      ```
    - This will read the [backend/package.json](backend/package.json) and install dependencies into `backend/node_modules/`.

## 3. Running the Application with Docker

- From the project root directory (where [docker-compose.yml](docker-compose.yml) and [Makefile](Makefile) are located):
  - To start all services in detached mode:
    ```sh
    make up
    ```
    or
    ```sh
    docker-compose up -d
    ```
  - To stop all services:
    ```sh
    make down
    ```
  - To rebuild and restart:
    ```sh
    make re
    ```

## 4. Development Mode (Local without Docker for Frontend/Backend)

### Frontend Development
- Navigate to the frontend configuration directory:
  ```sh
  cd frontend/conf
  ```
- Run the Vite development server:
  ```sh
  npm run dev
  ```
- The frontend will typically be available at `http://localhost:5173` (or the port Vite chooses). Note that API calls might need proxy configuration if the backend is running separately. Your [frontend/conf/vite.config.js](frontend/conf/vite.config.js) already has a proxy for `/api` to `http://localhost:3000`.

### Backend Development
- Navigate to the backend directory:
  ```sh
  cd backend
  ```
- Run the Fastify development server:
  ```sh
  npm run dev
  ```
- The backend will typically be available at `http://localhost:3000`.

## 5. Database (SQLite)

- The database is managed by the `database` service in [docker-compose.yml](docker-compose.yml) and initialized by [DataBase/app.js](DataBase/app.js).
- **To access the SQLite database directly via Docker:**
  ```sh
  docker exec -it sqlite-db sh
  ```
  Then, inside the container's shell:
  ```sh
  sqlite3 /data/database.db
  ```
  You can then run SQL commands (e.g., `.tables`, `SELECT * FROM users;`, `.quit`).

## 6. Technologies & Resources

- **Fastify:** A fast and low overhead web framework, for Node.js.
  - [Fastify Documentation](https://fastify.dev/docs/latest/)
- **Tailwind CSS:** Used for styling the frontend.
  - Configuration: [frontend/conf/tailwind.config.js](frontend/conf/tailwind.config.js)
  - Main CSS file: [frontend/conf/src/style.css](frontend/conf/src/style.css)

## 7. Color Palette


[TBD]
- Palette inspiration: [https://coolors.co/e71d36-242424-333333-ff9f1c-dcc48e](https://coolors.co/e71d36-242424-333333-ff9f1c-dcc48e)