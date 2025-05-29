export function createNavbar(routes: { [key: string]: string }): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'p-4 text-white flex justify-between items-center fixed top-0 left-0 right-0 w-full z-50 bg-[#242424]/75 backdrop-blur-sm';

  // Conteneur gauche et droit
  const leftItemsContainer = document.createElement('div');
  leftItemsContainer.className = 'absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-4'; 

  const rightItemsContainer = document.createElement('div');
  rightItemsContainer.className = 'absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-4'; 

  // texte ft_transcendence
  const textLogoLink = document.createElement('a');
  textLogoLink.href = '/'; 
  textLogoLink.setAttribute('data-link', ''); 
  textLogoLink.textContent = 'ft_transcendence';
  textLogoLink.className = `
    transition-all duration-300
    hover:scale-90 transform font-bold text-sm md:text-base lg:text-xl`;
  // Désactive le lien si pas connecté
  const token = localStorage.getItem('token');
  if (!token) {
    textLogoLink.classList.add('pointer-events-none', 'opacity-50');
    textLogoLink.setAttribute('aria-disabled', 'true');
    (textLogoLink as HTMLElement).style.cursor = 'not-allowed';
  }
  leftItemsContainer.appendChild(textLogoLink);

  // BOUTON SIGN OUT (remplace login)
  const signOutButton = document.createElement('button');
  signOutButton.id = 'navbar-signout';
  signOutButton.innerText = 'Sign Out';
  signOutButton.className = 'px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition font-bold';
  signOutButton.style.display = 'none';
  signOutButton.onclick = () => {
    localStorage.removeItem('token');
    if (typeof window.renderPage === 'function') window.renderPage();
    window.location.reload(); // Force le rechargement pour réinitialiser Google Sign-In
  };
  rightItemsContainer.appendChild(signOutButton);

  nav.appendChild(rightItemsContainer);
  nav.appendChild(leftItemsContainer);

  // Conteneur pour les liens de navigation
  const navLinks = document.createElement('div');
  navLinks.className = 'navbar-links ';
  for (const path in routes) {
    const link = document.createElement('a');
    link.href = path;
    link.textContent = routes[path];
    link.setAttribute('data-link', '');
    link.className = `
      lg:text-lg transition-all duration-300 
      hover:text-[#C3BABA] hover:font-bold 
      hover:scale-125 transform 
    `;
    navLinks.appendChild(link);
  }
  nav.appendChild(navLinks);

  // Hamburger
  const hamburgerBtn = document.createElement('button');
  hamburgerBtn.className = 'hamburger-btn';
  hamburgerBtn.innerHTML = '☰';
  hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  nav.appendChild(hamburgerBtn);

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      navLinks.classList.remove('open');
    }
  });
  if (window.innerWidth >= 768) { 
    navLinks.classList.remove('open');
  }

  // Affichage dynamique du bouton sign-out
  setTimeout(() => {
    const token = localStorage.getItem('token');
    signOutButton.style.display = token ? 'block' : 'none';
  }, 0);

  return nav;
}
