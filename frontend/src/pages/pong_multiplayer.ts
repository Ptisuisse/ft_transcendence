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
      bottomPaddleColor: bottomPaddleColorPicker.value
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
    bottomPaddleColor: '#FFFF00'
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
    const result = setupPaddleMovement();
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

function setupPaddleMovement() {
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
  let lastPlayerTouched = ''; // 'left', 'right', 'top', ou 'bottom'
  
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
  
  function updatePhysics() {
    // Move paddles with keyboard input
    
    // Left paddle (Player 1)
    if (keys.w) leftPaddleY = Math.max(0, leftPaddleY - paddleSpeed);
    if (keys.s) leftPaddleY = Math.min(containerHeight - vPaddleHeight, leftPaddleY + paddleSpeed);
    
    // Right paddle (Player 2)
    if (keys.arrowup) rightPaddleY = Math.max(0, rightPaddleY - paddleSpeed);
    if (keys.arrowdown) rightPaddleY = Math.min(containerHeight - vPaddleHeight, rightPaddleY + paddleSpeed);
    
    // Top paddle (Player 3) - Modifié de A/D à O/P
    if (keys.o) topPaddleX = Math.max(0, topPaddleX - paddleSpeed);
    if (keys.p) topPaddleX = Math.min(containerWidth - hPaddleWidth, topPaddleX + paddleSpeed);
    
    // Bottom paddle (Player 4) - Modifié de ←/→ à C/V
    if (keys.c) bottomPaddleX = Math.max(0, bottomPaddleX - paddleSpeed);
    if (keys.v) bottomPaddleX = Math.min(containerWidth - hPaddleWidth, bottomPaddleX + paddleSpeed);
    
    // Sauvegarde la position précédente de la balle
    const prevBallX = ballX;
    const prevBallY = ballY;

    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Left paddle collision
    if (
      ballSpeedX < 0 && 
      prevBallX >= leftPaddleX + vPaddleWidth && 
      ballX < leftPaddleX + vPaddleWidth &&
      ballY + ballSize > leftPaddleY &&
      ballY < leftPaddleY + vPaddleHeight
    ) {
      const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
      const newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
      const speedRatio = newSpeed / currentSpeed;

      ballSpeedX = Math.abs(ballSpeedX) * speedRatio;
      // Influence de la position d'impact
      const hitPosition = (ballY + ballSize/2 - (leftPaddleY + vPaddleHeight/2)) / (vPaddleHeight/2);
      ballSpeedY = newSpeed * hitPosition * 0.8;

      // Replace la balle juste à côté de la raquette
      ballX = leftPaddleX + vPaddleWidth;

      // Enregistrer que le joueur gauche a touché la balle en dernier
      lastPlayerTouched = 'left';
    }

    // Right paddle collision
    if (
      ballSpeedX > 0 && 
      prevBallX + ballSize <= rightPaddleX && 
      ballX + ballSize > rightPaddleX &&
      ballY + ballSize > rightPaddleY &&
      ballY < rightPaddleY + vPaddleHeight
    ) {
      const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
      const newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
      const speedRatio = newSpeed / currentSpeed;

      ballSpeedX = -Math.abs(ballSpeedX) * speedRatio;
      const hitPosition = (ballY + ballSize/2 - (rightPaddleY + vPaddleHeight/2)) / (vPaddleHeight/2);
      ballSpeedY = newSpeed * hitPosition * 0.8;

      ballX = rightPaddleX - ballSize;

      // Enregistrer que le joueur droit a touché la balle en dernier
      lastPlayerTouched = 'right';
    }
    
    // Top paddle collision
    if (
      ballSpeedY < 0 && 
      prevBallY >= topPaddleY + hPaddleHeight && 
      ballY < topPaddleY + hPaddleHeight &&
      ballX + ballSize > topPaddleX &&
      ballX < topPaddleX + hPaddleWidth
    ) {
      const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
      const newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
      const speedRatio = newSpeed / currentSpeed;

      ballSpeedY = Math.abs(ballSpeedY) * speedRatio;
      // Influence de la position d'impact horizontale
      const hitPosition = (ballX + ballSize/2 - (topPaddleX + hPaddleWidth/2)) / (hPaddleWidth/2);
      ballSpeedX = newSpeed * hitPosition * 0.8;

      ballY = topPaddleY + hPaddleHeight;

      // Enregistrer que le joueur du haut a touché la balle en dernier
      lastPlayerTouched = 'top';
    }

    // Bottom paddle collision
    if (
      ballSpeedY > 0 && 
      prevBallY + ballSize <= bottomPaddleY && 
      ballY + ballSize > bottomPaddleY &&
      ballX + ballSize > bottomPaddleX &&
      ballX < bottomPaddleX + hPaddleWidth
    ) {
      const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
      const newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
      const speedRatio = newSpeed / currentSpeed;

      ballSpeedY = -Math.abs(ballSpeedY) * speedRatio;
      const hitPosition = (ballX + ballSize/2 - (bottomPaddleX + hPaddleWidth/2)) / (hPaddleWidth/2);
      ballSpeedX = newSpeed * hitPosition * 0.8;

      ballY = bottomPaddleY - ballSize;

      // Enregistrer que le joueur du bas a touché la balle en dernier
      lastPlayerTouched = 'bottom';
    }
    
    // Scoring and wall collisions - NOUVELLE LOGIQUE
    
    // Vérifier si la balle sort du terrain
    if (ballX <= 0 || ballX + ballSize >= containerWidth || 
        ballY <= 0 || ballY + ballSize >= containerHeight) {
      
      // Attribution des points au dernier joueur qui a touché la balle
      if (lastPlayerTouched && lastPlayerTouched !== '') {
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
    
    // Prevent spiral of death with large delays (e.g., tab switch)
    const cappedDeltaTime = Math.min(deltaTime, 50);
    accumulator += cappedDeltaTime;
    
    // Update physics at fixed time steps for consistency
    while (accumulator >= fixedTimeStep) {
      updatePhysics();
      if (gameOver) break;
      accumulator -= fixedTimeStep;
    }
    
    // Update DOM elements only once per frame
    leftPaddle!.style.transform = `translate3d(0, ${pendingLeftPaddleY}px, 0)`; // Ajout de !
    rightPaddle!.style.transform = `translate3d(0, ${pendingRightPaddleY}px, 0)`; // Ajout de !
    topPaddle!.style.transform = `translate3d(${pendingTopPaddleX}px, 0, 0)`; // Ajout de !
    bottomPaddle!.style.transform = `translate3d(${pendingBottomPaddleX}px, 0, 0)`; // Ajout de !
    ball!.style.transform = `translate3d(${pendingBallX}px, ${pendingBallY}px, 0)`; // Ajout de !
    
    // Continue the game loop
    if (!gameOver) {
      animationFrameId = requestAnimationFrame(gameLoop);
    }
  }
  
  // Start the game loop
  gameLoop(0);
  
  return { cleanup, gameOverPromise };
}