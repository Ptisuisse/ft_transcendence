import '../style.css';

export function HomePage(): HTMLElement {
    const mainContainer = document.createElement('div');
    mainContainer.className = 'h-screen Parent p-5';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container p-10 text-white';

    const image = document.createElement('img');
    image.src = '../../public/pong.jpg';
    image.className = 'w-64 mb-4 rounded-lg shadow-lg shadow-indigo-400/100';

    const title = document.createElement('h1');
    title.className = 'text-2xl font-bold';
    title.innerText = 'Pong';
    
    const description = document.createElement('p');
    description.className = 'mb-4';
    description.innerText = 'A simple pong game';
    
    const button = document.createElement('button');
    button.className = 'px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700';
    button.innerText = 'Play';
    
    imageContainer.appendChild(image);
    imageContainer.appendChild(title);
    imageContainer.appendChild(description);
    imageContainer.appendChild(button);

    const imageContainer2 = document.createElement('div');
    imageContainer2.className = 'image-container p-10 text-white';

    const image2 = document.createElement('img');
    image2.src = '../../public/pong.jpg';
    image2.className = 'w-64 mb-4 rounded-lg shadow-lg shadow-indigo-400/100';

    const title2 = document.createElement('h1');
    title2.className = 'text-2xl font-bold';
    title2.innerText = 'Multiplayer Pong';
    
    const description2 = document.createElement('p');
    description2.className = 'mb-4';
    description2.innerText = 'A multiplayer pong game';
    
    const button2 = document.createElement('button');
    button2.className = 'px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700';
    button2.innerText = 'Play';
    
    imageContainer2.appendChild(image2);
    imageContainer2.appendChild(title2);
    imageContainer2.appendChild(description2);
    imageContainer2.appendChild(button2);


    const imageContainer3 = document.createElement('div');
    imageContainer3.className = 'image-container p-10 text-white';

    const image3 = document.createElement('img');
    image3.src = '../../public/pong.jpg';
    image3.className = 'w-64 mb-4 rounded-lg shadow-lg shadow-indigo-400/100';

    const title3 = document.createElement('h1');
    title3.className = 'text-2xl font-bold';
    title3.innerText = 'Leaderboard Pong';
    
    const description3 = document.createElement('p');
    description3.className = 'mb-4';
    description3.innerText = 'A pong game with leaderboard';
    
    const button3 = document.createElement('button');
    button3.className = 'px-4 py-2 text-purple-300 font-bold bold border border-purple-300 rounded hover:bg-blue-700';
    button3.innerText = 'Play';
    
    imageContainer3.appendChild(image3);
    imageContainer3.appendChild(title3);
    imageContainer3.appendChild(description3);
    imageContainer3.appendChild(button3);
    mainContainer.appendChild(imageContainer);
    mainContainer.appendChild(imageContainer2);
    mainContainer.appendChild(imageContainer3);
    return mainContainer;
}
