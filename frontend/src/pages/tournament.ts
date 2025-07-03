import '../style.css';
import { navigateTo } from '../routes.ts';
import { translations } from '../i18n.ts';
import { getCurrentLang } from '../components/navbar.ts';  // Import the shared function

// Translation helper function
function t(key: string): string {
  const lang = getCurrentLang();
  const langTranslations = translations[lang as keyof typeof translations] || translations.en;
  return langTranslations[key as keyof typeof langTranslations] || translations.en[key as keyof typeof translations.en] || key;
}

export interface TournamentPlayer {
  id: number;
  nickname: string;
}

interface TournamentConfig {
  playerCount: 4 | 8;
  players: TournamentPlayer[];
  // Structure pour les prochains tours:
  // clé = index du round, valeur = objet avec clé = index du match, valeur = joueurs qualifiés
  nextRounds?: {
    [roundIndex: number]: {
      [matchIndex: number]: [TournamentPlayer | null, TournamentPlayer | null];
    }
  };
  // Suivi des matchs complétés
  completedMatches?: {
    [matchKey: string]: boolean;
  };
  winner?: TournamentPlayer; // Le gagnant final du tournoi
}

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
  pageTitle.textContent = t('TitleTournament');
  container.appendChild(pageTitle);

  // Section du tournoi
  const tournamentSection = document.createElement('div');
  tournamentSection.className = 'w-full max-w-4xl';
  container.appendChild(tournamentSection);

  // Section des boutons
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'flex justify-center mt-12 gap-4';

  const backToMenuBtn = document.createElement('button');
  backToMenuBtn.className = 'px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-md transition shadow-md hover:shadow-lg';
  backToMenuBtn.textContent = t('BackToMenu');
  backToMenuBtn.addEventListener('click', () => {
    navigateTo('https://localhost');
  });

  buttonsContainer.appendChild(backToMenuBtn);
  container.appendChild(buttonsContainer);

  // Vérifier s'il y a déjà une configuration de tournoi
  const savedConfig = localStorage.getItem('tournamentConfig');
  
  if (savedConfig) {
    try {
      const tournamentConfig = JSON.parse(savedConfig);
      
      // Check if the tournament has a winner
      if (tournamentConfig.winner) {
        // Tournament has been completed, show celebration screen
        const winnerCelebration = createWinnerCelebration(tournamentConfig.winner);
        tournamentSection.appendChild(winnerCelebration);
        
        // Only show the "Create New Tournament" button
        const newTournamentBtn = document.createElement('button');
        newTournamentBtn.className = 'px-8 py-4 mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md transition shadow-lg hover:shadow-xl text-xl font-bold';
        newTournamentBtn.textContent = t('CreateTournament');
        newTournamentBtn.addEventListener('click', () => {
          // Clear the existing tournament config
          localStorage.removeItem('tournamentConfig');
          // Show the player count selection modal
          showPlayerCountModal(tournamentSection);
        });
        
        // Replace the existing buttons with just the new tournament button
        buttonsContainer.innerHTML = '';
        buttonsContainer.appendChild(newTournamentBtn);
        buttonsContainer.appendChild(backToMenuBtn);

        // Supprimer le titre principal de la page ("Création de tournoi")
        if (pageTitle.parentNode) {
          pageTitle.parentNode.removeChild(pageTitle);
        }
      } else {
        // Tournament is still in progress, show the bracket
        const bracketContainer = createTournamentBracket(tournamentConfig);
        tournamentSection.appendChild(bracketContainer);
        
        // Ajouter un bouton pour créer un nouveau tournoi
        const newTournamentBtn = document.createElement('button');
        newTournamentBtn.className = 'px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition shadow-md hover:shadow-lg';
        newTournamentBtn.textContent = t('CreateTournament');
        newTournamentBtn.addEventListener('click', () => {
          // Afficher directement la modale de sélection du nombre de joueurs
          showPlayerCountModal(tournamentSection);
        });
        
        // Ajouter le bouton avant le "Back to Menu"
        buttonsContainer.insertBefore(newTournamentBtn, backToMenuBtn);
      }
    } catch (e) {
      console.error('Failed to parse tournament config', e);
      // En cas d'erreur, afficher directement la sélection du nombre de joueurs
      showPlayerCountModal(tournamentSection);
    }
  } else {
    // No tournament configuration exists, show the player count selection
    setTimeout(() => {
      showPlayerCountModal(tournamentSection);
    }, 100);
  }

  return container;
}

function showPlayerCountModal(tournamentSection: HTMLElement): void {
  // Créer l'overlay modal
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  
  // Créer le contenu de la modale
  const modal = document.createElement('div');
  modal.className = 'bg-gray-800 border-2 border-purple-500 rounded-lg p-6 shadow-xl w-full max-w-md';
  
  // Titre de la modale
  const modalTitle = document.createElement('h2');
  modalTitle.className = 'text-white text-2xl font-bold mb-6 text-center';
  modalTitle.textContent = t('ParticipantsNumber');
  modal.appendChild(modalTitle);

  // Instructions
  const instructions = document.createElement('p');
  instructions.className = 'text-gray-300 mb-6 text-center';
  instructions.textContent = t('ParticipantsNumber') + ':';
  modal.appendChild(instructions);

  // Boutons pour choisir 4 ou 8 joueurs
  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'flex gap-6 justify-center';

  const fourPlayersBtn = document.createElement('button');
  fourPlayersBtn.className = 'flex-1 py-4 px-6 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition-colors font-bold text-xl';
  fourPlayersBtn.textContent = '4 ' + t('Players');  // Modifié ici
  fourPlayersBtn.addEventListener('click', () => {
    document.body.removeChild(modalOverlay);
    showPlayerNamesModal(tournamentSection, 4);
  });

  const eightPlayersBtn = document.createElement('button');
  eightPlayersBtn.className = 'flex-1 py-4 px-6 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 transition-colors font-bold text-xl';
  eightPlayersBtn.textContent = '8 ' + t('Players');  // Modifié ici
  eightPlayersBtn.addEventListener('click', () => {
    document.body.removeChild(modalOverlay);
    showPlayerNamesModal(tournamentSection, 8);
  });

  buttonGroup.appendChild(fourPlayersBtn);
  buttonGroup.appendChild(eightPlayersBtn);
  modal.appendChild(buttonGroup);

  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);
}

function showPlayerNamesModal(tournamentSection: HTMLElement, playerCount: 4 | 8): void {
  // Créer l'overlay modal
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  
  // Créer le contenu de la modale
  const modal = document.createElement('div');
  modal.className = 'bg-gray-800 border-2 border-purple-500 rounded-lg p-6 shadow-xl w-full max-w-md';
  
  // Titre de la modale
  const modalTitle = document.createElement('h2');
  modalTitle.className = 'text-white text-2xl font-bold mb-6 text-center';
  modalTitle.textContent = `${t('Players')} (${playerCount})`;  // Modifié ici
  modal.appendChild(modalTitle);

  // Section pour les pseudonymes des joueurs
  const playersSection = document.createElement('div');
  playersSection.className = 'mb-6 max-h-60 overflow-y-auto';
  
  for (let i = 0; i < playerCount; i++) {
    const playerRow = document.createElement('div');
    playerRow.className = 'mb-4';
    
    const playerLabel = document.createElement('label');
    playerLabel.className = 'text-white text-sm block mb-1';
    playerLabel.textContent = `${t('Player')} ${i + 1}:`;  // Modifié ici (singulier)
    
    const playerInput = document.createElement('input');
    playerInput.className = 'w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-purple-500';
    playerInput.type = 'text';
    playerInput.id = `player-${i}`;
    playerInput.placeholder = `${t('Player')} ${i + 1}`;  // Modifié ici (singulier)
    playerInput.value = `${t('Player')} ${i + 1}`;  // Modifié ici (singulier)
    
    playerRow.appendChild(playerLabel);
    playerRow.appendChild(playerInput);
    playersSection.appendChild(playerRow);
  }
  
  modal.appendChild(playersSection);

  // Boutons de contrôle
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'flex gap-4';

  const backBtn = document.createElement('button');
  backBtn.className = 'flex-1 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-bold';
  backBtn.textContent = t('BackToMenu');
  backBtn.addEventListener('click', () => {
    document.body.removeChild(modalOverlay);
    navigateTo('https://localhost'); // Redirige vers le menu principal
  });

  const startTournamentBtn = document.createElement('button');
  startTournamentBtn.className = 'flex-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-bold';
  startTournamentBtn.textContent = t('CreateTournament');
  startTournamentBtn.addEventListener('click', () => {
    // Récupérer les nicknames des joueurs
    const players: TournamentPlayer[] = [];
    for (let i = 0; i < playerCount; i++) {
      const input = document.getElementById(`player-${i}`) as HTMLInputElement;
      const nickname = input.value.trim() || `${t('Player')} ${i + 1}`;  // Modifié ici (singulier)
      players.push({ id: i + 1, nickname });
    }

    // Mélanger les joueurs pour le matchmaking aléatoire
    const shuffledPlayers = shuffleArray(players);
    
    // Créer la configuration du tournoi avec les joueurs mélangés
    const config: TournamentConfig = {
      playerCount: playerCount,
      players: shuffledPlayers
    };

    // Sauvegarder la configuration
    localStorage.setItem('tournamentConfig', JSON.stringify(config));

    // Mettre à jour l'affichage du tournoi
    tournamentSection.innerHTML = '';
    const bracketContainer = createTournamentBracket(config);
    tournamentSection.appendChild(bracketContainer);

    // Fermer la modale
    document.body.removeChild(modalOverlay);

    localStorage.removeItem('matchAborted');
    localStorage.setItem('tournamentConfig', JSON.stringify(config));
  });

  buttonsContainer.appendChild(backBtn);
  buttonsContainer.appendChild(startTournamentBtn);

  modal.appendChild(buttonsContainer);
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);
}

function createTournamentBracket(config?: TournamentConfig): HTMLElement {
  const bracketContainer = document.createElement('div');
  bracketContainer.className = 'flex flex-col items-center bg-gray-900 bg-opacity-70 p-6 rounded-lg border border-purple-500 shadow-lg w-full';

  // Structure de l'arbre du tournoi
  const bracket = document.createElement('div');
  bracket.className = 'w-full';

  // Structure de tournoi basée sur la configuration
  let rounds = [];
  
  if (config && config.playerCount === 4) {
    rounds = [
      { matches: 2 },
      { matches: 1 }
    ];
  } else {
    rounds = [
      { matches: 4 },
      { matches: 2 },
      { matches: 1 }
    ];
  }

  // Générer les rounds
  const roundsContainer = document.createElement('div');
  roundsContainer.className = 'Parent p-5'; // Implementing Parent class here

  rounds.forEach((round, roundIndex) => {
    const roundColumn = document.createElement('div');
    roundColumn.className = 'flex flex-col gap-4';
    
    // Créer les matchs pour ce round
    for (let i = 0; i < round.matches; i++) {
      const match = document.createElement('div');
      
      // Vérifier si le match a déjà été joué
      const matchKey = `${roundIndex}_${i}`;
      const isMatchCompleted = config?.completedMatches?.[matchKey] === true;
      
      // Base class with conditional styling
      match.className = 'border rounded p-3 bg-gray-800 transition-all';
      // Make matches responsive
      match.style.width = 'min(100%, 12rem)';
      
      if (isMatchCompleted) {
        match.className += ' border-green-700 opacity-90';
      } else {
        match.className += ' border-cyan-700 hover:border-pink-500 cursor-pointer';
      }
      
      // Match data attributes
      match.dataset.roundIndex = roundIndex.toString();
      match.dataset.matchIndex = i.toString();
      
      // Déterminer les joueurs pour ce match
      let player1: TournamentPlayer | null = null;
      let player2: TournamentPlayer | null = null;
      let player1Name = "TBD";
      let player2Name = "TBD";
      
      if (config && roundIndex === 0) {
        // Premier tour: utiliser les nicknames fournis
        const baseIndex = i * 2;
        if (baseIndex < config.players.length) {
          player1 = config.players[baseIndex];
          player1Name = player1.nickname;
        }
        if (baseIndex + 1 < config.players.length) {
          player2 = config.players[baseIndex + 1];
          player2Name = player2.nickname;
        }
      } 
      // Pour les tours après le premier tour, vérifier s'il y a des joueurs qualifiés
      else if (config && roundIndex > 0 && config.nextRounds && config.nextRounds[roundIndex]) {
        const matchData = config.nextRounds[roundIndex][i];
        if (matchData) {
          if (matchData[0]) {
            player1 = matchData[0];
            player1Name = player1.nickname;
          }
          if (matchData[1]) {
            player2 = matchData[1];
            player2Name = player2.nickname;
          }
        }
      }
      
      // Joueurs du match - Simplifié pour n'afficher que les noms
      const player1Div = document.createElement('div');
      player1Div.className = 'text-white font-semibold mb-1 truncate';
      player1Div.textContent = player1Name;
      player1Div.id = `r${roundIndex}-m${i}-p1`;
      player1Div.title = player1Name; // Add tooltip for truncated names
      
      const player2Div = document.createElement('div');
      player2Div.className = 'text-white font-semibold truncate';
      player2Div.textContent = player2Name;
      player2Div.id = `r${roundIndex}-m${i}-p2`;
      player2Div.title = player2Name; // Add tooltip for truncated names
      
      match.appendChild(player1Div);
      match.appendChild(player2Div);
      
      // Ajouter l'événement de clic seulement si le match n'est pas complété
      // et si les deux joueurs sont connus
      if (!isMatchCompleted && player1 && player2) {
        match.classList.add('hover:bg-gray-700');
        match.addEventListener('click', () => {
          startTournamentMatch(roundIndex, i, player1!, player2!);
        });
      }
      
      roundColumn.appendChild(match);
    }
    
    roundsContainer.appendChild(roundColumn);
  });

  bracket.appendChild(roundsContainer);
  bracketContainer.appendChild(bracket);

  return bracketContainer;
}

// Corriger la fonction shuffleArray
function shuffleArray<T>(array: T[]): T[] {
  // Création d'une copie pour ne pas modifier l'original
  const shuffled = [...array];
  
  // Algorithme de Fisher-Yates pour mélanger le tableau
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];  }
  
  return shuffled;
}

// Structure pour suivre le match en cours
interface CurrentMatch {
  roundIndex: number;
  matchIndex: number;
  player1: TournamentPlayer;
  player2: TournamentPlayer;
  source: string; // Ajout de cette propriété pour identifier la source du match
}

// Fonction pour démarrer un match de tournoi
function startTournamentMatch(roundIndex: number, matchIndex: number, player1: TournamentPlayer, player2: TournamentPlayer): void {
  // Stocker les informations du match actuel
  const currentMatch: CurrentMatch = {
    roundIndex,
    matchIndex,
    player1,
    player2,
    source: 'tournament'
  };
  
  // Sauvegarder le match en cours dans localStorage
  localStorage.setItem('currentTournamentMatch', JSON.stringify(currentMatch));
  
  // Nettoyer l'indicateur d'abandon de match précédent
  localStorage.removeItem('matchAborted');
  
  // Naviguer vers le menu de personnalisation de Pong
  navigateTo('/pong');
}

export function updateTournamentWithWinner(
  config: TournamentConfig,
  roundIndex: number,
  matchIndex: number,
  winner: TournamentPlayer
): void {
  // Marquer le match comme complété
  if (!config.completedMatches) {
    config.completedMatches = {};
  }
  const matchKey = `${roundIndex}_${matchIndex}`;
  config.completedMatches[matchKey] = true;
  
  // Vérifier si c'est un match du premier tour ou des tours suivants
  if (roundIndex === 0) {
    // C'est un match du premier tour
    // Calculer l'indice du prochain match
    const nextMatchIndex = Math.floor(matchIndex / 2);
    const isFirstMatchOfPair = matchIndex % 2 === 0;
    
    // Calculer l'index du joueur dans le prochain match
    const playerIndexInNextMatch = isFirstMatchOfPair ? 0 : 1;
    
    // Assurez-vous que la structure existante pour le prochain tour
    if (!config.nextRounds) {
      config.nextRounds = {};
    }
    
    if (!config.nextRounds[1]) {
      config.nextRounds[1] = {};
    }
    
    if (!config.nextRounds[1][nextMatchIndex]) {
      config.nextRounds[1][nextMatchIndex] = [null, null];
    }
    
    // Placer le joueur gagnant dans le prochain match
    config.nextRounds[1][nextMatchIndex][playerIndexInNextMatch] = winner;
  } else {
    // C'est un match de tours suivants
    const nextRoundIndex = roundIndex + 1;
    const nextMatchIndex = Math.floor(matchIndex / 2);
    const isFirstMatchOfPair = matchIndex % 2 === 0;
    
    // Calculer l'index du joueur dans le prochain match
    const playerIndexInNextMatch = isFirstMatchOfPair ? 0 : 1;
    
    // Assurez-vous que la structure existante pour le prochain tour
    if (!config.nextRounds) {
      config.nextRounds = {};
    }
    
    if (!config.nextRounds[nextRoundIndex]) {
      config.nextRounds[nextRoundIndex] = {};
    }
    
    if (!config.nextRounds[nextRoundIndex][nextMatchIndex]) {
      config.nextRounds[nextRoundIndex][nextMatchIndex] = [null, null];
    }
    
    // Placer le joueur gagnant dans le prochain match
    config.nextRounds[nextRoundIndex][nextMatchIndex][playerIndexInNextMatch] = winner;
  }
  
  // Vérifier si c'est la finale
  const isLastRound = (config.playerCount === 4 && roundIndex === 1) || 
                   (config.playerCount === 8 && roundIndex === 2);

  if (isLastRound && matchIndex === 0) {
    // C'est la finale, on a un gagnant du tournoi!
    config.winner = winner;
    
    // No need to update any element here as the page will be refreshed 
    // and the winner celebration will be shown
  }

  // Sauvegarder la configuration mise à jour
  localStorage.setItem('tournamentConfig', JSON.stringify(config));
}

function createWinnerCelebration(winner: TournamentPlayer): HTMLElement {
  const celebrationContainer = document.createElement('div');
  celebrationContainer.className = 'Parent flex-col items-center bg-gray-900 bg-opacity-70 p-6 md:p-12 rounded-lg border-4 border-gold shadow-2xl w-full max-w-3xl';

  // Add trophy icon
  const trophyIcon = document.createElement('div');
  trophyIcon.className = 'text-4xl md:text-6xl text-yellow-400 mb-4';
  trophyIcon.innerHTML = '🏆';
  celebrationContainer.appendChild(trophyIcon);

  // Add winner title (use translation)
  const winnerTitle = document.createElement('h2');
  winnerTitle.className = 'text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4 md:mb-6';
  winnerTitle.textContent = t('Winner');
  celebrationContainer.appendChild(winnerTitle);

  // Winner name
  const winnerName = document.createElement('div');
  winnerName.className = 'text-3xl md:text-5xl font-extrabold text-white mb-6 md:mb-8';
  winnerName.textContent = winner.nickname;
  celebrationContainer.appendChild(winnerName);

  return celebrationContainer;
}