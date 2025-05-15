// import '../style.css';

// export function HomePage(): HTMLElement {
//     const mainContainer = document.createElement('div');
//     mainContainer.className = 'h-screen Parent p-5';

//     const imageContainer = document.createElement('div');
//     imageContainer.className = 'image-container p-10 text-white';

//     const image = document.createElement('img');
//     image.src = '../../public/pong.jpg';
//     image.className = 'w-64 mb-4 rounded-lg shadow-lg shadow-indigo-400/100';

//     const title = document.createElement('h1');
//     title.className = 'text-2xl font-bold mb-2'; 
//     title.innerText = 'Pong';
    
//     const description = document.createElement('p');
//     description.className = 'mb-6';
//     description.innerText = 'A simple pong game';
    
//     const playLink = document.createElement('a');
//     playLink.className = 'font-bold px-8 py-2 text-white outline-3 outline-offset-2 outline-double outline-purple-300 rounded hover:bg-purple-500 hover:outline-0 cursor-pointer mt-4'; 
//     playLink.innerText = 'PLAY';
//     playLink.href = '/pong';
//     playLink.setAttribute('data-link', '');
    
//     image.addEventListener('mouseenter', () => {
//         image.className = 'blur-sm w-64 mb-4 rounded-lg bg-gray-300';
//         image.appendChild(playLink);
//     });

//     image.addEventListener('mouseleave', () => {
//         image.className = 'w-64 mb-4 rounded-lg shadow-lg shadow-indigo-400/100';
//     });
//     imageContainer.appendChild(image);
//     imageContainer.appendChild(title);
//     imageContainer.appendChild(description);
//     imageContainer.appendChild(playLink);

//     const imageContainer2 = document.createElement('div');
//     imageContainer2.className = 'image-container p-10 text-white';

//     const image2 = document.createElement('img');
//     image2.src = '../../public/pong.jpg';
//     image2.className = 'w-64 mb-4 rounded-lg shadow-lg shadow-indigo-400/100';

//     const title2 = document.createElement('h1');
//     title2.className = 'text-2xl font-bold mb-2';
//     title2.innerText = 'Multiplayer Pong';
    
//     const description2 = document.createElement('p');
//     description2.className = 'mb-6';
//     description2.innerText = 'A multiplayer pong game';

//     const playLink2 = document.createElement('a'); // Changé de 'button' à 'a'
//     //playLink2.className = 'px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 cursor-pointer'; // Ajout de cursor-pointer pour une meilleure UX
//     playLink2.className = 'font-bold px-8 py-2 text-white outline-3 outline-offset-2 outline-double outline-purple-300 rounded hover:bg-purple-500 hover:outline-0 cursor-pointer mt-4'; 

    
//     playLink2.innerText = 'PLAY';
//     playLink2.href = '/pong'; // Définit la cible de la navigation
//     playLink2.setAttribute('data-link', ''); // Permet au routeur de gérer le clic
    
//     imageContainer2.appendChild(image2);
//     imageContainer2.appendChild(title2);
//     imageContainer2.appendChild(description2);
//     imageContainer2.appendChild(playLink2);


//     const imageContainer3 = document.createElement('div');
//     imageContainer3.className = 'image-container p-10 text-white';

//     const image3 = document.createElement('img');
//     image3.src = '../../public/pong.jpg';
//     image3.className = 'w-64 mb-4 rounded-lg shadow-lg shadow-indigo-400/100';

//     const title3 = document.createElement('h1');
//     title3.className = 'text-2xl font-bold mb-2';
//     title3.innerText = 'Leaderboard Pong';
    
//     const description3 = document.createElement('p');
//     description3.className = 'mb-6';
//     description3.innerText = 'A pong game with leaderboard';
    
//     const playLink3 = document.createElement('a'); // Changé de 'button' à 'a'
//     //playLink3.className = 'px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 cursor-pointer'; // Ajout de cursor-pointer pour une meilleure UX
//     //playLink3.className = 'font-bold px-8 py-2 text-white border border-purple-300 rounded hover:bg-blue-400 cursor-pointer'; // Ajout de cursor-pointer pour une meilleure UX
//     playLink3.className = 'font-bold px-8 py-2 text-white outline-3 outline-offset-2 outline-double outline-purple-300 rounded hover:bg-purple-500 hover:outline-0 cursor-pointer mt-4'; 
    
//     playLink3.innerText = 'PLAY';
//     playLink3.href = '/pong'; // Définit la cible de la navigation
//     playLink3.setAttribute('data-link', ''); // Permet au routeur de gérer le clic
    
//     imageContainer3.appendChild(image3);
//     imageContainer3.appendChild(title3);
//     imageContainer3.appendChild(description3);
//     imageContainer3.appendChild(playLink3);
//     mainContainer.appendChild(imageContainer);
//     mainContainer.appendChild(imageContainer2);
//     mainContainer.appendChild(imageContainer3);

//     const   separator = document.createElement('div');
//     separator.className = 'w-3/4 mx-auto border-t border-purple-300 lg:-mt-20 size-6 animate-bounce';
//     mainContainer.appendChild(separator);
//     return mainContainer;
// }
import '../style.css';

interface CardData {
    imageUrl: string;
    titleText: string;
    descriptionText: string;
    linkHref: string;
}

function createImageCard(data: CardData): HTMLElement {
    const cardContainer = document.createElement('div');
    // cardContainer.className = 'image-container p-10 text-white flex flex-col items-center';
    // Simplification pour cet exemple, ajustez le padding/margin global si nécessaire en dehors de la carte individuelle
    cardContainer.className = 'text-white flex flex-col items-center mb-10';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'top-20 relative w-64 h-60 group overflow-hidden rounded-lg shadow-lg shadow-indigo-400/100 transition-all duration-300 ease-in-out';

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
            imageUrl: '../../public/pong.jpg',
            titleText: 'Classique Pong',
            descriptionText: 'A simple pong game',
            linkHref: '/pong'
        },
        {
            imageUrl: '../../public/pong.jpg',
            titleText: 'Multiplayer Pong',
            descriptionText: 'Multiplayer pong game',
            linkHref: '/pong'
        },
        {
            imageUrl: '../../public/pong.jpg',
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

//import '../style.css';

// Définition de l'interface pour les données de la carte
// interface CardData {
//     imageUrl: string;
//     titleText: string;
//     descriptionText: string;
//     linkHref: string;
// }

// OBJECTIF CODER COMME CA : 

// // Fonction d'aide pour créer une carte de jeu
// function createImageCard(data: CardData): HTMLElement {
//     const container = document.createElement('div');
//     container.className = 'image-container p-10 text-white';

//     const image = document.createElement('img');
//     image.src = data.imageUrl;
//     image.className = 'w-64 mb-4 rounded-lg shadow-lg shadow-indigo-400/100';

//     const title = document.createElement('h1');
//     title.className = 'text-2xl font-bold mb-2';
//     title.innerText = data.titleText;
    
//     const description = document.createElement('p');
//     description.className = 'mb-6'; // Augmenté de mb-4 à mb-6 pour plus d'espace avant le bouton
//     description.innerText = data.descriptionText;
    
//     const playLink = document.createElement('a');
//     playLink.className = 'font-bold px-8 py-2 text-white border border-purple-300 rounded hover:bg-blue-400 cursor-pointer mt-4';
//     playLink.innerText = 'PLAY';
//     playLink.href = data.linkHref;
//     playLink.setAttribute('data-link', ''); // Permet au routeur de gérer le clic
    
//     container.appendChild(image);
//     container.appendChild(title);
//     container.appendChild(description);
//     container.appendChild(playLink);
    
//     return container;
// }

// export function HomePage(): HTMLElement {
//     const mainContainer = document.createElement('div');
//     mainContainer.className = 'h-screen Parent p-5';

//     // Données pour chaque carte
//     const cardDataList: CardData[] = [
//         {
//             imageUrl: '../../public/pong.jpg',
//             titleText: 'Pong',
//             descriptionText: 'A simple pong game',
//             linkHref: '/pong'
//         },
//         {
//             imageUrl: '../../public/pong.jpg',
//             titleText: 'Multiplayer Pong',
//             descriptionText: 'A multiplayer pong game',
//             linkHref: '/pong'
//         },
//         {
//             imageUrl: '../../public/pong.jpg',
//             titleText: 'Leaderboard Pong',
//             descriptionText: 'A pong game with leaderboard',
//             linkHref: '/pong'
//         }
//     ];

//     // Création et ajout des cartes au conteneur principal
//     cardDataList.forEach(data => {
//         const card = createImageCard(data);
//         mainContainer.appendChild(card);
//     });

//     const separator = document.createElement('div');
//     // Ajustez les classes du séparateur selon vos besoins responsives
//     // Par exemple: 'w-3/4 mx-auto border-t border-purple-300 -mt-6 lg:-mt-10'
//     // Ou la version que vous aviez: 'w-3/4 mx-auto border-t border-purple-300 lg:-mt-20 size-6 animate-bounce';
//     // Pour cet exemple, je vais utiliser une version plus simple, ajustez-la.
//     separator.className = 'w-3/4 mx-auto border-t border-purple-300 mt-8'; // Note: -mt-20 peut être trop agressif sans le padding des cartes
//                                                                           // Si les cartes ont p-10, -mt-10 annule ce padding.
//                                                                           // size-6 et animate-bounce sont pour un style spécifique, à conserver si désiré.
//                                                                           // J'ai mis mt-8 pour un espacement positif par défaut.
//                                                                           // Si vous voulez le comportement précédent:
//                                                                           // separator.className = 'w-3/4 mx-auto border-t border-purple-300 lg:-mt-20 size-6 animate-bounce';


//     mainContainer.appendChild(separator);
//     return mainContainer;
// }
