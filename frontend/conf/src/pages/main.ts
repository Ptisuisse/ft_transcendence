import '../style.css';

export function HomePage(): HTMLElement {
    const mainContainer = document.createElement('div');
    // Ce conteneur prendra la hauteur et largeur disponibles sous la navbar.
    // 'flex' permettra d'aligner les enfants (colonnes).
    // 'min-h-[calc(100vh-4rem)]' pour la hauteur, 'w-full' pour la largeur.
    mainContainer.className = 'page-container-full-height flex border border-red-500'; 
    // Création de trois colonnes
    const column1 = document.createElement('div');
    // 'flex-1' permet à chaque colonne de prendre une part égale de l'espace.
    // Ajoutez des bordures et du padding pour la visibilité.
    column1.className = 'flex-1 border border-gray-300 p-4';

    const column2 = document.createElement('div');
    column2.className = 'flex-1 border border-gray-300 p-4'; // Couleur de fond différente pour la distinction
	const rond = document.createElement('div');
	rond.className = 'flex-1 border border-blue-300 p-10';
	column2.appendChild(rond);
    const column3 = document.createElement('div');
    column3.className = 'flex-1 border border-gray-500 p-4';

    // Ajout des colonnes au conteneur principal
    mainContainer.appendChild(column1);
    mainContainer.appendChild(column2);
    mainContainer.appendChild(column3);
    
    return mainContainer;
}