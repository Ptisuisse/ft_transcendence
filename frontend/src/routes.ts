import './style.css'
import { createNavbar } from './components/navbar.ts'
import { HomePage } from './pages/main.ts';
import { PongPage } from './pages/pong.ts';
import { LoginPage } from './pages/login.ts';

// Définition du type pour les fonctions de rendu de page
type PageRenderFunction = () => string | HTMLElement;

// Définition des routes
const routes: { [key: string]: PageRenderFunction | string } = {
    "/": HomePage,
    "/pong": PongPage,
    "/login": LoginPage,
  };

  const navigateTo = (url: string) => {
    history.pushState(null, "", url);
    renderPage();
  };
  
  const renderPage = () => {
    const path = window.location.pathname;
    const pageRendererOrContent = routes[path];
    let contentToRender: string | HTMLElement;

    if (typeof pageRendererOrContent === 'function') {
      contentToRender = pageRendererOrContent(); // fonction pour obtenir le contenu du return de routes
    } else if (typeof pageRendererOrContent === 'string') {
      contentToRender = pageRendererOrContent; // Utilisez directement une string si routes "/x" : "string"
    }
     else {
      contentToRender = "<h1>404</h1><p>Page non trouvée.</p>";
    }
    
    const appElement = document.getElementById("app")!;
    if (typeof contentToRender === 'string') {
        appElement.innerHTML = contentToRender;
    } else {
        appElement.innerHTML = ''; // Clear previous content
        appElement.appendChild(contentToRender);
    }
    
    // Mise à jour des liens actifs
    document.querySelectorAll("a").forEach(link => {
      if (link.getAttribute("href") === path) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };
  
  // Gestion des clics sur les liens
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const linkElement = target.closest("[data-link]") as HTMLAnchorElement | null;
    if (linkElement) {
      event.preventDefault();
      navigateTo(linkElement.getAttribute("href")!);
    }
  });
  
  // Gestion des retours en arrière
  window.addEventListener("popstate", renderPage);
  
  // Premier rendu
  renderPage();

  const navRoutesForNavbar: { [key: string]: string } = {};
  for (const key in routes) {
    if (key === "/") navRoutesForNavbar[key] = "Home";
    else if (key === "/pong") navRoutesForNavbar[key] = "Pong";
    // else if (key === "/login") navRoutesForNavbar[key] = "Login";
  }

  const navbar = createNavbar(navRoutesForNavbar); 
  document.body.prepend(navbar);