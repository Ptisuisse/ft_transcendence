import './style.css'
import { createNavbar } from './components/navbar.ts'
import { HomePage } from './pages/main.ts';
import { PongPage } from './pages/pong.ts';
import { LoginPage } from './pages/login.ts';
import { TeamPage } from './pages/team.ts';

type PageRenderFunction = () => string | HTMLElement;

const routes: { [key: string]: PageRenderFunction | string } = {
    "/": HomePage,
    "/pong": PongPage,
    "/login": LoginPage,
    "/team" : TeamPage,
  };

export const navigateTo = (url: string) => {
  history.pushState(null, "", url);
  renderPage();
};

const protectedRoutes = ['/', '/pong', '/team'];

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

  // Cible uniquement les liens de la navbar
  const navbarLinks = document.querySelectorAll('nav .navbar-links a[data-link]');
  navbarLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
    // Grise/désactive SEULEMENT si pas connecté
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

  // Désactive aussi le logo ft_transcendence si pas connecté
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

  // Affiche ou cache le bouton sign-out de la navbar dynamiquement
  const signOutBtn = document.getElementById('navbar-signout');
  if (signOutBtn) {
    signOutBtn.style.display = token ? 'block' : 'none';
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
  if (key === "/") navRoutesForNavbar[key] = "Home";
  else if (key === "/pong") navRoutesForNavbar[key] = "Pong";
  else if (key === "/team") navRoutesForNavbar[key] = "Team";
}
const navbar = createNavbar(navRoutesForNavbar); 
document.body.prepend(navbar);

// Expose renderPage globally for login.ts
(window as any).renderPage = renderPage;

renderPage();