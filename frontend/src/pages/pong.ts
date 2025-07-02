import '../style.css';
import { navigateTo } from '../routes.ts';
import { translations } from '../i18n.ts';
import { getCurrentLang } from '../components/navbar.ts';
import { updateTournamentWithWinner } from './tournament.ts';
import type { TournamentPlayer } from './tournament.ts';
import { gameState } from '../gameState.ts';

// Translation helper function
function t(key: string): string {
  const lang = getCurrentLang();
  const langTranslations = translations[lang as keyof typeof translations] || translations.en;
  return langTranslations[key as keyof typeof langTranslations] || translations.en[key as keyof typeof translations.en] || key;
}

// Stockage des paramètres entre les pages
interface PongSettings {
  ballColor: string;
  leftPaddleColor: string;
  rightPaddleColor: string;
  aiEnabled: boolean;
  powerupsEnabled: boolean; // New setting for power-ups
}

// Page du menu
export function PongMenuPage(): HTMLElement {
  const element = document.createElement('div');
  // Replace the current className with Parent for responsive layout
  element.className = 'Parent p-5 flex flex-col items-center';
  
  // Make the menu container responsive
  const menuModal = document.createElement('div');
  menuModal.className = 'w-full max-w-[400px] bg-gray-800 border-2 border-purple-500 rounded-lg p-4 sm:p-6 shadow-xl mx-auto';

  // Vérifier si c'est un match de tournoi
  const isTournamentMatch = localStorage.getItem('currentTournamentMatch') !== null;
  let currentMatch: any = null;
  
  if (isTournamentMatch) {
    try {
      currentMatch = JSON.parse(localStorage.getItem('currentTournamentMatch')!);
    } catch (e) {
      console.error('Failed to parse tournament match data');
    }
  }

  // Menu title
  const menuTitle = document.createElement('h2');
  menuTitle.className = 'text-white text-2xl font-bold mb-6 text-center';
  menuTitle.textContent = isTournamentMatch ? t('TournamentMatch') : translations[getCurrentLang()].PongSettings;
  menuModal.appendChild(menuTitle);

  // Afficher les joueurs du tournoi si c'est un match de tournoi
  if (isTournamentMatch && currentMatch) {
    const playersInfo = document.createElement('div');
    playersInfo.className = 'bg-gray-700 p-3 rounded-md mb-6 text-center';
    playersInfo.innerHTML = `
      <p class="text-white mb-2">${t('Player')} 1: <span class="font-bold text-red-400">${currentMatch.player1.nickname}</span></p>
      <p class="text-white">VS</p>
      <p class="text-white mt-2">${t('Player')} 2: <span class="font-bold text-blue-400">${currentMatch.player2.nickname}</span></p>
    `;
    menuModal.appendChild(playersInfo);
  }

  // Ball color selection
  const colorSection = document.createElement('div');
  colorSection.className = 'mb-6';
  
  const colorLabel = document.createElement('p');
  colorLabel.className = 'text-white mb-2';
  colorLabel.textContent = translations[getCurrentLang()].BallColor;
  colorSection.appendChild(colorLabel);
  
  const ballColorPicker = document.createElement('input');
  ballColorPicker.type = 'color';
  ballColorPicker.className = 'w-full h-10 cursor-pointer';
  ballColorPicker.value = '#FFFFFF';
  colorSection.appendChild(ballColorPicker);
  menuModal.appendChild(colorSection);
  
  // Left paddle selection
  const leftPaddleSection = document.createElement('div');
  leftPaddleSection.className = 'mb-6';
  
  const leftPaddleLabel = document.createElement('p');
  leftPaddleLabel.className = 'text-white mb-2';
  leftPaddleLabel.textContent = translations[getCurrentLang()].LeftPaddleColor; 
  leftPaddleSection.appendChild(leftPaddleLabel);
  
  const leftPaddleColorPicker = document.createElement('input');
  leftPaddleColorPicker.type = 'color';
  leftPaddleColorPicker.className = 'w-full h-10 cursor-pointer';
  leftPaddleColorPicker.value = '#FF0000';
  leftPaddleSection.appendChild(leftPaddleColorPicker);
  menuModal.appendChild(leftPaddleSection);
  
  // Right paddle selection
  const rightPaddleSection = document.createElement('div');
  rightPaddleSection.className = 'mb-6';
  
  const rightPaddleLabel = document.createElement('p');
  rightPaddleLabel.className = 'text-white mb-2';
  rightPaddleLabel.textContent = translations[getCurrentLang()].RightPaddleColor;
  rightPaddleSection.appendChild(rightPaddleLabel);
  
  const rightPaddleColorPicker = document.createElement('input');
  rightPaddleColorPicker.type = 'color';
  rightPaddleColorPicker.className = 'w-full h-10 cursor-pointer';
  rightPaddleColorPicker.value = '#00AAFF';
  rightPaddleSection.appendChild(rightPaddleColorPicker);
  menuModal.appendChild(rightPaddleSection);
  
  // AI section - afficher uniquement si ce n'est PAS un match de tournoi
  if (!isTournamentMatch) {
    const aiSection = document.createElement('div');
    aiSection.className = 'mb-6';
    
    const aiLabel = document.createElement('p');
    aiLabel.className = 'text-white mb-2';
    aiLabel.textContent = translations[getCurrentLang()].EnableIA;
    aiSection.appendChild(aiLabel);

    // AI toggle
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'flex items-center justify-between';

    const humanLabel = document.createElement('span');
    humanLabel.className = 'text-white text-sm';
    humanLabel.textContent = translations[getCurrentLang()].TwoPlayers;

    const aiLabel2 = document.createElement('span');
    aiLabel2.className = 'text-white text-sm';
    aiLabel2.textContent = translations[getCurrentLang()].VersusIA;

    const toggleSwitch = document.createElement('label');
    toggleSwitch.className = 'relative inline-block w-12 h-6 mx-4';

    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';
    toggleInput.className = 'opacity-0 w-0 h-0';
    toggleInput.checked = false;

    const toggleSlider = document.createElement('span');
    toggleSlider.className = 'absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-400 rounded-full transition-all duration-300';
    toggleSlider.style.transition = '0.4s';
    
    const toggleButton = document.createElement('span');
    toggleButton.className = 'absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-300';
    toggleButton.style.transition = '0.4s';
    
    toggleInput.addEventListener('change', () => {
      if (toggleInput.checked) {
        toggleSlider.classList.remove('bg-gray-400');
        toggleSlider.classList.add('bg-green-500');
        toggleButton.style.transform = 'translateX(24px)';
      } else {
        toggleSlider.classList.remove('bg-green-500');
        toggleSlider.classList.add('bg-gray-400');
        toggleButton.style.transform = 'translateX(0)';
      }
    });
    
    toggleSlider.appendChild(toggleButton);
    toggleSwitch.appendChild(toggleInput);
    toggleSwitch.appendChild(toggleSlider);
    toggleContainer.appendChild(humanLabel);
    toggleContainer.appendChild(toggleSwitch);
    toggleContainer.appendChild(aiLabel2);
    
    aiSection.appendChild(toggleContainer);
    menuModal.appendChild(aiSection);
  }
  
  // Power-ups section
  const powerupsSection = document.createElement('div');
  powerupsSection.className = 'mb-6';

  const powerupsLabel = document.createElement('p');
  powerupsLabel.className = 'text-white mb-2';
  powerupsLabel.textContent = translations[getCurrentLang()].EnablePowerups || "Enable Power-ups";
  powerupsSection.appendChild(powerupsLabel);

  // Power-ups toggle
  const powerupsContainer = document.createElement('div');
  powerupsContainer.className = 'flex items-center justify-between';

  const normalGameLabel = document.createElement('span');
  normalGameLabel.className = 'text-white text-sm';
  normalGameLabel.textContent = translations[getCurrentLang()].NormalGame || "Normal Game";

  const powerupsGameLabel = document.createElement('span');
  powerupsGameLabel.className = 'text-white text-sm';
  powerupsGameLabel.textContent = translations[getCurrentLang()].PowerupsGame || "Power-ups";

  const powerupsToggleSwitch = document.createElement('label');
  powerupsToggleSwitch.className = 'relative inline-block w-12 h-6 mx-4';

  const powerupsToggleInput = document.createElement('input');
  powerupsToggleInput.type = 'checkbox';
  powerupsToggleInput.className = 'opacity-0 w-0 h-0';
  powerupsToggleInput.id = 'powerups-toggle'; // Ajout d'un ID
  powerupsToggleInput.checked = false;

  const powerupsToggleSlider = document.createElement('span');
  powerupsToggleSlider.className = 'absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-400 rounded-full transition-all duration-300';
  powerupsToggleSlider.style.transition = '0.4s';

  const powerupsToggleButton = document.createElement('span');
  powerupsToggleButton.className = 'absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-300';
  powerupsToggleButton.style.transition = '0.4s';

  powerupsToggleInput.addEventListener('change', () => {
    if (powerupsToggleInput.checked) {
      powerupsToggleSlider.classList.remove('bg-gray-400');
      powerupsToggleSlider.classList.add('bg-green-500');
      powerupsToggleButton.style.transform = 'translateX(24px)';
    } else {
      powerupsToggleSlider.classList.remove('bg-green-500');
      powerupsToggleSlider.classList.add('bg-gray-400');
      powerupsToggleButton.style.transform = 'translateX(0)';
    }
  });

  powerupsToggleSlider.appendChild(powerupsToggleButton);
  powerupsToggleSwitch.appendChild(powerupsToggleInput);
  powerupsToggleSwitch.appendChild(powerupsToggleSlider);
  powerupsContainer.appendChild(normalGameLabel);
  powerupsContainer.appendChild(powerupsToggleSwitch);
  powerupsContainer.appendChild(powerupsGameLabel);

  powerupsSection.appendChild(powerupsContainer);
  menuModal.appendChild(powerupsSection);
  
  // Start button
  const startButton = document.createElement('button');
  startButton.className = 'w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors font-bold';
  startButton.textContent = translations[getCurrentLang()].StartGame;
  startButton.addEventListener('click', () => {
    // Sauvegarder les paramètres
    const settings: PongSettings = {
      ballColor: ballColorPicker.value,
      leftPaddleColor: leftPaddleColorPicker.value,
      rightPaddleColor: rightPaddleColorPicker.value,
      aiEnabled: isTournamentMatch ? false : (document.querySelector('input[type="checkbox"]') as HTMLInputElement)?.checked || false,
      powerupsEnabled: (document.getElementById('powerups-toggle') as HTMLInputElement)?.checked || false
    };
    
    // Stocker dans localStorage pour y accéder depuis la page de jeu
    localStorage.setItem('pongSettings', JSON.stringify(settings));
    
    // Naviguer vers la page de jeu
    navigateTo('/pong/game');
  });
  
  // Ajouter un bouton pour annuler le match de tournoi si nécessaire
  if (isTournamentMatch) {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'w-full flex gap-4';
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors font-bold';
    cancelButton.textContent = t('CancelMatch');
    cancelButton.addEventListener('click', () => {
      localStorage.removeItem('currentTournamentMatch');
      navigateTo('/pong/tournament');
    });
    
    startButton.className = 'flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors font-bold';
    
    buttonsContainer.appendChild(cancelButton);
    buttonsContainer.appendChild(startButton);
    menuModal.appendChild(buttonsContainer);
  } else {
    menuModal.appendChild(startButton);
  }
  
  element.appendChild(menuModal);
  return element;
}

// Page du jeu
export function PongGamePage(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'Parent p-5';
  
  // Make game wrapper responsive
  const gameWrapper = document.createElement('div');
  gameWrapper.className = 'relative w-full max-w-[800px] mx-auto';
  
  // Charger les paramètres
  let settings: PongSettings = {
    ballColor: '#FFFFFF',
    leftPaddleColor: '#FF0000',
    rightPaddleColor: '#00AAFF',
    aiEnabled: false,
    powerupsEnabled: false // Valeur par défaut pour les power-ups
  };
  
  try {
    const savedSettings = localStorage.getItem('pongSettings');
    if (savedSettings) {
      settings = JSON.parse(savedSettings);
    }
  } catch (error) {
    console.error('Failed to load game settings:', error);
  }
  
  // Tableau de score
  const scoreBoard = createScoreBoard(settings.leftPaddleColor, settings.rightPaddleColor);
  gameWrapper.appendChild(scoreBoard);
  
  // Conteneur de jeu
  const gameContainer = createGameContainer(settings.leftPaddleColor, settings.rightPaddleColor);
  gameWrapper.appendChild(gameContainer);
  
  // Message de fin de jeu (initialement caché)
  const gameOverMessage = document.createElement('div');
  gameOverMessage.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-90 p-6 rounded-lg text-center hidden';
  gameOverMessage.id = 'game-over-message';
  
  const gameOverText = document.createElement('h2');
  gameOverText.className = 'text-white text-2xl mb-4';
  gameOverText.id = 'winner-text';
  gameOverMessage.appendChild(gameOverText);
  
  gameWrapper.appendChild(gameOverMessage);
  
  // Vérifier si le jeu fait partie d'un match de tournoi valide
  let isTournamentMatch = false;
  let currentMatchData = localStorage.getItem('currentTournamentMatch');

  if (currentMatchData) {
    try {
      const currentMatch = JSON.parse(currentMatchData);
      // Vérifier que le match vient bien de la page de tournoi
      isTournamentMatch = currentMatch && currentMatch.source === 'tournament';
      
      if (!isTournamentMatch) {
        // Si ce n'est pas un match valide, nettoyer le localStorage
        localStorage.removeItem('currentTournamentMatch');
        console.log('Match de tournoi invalide détecté et nettoyé');
      }
    } catch (e) {
      // En cas d'erreur de parsing, nettoyer
      localStorage.removeItem('currentTournamentMatch');
      console.error('Erreur lors de la vérification du match de tournoi', e);
    }
  }

  // Create appropriate button based on context
  const menuButton = document.createElement('button');
  menuButton.className = 'mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors self-center';

  if (isTournamentMatch) {
    menuButton.textContent = 'Return to Tournament';
    menuButton.addEventListener('click', () => {
      // Nettoyage avant navigation
      if (typeof cleanup === 'function') {
        cleanup();
      }
      navigateTo('/pong/tournament');
    });
  } else {
    menuButton.textContent = translations[getCurrentLang()].BackToMenu;
    menuButton.addEventListener('click', () => {
      // Nettoyage avant navigation
      if (typeof cleanup === 'function') {
        cleanup();
      }
      navigateTo('/pong');
    });
  }
  
  element.appendChild(gameWrapper);
  element.appendChild(menuButton);
  
  // Démarrer le jeu avec un léger délai pour laisser le DOM se mettre en place
  let cleanup: (() => void) | undefined;
  setTimeout(() => {
    const ball = document.getElementById('ball');
    if (ball) ball.style.backgroundColor = settings.ballColor;
    const result = setupPaddleMovement(settings.aiEnabled, settings.powerupsEnabled);
    cleanup = result.cleanup;
    
    // Register the cleanup function with the global game state
    gameState.registerCleanup(result.cleanup);
    
    // Gestion de la fin de partie
    result.gameOverPromise.then(winner => {
      const gameOverMessage = document.getElementById('game-over-message');
      const winnerText = document.getElementById('winner-text');
      
      if (gameOverMessage && winnerText) {
        winnerText.textContent = winner === 'left' 
          ? `${translations[getCurrentLang()].LeftPlayerWins}!` 
          : `${translations[getCurrentLang()].RightPlayerWins}!`;
        gameOverMessage.classList.remove('hidden');
        
        // Si c'est un match de tournoi, mettre à jour le tournoi avec le gagnant
        const matchData = localStorage.getItem('currentTournamentMatch');
        const matchAborted = localStorage.getItem('matchAborted');
        
        // Ne pas mettre à jour le tournoi si le match a été abandonné
        if (matchData && !matchAborted) {
          try {
            const currentMatch = JSON.parse(matchData) as {
              roundIndex: number;
              matchIndex: number;
              player1: TournamentPlayer;
              player2: TournamentPlayer;
            };
            
            // Récupérer la configuration du tournoi
            const tournamentConfigStr = localStorage.getItem('tournamentConfig');
            if (tournamentConfigStr) {
              const tournamentConfig = JSON.parse(tournamentConfigStr);
              
              // Déterminer le joueur gagnant (gauche = player1, droite = player2)
              const winningPlayer = winner === 'left' ? currentMatch.player1 : currentMatch.player2;
              
              // Mettre à jour le tournoi avec le gagnant
              updateTournamentWithWinner(
                tournamentConfig,
                currentMatch.roundIndex,
                currentMatch.matchIndex,
                winningPlayer
              );
              
              // Effacer les données du match actuel après un délai
              setTimeout(() => {
                localStorage.removeItem('currentTournamentMatch');
              }, 2000);
            }
          } catch (e) {
            console.error('Error updating tournament with winner', e);
          }
        } else if (matchAborted) {
          // Nettoyer les données si le match a été abandonné
          localStorage.removeItem('currentTournamentMatch');
          localStorage.removeItem('matchAborted');
        }
      }
    });
    
    // Ajouter l'écouteur d'événement beforeunload
    const handleBeforeUnload = () => {
      gameState.executeCleanup();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Store a reference to remove it later if needed
    (element as any).__cleanupHandler = handleBeforeUnload;
  }, 100);
  
  // Ne retourner que l'élément HTML, pas de fonction de nettoyage
  return element;
}

// Legacy function for backwards compatibility
export function PongPage(): HTMLElement {
  return PongMenuPage();
}

// Fonctions utilitaires modifiées pour utiliser les paramètres
function createScoreBoard(leftColor = '#FF0000', rightColor = '#00AAFF'): HTMLDivElement {
  const scoreBoard = document.createElement('div');
  // Make it responsive
  scoreBoard.className = 'flex justify-center items-center w-full max-w-[800px] mb-2 sm:mb-4 text-2xl sm:text-4xl font-bold';
  
  const leftScore = document.createElement('div');
  leftScore.className = 'mx-8';
  leftScore.id = 'left-score';
  leftScore.textContent = '0';
  leftScore.style.color = leftColor;
  
  const scoreLabel = document.createElement('div');
  scoreLabel.className = 'text-white';
  scoreLabel.textContent = '-';
  
  const rightScore = document.createElement('div');
  rightScore.className = 'mx-8';
  rightScore.id = 'right-score';
  rightScore.textContent = '0';
  rightScore.style.color = rightColor;
  
  scoreBoard.appendChild(leftScore);
  scoreBoard.appendChild(scoreLabel);
  scoreBoard.appendChild(rightScore);
  
  return scoreBoard;
}

function createGameContainer(leftColor = '#FF0000', rightColor = '#00AAFF'): HTMLDivElement {
  const border = document.createElement('div');
  // Make it responsive with aspect ratio preservation
  border.className = 'border-2 border-solid border-green-500 w-full max-w-[800px] aspect-[4/3] bg-gray-900 relative overflow-hidden';
  border.id = 'game-container';
  
  const leftPaddle = document.createElement('div');
  leftPaddle.className = 'absolute left-[10px] top-0 w-[15px] h-[100px]';
  leftPaddle.id = 'left-paddle';
  leftPaddle.style.backgroundColor = leftColor;
  leftPaddle.style.willChange = 'transform, height';
  // Ne pas définir de position Y initiale fixe
  leftPaddle.style.transition = 'height 0.3s ease-in-out';
  
  const rightPaddle = document.createElement('div');
  rightPaddle.className = 'absolute right-[10px] top-0 w-[15px] h-[100px]';
  rightPaddle.id = 'right-paddle';
  rightPaddle.style.backgroundColor = rightColor;
  rightPaddle.style.willChange = 'transform, height';
  // Ne pas définir de position Y initiale fixe
  rightPaddle.style.transition = 'height 0.3s ease-in-out';

  const ball = document.createElement('div');
  ball.className = 'absolute w-[20px] h-[20px] rounded-full';
  ball.id = 'ball';
  ball.style.willChange = 'transform';
  
  border.appendChild(leftPaddle);
  border.appendChild(rightPaddle);
  border.appendChild(ball);
  
  return border;
}

// Garder le reste des fonctions inchangées
function setupPaddleMovement(aiEnabled: boolean = false, powerupsEnabled: boolean = false) {
  const leftPaddle = document.getElementById('left-paddle');
  const rightPaddle = document.getElementById('right-paddle');
  const ball = document.getElementById('ball');
  const gameContainer = document.getElementById('game-container');
  const leftScoreElement = document.getElementById('left-score');
  const rightScoreElement = document.getElementById('right-score');

  if (!leftPaddle || !rightPaddle || !ball || !gameContainer || 
      !leftScoreElement || !rightScoreElement) return { cleanup: () => {}, gameOverPromise: Promise.resolve('none') };
  
  // Score variables
  let leftScore = 0;
  let rightScore = 0;
  const maxScore = 3; // Score maximum pour gagner
  let gameOver = false;
  let gameOverResolve: (winner: string) => void;
  
  // Promesse qui sera résolue quand un joueur gagne
  const gameOverPromise = new Promise<string>(resolve => {
    gameOverResolve = resolve;
  });
  
  // Cache initial dimensions to avoid layout thrashing
  const containerWidth = gameContainer.clientWidth;
  const containerHeight = gameContainer.clientHeight;
  const paddleHeight = 100;
  const ballSize = 20;  // Déplacé ici avant son utilisation
  
  // Calculer la position initiale en fonction de la hauteur du conteneur
  let leftPaddleY = (containerHeight - paddleHeight) / 2;
  let rightPaddleY = (containerHeight - paddleHeight) / 2;
  const paddleSpeed = 5;
  
  // Ball properties - centrer la balle dans le conteneur
  let ballX = (containerWidth - ballSize) / 2;
  let ballY = (containerHeight - ballSize) / 2;
  let initialSpeed = 4;
  let ballSpeedX = initialSpeed;
  let ballSpeedY = initialSpeed * 0.3;
  const speedIncrement = 1;
  let maxSpeed = 12;
  
  // Track pressed keys with state
  const keys = {
    w: false,
    s: false,
    arrowup: false,
    arrowdown: false
  };
  
  // Optimize key event handlers
  const keyDownHandler = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (key in keys) {
      keys[key as keyof typeof keys] = true;
      event.preventDefault();
    }
  };
  
  const keyUpHandler = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (key in keys) {
      keys[key as keyof typeof keys] = false;
    }
  };
  
  document.addEventListener('keydown', keyDownHandler, { passive: false });
  document.addEventListener('keyup', keyUpHandler, { passive: true });
  
  // Clean up function
  const cleanup = () => {
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('keyup', keyUpHandler);
    cancelAnimationFrame(animationFrameId);
    if (powerupTimer !== null) {
      clearTimeout(powerupTimer);
      powerupTimer = null;
    }
    // Clean up collectible if it exists
    if (collectibleElement && collectibleElement.parentNode) {
      gameContainer.removeChild(collectibleElement);
      collectibleElement = null;
    }
    gameOver = true;
    
    // Si on nettoie à cause d'une navigation, marquer le match comme abandonné
    const matchData = localStorage.getItem('currentTournamentMatch');
    if (matchData) {
      const matchAborted = { aborted: true };
      localStorage.setItem('matchAborted', JSON.stringify(matchAborted));
    }
  };
  
  // Optimized physics settings
  const fixedTimeStep = 1000 / 60; // Réduits à 60Hz pour plus de performance
  let lastTime = 0;
  let accumulator = 0;
  let animationFrameId = 0;
  
  // Précalculer des valeurs utilisées fréquemment
  const paddleTop = 0;
  // const paddleBottom = containerHeight - paddleHeight; // This variable is no longer needed
  // Remove this unused variable
  // const ballRight = containerWidth - ballSize;  
  const ballBottom = containerHeight - ballSize;
  const leftPaddleX = 25;
  const rightPaddleX = containerWidth - 25;
  
  let aiTargetY = rightPaddleY;
  let aiLastUpdate = performance.now();
  
  // Optimization: Create DOM operation buffer
  let pendingLeftPaddleY = leftPaddleY;
  let pendingRightPaddleY = rightPaddleY;
  let pendingBallX = ballX;
  let pendingBallY = ballY;
  
  // Define paddle dimensions for normal and power-up states
  const normalPaddleHeight = paddleHeight;
  const giantPaddleHeight = paddleHeight * 2;
  
  // Power-up state
  let powerupActive = false;
  let powerupAffectedPaddle: 'left' | 'right' | null = null;
  let powerupTimer: number | null = null;
  let powerupDuration = 5000; // 5 seconds
  let lastPowerupTime = 0;
  let powerupCooldown = 500; // 10 seconds between power-ups
  
  // Collectible state
  let collectibleElement: HTMLDivElement | null = null;
  let collectibleX = 0;
  let collectibleY = 0;
  
  // Modify the updatePhysics function to handle power-ups
  function updatePhysics()
  {
    // Move left paddle with keyboard input
    if (keys.w) leftPaddleY = Math.max(paddleTop, leftPaddleY - paddleSpeed);
    if (keys.s) {
      // Get current left paddle height based on power-up state
      const currentLeftPaddleHeight = powerupActive && powerupAffectedPaddle === 'left' 
        ? giantPaddleHeight 
        : normalPaddleHeight;
      // Dynamic bottom boundary
      const leftPaddleBottom = containerHeight - currentLeftPaddleHeight;
      leftPaddleY = Math.min(leftPaddleBottom, leftPaddleY + paddleSpeed);
    }
    
    // Move right paddle based on AI status
    if (aiEnabled)
    {
      //
      const now = performance.now(); // Add this line to define 'now'
      if (now - aiLastUpdate > 1000) {
        aiLastUpdate = now;

        // Prédire la position Y de la balle à l'arrivée sur la raquette droite
        if (ballSpeedX > 0) {
          let simX = ballX;
          let simY = ballY;
          let simSpeedX = ballSpeedX;
          let simSpeedY = ballSpeedY;

          while (simX + ballSize < rightPaddleX) {
            simX += simSpeedX;
            simY += simSpeedY;
            if (simY < 0) {
              simY = -simY;
              simSpeedY = -simSpeedY;
            } else if (simY > ballBottom) {
              simY = 2 * ballBottom - simY;
              simSpeedY = -simSpeedY;
            }
          }
          const currentRightPaddleHeight = powerupActive && powerupAffectedPaddle === 'right'
            ? giantPaddleHeight 
            : normalPaddleHeight;
          aiTargetY = simY + ballSize / 2 - currentRightPaddleHeight / 2;
        } else {
          aiTargetY = containerHeight / 2 - paddleHeight / 2;
        }
      }
      // Simule l'appui sur les touches pour déplacer la raquette
      if (Math.abs(rightPaddleY - aiTargetY) > paddleSpeed) {
        if (rightPaddleY < aiTargetY) {
          keys.arrowdown = true;
          keys.arrowup = false;
        } else if (rightPaddleY > aiTargetY) {
          keys.arrowup = true;
          keys.arrowdown = false;
        }
      } else {
        keys.arrowup = false;
        keys.arrowdown = false;
      }

      // Applique le déplacement comme un joueur humain
      if (keys.arrowup) rightPaddleY = Math.max(paddleTop, rightPaddleY - paddleSpeed);
      if (keys.arrowdown) {
        const currentRightPaddleHeight = powerupActive && powerupAffectedPaddle === 'right' 
          ? giantPaddleHeight 
          : normalPaddleHeight;
        const rightPaddleBottom = containerHeight - currentRightPaddleHeight;
        rightPaddleY = Math.min(rightPaddleBottom, rightPaddleY + paddleSpeed);
      }
    } 
    else 
    {
      if (keys.arrowup) rightPaddleY = Math.max(paddleTop, rightPaddleY - paddleSpeed);
      if (keys.arrowdown) {
        const currentRightPaddleHeight = powerupActive && powerupAffectedPaddle === 'right' 
          ? giantPaddleHeight 
          : normalPaddleHeight;
        const rightPaddleBottom = containerHeight - currentRightPaddleHeight;
        rightPaddleY = Math.min(rightPaddleBottom, rightPaddleY + paddleSpeed);
      }
    }
    // Sauvegarde la position précédente de la balle
    const prevBallX = ballX;

    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Optimized collision with top and bottom walls
    if (ballY < 0) {
      ballY = 0;
      ballSpeedY = -ballSpeedY;
    } else if (ballY > ballBottom) {
      ballY = ballBottom;
      ballSpeedY = -ballSpeedY;
    }
    
    // --- Correction collision continue ---

    // Left paddle collision (continuous)
    if (
      ballSpeedX < 0 && // Only check collision if ball is moving left
      prevBallX >= leftPaddleX && 
      ballX < leftPaddleX
    ) {
      // Ne pas appliquer de décalage à la position pour la détection de collision
      const effectiveLeftPaddleY = leftPaddleY;
      
      // Use the correct height based on power-up state
      const currentLeftPaddleHeight = powerupActive && powerupAffectedPaddle === 'left'
        ? giantPaddleHeight 
        : normalPaddleHeight;
      
      if (
        ballY + ballSize > effectiveLeftPaddleY &&
        ballY < effectiveLeftPaddleY + currentLeftPaddleHeight
      ) {
        const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
        const newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
        const speedRatio = newSpeed / currentSpeed;

        ballSpeedX = Math.abs(ballSpeedX) * speedRatio;
        // Use the middle of the current paddle height for hit calculation
        const hitPosition = (ballY + ballSize/2 - (effectiveLeftPaddleY + currentLeftPaddleHeight/2)) / (currentLeftPaddleHeight/2);
        ballSpeedY = newSpeed * hitPosition * 0.8;

        // Replace la balle juste à côté de la raquette
        ballX = leftPaddleX + 15;
      }
    }

    // Right paddle collision (continuous)
    if (
      ballSpeedX > 0 && // Only check collision if ball is moving right
      prevBallX + ballSize <= rightPaddleX && 
      ballX + ballSize > rightPaddleX
    ) {
      // Ne pas appliquer de décalage à la position pour la détection de collision
      const effectiveRightPaddleY = rightPaddleY;
      
      // Use the correct height based on power-up state
      const currentRightPaddleHeight = powerupActive && powerupAffectedPaddle === 'right'
        ? giantPaddleHeight 
        : normalPaddleHeight;
      
      if (
        ballY + ballSize > effectiveRightPaddleY &&
        ballY < effectiveRightPaddleY + currentRightPaddleHeight
      ) {
        const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
        const newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
        const speedRatio = newSpeed / currentSpeed;

        ballSpeedX = -Math.abs(ballSpeedX) * speedRatio;
        // Use the middle of the current paddle height for hit calculation
        const hitPosition = (ballY + ballSize/2 - (effectiveRightPaddleY + currentRightPaddleHeight/2)) / (currentRightPaddleHeight/2);
        ballSpeedY = newSpeed * hitPosition * 0.8;

        // Replace la balle juste à côté de la raquette
        ballX = rightPaddleX - ballSize;
      }
    }
    
    // Ball out of bounds - update score and reset
    if (ballX < -ballSize) {
      // Right player scores when ball goes past left boundary
      rightScore++;
      if (rightScoreElement) {
        rightScoreElement.textContent = rightScore.toString();
      }
      
      // Vérifier si le joueur de droite a gagné
      if (rightScore >= maxScore) {
        gameOver = true;
        gameOverResolve('right');
        return;
      }
      
      // Reset ball to center
      ballX = containerWidth / 2 - ballSize / 2;
      ballY = containerHeight / 2 - ballSize / 2;
      
      // Ball goes towards the player who just lost
      ballSpeedX = initialSpeed;
      ballSpeedY = (Math.random() * 2 - 1) * initialSpeed * 0.3;
    } else if (ballX > containerWidth) {
      // Left player scores when ball goes past right boundary
      leftScore++;
      if (leftScoreElement) {
        leftScoreElement.textContent = leftScore.toString();
      }
      
      // Vérifier si le joueur de gauche a gagné
      if (leftScore >= maxScore) {
        gameOver = true;
        gameOverResolve('left');
        return;
      }
      
      // Reset ball to center
      ballX = containerWidth / 2 - ballSize / 2;
      ballY = containerHeight / 2 - ballSize / 2;
      
      // Ball goes towards the player who just lost
      ballSpeedX = -initialSpeed;
      ballSpeedY = (Math.random() * 2 - 1) * initialSpeed * 0.3;
    }
    
    // Power-up logic (only if enabled)
    if (powerupsEnabled && gameContainer) {
      const now = performance.now();
      
      // Generate a new collectible if none exists and cooldown has passed
      if (!powerupActive && !collectibleElement && now - lastPowerupTime > powerupCooldown) {
        // Very high chance to spawn a power-up collectible (90% chance per frame)
        if (Math.random() < 0.9) { // Increased from 1% to 90% chance
          // Create collectible at random position
          collectibleElement = document.createElement('div');
          collectibleElement.className = 'absolute rounded-full animate-pulse z-10';
          collectibleElement.style.width = '25px';
          collectibleElement.style.height = '25px';
          collectibleElement.style.backgroundColor = '#00ff00';
          collectibleElement.style.boxShadow = '0 0 10px 5px rgba(0, 255, 0, 0.5)';
          collectibleElement.style.zIndex = '20'; // Valeur plus élevée que les autres éléments
          collectibleElement.style.pointerEvents = 'none'; // Éviter d'interférer avec les contrôles
          
          // Random position within safe boundaries
          collectibleX = 100 + Math.random() * (containerWidth - 200);
          collectibleY = 100 + Math.random() * (containerHeight - 200);
          
          collectibleElement.style.transform = `translate3d(${collectibleX}px, ${collectibleY}px, 0)`;
          gameContainer.appendChild(collectibleElement);
          lastPowerupTime = now;
        }
      }
      
      // Check for collision between ball and collectible
      if (collectibleElement) {
        const ballRadius = ballSize / 2;
        const collectibleRadius = 12.5; // Half of the 25px width
        
        const dx = (ballX + ballRadius) - (collectibleX + collectibleRadius);
        const dy = (ballY + ballRadius) - (collectibleY + collectibleRadius);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < ballRadius + collectibleRadius) {
          // Collision detected - activate power-up
          powerupActive = true;
          powerupAffectedPaddle = ballSpeedX > 0 ? 'left' : 'right';
          
          // Remove the collectible
          if (collectibleElement && collectibleElement.parentNode && gameContainer) {
            gameContainer.removeChild(collectibleElement);
            collectibleElement = null;
          }
          
          // Create power-up notification
          const notification = document.createElement('div');
          notification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-4 py-2 rounded-md z-50';
          notification.textContent = `${t('GiantPaddle')} (${powerupAffectedPaddle === 'left' ? t('Player') + ' 1' : t('Player') + ' 2'})`;
          document.body.appendChild(notification);
          
          // Remove notification after 2 seconds
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 2000);
          
          // End power-up after duration
          powerupTimer = window.setTimeout(() => {
            powerupActive = false;
            powerupAffectedPaddle = null;
            powerupTimer = null;
          }, powerupDuration);
        }
      }
    } else if (collectibleElement && collectibleElement.parentNode && gameContainer) {
      // Clean up collectible if power-ups are disabled
      gameContainer.removeChild(collectibleElement);
      collectibleElement = null;
    }
    
    // IMPORTANT: Update pending values for DOM operations
    pendingLeftPaddleY = leftPaddleY;
    pendingRightPaddleY = rightPaddleY;
    pendingBallX = ballX;
    pendingBallY = ballY;
  }
  
  function applyChanges()
  {
    // Apply all DOM updates in one batch to prevent layout thrashing
    if (leftPaddle && rightPaddle && ball)
    {
      // Basic transform for ball
      ball.style.transform = `translate3d(${pendingBallX}px, ${pendingBallY}px, 0)`;
      
      // Update paddle heights based on power-up state
      if (powerupActive) {
        if (powerupAffectedPaddle === 'left') {
          leftPaddle.style.height = `${giantPaddleHeight}px`;
          
          // Simple direct positioning - allows the paddle to touch the bottom edge
          // Use same position as physics update, which already limits it correctly
          leftPaddle.style.transform = `translate3d(0, ${pendingLeftPaddleY}px, 0)`;
        } else {
          leftPaddle.style.height = `${normalPaddleHeight}px`;
          leftPaddle.style.transform = `translate3d(0, ${pendingLeftPaddleY}px, 0)`;
        }
        
        if (powerupAffectedPaddle === 'right') {
          rightPaddle.style.height = `${giantPaddleHeight}px`;
          
          // Simple direct positioning - allows the paddle to touch the bottom edge
          // Use same position as physics update, which already limits it correctly
          rightPaddle.style.transform = `translate3d(0, ${pendingRightPaddleY}px, 0)`;
        } else {
          rightPaddle.style.height = `${normalPaddleHeight}px`;
          rightPaddle.style.transform = `translate3d(0, ${pendingRightPaddleY}px, 0)`;
        }
      } else {
        // Reset to normal size when power-up is not active
        leftPaddle.style.height = `${normalPaddleHeight}px`;
        leftPaddle.style.transform = `translate3d(0, ${pendingLeftPaddleY}px, 0)`;
        
        rightPaddle.style.height = `${normalPaddleHeight}px`;
        rightPaddle.style.transform = `translate3d(0, ${pendingRightPaddleY}px, 0)`;
      }
    }
  }
  
  // Optimized game loop with frame limiting
  function gameLoop(timestamp: number) {
    if (gameOver) return; // Arrêter la boucle si le jeu est terminé
    
    if (!lastTime) lastTime = timestamp;
    
    const frameTime = Math.min(timestamp - lastTime, 50); // Cap at 50ms to prevent spiral of death
    lastTime = timestamp;
    
    // Accumulate time since last frame
    accumulator += frameTime;
    
    // Limit physics updates to avoid CPU overload
    let iterations = 0;
    const maxIterations = 5;
    
    while (accumulator >= fixedTimeStep && iterations < maxIterations) {
      updatePhysics();
      // Si le jeu est terminé après une mise à jour physique, sortir de la boucle
      if (gameOver) break;
      accumulator -= fixedTimeStep;
      iterations++;
    }
    
    // If we're still behind after max iterations, reset accumulator to prevent lag spiral
    if (iterations >= maxIterations && accumulator >= fixedTimeStep) {
      accumulator = 0;
    }
    
    // Apply visual updates once per frame regardless of physics steps
    applyChanges();
    
    // Continue the game loop if le jeu n'est pas terminé
    if (!gameOver) {
      animationFrameId = requestAnimationFrame(gameLoop);
    }
  }
  
  // Start the game loop
  animationFrameId = requestAnimationFrame(gameLoop);
  
  // Dans la fonction setupPaddleMovement(), après l'initialisation des variables
  setTimeout(() => {
    if (powerupsEnabled && gameContainer && !collectibleElement) {
      // Force create a test collectible
      collectibleElement = document.createElement('div');
      collectibleElement.className = 'absolute rounded-full animate-pulse z-10';
      collectibleElement.style.width = '25px';
      collectibleElement.style.height = '25px';
      collectibleElement.style.backgroundColor = '#00ff00';
      collectibleElement.style.boxShadow = '0 0 10px 5px rgba(0, 255, 0, 0.5)';
      collectibleElement.style.zIndex = '20'; // Valeur plus élevée que les autres éléments
      collectibleElement.style.pointerEvents = 'none'; // Éviter d'interférer avec les contrôles
      
      // Position au centre pour être sûr qu'il est visible
      collectibleX = containerWidth / 2;
      collectibleY = containerHeight / 2;
      
      collectibleElement.style.transform = `translate3d(${collectibleX}px, ${collectibleY}px, 0)`;
      gameContainer.appendChild(collectibleElement);
      console.log('Test collectible created!');
    }
  }, 1000);
  
  return { cleanup, gameOverPromise };
}

// Ajoutez ces traductions dans votre fichier i18n.ts si elles n'existent pas déjà
/*
LeftPlayerWins: 'Joueur Gauche Gagne',
RightPlayerWins: 'Joueur Droite Gagne',
*/