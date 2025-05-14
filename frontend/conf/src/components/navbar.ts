export function createNavbar(routes: { [key: string]: string }): HTMLElement {

	const nav = document.createElement('nav');
	nav.className = 'bg-[#242424] p-4 text-white flex justify-center items-center fixed top-0 left-0 right-0 w-full z-50'; 
  
	// Conteneur pour element gauche et droit
	const leftItemsContainer = document.createElement('div');
	leftItemsContainer.className = 'absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-4'; // 'space-x-4' ajoute de l'espace entre les logos
	const rightItemsContainer = document.createElement('div');
	rightItemsContainer.className = 'absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-4'; // 'space-x-4' ajoute de l'espace entre les logos


	// texte "ft_transcendence"
	const textLogoLink = document.createElement('a');
	textLogoLink.href = '/'; 
	textLogoLink.setAttribute('data-link', ''); 
	textLogoLink.textContent = 'ft_transcendence';
	textLogoLink.className = `
	transition-all duration-300
	hover:scale-90 transform  text-xl font-bold`;
	leftItemsContainer.appendChild(textLogoLink);
  
	// image login cote droit
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
		loginImg.className = `h-8`;
    });

    loginImageLink.addEventListener('mouseleave', () => {
        loginImg.src = defaultLoginSrc;
		loginImg.className = 'h-7';
    });
    
	loginImageLink.appendChild(loginImg);
	rightItemsContainer.appendChild(loginImageLink);
	nav.appendChild(rightItemsContainer);
	nav.appendChild(leftItemsContainer);
	
	const navLinks = document.createElement('div');
 	navLinks.className = 'md:flex space-x-10 items-center'
  
	  for (const path in routes) {
		const link = document.createElement('a');
		link.href = path;
		link.textContent = routes[path];
		link.setAttribute('data-link', '');
		link.className = `
		text-lg transition-all duration-300 
		hover:text-[#C3BABA] hover:font-bold 
		hover:scale-125 transform 
	  `;
		navLinks.appendChild(link);
	  }
	
	  nav.appendChild(navLinks);
	
	  return nav;
}