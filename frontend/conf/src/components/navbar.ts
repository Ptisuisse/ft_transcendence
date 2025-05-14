export function createNavbar(routes: { [key: string]: string }): HTMLElement {
  const nav = document.createElement('nav');
  // nav.className = 'bg-gray-800 p-4 text-white flex justify-between items-center fixed top-0 left-0 right-0 w-full z-50'; 
   nav.className = 'bg-gray-800 p-4 text-white flex justify-center items-center fixed top-0 left-0 right-0 w-full z-50'; 
   const logo = document.createElement('a');
   logo.href = '/'; // Or use a specific route for the logo if preferred
   logo.setAttribute('data-link', ''); // Ensure logo also uses SPA navigation
   logo.textContent = 'ft_transcendence';
   logo.className = 'text-xl font-bold absolute left-4 top-1/2 transform -translate-y-1/2';
   nav.appendChild(logo);
 
   const navLinks = document.createElement('div');
   navLinks.className = 'space-x-10';

    // const links = [
    //   { href: '/', text: 'Home' },
    //   { href: '/pong', text: 'Pong' },
    //   { href: '/login', text: 'Login' },
    // ];
  
    // links.forEach(linkInfo => {
    //   const link = document.createElement('a');
    //   link.href = linkInfo.href;
    //   link.textContent = linkInfo.text;
    //   link.className = 'hover:text-gray-300';
    //   navLinks.appendChild(link);
    // });
  
    for (const path in routes) {
      const link = document.createElement('a');
      link.href = path;
      link.textContent = routes[path];
      link.setAttribute('data-link', ''); // Add data-link for SPA navigation
      link.className = 'hover:text-gray-300';
      navLinks.appendChild(link);
    }
  
    nav.appendChild(navLinks);
  
    return nav;
  }
//   Ce code TypeScript définit une fonction `createNavbar` qui génère dynamiquement un élément de barre de navigation (navbar) HTML et le retourne. Voici une explication détaillée :

//   1.  **`export function createNavbar(): HTMLElement`**
//       *   `export`: Ce mot-clé rend la fonction `createNavbar` accessible depuis d'autres modules de votre projet.
//       *   `function createNavbar()`: Déclare une fonction nommée `createNavbar`.
//       *   `: HTMLElement`: Indique que cette fonction retournera un objet de type `HTMLElement`, qui est le type de base pour tous les éléments HTML dans le DOM (Document Object Model).
  
//   2.  **`const nav = document.createElement('nav');`**
//       *   `document.createElement('nav')`: Crée un nouvel élément HTML `<nav>`. L'élément `<nav>` est sémantiquement utilisé pour contenir des liens de navigation principaux.
//       *   `const nav`: Stocke cet élément nouvellement créé dans une constante nommée `nav`.
  
//   3.  **`nav.className = 'bg-gray-800 p-4 text-white flex justify-between items-center fixed top-0 left-0 right-0 w-full z-50';`**
//       *   `nav.className`: Assigne une chaîne de classes CSS à l'élément `nav`. Ces classes proviennent vraisemblablement de Tailwind CSS, un framework CSS utilitaire.
//           *   `bg-gray-800`: Définit la couleur de fond de la navbar en gris foncé.
//           *   `p-4`: Ajoute un padding (remplissage interne) de `1rem` (ou 16px si la taille de police de base est de 16px) sur tous les côtés de la navbar.
//           *   `text-white`: Définit la couleur du texte par défaut en blanc.
//           *   `flex`: Applique un layout Flexbox à la navbar. Cela permet d'aligner et de distribuer facilement les éléments enfants.
//           *   `justify-between`: Dans un conteneur flex, cela place le premier enfant au début, le dernier enfant à la fin, et distribue l'espace restant équitablement entre les enfants. Ici, cela placera le logo à gauche et les liens de navigation à droite.
//           *   `items-center`: Aligne les enfants de la flexbox verticalement au centre.
//           *   `fixed`: Positionne la navbar de manière fixe par rapport à la fenêtre d'affichage (viewport). Elle restera visible même si l'utilisateur fait défiler la page.
//           *   `top-0 left-0 right-0`: Colle la navbar en haut, à gauche et à droite de la fenêtre d'affichage.
//           *   `w-full`: Fait en sorte que la navbar prenne toute la largeur disponible.
//           *   `z-50`: Définit l'ordre de superposition (z-index) de la navbar à 50. Une valeur plus élevée signifie qu'elle apparaîtra au-dessus des éléments avec un z-index inférieur.
  
//   4.  **`const logo = document.createElement('a');`**
//       *   Crée un nouvel élément HTML `<a>` (lien hypertexte) qui servira de logo.
//       *   `const logo`: Stocke cet élément dans la constante `logo`.
  
//   5.  **`logo.href = '/';`**
//       *   Définit l'attribut `href` du lien du logo. `'/'` signifie que cliquer sur le logo redirigera l'utilisateur vers la page d'accueil du site.
  
//   6.  **`logo.textContent = 'ft_transcendence';`**
//       *   Définit le texte visible du logo comme étant "ft\_transcendence".
  
//   7.  **`logo.className = 'text-xl font-bold';`**
//       *   Assigne des classes Tailwind CSS au logo :
//           *   `text-xl`: Augmente la taille du texte du logo.
//           *   `font-bold`: Met le texte du logo en gras.
  
//   8.  **`nav.appendChild(logo);`**
//       *   Ajoute l'élément `logo` comme enfant de l'élément `nav`. Le logo sera donc affiché à l'intérieur de la barre de navigation.
  
//   9.  **`const navLinks = document.createElement('div');`**
//       *   Crée un nouvel élément HTML `<div>`. Ce `div` servira de conteneur pour les liens de navigation (Home, Pong, Login).
//       *   `const navLinks`: Stocke cet élément dans la constante `navLinks`.
  
//   10. **`navLinks.className = 'space-x-10';`**
//       *   Assigne une classe Tailwind CSS au conteneur des liens :
//           *   `space-x-10`: Ajoute un espacement horizontal de `2.5rem` entre les éléments enfants directs de ce `div` (c'est-à-dire entre chaque lien de navigation).
  
//   11. **`const links = [ ... ];`**
//       *   Définit un tableau (array) nommé `links`. Chaque élément de ce tableau est un objet qui représente un lien de navigation.
//       *   Chaque objet a deux propriétés :
//           *   `href`: L'URL de destination du lien.
//           *   `text`: Le texte qui sera affiché pour le lien.
  
//   12. **`links.forEach(linkInfo => { ... });`**
//       *   Itère sur chaque objet (`linkInfo`) dans le tableau `links`. Pour chaque `linkInfo`, le code à l'intérieur des accolades `{}` est exécuté.
  
//   13. **`const link = document.createElement('a');`**
//       *   À l'intérieur de la boucle, crée un nouvel élément `<a>` pour chaque lien de navigation.
  
//   14. **`link.href = linkInfo.href;`**
//       *   Définit l'attribut `href` du lien actuel en utilisant la valeur `href` de l'objet `linkInfo` courant.
  
//   15. **`link.textContent = linkInfo.text;`**
//       *   Définit le texte visible du lien actuel en utilisant la valeur `text` de l'objet `linkInfo` courant.
  
//   16. **`link.className = 'hover:text-gray-300';`**
//       *   Assigne une classe Tailwind CSS au lien :
//           *   `hover:text-gray-300`: Change la couleur du texte en gris clair (`gray-300`) lorsque l'utilisateur passe la souris sur le lien (effet de survol).
  
//   17. **`navLinks.appendChild(link);`**
//       *   Ajoute le lien (`link`) nouvellement créé comme enfant du conteneur `navLinks`.
  
//   18. **`nav.appendChild(navLinks);`**
//       *   Après que tous les liens individuels ont été créés et ajoutés à `navLinks`, ce `div` `navLinks` (contenant tous les liens) est ajouté comme enfant de l'élément `nav` principal.
  
//   19. **`return nav;`**
//       *   La fonction retourne l'élément `nav` complet, avec son logo et ses liens de navigation, prêt à être inséré dans le DOM de la page web.
  
//   En résumé, cette fonction construit une barre de navigation responsive et stylisée avec Tailwind CSS. Elle comprend un logo à gauche et une série de liens de navigation à droite, le tout fixé en haut de la page.