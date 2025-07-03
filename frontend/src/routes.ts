import './style.css'
import { createNavbar, getCurrentLang } from './components/navbar.ts'
import { HomePage } from './pages/main.ts';
import { PongMenuPage, PongGamePage } from './pages/pong.ts';
import { PongTournamentPage } from './pages/tournament.ts';
import { PongMultiplayerPage, PongMultiplayerGamePage } from './pages/pong_multiplayer.ts';
import { LoginPage } from './pages/login.ts';
import { TeamPage } from './pages/team.ts';
import { translations } from './i18n.ts';
import { gameState } from './gameState.ts';

type PageRenderFunction = () => string | HTMLElement;

const routes: { [key: string]: PageRenderFunction | string } = {
    "/": HomePage,
    "/pong": PongMenuPage,
    "/pong/game": PongGamePage,
    "/pong/tournament": PongTournamentPage,
    "/pong/multiplayer": PongMultiplayerPage,
    "/login": LoginPage,
    "/team" : TeamPage,
    "/pong_multiplayer": PongMultiplayerPage,      // Add this line
    "/pong_multiplayer/game": PongMultiplayerGamePage,  // Add this line
};

export const navigateTo = (url: string) => {
  // Always execute cleanup before navigation
  gameState.executeCleanup();
  
  // Si on quitte le contexte d'un tournoi (ni page pong, ni page tournoi)
  const isTournamentMatch = localStorage.getItem('currentTournamentMatch') !== null;
  
  if (isTournamentMatch && 
      !url.startsWith('/pong') && 
      !url.startsWith('/pong/game') && 
      !url.startsWith('/pong/tournament')) {
    
    // Nettoyage des données de match et arrêt du jeu
    const matchAborted = { aborted: true };
    localStorage.setItem('matchAborted', JSON.stringify(matchAborted));
    
    // On retire le match du tournoi après un court délai
    setTimeout(() => {
      localStorage.removeItem('currentTournamentMatch');
      localStorage.removeItem('matchAborted');
    }, 100);
    
    //console.log('Match de tournoi annulé - navigation hors contexte');
  }
  
  history.pushState(null, "", url);
  renderPage();
};

const protectedRoutes = ['/', '/team', '/pong', '/pong/game', '/pong/tournament', '/pong/multiplayer', 
                         '/pong_multiplayer', '/pong_multiplayer/game']; // Add the new routes

const renderPage = () => {
  let path = window.location.pathname;
  const token = localStorage.getItem('token');
  if (!token && protectedRoutes.includes(path)) {
    path = '/login';
    history.replaceState(null, '', path);
  }
  const pageRendererOrContent = routes[path];
  let contentToRender: string | HTMLElement;
  if (typeof pageRendererOrContent === 'function') {
    contentToRender = pageRendererOrContent();
  } else if (typeof pageRendererOrContent === 'string') {
    contentToRender = pageRendererOrContent;
  } else {
    contentToRender = "<h1>404</h1><p>Page non trouvée.</p>";
  }

  const appElement = document.getElementById("app")!;
  if (typeof contentToRender === 'string') {
    appElement.innerHTML = contentToRender;
  } else {
    appElement.innerHTML = '';
    appElement.appendChild(contentToRender);
  }

  const navbarLinks = document.querySelectorAll('nav .navbar-links a[data-link]');
  navbarLinks.forEach(link => {
    const href = link.getAttribute("href");
    
    // Mise à jour du texte selon la langue actuelle
    if (href === "/") {
      link.textContent = translations[getCurrentLang()].home;
    } else if (href === "/pong") {
      link.textContent = "Pong"; // On garde "Pong" tel quel
    } else if (href === "/team") {
      link.textContent = translations[getCurrentLang()].team;
    }
    
    // Attribution des classes d'état
    if (href === path) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
    
    // Gestion des routes protégées
    if (!token && protectedRoutes.includes(href!)) {
      link.classList.add('pointer-events-none', 'opacity-50');
      link.setAttribute('aria-disabled', 'true');
      (link as HTMLElement).style.cursor = 'not-allowed';
    } else {
      link.classList.remove('pointer-events-none', 'opacity-50');
      link.removeAttribute('aria-disabled');
      (link as HTMLElement).style.cursor = '';
    }
  });

  const logoLink = document.querySelector('nav a[data-link][href="/"]');
  if (logoLink) {
    if (!token) {
      logoLink.classList.add('pointer-events-none', 'opacity-50');
      logoLink.setAttribute('aria-disabled', 'true');
      (logoLink as HTMLElement).style.cursor = 'not-allowed';
    } else {
      logoLink.classList.remove('pointer-events-none', 'opacity-50');
      logoLink.removeAttribute('aria-disabled');
      (logoLink as HTMLElement).style.cursor = '';
    }
  }

  const signOutBtn = document.getElementById('navbar-signout') as HTMLButtonElement | null;
  if (signOutBtn) {
    signOutBtn.style.display = token ? 'block' : 'none';
    signOutBtn.innerText = translations[getCurrentLang()].logout;
  }
};
  
document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const linkElement = target.closest("[data-link]") as HTMLAnchorElement | null;
  if (linkElement) {
    event.preventDefault();
    navigateTo(linkElement.getAttribute("href")!);
  }
});

window.addEventListener("popstate", renderPage);

const navRoutesForNavbar: { [key: string]: string } = {};
for (const key in routes) {
  if (key === "/") navRoutesForNavbar[key] = translations[getCurrentLang()].home;
  else if (key === "/pong") navRoutesForNavbar[key] = "Pong"; // Garde "Pong" tel quel
  else if (key === "/team") navRoutesForNavbar[key] = translations[getCurrentLang()].team;
}
const navbar = createNavbar(navRoutesForNavbar); 
document.body.prepend(navbar);

(window as any).renderPage = renderPage;

renderPage();