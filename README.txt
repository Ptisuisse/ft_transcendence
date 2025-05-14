Installation Nodejs : 
- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
- nvm install 20 #Installation
- nvm use 20 #Utilisation
- nvm alias default 20 #utilisation par default

Check :
- node -v (Version)

NE PAS FAIRE : 

npm create vite@latest .
commande standard pour démarrer un nouveau projet Vite.

npm install :  lire le package.json et installer 
toutes les dépendances dans un dossier node_modules à l'intérieur 
de ton dossier frontend

Installation de Tailwind CSS :
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init (Ne pas faire, init le fichier tailwind.config.js)

Run en local :
npm run dev

DATABASE :
    access 
        docker exec -it sqlite-db sh
        sqlite3 /data/database.db

FASTIFY : 
https://www.npmjs.com/package/fastify

COLOR :
Neon blue = #646CFF
Eerie black = #242424
Periwinkle = #D4DCFF
Xanthous = #FFC145
Silver = #C3BABA
Jet = #333333

Aquamarine = #8CFBDE
Coral = #FF7F51
Spring green = #0FFF95
https://coolors.co/e71d36-242424-333333-ff9f1c-dcc48e