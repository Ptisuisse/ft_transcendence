
import '../style.css';

interface CardData {
	imageUrl: string;
	titleText: string;
	descriptionText: string;
	linkHref: string;
}

function createImageCard(data: CardData): HTMLElement {
	const cardContainer = document.createElement('div');
	cardContainer.className = 'my-4 text-white flex flex-col items-center md:mb-10 border border-red-900';

	const imageWrapper = document.createElement('div');
	imageWrapper.className = 'relative lg:flex w-64 h-60 group overflow-hidden rounded-lg shadow-lg shadow-indigo-400/100 transition-all duration-300 ease-in-out';

	const image = document.createElement('img');
	image.src = data.imageUrl;
	image.className = 'absolute inset-0 w-full h-full object-cover rounded-lg transition-all duration-300 ease-in-out';

	const overlay = document.createElement('div');
	overlay.className = 'absolute inset-0 bg-black rounded-lg opacity-0 transition-opacity duration-300 ease-in-out';

	// Titre - maintenant à l'intérieur de imageWrapper
	const title = document.createElement('h1');
	title.innerText = data.titleText;
	// Positionné en haut, centré, initialement invisible
	title.className = 'absolute top-4 left-1/2 -translate-x-1/2 text-2xl font-bold text-white opacity-0 invisible transition-all duration-300 ease-in-out z-10';

	// Description - maintenant à l'intérieur de imageWrapper
	const description = document.createElement('p');
	description.innerText = data.descriptionText;
	// Positionné sous le titre, centré, initialement invisible
	description.className = 'absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-200 opacity-0 invisible transition-all duration-300 ease-in-out z-10 px-4 text-center';
	
	const playLink = document.createElement('a');
	playLink.href = data.linkHref;
	playLink.setAttribute('data-link', '');
	playLink.innerText = 'PLAY';
	// Ajout de -translate-y-1/2 pour un centrage vertical correct
	playLink.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold px-8 py-2 text-white outline-3 outline-offset-2 outline-double outline-purple-300 rounded hover:bg-purple-500 hover:outline-0 cursor-pointer opacity-0 invisible transition-all duration-100 ease-in-out z-10';
	
	imageWrapper.appendChild(image);
	imageWrapper.appendChild(overlay);
	imageWrapper.appendChild(title);
	imageWrapper.appendChild(description);
	imageWrapper.appendChild(playLink);

	imageWrapper.addEventListener('mouseenter', () => {
		image.classList.add('blur-sm');
		imageWrapper.classList.remove('shadow-lg','shadow-indigo-400/100');
		
		overlay.classList.remove('opacity-0'); 
		overlay.classList.add('opacity-40');
		
		title.classList.remove('opacity-0', 'invisible');
		title.classList.add('opacity-100', 'visible');

		description.classList.remove('opacity-0', 'invisible');
		description.classList.add('opacity-100', 'visible');
		
		playLink.classList.remove('opacity-0', 'invisible');
		playLink.classList.add('opacity-100', 'visible');
	});

	imageWrapper.addEventListener('mouseleave', () => {
		image.classList.remove('blur-sm');
		imageWrapper.classList.add('shadow-lg' , 'shadow-indigo-400/100');
		
		overlay.classList.remove('opacity-40');
		overlay.classList.add('opacity-0'); 
		
		title.classList.remove('opacity-100', 'visible');
		title.classList.add('opacity-0', 'invisible');

		description.classList.remove('opacity-100', 'visible');
		description.classList.add('opacity-0', 'invisible');
		
		playLink.classList.remove('opacity-100', 'visible');
		playLink.classList.add('opacity-0', 'invisible');
	});
	
	cardContainer.appendChild(imageWrapper);
	// Le titre et la description ne sont plus des enfants directs de cardContainer
	
	return cardContainer;
}

export function HomePage(): HTMLElement {
	const mainContainer = document.createElement('div');
	mainContainer.className = 'Parent p-5';

	const cardDataList: CardData[] = [
		{
			imageUrl: '/pong.jpg',
			titleText: 'Classique Pong',
			descriptionText: 'A simple pong game',
			linkHref: '/pong'
		},
		{
			imageUrl: '/pong.jpg',
			titleText: 'Multiplayer Pong',
			descriptionText: 'Multiplayer pong game',
			linkHref: '/pong'
		},
		{
			imageUrl: '/pong.jpg',
			titleText: 'Leaderboard Pong',
			descriptionText: 'Pong game leaderboard',
			linkHref: '/pong'
		}
	];

	cardDataList.forEach(data => {
		const card = createImageCard(data);
		mainContainer.appendChild(card);
	});

	// const separator = document.createElement('div');
	// separator.className = 'w-3/4 mx-auto border-t border-purple-300 mt-8 lg:-mt-20';
	// mainContainer.appendChild(separator);
	
	return mainContainer;
}

