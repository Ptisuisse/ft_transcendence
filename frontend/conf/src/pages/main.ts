import '../style.css';

export function HomePage(): HTMLElement {
    const mainContainer = document.createElement('div');
    mainContainer.className = 'page-container-full-height flex border border-red-500'; 

    const column1 = document.createElement('div');

    column1.className = 'flex-1 border border-gray-300 p-4';

    const column2 = document.createElement('div');
    column2.className = 'flex-1 border border-gray-300 p-4';
    const column3 = document.createElement('div');
    column3.className = 'flex-1 border border-gray-500 p-4';

    // Ajout des colonnes au conteneur principal
    mainContainer.appendChild(column1);
    mainContainer.appendChild(column2);
    mainContainer.appendChild(column3);
    
    return mainContainer;
}