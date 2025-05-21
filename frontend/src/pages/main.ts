
import '../style.css';

interface CardData {
    imageUrl: string;
    titleText: string;
    descriptionText: string;
    linkHref: string;
}

interface ImageWrapperElement extends HTMLElement {
    customHideEffects?: () => void;
}

function createImageCard(data: CardData): HTMLElement {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'my-10 text-white flex flex-col items-center md:mb-10';

    const imageWrapper = document.createElement('div') as ImageWrapperElement;
    imageWrapper.className = 'js-image-card-wrapper relative lg:flex w-64 h-60 group overflow-hidden rounded-lg shadow-lg shadow-indigo-400/100 transition-all duration-300 ease-in-out';
    imageWrapper.dataset.toggled = 'false';

    const image = document.createElement('img');
    image.src = data.imageUrl;
    image.alt = data.titleText;
    image.className = 'absolute inset-0 w-full h-full object-cover rounded-lg transition-all duration-300 ease-in-out';

    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-black rounded-lg opacity-0 transition-opacity duration-300 ease-in-out';

    const title = document.createElement('h1');
    title.innerText = data.titleText;
    title.className = 'absolute top-4 left-1/2 -translate-x-1/2 text-2xl font-bold text-cyan-300 opacity-0 invisible transition-all duration-300 ease-in-out z-10';

    const description = document.createElement('p');
    description.innerText = data.descriptionText;
    description.className = 'absolute bottom-8 left-1/2 -translate-x-1/2 text-m font-bold text-pink-400 opacity-0 invisible transition-all duration-300 ease-in-out z-10 px-4 text-center';
    
    const playLink = document.createElement('a');
    playLink.href = data.linkHref;
    playLink.setAttribute('data-link', '');
    playLink.innerText = 'PLAY';
    playLink.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold px-8 py-2 text-purple-400 hover:text-pink-900 font-semibold  outline-3 outline-offset-2 outline-double outline-purple-300 rounded hover:bg-cyan-500 hover:outline-0 cursor-pointer opacity-0 invisible transition-all duration-100 ease-in-out z-10';
    
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(overlay);
    imageWrapper.appendChild(title);
    imageWrapper.appendChild(description);
    imageWrapper.appendChild(playLink);

    const showEffects = () => {
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
    };

    const hideEffects = () => {
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
    };

    imageWrapper.customHideEffects = hideEffects;

    imageWrapper.addEventListener('mouseenter', () => {
        if (imageWrapper.dataset.toggled === 'false') {
            showEffects();
        }
    });

    imageWrapper.addEventListener('mouseleave', () => {
        if (imageWrapper.dataset.toggled === 'false') {
            hideEffects();
        }
    });

    imageWrapper.addEventListener('click', (event) => {
        const isCurrentlyToggled = imageWrapper.dataset.toggled === 'true';
        const clickedOnPlayLink = (event.target as HTMLElement).closest('a') === playLink;

        if (clickedOnPlayLink) {
            if (!isCurrentlyToggled) {
                document.querySelectorAll('.js-image-card-wrapper').forEach(otherWrapperNode => {
                    const otherWrapper = otherWrapperNode as ImageWrapperElement;
                    if (otherWrapper !== imageWrapper && otherWrapper.dataset.toggled === 'true') {
                        if (otherWrapper.customHideEffects) {
                            otherWrapper.customHideEffects();
                        }
                        otherWrapper.dataset.toggled = 'false';
                    }
                });
                showEffects();
                imageWrapper.dataset.toggled = 'true'; 
            }
            return;
        }

        if (isCurrentlyToggled) {
            hideEffects();
            imageWrapper.dataset.toggled = 'false';
        } else {
            document.querySelectorAll('.js-image-card-wrapper').forEach(otherWrapperNode => {
                const otherWrapper = otherWrapperNode as ImageWrapperElement;
                if (otherWrapper !== imageWrapper && otherWrapper.dataset.toggled === 'true') {
                     if (otherWrapper.customHideEffects) {
                        otherWrapper.customHideEffects();
                    }
                    otherWrapper.dataset.toggled = 'false';
                }
            });
            showEffects();
            imageWrapper.dataset.toggled = 'true';
        }
    });
    
    cardContainer.appendChild(imageWrapper);
    
    return cardContainer;
}

export function HomePage(): HTMLElement {
	const mainContainer = document.createElement('div');
	mainContainer.className = 'Parent p-5';

	const titleContainer = document.createElement('div');
	titleContainer.className = 'w-full text-center mt-4';

	const pageTitle = document.createElement('h1');
    pageTitle.className = `
        text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
        from-purple-500 via-pink-500 to-cyan-400 
        tracking-wide /* Modifié de tracking-normal à tracking-wide */
        [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.5))_drop-shadow(0_2px_2px_rgba(0,0,0,0.3))]
        md:text-6xl
        inline-block 
    `;
    pageTitle.textContent = 'Welcome';

	titleContainer.appendChild(pageTitle);

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
	
	mainContainer.appendChild(titleContainer);
	cardDataList.forEach(data => {
		const card = createImageCard(data);
		mainContainer.appendChild(card);
	});
	
	return mainContainer;
}

