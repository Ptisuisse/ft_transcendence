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

const renderPage = () => {
  let path = window.location.pathname;
  const isLoggedIn = !!localStorage.getItem('userName');
  const protectedRoutes = ['/', '/pong']; 
  if (!isLoggedIn && protectedRoutes.includes(path)) {
    path = '/login';
    history.pushState(null, "", path);
  }
  const pageRendererOrContent = routes[path];
  let contentToRender: string | HTMLElement;
  if (typeof pageRendererOrContent === 'function') {
    contentToRender = pageRendererOrContent();
  } else if (typeof pageRendererOrContent === 'string') {
    contentToRender = pageRendererOrContent;
  }
   else {
    contentToRender = "<h1>404</h1><p>Page non trouvée.</p>";
  }
  
  const appElement = document.getElementById("app")!;
  if (typeof contentToRender === 'string') {
      appElement.innerHTML = contentToRender;
  } else {
      appElement.innerHTML = '';
      appElement.appendChild(contentToRender);
  }
  
  document.querySelectorAll("a").forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
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

renderPage();
const navRoutesForNavbar: { [key: string]: string } = {};
for (const key in routes) {
  if (key === "/") navRoutesForNavbar[key] = "Home";
  else if (key === "/pong") navRoutesForNavbar[key] = "Pong";
  else if (key === "/team") navRoutesForNavbar[key] = "Team";
}
const navbar = createNavbar(navRoutesForNavbar); 
document.body.prepend(navbar);