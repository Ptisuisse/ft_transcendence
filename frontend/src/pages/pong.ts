import '../style.css';
import { navigateTo } from '../routes.ts';
import { translations } from '../i18n.ts';
import { getCurrentLang } from '../components/navbar.ts';
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
  element.className = 'Parent p-5 flex flex-col items-center';
  
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
    
    // Ajoutez un écouteur d'événements pour détecter les changements d'URL via la navbar
    const handleNavigation = () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
    
    // Utiliser un MutationObserver pour surveiller les changements du body
    // qui pourraient indiquer un changement de page
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        // Si nous sommes plus sur la page du jeu, nettoyer
        const gameContainer = document.getElementById('game-container');
        if (!gameContainer || !document.body.contains(gameContainer)) {
          handleNavigation();
          observer.disconnect();
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Ajouter à l'élément pour le nettoyage ultérieur
    (element as any).__navigationObserver = observer;
    
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
  // Use relative positioning with aspect ratio preservation
  border.className = 'border-2 border-solid border-green-500 w-full max-w-[800px] aspect-[4/3] bg-gray-900 relative overflow-hidden';
  border.id = 'game-container';
  
  // Left paddle - positions will be set by the game logic
  const leftPaddle = document.createElement('div');
  leftPaddle.className = 'absolute';
  leftPaddle.id = 'left-paddle';
  leftPaddle.style.backgroundColor = leftColor;
  leftPaddle.style.willChange = 'transform, height';
  leftPaddle.style.transition = 'height 0.3s ease-in-out';
  
  // Right paddle - positions will be set by the game logic
  const rightPaddle = document.createElement('div');
  rightPaddle.className = 'absolute';
  rightPaddle.id = 'right-paddle';
  rightPaddle.style.backgroundColor = rightColor;
  rightPaddle.style.willChange = 'transform, height';
  rightPaddle.style.transition = 'height 0.3s ease-in-out';

  // Ball - position will be set by the game logic
  const ball = document.createElement('div');
  ball.className = 'absolute rounded-full';
  ball.id = 'ball';
  ball.style.willChange = 'transform';
  
  border.appendChild(leftPaddle);
  border.appendChild(rightPaddle);
  border.appendChild(ball);
  
  return border;
}

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

  // Responsive variables
  let containerWidth = gameContainer.clientWidth;
  let containerHeight = gameContainer.clientHeight;
  const paddleWidthPercent = 0.01875;
  const paddleHeightPercent = 0.1667;
  const ballSizePercent = 0.025;
  const collectibleSizePercent = 0.03;
  let paddleWidth = containerWidth * paddleWidthPercent;
  let paddleHeight = containerHeight * paddleHeightPercent;
  let ballSize = containerWidth * ballSizePercent;
  let collectibleSize = containerWidth * collectibleSizePercent;
  let normalPaddleHeight = paddleHeight;
  let giantPaddleHeight = paddleHeight * 2;
  let leftPaddleX = containerWidth * 0.0125;
  let rightPaddleX = containerWidth * 0.9688;
  let leftPaddleY = (containerHeight - paddleHeight) / 2;
  let rightPaddleY = (containerHeight - paddleHeight) / 2;
  let paddleSpeed = containerWidth * 0.00625;
  let ballX = containerWidth / 2 - ballSize / 2;
  let ballY = containerHeight / 2 - ballSize / 2;
  let initialSpeed = containerWidth * 0.005;
  let ballSpeedX = initialSpeed;
  let ballSpeedY = initialSpeed * 0.3;
  const speedIncrement = initialSpeed * 0.125;
  let maxSpeed = initialSpeed * 2.5;
  let pendingLeftPaddleY = leftPaddleY;
  let pendingRightPaddleY = rightPaddleY;
  let pendingBallX = ballX;
  let pendingBallY = ballY;
  const keys = { w: false, s: false, arrowup: false, arrowdown: false };
  let aiTargetY = rightPaddleY;
  let aiLastUpdate = performance.now();
  let lastTime = performance.now();
  const fixedTimeStep = 1000 / 60;
  let accumulator = 0;
  let animationFrameId = 0;
  let powerupActive = false;
  let powerupAffectedPaddle: 'left' | 'right' | null = null;
  let powerupTimer: number | null = null;
  let powerupDuration = 5000;
  let lastPowerupTime = 0;
  let powerupCooldown = 500;
  let collectibleElement: HTMLDivElement | null = null;
  let collectibleX = 0;
  let collectibleY = 0;

  // Resize observer
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === gameContainer) {
        const oldWidth = containerWidth;
        const oldHeight = containerHeight;
        containerWidth = entry.contentRect.width;
        containerHeight = entry.contentRect.height;
        const widthRatio = containerWidth / oldWidth;
        const heightRatio = containerHeight / oldHeight;
        paddleWidth = containerWidth * paddleWidthPercent;
        paddleHeight = containerHeight * paddleHeightPercent;
        normalPaddleHeight = paddleHeight;
        giantPaddleHeight = paddleHeight * 2;
        ballSize = containerWidth * ballSizePercent;
        collectibleSize = containerWidth * collectibleSizePercent;
        leftPaddleX = containerWidth * 0.0125;
        rightPaddleX = containerWidth * 0.9688;
        leftPaddleY *= heightRatio;
        rightPaddleY *= heightRatio;
        ballX *= widthRatio;
        ballY *= heightRatio;
        paddleSpeed = containerWidth * 0.00625;
        initialSpeed = containerWidth * 0.005;
        ballSpeedX *= widthRatio;
        ballSpeedY *= heightRatio;
        maxSpeed = initialSpeed * 2.5;
        applyChanges();
      }
    }
  });
  resizeObserver.observe(gameContainer);

  function applyChanges() {
    if (leftPaddle && rightPaddle && ball) {
      ball.style.width = `${ballSize}px`;
      ball.style.height = `${ballSize}px`;
      ball.style.transform = `translate3d(${pendingBallX}px, ${pendingBallY}px, 0)`;
      leftPaddle.style.width = `${paddleWidth}px`;
      leftPaddle.style.height = powerupActive && powerupAffectedPaddle === 'left' ? `${giantPaddleHeight}px` : `${normalPaddleHeight}px`;
      leftPaddle.style.transform = `translate3d(${leftPaddleX}px, ${pendingLeftPaddleY}px, 0)`;
      rightPaddle.style.width = `${paddleWidth}px`;
      rightPaddle.style.height = powerupActive && powerupAffectedPaddle === 'right' ? `${giantPaddleHeight}px` : `${normalPaddleHeight}px`;
      rightPaddle.style.transform = `translate3d(${rightPaddleX - paddleWidth}px, ${pendingRightPaddleY}px, 0)`;
      if (collectibleElement) {
        collectibleElement.style.width = `${collectibleSize}px`;
        collectibleElement.style.height = `${collectibleSize}px`;
      }
    }
  }

  function updatePhysics() {
    if (keys.w) leftPaddleY = Math.max(0, leftPaddleY - paddleSpeed);
    if (keys.s) {
      const currentLeftPaddleHeight = powerupActive && powerupAffectedPaddle === 'left' ? giantPaddleHeight : normalPaddleHeight;
      const leftPaddleBottom = containerHeight - currentLeftPaddleHeight;
      leftPaddleY = Math.min(leftPaddleBottom, leftPaddleY + paddleSpeed);
    }
    if (aiEnabled) {
      const now = performance.now();
      if (now - aiLastUpdate > 1000) {
        aiLastUpdate = now;
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
            } else if (simY + ballSize > containerHeight) {
              simY = 2 * (containerHeight - ballSize) - simY;
              simSpeedY = -simSpeedY;
            }
          }
          const currentRightPaddleHeight = powerupActive && powerupAffectedPaddle === 'right' ? giantPaddleHeight : normalPaddleHeight;
          aiTargetY = simY + ballSize / 2 - currentRightPaddleHeight / 2;
        } else {
          aiTargetY = containerHeight / 2 - normalPaddleHeight / 2;
        }
      }
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
    }
    if (keys.arrowup) rightPaddleY = Math.max(0, rightPaddleY - paddleSpeed);
    if (keys.arrowdown) {
      const currentRightPaddleHeight = powerupActive && powerupAffectedPaddle === 'right' ? giantPaddleHeight : normalPaddleHeight;
      const rightPaddleBottom = containerHeight - currentRightPaddleHeight;
      rightPaddleY = Math.min(rightPaddleBottom, rightPaddleY + paddleSpeed);
    }
    const prevBallX = ballX;
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballY < 0) {
      ballY = 0;
      ballSpeedY = -ballSpeedY;
    } else if (ballY + ballSize > containerHeight) {
      ballY = containerHeight - ballSize;
      ballSpeedY = -ballSpeedY;
    }
    if (
      ballSpeedX < 0 &&
      prevBallX >= leftPaddleX + paddleWidth &&
      ballX < leftPaddleX + paddleWidth
    ) {
      const currentLeftPaddleHeight = powerupActive && powerupAffectedPaddle === 'left' ? giantPaddleHeight : normalPaddleHeight;
      if (
        ballY + ballSize > leftPaddleY &&
        ballY < leftPaddleY + currentLeftPaddleHeight
      ) {
        const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
        const newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
        const speedRatio = newSpeed / currentSpeed;
        ballSpeedX = Math.abs(ballSpeedX) * speedRatio;
        const hitPosition = (ballY + ballSize/2 - (leftPaddleY + currentLeftPaddleHeight/2)) / (currentLeftPaddleHeight/2);
        ballSpeedY = newSpeed * hitPosition * 0.8;
        ballX = leftPaddleX + paddleWidth;
      }
    }
    if (
      ballSpeedX > 0 &&
      prevBallX + ballSize <= rightPaddleX &&
      ballX + ballSize > rightPaddleX
    ) {
      const currentRightPaddleHeight = powerupActive && powerupAffectedPaddle === 'right' ? giantPaddleHeight : normalPaddleHeight;
      if (
        ballY + ballSize > rightPaddleY &&
        ballY < rightPaddleY + currentRightPaddleHeight
      ) {
        const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
        const newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
        const speedRatio = newSpeed / currentSpeed;
        ballSpeedX = -Math.abs(ballSpeedX) * speedRatio;
        const hitPosition = (ballY + ballSize/2 - (rightPaddleY + currentRightPaddleHeight/2)) / (currentRightPaddleHeight/2);
        ballSpeedY = newSpeed * hitPosition * 0.8;
        ballX = rightPaddleX - ballSize;
      }
    }
    if (ballX < -ballSize) {
      rightScore++;
      if (rightScoreElement) rightScoreElement.textContent = rightScore.toString();
      if (rightScore >= maxScore) {
        gameOver = true;
        gameOverResolve('right');
        return;
      }
      resetBall();
      ballSpeedX = initialSpeed;
    } else if (ballX > containerWidth) {
      leftScore++;
      if (leftScoreElement) leftScoreElement.textContent = leftScore.toString();
      if (leftScore >= maxScore) {
        gameOver = true;
        gameOverResolve('left');
        return;
      }
      resetBall();
      ballSpeedX = -initialSpeed;
    }
    if (powerupsEnabled && gameContainer) {
      const now = performance.now();
      if (!powerupActive && !collectibleElement && now - lastPowerupTime > powerupCooldown) {
        if (Math.random() < 0.01) {
          collectibleElement = document.createElement('div');
          collectibleElement.className = 'absolute rounded-full animate-pulse z-10';
          collectibleElement.style.width = `${collectibleSize}px`;
          collectibleElement.style.height = `${collectibleSize}px`;
          collectibleElement.style.backgroundColor = '#00ff00';
          collectibleElement.style.boxShadow = '0 0 10px 5px rgba(0, 255, 0, 0.5)';
          collectibleElement.style.zIndex = '20';
          collectibleElement.style.pointerEvents = 'none';
          collectibleX = 100 + Math.random() * (containerWidth - 200);
          collectibleY = 100 + Math.random() * (containerHeight - 200);
          collectibleElement.style.transform = `translate3d(${collectibleX}px, ${collectibleY}px, 0)`;
          gameContainer.appendChild(collectibleElement);
          lastPowerupTime = now;
        }
      }
      if (collectibleElement) {
        const ballRadius = ballSize / 2;
        const collectibleRadius = collectibleSize / 2;
        const dx = (ballX + ballRadius) - (collectibleX + collectibleRadius);
        const dy = (ballY + ballRadius) - (collectibleY + collectibleRadius);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < ballRadius + collectibleRadius) {
          powerupActive = true;
          powerupAffectedPaddle = ballSpeedX > 0 ? 'left' : 'right';
          if (collectibleElement && collectibleElement.parentNode) {
            gameContainer.removeChild(collectibleElement);
            collectibleElement = null;
          }
          const notification = document.createElement('div');
          notification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-4 py-2 rounded-md z-50';
          notification.textContent = `${t('GiantPaddle')} (${powerupAffectedPaddle === 'left' ? t('Player') + ' 1' : t('Player') + ' 2'})`;
          document.body.appendChild(notification);
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 2000);
          powerupTimer = window.setTimeout(() => {
            powerupActive = false;
            powerupAffectedPaddle = null;
            powerupTimer = null;
          }, powerupDuration);
        }
      }
    } else if (collectibleElement && collectibleElement.parentNode && gameContainer) {
      gameContainer.removeChild(collectibleElement);
      collectibleElement = null;
    }
    pendingLeftPaddleY = leftPaddleY;
    pendingRightPaddleY = rightPaddleY;
    pendingBallX = ballX;
    pendingBallY = ballY;
  }

  function resetBall() {
    ballX = containerWidth / 2 - ballSize / 2;
    ballY = containerHeight / 2 - ballSize / 2;
    ballSpeedY = (Math.random() * 2 - 1) * initialSpeed * 0.3;
  }

  const cleanup = () => {
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('keyup', keyUpHandler);
    resizeObserver.disconnect();
    cancelAnimationFrame(animationFrameId);
    if (powerupTimer !== null) {
      clearTimeout(powerupTimer);
      powerupTimer = null;
    }
    if (collectibleElement && collectibleElement.parentNode) {
      gameContainer.removeChild(collectibleElement);
      collectibleElement = null;
    }
    gameOver = true;
    const matchData = localStorage.getItem('currentTournamentMatch');
    if (matchData) {
      const matchAborted = { aborted: true, timestamp: Date.now() };
      localStorage.setItem('matchAborted', JSON.stringify(matchAborted));
      localStorage.removeItem('currentTournamentMatch');
    }
    const gameElement = document.querySelector('.Parent');
    if (gameElement && (gameElement as any).__navigationObserver) {
      (gameElement as any).__navigationObserver.disconnect();
    }
  };

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

  function gameLoop(timestamp: number) {
    if (gameOver) return;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    const cappedDeltaTime = Math.min(deltaTime, 50);
    accumulator += cappedDeltaTime;
    while (accumulator >= fixedTimeStep) {
      updatePhysics();
      if (gameOver) break;
      accumulator -= fixedTimeStep;
    }
    applyChanges();
    if (!gameOver) {
      animationFrameId = requestAnimationFrame(gameLoop);
    }
  }
  lastTime = performance.now();
  gameLoop(lastTime);
  return { cleanup, gameOverPromise };
}