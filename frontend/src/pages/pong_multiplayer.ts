import '../style.css';
import { navigateTo } from '../routes.ts';
import { translations } from '../i18n.ts';
import { getCurrentLang } from '../components/navbar.ts';

// Stockage des paramètres entre les pages
interface PongMultiplayerSettings {
  ballColor: string;
  leftPaddleColor: string;
  rightPaddleColor: string;
  topPaddleColor: string;
  bottomPaddleColor: string;
  powerupsEnabled: boolean; // Add this field
}

// Page du menu
export function PongMultiplayerMenuPage(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'Parent p-5';
  
  // Menu container
  const menuModal = document.createElement('div');
  menuModal.className = 'w-full max-w-[500px] bg-gray-800 border-2 border-purple-500 rounded-lg p-4 sm:p-6 shadow-xl mx-auto';

  // Menu title
  const menuTitle = document.createElement('h2');
  menuTitle.className = 'text-white text-2xl font-bold mb-6 text-center';
  menuTitle.textContent = translations[getCurrentLang()].PongSettings || 'Pong 4 Players Settings';
  menuModal.appendChild(menuTitle);

  // Ball color selection
  const colorSection = document.createElement('div');
  colorSection.className = 'mb-6';
  
  const colorLabel = document.createElement('p');
  colorLabel.className = 'text-white mb-2';
  colorLabel.textContent = translations[getCurrentLang()].BallColor || 'Ball Color';
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
  leftPaddleLabel.textContent = translations[getCurrentLang()].LeftPaddleColor || 'Left Paddle Color (Player 1 - W/S)'; 
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
  rightPaddleLabel.textContent = translations[getCurrentLang()].RightPaddleColor || 'Right Paddle Color (Player 2 - ↑/↓)';
  rightPaddleSection.appendChild(rightPaddleLabel);
  
  const rightPaddleColorPicker = document.createElement('input');
  rightPaddleColorPicker.type = 'color';
  rightPaddleColorPicker.className = 'w-full h-10 cursor-pointer';
  rightPaddleColorPicker.value = '#00AAFF';
  rightPaddleSection.appendChild(rightPaddleColorPicker);
  menuModal.appendChild(rightPaddleSection);
  
  // Top paddle selection
  const topPaddleSection = document.createElement('div');
  topPaddleSection.className = 'mb-6';
  
  const topPaddleLabel = document.createElement('p');
  topPaddleLabel.className = 'text-white mb-2';
  topPaddleLabel.textContent = 'Top Paddle Color (Player 3 - O/P)';
  topPaddleSection.appendChild(topPaddleLabel);
  
  const topPaddleColorPicker = document.createElement('input');
  topPaddleColorPicker.type = 'color';
  topPaddleColorPicker.className = 'w-full h-10 cursor-pointer';
  topPaddleColorPicker.value = '#00FF00';
  topPaddleSection.appendChild(topPaddleColorPicker);
  menuModal.appendChild(topPaddleSection);
  
  // Bottom paddle selection
  const bottomPaddleSection = document.createElement('div');
  bottomPaddleSection.className = 'mb-6';
  
  const bottomPaddleLabel = document.createElement('p');
  bottomPaddleLabel.className = 'text-white mb-2';
  bottomPaddleLabel.textContent = 'Bottom Paddle Color (Player 4 - C/V)';
  bottomPaddleSection.appendChild(bottomPaddleLabel);
  
  const bottomPaddleColorPicker = document.createElement('input');
  bottomPaddleColorPicker.type = 'color';
  bottomPaddleColorPicker.className = 'w-full h-10 cursor-pointer';
  bottomPaddleColorPicker.value = '#FFFF00';
  bottomPaddleSection.appendChild(bottomPaddleColorPicker);
  menuModal.appendChild(bottomPaddleSection);
  
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
  powerupsToggleInput.id = 'powerups-toggle';
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
  startButton.textContent = translations[getCurrentLang()].StartGame || 'Start Game';
  startButton.addEventListener('click', () => {
    // Sauvegarder les paramètres
    const settings: PongMultiplayerSettings = {
      ballColor: ballColorPicker.value,
      leftPaddleColor: leftPaddleColorPicker.value,
      rightPaddleColor: rightPaddleColorPicker.value,
      topPaddleColor: topPaddleColorPicker.value,
      bottomPaddleColor: bottomPaddleColorPicker.value,
      powerupsEnabled: (document.getElementById('powerups-toggle') as HTMLInputElement)?.checked || false
    };
    
    // Stocker dans localStorage pour y accéder depuis la page de jeu
    localStorage.setItem('pongMultiplayerSettings', JSON.stringify(settings));
    
    // Naviguer vers la page de jeu
    navigateTo('/pong_multiplayer/game');
  });
  
  menuModal.appendChild(startButton);
  element.appendChild(menuModal);
  
  return element;
}

// Page du jeu
export function PongMultiplayerGamePage(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'flex flex-col justify-center items-center h-screen';
  
  // Charger les paramètres
  let settings: PongMultiplayerSettings = {
    ballColor: '#FFFFFF',
    leftPaddleColor: '#FF0000',
    rightPaddleColor: '#00AAFF',
    topPaddleColor: '#00FF00',
    bottomPaddleColor: '#FFFF00',
    powerupsEnabled: false // Default value
  };
  
  try {
    const savedSettings = localStorage.getItem('pongMultiplayerSettings');
    if (savedSettings) {
      settings = JSON.parse(savedSettings);
    }
  } catch (error) {
    console.error('Failed to load game settings:', error);
  }
  
  // Conteneur de jeu
  const gameWrapper = document.createElement('div');
  gameWrapper.className = 'relative w-[800px]';
  
  // Tableau de score
  const scoreBoard = createScoreBoard(
    settings.leftPaddleColor, 
    settings.rightPaddleColor,
    settings.topPaddleColor,
    settings.bottomPaddleColor
  );
  gameWrapper.appendChild(scoreBoard);
  
  // Conteneur de jeu
  const gameContainer = createGameContainer(
    settings.leftPaddleColor, 
    settings.rightPaddleColor,
    settings.topPaddleColor,
    settings.bottomPaddleColor
  );
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
  
  // Bouton retour menu
  const menuButton = document.createElement('button');
  menuButton.className = 'mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors';
  menuButton.textContent = translations[getCurrentLang()].BackToMenu || 'Back to Menu';
  menuButton.addEventListener('click', () => {
    // Nettoyage avant navigation
    if (typeof cleanup === 'function') {
      cleanup();
    }
    navigateTo('/pong_multiplayer');
  });
  
  element.appendChild(gameWrapper);
  element.appendChild(menuButton);
  
  // Démarrer le jeu avec un léger délai pour laisser le DOM se mettre en place
  let cleanup: (() => void) | undefined;
  setTimeout(() => {
    const ball = document.getElementById('ball');
    if (ball) ball.style.backgroundColor = settings.ballColor;
    const result = setupPaddleMovement(settings.powerupsEnabled);
    cleanup = result.cleanup;
    
    // Gestion de la fin de partie
    result.gameOverPromise.then(winner => {
      const gameOverMessage = document.getElementById('game-over-message');
      const winnerText = document.getElementById('winner-text');
      
      if (gameOverMessage && winnerText) {
        const winnerMessages: { [key: string]: string } = {
          'left': 'Player 1 Wins!',
          'right': 'Player 2 Wins!',
          'top': 'Player 3 Wins!',
          'bottom': 'Player 4 Wins!'
        };
        
        winnerText.textContent = winnerMessages[winner];
        gameOverMessage.classList.remove('hidden');
      }
    });
  }, 100);
  
  return element;
}

// Fonction principale exportée
export function PongMultiplayerPage(): HTMLElement {
  return PongMultiplayerMenuPage();
}

function createScoreBoard(
  leftColor = '#FF0000', 
  rightColor = '#00AAFF',
  topColor = '#00FF00',
  bottomColor = '#FFFF00'
): HTMLDivElement {
  const scoreBoard = document.createElement('div');
  scoreBoard.className = 'flex flex-wrap justify-center items-center w-[800px] mb-4 text-3xl font-bold';
  
  // Group each player label with their score
  const leftGroup = document.createElement('div');
  leftGroup.className = 'flex items-center mx-4';
  const leftLabel = document.createElement('div');
  leftLabel.className = 'text-white text-sm mr-1';
  leftLabel.textContent = 'P1:';
  const leftScore = document.createElement('div');
  leftScore.id = 'left-score';
  leftScore.textContent = '0';
  leftScore.style.color = leftColor;
  leftGroup.appendChild(leftLabel);
  leftGroup.appendChild(leftScore);
  
  const rightGroup = document.createElement('div');
  rightGroup.className = 'flex items-center mx-4';
  const rightLabel = document.createElement('div');
  rightLabel.className = 'text-white text-sm mr-1';
  rightLabel.textContent = 'P2:';
  const rightScore = document.createElement('div');
  rightScore.id = 'right-score';
  rightScore.textContent = '0';
  rightScore.style.color = rightColor;
  rightGroup.appendChild(rightLabel);
  rightGroup.appendChild(rightScore);
  
  const topGroup = document.createElement('div');
  topGroup.className = 'flex items-center mx-4';
  const topLabel = document.createElement('div');
  topLabel.className = 'text-white text-sm mr-1';
  topLabel.textContent = 'P3:';
  const topScore = document.createElement('div');
  topScore.id = 'top-score';
  topScore.textContent = '0';
  topScore.style.color = topColor;
  topGroup.appendChild(topLabel);
  topGroup.appendChild(topScore);
  
  const bottomGroup = document.createElement('div');
  bottomGroup.className = 'flex items-center mx-4';
  const bottomLabel = document.createElement('div');
  bottomLabel.className = 'text-white text-sm mr-1';
  bottomLabel.textContent = 'P4:';
  const bottomScore = document.createElement('div');
  bottomScore.id = 'bottom-score';
  bottomScore.textContent = '0';
  bottomScore.style.color = bottomColor;
  bottomGroup.appendChild(bottomLabel);
  bottomGroup.appendChild(bottomScore);
  
  scoreBoard.appendChild(leftGroup);
  scoreBoard.appendChild(rightGroup);
  scoreBoard.appendChild(topGroup);
  scoreBoard.appendChild(bottomGroup);
  
  return scoreBoard;
}

function createGameContainer(
  leftColor = '#FF0000', 
  rightColor = '#00AAFF',
  topColor = '#00FF00',
  bottomColor = '#FFFF00'
): HTMLDivElement {
  const border = document.createElement('div');
  border.className = 'border-2 border-solid border-green-500 w-[800px] h-[600px] bg-gray-900 relative overflow-hidden';
  border.id = 'game-container';
  
  // Left paddle (vertical)
  const leftPaddle = document.createElement('div');
  leftPaddle.className = 'absolute left-[10px] top-0 w-[15px] h-[100px]';
  leftPaddle.id = 'left-paddle';
  leftPaddle.style.backgroundColor = leftColor;
  leftPaddle.style.willChange = 'transform';
  leftPaddle.style.transform = 'translate3d(0, 250px, 0)';
  
  // Right paddle (vertical)
  const rightPaddle = document.createElement('div');
  rightPaddle.className = 'absolute right-[10px] top-0 w-[15px] h-[100px]';
  rightPaddle.id = 'right-paddle';
  rightPaddle.style.backgroundColor = rightColor;
  rightPaddle.style.willChange = 'transform';
  rightPaddle.style.transform = 'translate3d(0, 250px, 0)';

  // Top paddle (horizontal)
  const topPaddle = document.createElement('div');
  topPaddle.className = 'absolute top-[10px] left-0 h-[15px] w-[100px]';
  topPaddle.id = 'top-paddle';
  topPaddle.style.backgroundColor = topColor;
  topPaddle.style.willChange = 'transform';
  topPaddle.style.transform = 'translate3d(350px, 0, 0)';

  // Bottom paddle (horizontal)
  const bottomPaddle = document.createElement('div');
  bottomPaddle.className = 'absolute bottom-[10px] left-0 h-[15px] w-[100px]';
  bottomPaddle.id = 'bottom-paddle';
  bottomPaddle.style.backgroundColor = bottomColor;
  bottomPaddle.style.willChange = 'transform';
  bottomPaddle.style.transform = 'translate3d(350px, 0, 0)';

  // Ball
  const ball = document.createElement('div');
  ball.className = 'absolute w-[20px] h-[20px] rounded-full';
  ball.id = 'ball';
  ball.style.willChange = 'transform';
  ball.style.transform = 'translate3d(390px, 290px, 0)';

  border.appendChild(leftPaddle);
  border.appendChild(rightPaddle);
  border.appendChild(topPaddle);
  border.appendChild(bottomPaddle);
  border.appendChild(ball);
  
  return border;
}

function setupPaddleMovement(powerupsEnabled: boolean = false) {
  const leftPaddle = document.getElementById('left-paddle');
  const rightPaddle = document.getElementById('right-paddle');
  const topPaddle = document.getElementById('top-paddle');
  const bottomPaddle = document.getElementById('bottom-paddle');
  const ball = document.getElementById('ball');
  const gameContainer = document.getElementById('game-container');
  const leftScoreElement = document.getElementById('left-score');
  const rightScoreElement = document.getElementById('right-score');
  const topScoreElement = document.getElementById('top-score');
  const bottomScoreElement = document.getElementById('bottom-score');

  if (!leftPaddle || !rightPaddle || !topPaddle || !bottomPaddle || 
      !ball || !gameContainer || !leftScoreElement || 
      !rightScoreElement || !topScoreElement || !bottomScoreElement) {
    return { cleanup: () => {}, gameOverPromise: Promise.resolve('none') };
  }
  
  // Score variables
  let leftScore = 0;
  let rightScore = 0;
  let topScore = 0;
  let bottomScore = 0;
  const maxScore = 5; // Score maximum pour gagner
  let gameOver = false;
  let gameOverResolve: (winner: string) => void;
  
  // Tracker pour le dernier joueur qui a touché la balle
  let lastPlayerTouched: 'left' | 'right' | 'top' | 'bottom' | '' = '';
  
  // Promesse qui sera résolue quand un joueur gagne
  const gameOverPromise = new Promise<string>(resolve => {
    gameOverResolve = resolve;
  });
  
  // Cache initial dimensions to avoid layout thrashing
  const containerWidth = gameContainer.clientWidth;
  const containerHeight = gameContainer.clientHeight;
  const vPaddleHeight = 100; // Vertical paddles (left and right)
  const vPaddleWidth = 15;  // Largeur des paddles verticales
  const hPaddleWidth = 100;  // Horizontal paddles (top and bottom)
  const hPaddleHeight = 15;  // Hauteur des paddles horizontales
  
  // Position initiale des paddles
  let leftPaddleY = (containerHeight - vPaddleHeight) / 2;
  let rightPaddleY = (containerHeight - vPaddleHeight) / 2;
  let topPaddleX = (containerWidth - hPaddleWidth) / 2;
  let bottomPaddleX = (containerWidth - hPaddleWidth) / 2;
  
  const paddleSpeed = 5;
  
  // Ball properties
  let ballX = containerWidth / 2 - 10;
  let ballY = containerHeight / 2 - 10;
  let initialSpeed = 4;
  let ballSpeedX = initialSpeed;
  let ballSpeedY = initialSpeed * 0.3;
  const ballSize = 20;
  const speedIncrement = 0.5;
  let maxSpeed = 10;
  
  // Track pressed keys with state
  const keys = {
    // Player 1 (Left)
    w: false,
    s: false,
    
    // Player 2 (Right)
    arrowup: false,
    arrowdown: false,
    
    // Player 3 (Top)
    o: false,
    p: false,
    
    // Player 4 (Bottom)
    c: false,
    v: false
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
    gameOver = true;
    
    if (powerupTimer !== null) {
      clearTimeout(powerupTimer);
      powerupTimer = null;
    }
    
    // Clean up collectible if it exists
    if (collectibleElement && collectibleElement.parentNode) {
      gameContainer.removeChild(collectibleElement);
      collectibleElement = null;
    }
  };
  
  // Optimized physics settings
  const fixedTimeStep = 1000 / 60;
  let lastTime = 0;
  let accumulator = 0;
  let animationFrameId = 0;
  
  // Précalculer des valeurs utilisées fréquemment
  const leftPaddleX = 10;
  const rightPaddleX = containerWidth - vPaddleWidth - 10;
  const topPaddleY = 10;
  const bottomPaddleY = containerHeight - hPaddleHeight - 10;
  
  // Optimization: Create DOM operation buffer
  let pendingLeftPaddleY = leftPaddleY;
  let pendingRightPaddleY = rightPaddleY;
  let pendingTopPaddleX = topPaddleX;
  let pendingBottomPaddleX = bottomPaddleX;
  let pendingBallX = ballX;
  let pendingBallY = ballY;
  
  // Define paddle dimensions for normal and power-up states
  const normalVPaddleHeight = vPaddleHeight; // 100px
  const giantVPaddleHeight = vPaddleHeight * 2; // 200px
  const normalHPaddleWidth = hPaddleWidth; // 100px
  const giantHPaddleWidth = hPaddleWidth * 2; // 200px
  
  // Power-up state
  let powerupActive = false;
  let powerupAffectedPaddle: 'left' | 'right' | 'top' | 'bottom' | null = null;
  let powerupTimer: number | null = null;
  let powerupDuration = 5000; // 5 seconds
  let lastPowerupTime = 0;
  let powerupCooldown = 10000; // 10 seconds between power-ups
  
  // Collectible state
  let collectibleElement: HTMLDivElement | null = null;
  let collectibleX = 0;
  let collectibleY = 0;
  
  function updatePhysics() {
    // Move paddles with keyboard input - use current paddle dimensions
    
    // Left paddle (Player 1)
    if (keys.w) leftPaddleY = Math.max(0, leftPaddleY - paddleSpeed);
    if (keys.s) {
      const currentLeftPaddleHeight = powerupActive && powerupAffectedPaddle === 'left' 
        ? giantVPaddleHeight 
        : normalVPaddleHeight;
      leftPaddleY = Math.min(containerHeight - currentLeftPaddleHeight, leftPaddleY + paddleSpeed);
    }
    
    // Right paddle (Player 2)
    if (keys.arrowup) rightPaddleY = Math.max(0, rightPaddleY - paddleSpeed);
    if (keys.arrowdown) {
      const currentRightPaddleHeight = powerupActive && powerupAffectedPaddle === 'right' 
        ? giantVPaddleHeight 
        : normalVPaddleHeight;
      rightPaddleY = Math.min(containerHeight - currentRightPaddleHeight, rightPaddleY + paddleSpeed);
    }
    
    // Top paddle (Player 3)
    if (keys.o) topPaddleX = Math.max(0, topPaddleX - paddleSpeed);
    if (keys.p) {
      const currentTopPaddleWidth = powerupActive && powerupAffectedPaddle === 'top' 
        ? giantHPaddleWidth 
        : normalHPaddleWidth;
      topPaddleX = Math.min(containerWidth - currentTopPaddleWidth, topPaddleX + paddleSpeed);
    }
    
    // Bottom paddle (Player 4)
    if (keys.c) bottomPaddleX = Math.max(0, bottomPaddleX - paddleSpeed);
    if (keys.v) {
      const currentBottomPaddleWidth = powerupActive && powerupAffectedPaddle === 'bottom' 
        ? giantHPaddleWidth 
        : normalHPaddleWidth;
      bottomPaddleX = Math.min(containerWidth - currentBottomPaddleWidth, bottomPaddleX + paddleSpeed);
    }
    
    // Sauvegarde la position précédente de la balle
    const prevBallX = ballX;
    const prevBallY = ballY;

    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Left paddle collision - with power-up consideration
    if (
      ballSpeedX < 0 && 
      prevBallX >= leftPaddleX + vPaddleWidth && 
      ballX < leftPaddleX + vPaddleWidth
    ) {
      const currentLeftPaddleHeight = powerupActive && powerupAffectedPaddle === 'left' 
        ? giantVPaddleHeight 
        : normalVPaddleHeight;
      
      if (
        ballY + ballSize > leftPaddleY &&
        ballY < leftPaddleY + currentLeftPaddleHeight
      ) {
        const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
        const newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
        const speedRatio = newSpeed / currentSpeed;

        ballSpeedX = Math.abs(ballSpeedX) * speedRatio;
        // Use the middle of the current paddle height for hit calculation
        const hitPosition = (ballY + ballSize/2 - (leftPaddleY + currentLeftPaddleHeight/2)) / (currentLeftPaddleHeight/2);
        ballSpeedY = newSpeed * hitPosition * 0.8;

        // Replace la balle juste à côté de la raquette
        ballX = leftPaddleX + vPaddleWidth;

        // Enregistrer que le joueur gauche a touché la balle en dernier
        lastPlayerTouched = 'left';
      }
    }

    // Right paddle collision - with power-up consideration
    if (
      ballSpeedX > 0 && 
      prevBallX + ballSize <= rightPaddleX && 
      ballX + ballSize > rightPaddleX
    ) {
      const currentRightPaddleHeight = powerupActive && powerupAffectedPaddle === 'right' 
        ? giantVPaddleHeight 
        : normalVPaddleHeight;
      
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

        // Enregistrer que le joueur droit a touché la balle en dernier
        lastPlayerTouched = 'right';
      }
    }
    
    // Top paddle collision - with power-up consideration
    if (
      ballSpeedY < 0 && 
      prevBallY >= topPaddleY + hPaddleHeight && 
      ballY < topPaddleY + hPaddleHeight
    ) {
      const currentTopPaddleWidth = powerupActive && powerupAffectedPaddle === 'top' 
        ? giantHPaddleWidth 
        : normalHPaddleWidth;
      
      if (
        ballX + ballSize > topPaddleX &&
        ballX < topPaddleX + currentTopPaddleWidth
      ) {
        const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
        const newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
        const speedRatio = newSpeed / currentSpeed;

        ballSpeedY = Math.abs(ballSpeedY) * speedRatio;
        // Influence de la position d'impact horizontale
        const hitPosition = (ballX + ballSize/2 - (topPaddleX + currentTopPaddleWidth/2)) / (currentTopPaddleWidth/2);
        ballSpeedX = newSpeed * hitPosition * 0.8;

        ballY = topPaddleY + hPaddleHeight;

        // Enregistrer que le joueur du haut a touché la balle en dernier
        lastPlayerTouched = 'top';
      }
    }

    // Bottom paddle collision - with power-up consideration
    if (
      ballSpeedY > 0 && 
      prevBallY + ballSize <= bottomPaddleY && 
      ballY + ballSize > bottomPaddleY
    ) {
      const currentBottomPaddleWidth = powerupActive && powerupAffectedPaddle === 'bottom' 
        ? giantHPaddleWidth 
        : normalHPaddleWidth;
      
      if (
        ballX + ballSize > bottomPaddleX &&
        ballX < bottomPaddleX + currentBottomPaddleWidth
      ) {
        const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
        const newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
        const speedRatio = newSpeed / currentSpeed;

        ballSpeedY = -Math.abs(ballSpeedY) * speedRatio;
        const hitPosition = (ballX + ballSize/2 - (bottomPaddleX + currentBottomPaddleWidth/2)) / (currentBottomPaddleWidth/2);
        ballSpeedX = newSpeed * hitPosition * 0.8;

        ballY = bottomPaddleY - ballSize;

        // Enregistrer que le joueur du bas a touché la balle en dernier
        lastPlayerTouched = 'bottom';
      }
    }
    
    // Power-up logic (only if enabled)
    if (powerupsEnabled && gameContainer) {
      const now = performance.now();
      
      // Generate a new collectible if none exists and cooldown has passed
      if (!powerupActive && !collectibleElement && now - lastPowerupTime > powerupCooldown) {
        // 1% chance to spawn a power-up collectible
        if (Math.random() < 0.01) {
          // Create collectible at random position
          collectibleElement = document.createElement('div');
          collectibleElement.className = 'absolute rounded-full animate-pulse z-10';
          collectibleElement.style.width = '25px';
          collectibleElement.style.height = '25px';
          collectibleElement.style.backgroundColor = '#00ff00';
          collectibleElement.style.boxShadow = '0 0 10px 5px rgba(0, 255, 0, 0.5)';
          collectibleElement.style.zIndex = '20';
          collectibleElement.style.pointerEvents = 'none';
          
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
          // Collision detected - activate power-up for the last player who touched the ball
          if (lastPlayerTouched) {
            powerupActive = true;
            powerupAffectedPaddle = lastPlayerTouched;
            
            // Remove the collectible
            if (collectibleElement && collectibleElement.parentNode) {
              gameContainer.removeChild(collectibleElement);
              collectibleElement = null;
            }
            
            // Create power-up notification
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-4 py-2 rounded-md z-50';
            
            // Determine which player got the power-up
            let playerText = "";
            switch(powerupAffectedPaddle) {
              case 'left': playerText = "Player 1"; break;
              case 'right': playerText = "Player 2"; break;
              case 'top': playerText = "Player 3"; break;
              case 'bottom': playerText = "Player 4"; break;
            }
            
            notification.textContent = `Giant Paddle (${playerText})`;
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
      }
    } else if (collectibleElement && collectibleElement.parentNode && gameContainer) {
      // Clean up collectible if power-ups are disabled
      gameContainer.removeChild(collectibleElement);
      collectibleElement = null;
    }
    
    // Scoring and wall collisions - NOUVELLE LOGIQUE
    
    // Vérifier si la balle sort du terrain
    if (ballX <= 0 || ballX + ballSize >= containerWidth || 
        ballY <= 0 || ballY + ballSize >= containerHeight) {
      
      // Attribution des points au dernier joueur qui a touché la balle
      if (lastPlayerTouched) {
        switch (lastPlayerTouched) {
          case 'left':
            leftScore++;
            leftScoreElement!.textContent = leftScore.toString();
            if (leftScore >= maxScore) {
              gameOver = true;
              gameOverResolve('left');
            }
            break;
          case 'right':
            rightScore++;
            rightScoreElement!.textContent = rightScore.toString();
            if (rightScore >= maxScore) {
              gameOver = true;
              gameOverResolve('right');
            }
            break;
          case 'top':
            topScore++;
            topScoreElement!.textContent = topScore.toString();
            if (topScore >= maxScore) {
              gameOver = true;
              gameOverResolve('top');
            }
            break;
          case 'bottom':
            bottomScore++;
            bottomScoreElement!.textContent = bottomScore.toString();
            if (bottomScore >= maxScore) {
              gameOver = true;
              gameOverResolve('bottom');
            }
            break;
        }
      }
      
      // Réinitialiser la balle au centre
      resetBall();
      
      // Réinitialiser le dernier joueur qui a touché la balle
      lastPlayerTouched = '';
    }
    
    // Update DOM positions
    pendingLeftPaddleY = leftPaddleY;
    pendingRightPaddleY = rightPaddleY;
    pendingTopPaddleX = topPaddleX;
    pendingBottomPaddleX = bottomPaddleX;
    pendingBallX = ballX;
    pendingBallY = ballY;
  }
  
  function resetBall() {
    ballX = containerWidth / 2 - ballSize / 2;
    ballY = containerHeight / 2 - ballSize / 2;
    
    // Choose random direction for ball without using unused angle variable
    ballSpeedX = Math.random() > 0.5 ? initialSpeed : -initialSpeed;
    ballSpeedY = Math.random() > 0.5 ? initialSpeed : -initialSpeed;
    
    // Ensure minimum velocity on X and Y axes
    if (Math.abs(ballSpeedX) < 0.5) ballSpeedX = ballSpeedX > 0 ? 0.5 : -0.5;
    if (Math.abs(ballSpeedY) < 0.5) ballSpeedY = ballSpeedY > 0 ? 0.5 : -0.5;
  }
  
  function gameLoop(timestamp: number) {
    if (gameOver) return;
    
    // Calculate time difference
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    // Prevent spiral of death with large delays
    const cappedDeltaTime = Math.min(deltaTime, 50);
    accumulator += cappedDeltaTime;
    
    // Update physics at fixed time steps
    while (accumulator >= fixedTimeStep) {
      updatePhysics();
      if (gameOver) break;
      accumulator -= fixedTimeStep;
    }
    
    // Update DOM elements with proper size based on power-up state
    if (leftPaddle && rightPaddle && topPaddle && bottomPaddle && ball) {
      // Apply left paddle height and position
      if (powerupActive && powerupAffectedPaddle === 'left') {
        leftPaddle.style.height = `${giantVPaddleHeight}px`;
      } else {
        leftPaddle.style.height = `${normalVPaddleHeight}px`;
      }
      leftPaddle.style.transform = `translate3d(0, ${pendingLeftPaddleY}px, 0)`;
      
      // Apply right paddle height and position
      if (powerupActive && powerupAffectedPaddle === 'right') {
        rightPaddle.style.height = `${giantVPaddleHeight}px`;
      } else {
        rightPaddle.style.height = `${normalVPaddleHeight}px`;
      }
      rightPaddle.style.transform = `translate3d(0, ${pendingRightPaddleY}px, 0)`;
      
      // Apply top paddle width and position
      if (powerupActive && powerupAffectedPaddle === 'top') {
        topPaddle.style.width = `${giantHPaddleWidth}px`;
      } else {
        topPaddle.style.width = `${normalHPaddleWidth}px`;
      }
      topPaddle.style.transform = `translate3d(${pendingTopPaddleX}px, 0, 0)`;
      
      // Apply bottom paddle width and position
      if (powerupActive && powerupAffectedPaddle === 'bottom') {
        bottomPaddle.style.width = `${giantHPaddleWidth}px`;
      } else {
        bottomPaddle.style.width = `${normalHPaddleWidth}px`;
      }
      bottomPaddle.style.transform = `translate3d(${pendingBottomPaddleX}px, 0, 0)`;
      
      // Update ball position
      ball.style.transform = `translate3d(${pendingBallX}px, ${pendingBallY}px, 0)`;
    }
    
    // Continue the game loop
    if (!gameOver) {
      animationFrameId = requestAnimationFrame(gameLoop);
    }
  }
  
  // Start the game loop
  lastTime = performance.now();
  gameLoop(lastTime);
  
  return { cleanup, gameOverPromise };
}