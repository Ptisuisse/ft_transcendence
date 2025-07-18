import '../style.css';
import { navigateTo } from '../routes.ts';
import { translations } from '../i18n.ts';
import { getCurrentLang } from '../components/navbar.ts';

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
  nextRounds?: {
    [roundIndex: number]: {
      [matchIndex: number]: [TournamentPlayer | null, TournamentPlayer | null];
    }
  };
  completedMatches?: {
    [matchKey: string]: boolean;
  };
  winner?: TournamentPlayer;
}

export function PongTournamentPage(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center py-8';

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

  const tournamentSection = document.createElement('div');
  tournamentSection.className = 'w-full max-w-4xl';
  container.appendChild(tournamentSection);

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

  const savedConfig = localStorage.getItem('tournamentConfig');
  
  if (savedConfig) {
    try {
      const tournamentConfig = JSON.parse(savedConfig);
      
      if (tournamentConfig.winner) {
        const winnerCelebration = createWinnerCelebration(tournamentConfig.winner);
        tournamentSection.appendChild(winnerCelebration);
        
        const newTournamentBtn = document.createElement('button');
        newTournamentBtn.className = 'px-8 py-4 mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md transition shadow-lg hover:shadow-xl text-xl font-bold';
        newTournamentBtn.textContent = t('CreateTournament');
        newTournamentBtn.addEventListener('click', () => {
          localStorage.removeItem('tournamentConfig');
          showPlayerCountModal(tournamentSection);
        });
        
        buttonsContainer.innerHTML = '';
        buttonsContainer.appendChild(newTournamentBtn);
        buttonsContainer.appendChild(backToMenuBtn);

        if (pageTitle.parentNode) {
          pageTitle.parentNode.removeChild(pageTitle);
        }
      } else {
        const bracketContainer = createTournamentBracket(tournamentConfig);
        tournamentSection.appendChild(bracketContainer);
        
        const newTournamentBtn = document.createElement('button');
        newTournamentBtn.className = 'px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition shadow-md hover:shadow-lg';
        newTournamentBtn.textContent = t('CreateTournament');
        newTournamentBtn.addEventListener('click', () => {
          showPlayerCountModal(tournamentSection);
        });
        
        buttonsContainer.insertBefore(newTournamentBtn, backToMenuBtn);
      }
    } catch (e) {
      console.error('Failed to parse tournament config', e);
      showPlayerCountModal(tournamentSection);
    }
  } else {
    setTimeout(() => {
      showPlayerCountModal(tournamentSection);
    }, 100);
  }

  return container;
}

function showPlayerCountModal(tournamentSection: HTMLElement): void {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  
  const modal = document.createElement('div');
  modal.className = 'bg-gray-800 border-2 border-purple-500 rounded-lg p-6 shadow-xl w-full max-w-md';
  
  const modalTitle = document.createElement('h2');
  modalTitle.className = 'text-white text-2xl font-bold mb-6 text-center';
  modalTitle.textContent = t('ParticipantsNumber');
  modal.appendChild(modalTitle);

  const instructions = document.createElement('p');
  instructions.className = 'text-gray-300 mb-6 text-center';
  instructions.textContent = t('ParticipantsNumber') + ':';
  modal.appendChild(instructions);

  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'flex gap-6 justify-center';

  const fourPlayersBtn = document.createElement('button');
  fourPlayersBtn.className = 'flex-1 py-4 px-6 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition-colors font-bold text-xl';
  fourPlayersBtn.textContent = '4 ' + t('Players');
  fourPlayersBtn.addEventListener('click', () => {
    document.body.removeChild(modalOverlay);
    showPlayerNamesModal(tournamentSection, 4);
  });

  const eightPlayersBtn = document.createElement('button');
  eightPlayersBtn.className = 'flex-1 py-4 px-6 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 transition-colors font-bold text-xl';
  eightPlayersBtn.textContent = '8 ' + t('Players');
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
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  
  const modal = document.createElement('div');
  modal.className = 'bg-gray-800 border-2 border-purple-500 rounded-lg p-6 shadow-xl w-full max-w-md';
  
  const modalTitle = document.createElement('h2');
  modalTitle.className = 'text-white text-2xl font-bold mb-6 text-center';
  modalTitle.textContent = `${t('Players')} (${playerCount})`;
  modal.appendChild(modalTitle);

  const playersSection = document.createElement('div');
  playersSection.className = 'mb-6 max-h-60 overflow-y-auto';
  
  for (let i = 0; i < playerCount; i++) {
    const playerRow = document.createElement('div');
    playerRow.className = 'mb-4';
    
    const playerLabel = document.createElement('label');
    playerLabel.className = 'text-white text-sm block mb-1';
    playerLabel.textContent = `${t('Player')} ${i + 1}:`;
    
    const playerInput = document.createElement('input');
    playerInput.className = 'w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-purple-500';
    playerInput.type = 'text';
    playerInput.id = `player-${i}`;
    playerInput.placeholder = `${t('Player')} ${i + 1}`;
    playerInput.value = `${t('Player')} ${i + 1}`;
    
    playerRow.appendChild(playerLabel);
    playerRow.appendChild(playerInput);
    playersSection.appendChild(playerRow);
  }
  
  modal.appendChild(playersSection);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'flex gap-4';

  const backBtn = document.createElement('button');
  backBtn.className = 'flex-1 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-bold';
  backBtn.textContent = t('BackToMenu');
  backBtn.addEventListener('click', () => {
    document.body.removeChild(modalOverlay);
    navigateTo('https://localhost');
  });

  const startTournamentBtn = document.createElement('button');
  startTournamentBtn.className = 'flex-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-bold';
  startTournamentBtn.textContent = t('CreateTournament');
  startTournamentBtn.addEventListener('click', () => {
    const players: TournamentPlayer[] = [];
    for (let i = 0; i < playerCount; i++) {
      const input = document.getElementById(`player-${i}`) as HTMLInputElement;
      const nickname = input.value.trim() || `${t('Player')} ${i + 1}`;
      players.push({ id: i + 1, nickname });
    }

    const shuffledPlayers = shuffleArray(players);
    
    const config: TournamentConfig = {
      playerCount: playerCount,
      players: shuffledPlayers
    };

    localStorage.setItem('tournamentConfig', JSON.stringify(config));

    tournamentSection.innerHTML = '';
    const bracketContainer = createTournamentBracket(config);
    tournamentSection.appendChild(bracketContainer);

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

  const bracket = document.createElement('div');
  bracket.className = 'w-full';

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

  const roundsContainer = document.createElement('div');
  roundsContainer.className = 'Parent p-5';

  rounds.forEach((round, roundIndex) => {
    const roundColumn = document.createElement('div');
    roundColumn.className = 'flex flex-col gap-4';
    
    for (let i = 0; i < round.matches; i++) {
      const match = document.createElement('div');
      
      const matchKey = `${roundIndex}_${i}`;
      const isMatchCompleted = config?.completedMatches?.[matchKey] === true;
      
      match.className = 'border rounded p-3 bg-gray-800 transition-all';

      match.style.width = 'min(100%, 12rem)';
      
      if (isMatchCompleted) {
        match.className += ' border-green-700 opacity-90';
      } else {
        match.className += ' border-cyan-700 hover:border-pink-500 cursor-pointer';
      }
      
      match.dataset.roundIndex = roundIndex.toString();
      match.dataset.matchIndex = i.toString();
      
      let player1: TournamentPlayer | null = null;
      let player2: TournamentPlayer | null = null;
      let player1Name = "TBD";
      let player2Name = "TBD";
      
      if (config && roundIndex === 0) {
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
      
      const player1Div = document.createElement('div');
      player1Div.className = 'text-white font-semibold mb-1 truncate';
      player1Div.textContent = player1Name;
      player1Div.id = `r${roundIndex}-m${i}-p1`;
      player1Div.title = player1Name;
      
      const player2Div = document.createElement('div');
      player2Div.className = 'text-white font-semibold truncate';
      player2Div.textContent = player2Name;
      player2Div.id = `r${roundIndex}-m${i}-p2`;
      player2Div.title = player2Name;
      
      match.appendChild(player1Div);
      match.appendChild(player2Div);
      
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

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];  }
  return shuffled;
}

interface CurrentMatch {
  roundIndex: number;
  matchIndex: number;
  player1: TournamentPlayer;
  player2: TournamentPlayer;
  source: string;
}

function startTournamentMatch(roundIndex: number, matchIndex: number, player1: TournamentPlayer, player2: TournamentPlayer): void {
  const currentMatch: CurrentMatch = {
    roundIndex,
    matchIndex,
    player1,
    player2,
    source: 'tournament'
  };
  localStorage.setItem('currentTournamentMatch', JSON.stringify(currentMatch));
  localStorage.removeItem('matchAborted');
  navigateTo('/pong');
}

export function updateTournamentWithWinner(
  config: TournamentConfig,
  roundIndex: number,
  matchIndex: number,
  winner: TournamentPlayer
): void {
  if (!config.completedMatches) {
    config.completedMatches = {};
  }
  const matchKey = `${roundIndex}_${matchIndex}`;
  config.completedMatches[matchKey] = true;
  if (roundIndex === 0) {
    const nextMatchIndex = Math.floor(matchIndex / 2);
    const isFirstMatchOfPair = matchIndex % 2 === 0;
    const playerIndexInNextMatch = isFirstMatchOfPair ? 0 : 1;
    if (!config.nextRounds) {
      config.nextRounds = {};
    }
    if (!config.nextRounds[1]) {
      config.nextRounds[1] = {};
    }
    if (!config.nextRounds[1][nextMatchIndex]) {
      config.nextRounds[1][nextMatchIndex] = [null, null];
    }
    config.nextRounds[1][nextMatchIndex][playerIndexInNextMatch] = winner;
  } else {
    const nextRoundIndex = roundIndex + 1;
    const nextMatchIndex = Math.floor(matchIndex / 2);
    const isFirstMatchOfPair = matchIndex % 2 === 0;
    const playerIndexInNextMatch = isFirstMatchOfPair ? 0 : 1;
    if (!config.nextRounds) {
      config.nextRounds = {};
    }
    if (!config.nextRounds[nextRoundIndex]) {
      config.nextRounds[nextRoundIndex] = {};
    }
    if (!config.nextRounds[nextRoundIndex][nextMatchIndex]) {
      config.nextRounds[nextRoundIndex][nextMatchIndex] = [null, null];
    }
    config.nextRounds[nextRoundIndex][nextMatchIndex][playerIndexInNextMatch] = winner;
  }
  const isLastRound = (config.playerCount === 4 && roundIndex === 1) || 
                   (config.playerCount === 8 && roundIndex === 2);
  if (isLastRound && matchIndex === 0) {
    config.winner = winner;
  }
  localStorage.setItem('tournamentConfig', JSON.stringify(config));
}

function createWinnerCelebration(winner: TournamentPlayer): HTMLElement {
  const celebrationContainer = document.createElement('div');
  celebrationContainer.className = 'Parent flex-col items-center bg-gray-900 bg-opacity-70 p-6 md:p-12 rounded-lg border-4 border-gold shadow-2xl w-full max-w-3xl';
  const trophyIcon = document.createElement('div');
  trophyIcon.className = 'text-4xl md:text-6xl text-yellow-400 mb-4';
  trophyIcon.innerHTML = '🏆';
  celebrationContainer.appendChild(trophyIcon);
  const winnerTitle = document.createElement('h2');
  winnerTitle.className = 'text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4 md:mb-6';
  winnerTitle.textContent = t('Winner');
  celebrationContainer.appendChild(winnerTitle);
  const winnerName = document.createElement('div');
  winnerName.className = 'text-3xl md:text-5xl font-extrabold text-white mb-6 md:mb-8';
  winnerName.textContent = winner.nickname;
  celebrationContainer.appendChild(winnerName);
  return celebrationContainer;
}