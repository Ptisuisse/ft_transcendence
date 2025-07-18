import { getCurrentLang } from '../components/navbar.ts';
import { translations } from '../i18n.ts';
import '../style.css';

interface CardData {
    imagesrc: string;
    name: string;
    contributions: string[];
    classe: string;
    borderStart: string;
}

function t(key: string): string {
  const lang = getCurrentLang();
  const langTranslations = translations[lang as keyof typeof translations] || translations.en;
  return langTranslations[key as keyof typeof langTranslations] || translations.en[key as keyof typeof translations.en] || key;
}

function ProfilData(data: CardData): HTMLElement {
    const mainContainer = document.createElement('div');
    mainContainer.className = 'flex flex-col items-center';

    const borderContainer = document.createElement('div');
    borderContainer.className = `
        card
        w-40 h-44
        p-1
        relative 
    `;
    if (data.borderStart) {
        borderContainer.style.setProperty('--gradient-offset', data.borderStart);
    }
    const imageContainer = document.createElement('div');
    imageContainer.className = `
        w-full h-full 
        [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]
        relative overflow-hidden 
        bg-gray-800 
    `;

    const imageElement = document.createElement('img');
    imageElement.src = data.imagesrc;
    imageElement.className = data.classe;

    imageContainer.appendChild(imageElement);
    borderContainer.appendChild(imageContainer);
    mainContainer.appendChild(borderContainer);

    const textBlock = document.createElement('div');
    textBlock.className = `
        mt-4 p-4 w-64
        bg-gray-900 bg-opacity-80
        border border-cyan-600
        rounded-lg 
        shadow-lg shadow-cyan-500/30
        text-sm
        text-left 
    `;

    const nameElement = document.createElement('h3');
    nameElement.className = 'text-xl font-bold text-pink-400 mb-2 text-center tracking-wider';
    nameElement.textContent = data.name;
    textBlock.appendChild(nameElement);

    const contributionsTitle = document.createElement('p');
    contributionsTitle.className = 'text-purple-400 font-semibold mb-2';
    contributionsTitle.textContent = t('Contributions');
    textBlock.appendChild(contributionsTitle);

    const contributionsList = document.createElement('ul');
    contributionsList.className = 'list-none pl-0 space-y-1';
    data.contributions.forEach(contribText => {
        const listItem = document.createElement('li');
        listItem.className = 'text-cyan-300 flex items-center'; 
        
        const bullet = document.createElement('span');
        bullet.className = 'mr-3 inline-block w-1.5 h-1.5 bg-pink-400 rounded-full flex-shrink-0';
        listItem.appendChild(bullet);
        
        const textNode = document.createTextNode(t(contribText));
        listItem.appendChild(textNode);
        contributionsList.appendChild(listItem);
    });
    textBlock.appendChild(contributionsList);
    mainContainer.appendChild(textBlock);

    return mainContainer;
}

export function TeamPage(): HTMLElement {
    const mainContainer = document.createElement('div');
    mainContainer.className = 'Parent p-5 flex flex flex-col items-center';

    const pageTitle = document.createElement('h1');
    pageTitle.className = `
        text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
        from-purple-500 via-pink-500 to-cyan-400 
        my-2
        tracking-normal
        [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.5))_drop-shadow(0_2px_2px_rgba(0,0,0,0.3))]
        md:text-6xl
    `;
    pageTitle.textContent = t('TitleTeam');
    mainContainer.appendChild(pageTitle);

    const cardsWrapper = document.createElement('div');
    cardsWrapper.className = 'flex flex-wrap gap-x-20 gap-y-12 justify-center max-w-5xl'; 

    const cardTeamlist: CardData[] = [
        {
            imagesrc: 'https://cdn.intra.42.fr/users/b4ece226b775fafa122c3b77daba52b7/lvan-slu.jpg',
            name: 'lvan-slu',
            contributions: [
                'lvanSluContrib1',
                'lvanSluContrib2',
                'lvanSluContrib3',
                'lvanSluContrib4',
                'lvanSluContrib5',
                'lvanSluContrib6'
            ],
            classe: 'absolute inset-0 w-full h-full object-cover transform scale-150 translate-x-0 translate-y-[-10%]',
            borderStart: '0deg'
        },
        {
            imagesrc: 'https://cdn.intra.42.fr/users/e983d6f2f963251a6d749de8f454998b/ppitzini.jpg',
            name: 'ppitzini',
            contributions: [
                'ppitziniContrib1',
                'ppitziniContrib2',
                'ppitziniContrib3',
                'ppitziniContrib4'

            ],
            classe: 'absolute inset-0 w-full h-full object-cover transform scale-150 translate-x-[-10%] translate-y-[-10%]',
            borderStart: '120deg'
        },
        {
            imagesrc: 'https://cdn.intra.42.fr/users/8b9c58a0398280e28a4ecd1ec9d167db/pirulenc.jpg',
            name: 'pirulenc',
            contributions: [
                'pirulencContrib1',
                'pirulencContrib2',
                'pirulencContrib3',
                'pirulencContrib4',
                'pirulencContrib5',
                'pirulencContrib6'
            ],
            classe: 'absolute inset-0 w-full h-full object-cover transform scale-150 translate-x-[-15%] translate-y-[-10%]',
            borderStart: '240deg'
        }
    ];

    cardTeamlist.forEach(data => {
        const cardProfile = ProfilData(data);
        cardsWrapper.appendChild(cardProfile);
    });
    
    mainContainer.appendChild(cardsWrapper);
    return mainContainer;
}