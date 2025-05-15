export function createNavbar(routes: { [key: string]: string }): HTMLElement {
  const nav = document.createElement('nav');
  //nav.className = 'border border-purple-300 p-4 text-white flex justify-between items-center fixed top-0 left-0 right-0 w-full z-50';
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
  leftItemsContainer.appendChild(textLogoLink);

  // image login droit
  const loginImageLink = document.createElement('a');
  loginImageLink.href = '/login';
  loginImageLink.setAttribute('data-link', '');
  
  const loginImg = document.createElement('img');
  const defaultLoginSrc = '/login.png';
  const hoverLoginSrc = '/hover_login.png';

  loginImg.src = defaultLoginSrc; 
  loginImg.alt = 'Login';
  loginImg.className = 'h-7 w-auto';

  loginImageLink.addEventListener('mouseenter', () => {
    loginImg.src = hoverLoginSrc;
    loginImg.className = `h-8 w-auto`;
  });

  loginImageLink.addEventListener('mouseleave', () => {
    loginImg.src = defaultLoginSrc;
    loginImg.className = 'h-7 w-auto';
  });
  
  loginImageLink.appendChild(loginImg);
  rightItemsContainer.appendChild(loginImageLink);
  nav.appendChild(rightItemsContainer);
  nav.appendChild(leftItemsContainer);

  // Conteneur pour les liens de navigation
  const navLinks = document.createElement('div');
  navLinks.className = 'navbar-links '; // utilise le layer defini dans le style.css facon tailwind
  
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
 
	// A retenir toggle ajoute une classe remove la retire
  // Ajout hamburger
  const hamburgerBtn = document.createElement('button');
  hamburgerBtn.className = 'hamburger-btn'; //  utilise le layer defini dans le style.css facon tailwind
  hamburgerBtn.innerHTML = '☰'; // Icone hamburger
  
  // affichage du menu au clic
  hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open'); // classe open definie dans le style.css
  });

  nav.appendChild(hamburgerBtn);

  // Eventlistener ecoute pour verifier la taille de la window
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      navLinks.classList.remove('open');
    }
  });

  // comportement au chargement de la page
  if (window.innerWidth >= 768) { 
    navLinks.classList.remove('open');
  }

  return nav;
}
