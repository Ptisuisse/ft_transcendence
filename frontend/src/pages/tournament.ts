import '../style.css';
import { navigateTo } from '../routes.ts';

export function PongTournamentPage(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center py-8';

  // Titre de la page
  const pageTitle = document.createElement('h1');
  pageTitle.className = `
    text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
    from-purple-500 via-pink-500 to-cyan-400 
    mb-12 mt-4
    tracking-normal
    [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.5))_drop-shadow(0_2px_2px_rgba(0,0,0,0.3))]
    md:text-6xl
  `;
  pageTitle.textContent = 'Pong Tournament';
  container.appendChild(pageTitle);

  // Section du tournoi
  const tournamentSection = document.createElement('div');
  tournamentSection.className = 'w-full max-w-4xl';

  // Brackets du tournoi
  const bracketContainer = createTournamentBracket();
  tournamentSection.appendChild(bracketContainer);

  // Section des boutons
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'flex justify-center mt-12 gap-4';

  const createTournamentBtn = document.createElement('button');
  createTournamentBtn.className = 'px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition shadow-md hover:shadow-lg';
  createTournamentBtn.textContent = 'Create Tournament';
  createTournamentBtn.addEventListener('click', () => {
    alert('Create tournament feature coming soon!');
  });

  const backToMenuBtn = document.createElement('button');
  backToMenuBtn.className = 'px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-md transition shadow-md hover:shadow-lg';
  backToMenuBtn.textContent = 'Back to Pong Menu';
  backToMenuBtn.addEventListener('click', () => {
    navigateTo('/pong');
  });

  buttonsContainer.appendChild(createTournamentBtn);
  buttonsContainer.appendChild(backToMenuBtn);

  container.appendChild(tournamentSection);
  container.appendChild(buttonsContainer);

  return container;
}

function createTournamentBracket(): HTMLElement {
  const bracketContainer = document.createElement('div');
  bracketContainer.className = 'flex flex-col items-center bg-gray-900 bg-opacity-70 p-6 rounded-lg border border-purple-500 shadow-lg';

  const title = document.createElement('h2');
  title.className = 'text-2xl font-bold text-white mb-8';
  title.textContent = 'Upcoming Tournament';
  bracketContainer.appendChild(title);

  // Structure de l'arbre du tournoi
  const bracket = document.createElement('div');
  bracket.className = 'flex justify-center w-full';

  // Exemple de structure de tournoi
  const rounds = [
    { name: 'Quarter Finals', matches: 4 },
    { name: 'Semi Finals', matches: 2 },
    { name: 'Final', matches: 1 }
  ];

  // Générer les rounds
  const roundsContainer = document.createElement('div');
  roundsContainer.className = 'flex gap-8 justify-between w-full';

  rounds.forEach((round) => { // Suppression du paramètre roundIndex non utilisé
    const roundColumn = document.createElement('div');
    roundColumn.className = 'flex flex-col gap-4';
    
    const roundTitle = document.createElement('h3');
    roundTitle.className = 'text-lg font-semibold text-purple-300 mb-2 text-center';
    roundTitle.textContent = round.name;
    roundColumn.appendChild(roundTitle);
    
    // Créer les matchs pour ce round
    for (let i = 0; i < round.matches; i++) {
      const match = document.createElement('div');
      match.className = 'border border-cyan-700 rounded p-3 bg-gray-800 w-48 transition-all hover:border-pink-500';
      
      // Joueurs du match
      const player1 = document.createElement('div');
      player1.className = 'text-white font-semibold mb-1 flex justify-between';
      player1.innerHTML = `<span>Player ${i*2 + 1}</span><span>-</span>`;
      
      const player2 = document.createElement('div');
      player2.className = 'text-white font-semibold flex justify-between';
      player2.innerHTML = `<span>Player ${i*2 + 2}</span><span>-</span>`;
      
      const time = document.createElement('div');
      time.className = 'text-gray-400 text-xs mt-2';
      const randomHour = Math.floor(Math.random() * 12) + 1;
      time.textContent = `Today at ${randomHour}:00 ${randomHour < 6 ? 'PM' : 'AM'}`;
      
      match.appendChild(player1);
      match.appendChild(player2);
      match.appendChild(time);
      roundColumn.appendChild(match);
    }
    
    roundsContainer.appendChild(roundColumn);
  });

  bracket.appendChild(roundsContainer);
  bracketContainer.appendChild(bracket);

  // Message en dessous de l'arbre du tournoi
  const message = document.createElement('p');
  message.className = 'text-gray-300 mt-8 text-center';
  message.textContent = 'Join a tournament or create your own to compete with other players!';
  bracketContainer.appendChild(message);

  return bracketContainer;
}