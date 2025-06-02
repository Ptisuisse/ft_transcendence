import '../style.css';
import { navigateTo } from '../routes.ts';

// Stockage des paramètres entre les pages
interface PongSettings {
  ballColor: string;
  leftPaddleColor: string;
  rightPaddleColor: string;
  aiEnabled: boolean;
}

// Page du menu
export function PongMenuPage(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'flex flex-col justify-center items-center h-screen';
  
  // Menu container
  const menuModal = document.createElement('div');
  menuModal.className = 'w-[400px] bg-gray-800 border-2 border-purple-500 rounded-lg p-6 shadow-xl';

  // Menu title
  const menuTitle = document.createElement('h2');
  menuTitle.className = 'text-white text-2xl font-bold mb-6 text-center';
  menuTitle.textContent = 'PONG Settings';
  menuModal.appendChild(menuTitle);

  // Ball color selection
  const colorSection = document.createElement('div');
  colorSection.className = 'mb-6';
  
  const colorLabel = document.createElement('p');
  colorLabel.className = 'text-white mb-2';
  colorLabel.textContent = 'Select Ball Color:';
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
  leftPaddleLabel.textContent = 'Left Paddle Color:';
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
  rightPaddleLabel.textContent = 'Right Paddle Color:';
  rightPaddleSection.appendChild(rightPaddleLabel);
  
  const rightPaddleColorPicker = document.createElement('input');
  rightPaddleColorPicker.type = 'color';
  rightPaddleColorPicker.className = 'w-full h-10 cursor-pointer';
  rightPaddleColorPicker.value = '#00AAFF';
  rightPaddleSection.appendChild(rightPaddleColorPicker);
  menuModal.appendChild(rightPaddleSection);
  
  // AI section
  const aiSection = document.createElement('div');
  aiSection.className = 'mb-6';
  
  const aiLabel = document.createElement('p');
  aiLabel.className = 'text-white mb-2';
  aiLabel.textContent = 'Enable AI Opponent:';
  aiSection.appendChild(aiLabel);

  // AI toggle
  const toggleContainer = document.createElement('div');
  toggleContainer.className = 'flex items-center justify-between';

  const humanLabel = document.createElement('span');
  humanLabel.className = 'text-white text-sm';
  humanLabel.textContent = '2 Players';

  const aiLabel2 = document.createElement('span');
  aiLabel2.className = 'text-white text-sm';
  aiLabel2.textContent = 'vs AI';

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
  
  // Start button
  const startButton = document.createElement('button');
  startButton.className = 'w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors font-bold';
  startButton.textContent = 'Start Game';
  startButton.addEventListener('click', () => {
    // Sauvegarder les paramètres
    const settings: PongSettings = {
      ballColor: ballColorPicker.value,
      leftPaddleColor: leftPaddleColorPicker.value,
      rightPaddleColor: rightPaddleColorPicker.value,
      aiEnabled: toggleInput.checked
    };
    
    // Stocker dans localStorage pour y accéder depuis la page de jeu
    localStorage.setItem('pongSettings', JSON.stringify(settings));
    
    // Naviguer vers la page de jeu
    navigateTo('/pong/game');
  });
  
  menuModal.appendChild(startButton);
  element.appendChild(menuModal);
  
  return element;
}

// Page du jeu
export function PongGamePage(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'flex flex-col justify-center items-center h-screen';
  
  // Charger les paramètres
  let settings: PongSettings = {
    ballColor: '#FFFFFF',
    leftPaddleColor: '#FF0000',
    rightPaddleColor: '#00AAFF',
    aiEnabled: false
  };
  
  try {
    const savedSettings = localStorage.getItem('pongSettings');
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
  const scoreBoard = createScoreBoard(settings.leftPaddleColor, settings.rightPaddleColor);
  gameWrapper.appendChild(scoreBoard);
  
  // Conteneur de jeu
  const gameContainer = createGameContainer(settings.leftPaddleColor, settings.rightPaddleColor);
  gameWrapper.appendChild(gameContainer);
  
  // Bouton retour au menu
  const menuButton = document.createElement('button');
  menuButton.className = 'mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors';
  menuButton.textContent = 'Back to Menu';
  menuButton.addEventListener('click', () => {
    // Nettoyage avant navigation
    if (typeof cleanup === 'function') {
      cleanup();
    }
    navigateTo('/pong');
  });
  
  element.appendChild(gameWrapper);
  element.appendChild(menuButton);
  
  // Démarrer le jeu avec un léger délai pour laisser le DOM se mettre en place
  let cleanup: (() => void) | undefined;
  setTimeout(() => {
    const ball = document.getElementById('ball');
    if (ball) ball.style.backgroundColor = settings.ballColor;
    cleanup = setupPaddleMovement(settings.aiEnabled);
  }, 100);
  
  return element;
}

// Legacy function for backwards compatibility
export function PongPage(): HTMLElement {
  return PongMenuPage();
}

// Fonctions utilitaires modifiées pour utiliser les paramètres
function createScoreBoard(leftColor = '#FF0000', rightColor = '#00AAFF'): HTMLDivElement {
  const scoreBoard = document.createElement('div');
  scoreBoard.className = 'flex justify-center items-center w-[800px] mb-4 text-4xl font-bold';
  
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
  border.className = 'border-2 border-solid border-green-500 w-[800px] h-[600px] bg-gray-900 relative overflow-hidden';
  border.id = 'game-container';
  
  const leftPaddle = document.createElement('div');
  leftPaddle.className = 'absolute left-[10px] top-0 w-[15px] h-[100px]';
  leftPaddle.id = 'left-paddle';
  leftPaddle.style.backgroundColor = leftColor;
  leftPaddle.style.willChange = 'transform';
  leftPaddle.style.transform = 'translate3d(0, 250px, 0)';
  
  const rightPaddle = document.createElement('div');
  rightPaddle.className = 'absolute right-[10px] top-0 w-[15px] h-[100px]';
  rightPaddle.id = 'right-paddle';
  rightPaddle.style.backgroundColor = rightColor;
  rightPaddle.style.willChange = 'transform';
  rightPaddle.style.transform = 'translate3d(0, 250px, 0)';

  const ball = document.createElement('div');
  ball.className = 'absolute w-[20px] h-[20px] rounded-full';
  ball.id = 'ball';
  ball.style.willChange = 'transform';
  ball.style.transform = 'translate3d(390px, 290px, 0)';

  border.appendChild(leftPaddle);
  border.appendChild(rightPaddle);
  border.appendChild(ball);
  
  return border;
}

// Garder le reste des fonctions inchangées
function setupPaddleMovement(aiEnabled: boolean = false) {
  const leftPaddle = document.getElementById('left-paddle');
  const rightPaddle = document.getElementById('right-paddle');
  const ball = document.getElementById('ball');
  const gameContainer = document.getElementById('game-container');
  const leftScoreElement = document.getElementById('left-score');
  const rightScoreElement = document.getElementById('right-score');

  if (!leftPaddle || !rightPaddle || !ball || !gameContainer || 
      !leftScoreElement || !rightScoreElement) return;
  
  // Score variables
  let leftScore = 0;
  let rightScore = 0;
  
  // Cache initial dimensions to avoid layout thrashing
  const containerWidth = gameContainer.clientWidth;
  const containerHeight = gameContainer.clientHeight;
  const paddleHeight = 100;
  
  let leftPaddleY = 250;
  let rightPaddleY = 250;
  const paddleSpeed = 5;
  
  // Ball properties
  let ballX = 390;
  let ballY = 290;
  let initialSpeed = 2;
  let ballSpeedX = initialSpeed;
  let ballSpeedY = initialSpeed * 0.3;
  const ballSize = 20;
  const speedIncrement = 0.25;
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
  };
  
  // Optimized physics settings
  const fixedTimeStep = 1000 / 60; // Réduit à 60Hz pour plus de performance
  let lastTime = 0;
  let accumulator = 0;
  let animationFrameId = 0;
  
  // Précalculer des valeurs utilisées fréquemment
  const paddleTop = 0;
  const paddleBottom = containerHeight - paddleHeight;
  // Remove this unused variable
  // const ballRight = containerWidth - ballSize;  
  const ballBottom = containerHeight - ballSize;
  const leftPaddleX = 25;
  const rightPaddleX = containerWidth - 25;
  
  // Optimization: Create DOM operation buffer
  let pendingLeftPaddleY = leftPaddleY;
  let pendingRightPaddleY = rightPaddleY;
  let pendingBallX = ballX;
  let pendingBallY = ballY;
  
  // Modify the update physics function to include AI logic
  function updatePhysics() {
    // Move left paddle with keyboard input
    if (keys.w) leftPaddleY = Math.max(paddleTop, leftPaddleY - paddleSpeed);
    if (keys.s) leftPaddleY = Math.min(paddleBottom, leftPaddleY + paddleSpeed);
    
    // Move right paddle based on AI status
    if (aiEnabled) {
      // AI LOGIC: Track the ball with some delay and error margin
      const ballCenter = ballY + ballSize / 2;
      const paddleCenter = rightPaddleY + paddleHeight / 2;
      
      // Create a "dead zone" - AI won't move if ball is roughly centered on paddle
      const deadZone = paddleHeight * 0.3; // 30% of paddle height as dead zone
      
      // Only move if ball is outside the dead zone relative to paddle center
      if (Math.abs(ballCenter - paddleCenter) > deadZone) {
        // Only recalculate target position when ball is moving toward AI
        if (ballSpeedX > 0) {
          // If need to move up
          if (ballCenter < paddleCenter) {
            // Move up at a steady pace rather than interpolation
            rightPaddleY -= paddleSpeed * 0.8;
          }
          // If need to move down
          else {
            // Move down at a steady pace
            rightPaddleY += paddleSpeed * 0.8;
          }
          
          // Clamp to valid position
          rightPaddleY = Math.max(paddleTop, Math.min(paddleBottom, rightPaddleY));
        }
      }
      
      // If ball is moving away, occasionally adjust position toward center when far from it
      if (ballSpeedX < 0 && Math.abs(rightPaddleY + paddleHeight/2 - containerHeight/2) > paddleHeight) {
        // Slowly return to center when ball is moving away
        const centerY = containerHeight/2 - paddleHeight/2;
        rightPaddleY += (centerY - rightPaddleY) * 0.02;
      }
    } else {
      // Manual control for right paddle
      if (keys.arrowup) rightPaddleY = Math.max(paddleTop, rightPaddleY - paddleSpeed);
      if (keys.arrowdown) rightPaddleY = Math.min(paddleBottom, rightPaddleY + paddleSpeed);
    }
    
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
    
    // Optimized paddle collision detection
    // Left paddle collision
    if (
      ballSpeedX < 0 && // Only check collision if ball is moving left
      ballX < leftPaddleX && 
      ballX > leftPaddleX - 10 &&
      ballY + ballSize > leftPaddleY && 
      ballY < leftPaddleY + paddleHeight
    ) {
      const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
      const newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
      const speedRatio = newSpeed / currentSpeed;
      
      ballSpeedX = Math.abs(ballSpeedX) * speedRatio;
      const hitPosition = (ballY + ballSize/2 - (leftPaddleY + paddleHeight/2)) / (paddleHeight/2);
      ballSpeedY = newSpeed * hitPosition * 0.8;
      
      ballX = leftPaddleX;
    }
    
    // Right paddle collision
    if (
      ballSpeedX > 0 && // <--- Ajouté : collision seulement si la balle va vers la droite
      ballX + ballSize > rightPaddleX &&
      ballX < rightPaddleX + 15 &&
      ballY + ballSize > rightPaddleY &&
      ballY < rightPaddleY + paddleHeight
    ) {
      const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
      const newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
      const speedRatio = newSpeed / currentSpeed;

      ballSpeedX = -Math.abs(ballSpeedX) * speedRatio;
      const hitPosition = (ballY + ballSize/2 - (rightPaddleY + paddleHeight/2)) / (paddleHeight/2);
      ballSpeedY = newSpeed * hitPosition * 0.8;

      // Place la balle juste à l'extérieur de la raquette
      ballX = rightPaddleX - ballSize;
    }
    
    // Ball out of bounds - update score and reset
    if (ballX < -ballSize) {
      // Right player scores when ball goes past left boundary
      rightScore++;
      if (rightScoreElement) {
        rightScoreElement.textContent = rightScore.toString();
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
      
      // Reset ball to center
      ballX = containerWidth / 2 - ballSize / 2;
      ballY = containerHeight / 2 - ballSize / 2;
      
      // Ball goes towards the player who just lost
      ballSpeedX = -initialSpeed;
      ballSpeedY = (Math.random() * 2 - 1) * initialSpeed * 0.3;
    }
    
    // Update pending values for DOM operations
    pendingLeftPaddleY = leftPaddleY;
    pendingRightPaddleY = rightPaddleY;
    pendingBallX = ballX;
    pendingBallY = ballY;
  }
  
  function applyChanges() {
    // Apply all DOM updates in one batch to prevent layout thrashing
    if (leftPaddle && rightPaddle && ball) {
      // Optimize for GPU acceleration and reduce jank
      leftPaddle.style.transform = `translate3d(0, ${pendingLeftPaddleY}px, 0)`;
      rightPaddle.style.transform = `translate3d(0, ${pendingRightPaddleY}px, 0)`;
      ball.style.transform = `translate3d(${pendingBallX}px, ${pendingBallY}px, 0)`;
    }
  }
  
  // Optimized game loop with frame limiting
  function gameLoop(timestamp: number) {
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
      accumulator -= fixedTimeStep;
      iterations++;
    }
    
    // If we're still behind after max iterations, reset accumulator to prevent lag spiral
    if (iterations >= maxIterations && accumulator >= fixedTimeStep) {
      accumulator = 0;
    }
    
    // Apply visual updates once per frame regardless of physics steps
    applyChanges();
    
    // Continue the game loop
    animationFrameId = requestAnimationFrame(gameLoop);
  }
  
  // Start the game loop
  animationFrameId = requestAnimationFrame(gameLoop);
  
  return cleanup;
}