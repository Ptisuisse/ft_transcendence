import '../style.css';
import { navigateTo } from '../routes.ts';
import { translations } from '../i18n.ts';
import { getCurrentLang } from '../components/navbar.ts';

function t(key: string): string {
  const lang = getCurrentLang();
  const langTranslations = translations[lang as keyof typeof translations] || translations.en;
  return langTranslations[key as keyof typeof langTranslations] || translations.en[key as keyof typeof translations.en] || key;
}

interface PongMultiplayerSettings {
  ballColor: string;
  leftPaddleColor: string;
  rightPaddleColor: string;
  topPaddleColor: string;
  bottomPaddleColor: string;
  powerupsEnabled: boolean;
}


export function PongMultiplayerMenuPage(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'Parent p-5 flex flex-col items-center';
  

  const menuModal = document.createElement('div');
  menuModal.className = 'w-full max-w-[500px] bg-gray-800 border-2 border-purple-500 rounded-lg p-4 sm:p-6 shadow-xl mx-auto';


  const menuTitle = document.createElement('h2');
  menuTitle.className = 'text-white text-2xl font-bold mb-6 text-center';
  menuTitle.textContent = translations[getCurrentLang()].PongSettings || 'Pong 4 Players Settings';
  menuModal.appendChild(menuTitle);

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

  const topPaddleSection = document.createElement('div');
  topPaddleSection.className = 'mb-6';
  
  const topPaddleLabel = document.createElement('p');
  topPaddleLabel.className = 'text-white mb-2';
  topPaddleLabel.textContent = translations[getCurrentLang()].TopPaddleColor || 'Top Paddle Color (Player 3 - O/P)';
  topPaddleSection.appendChild(topPaddleLabel);
  
  const topPaddleColorPicker = document.createElement('input');
  topPaddleColorPicker.type = 'color';
  topPaddleColorPicker.className = 'w-full h-10 cursor-pointer';
  topPaddleColorPicker.value = '#00FF00';
  topPaddleSection.appendChild(topPaddleColorPicker);
  menuModal.appendChild(topPaddleSection);
  
  const bottomPaddleSection = document.createElement('div');
  bottomPaddleSection.className = 'mb-6';
  
  const bottomPaddleLabel = document.createElement('p');
  bottomPaddleLabel.className = 'text-white mb-2';
  bottomPaddleLabel.textContent = translations[getCurrentLang()].BottomPaddleColor || 'Bottom Paddle Color (Player 4 - C/V)';
  bottomPaddleSection.appendChild(bottomPaddleLabel);
  
  const bottomPaddleColorPicker = document.createElement('input');
  bottomPaddleColorPicker.type = 'color';
  bottomPaddleColorPicker.className = 'w-full h-10 cursor-pointer';
  bottomPaddleColorPicker.value = '#FFFF00';
  bottomPaddleSection.appendChild(bottomPaddleColorPicker);
  menuModal.appendChild(bottomPaddleSection);
  
  const powerupsSection = document.createElement('div');
  powerupsSection.className = 'mb-6';

  const powerupsLabel = document.createElement('p');
  powerupsLabel.className = 'text-white mb-2';
  powerupsLabel.textContent = translations[getCurrentLang()].EnablePowerups || "Enable Power-ups";
  powerupsSection.appendChild(powerupsLabel);

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
  

  const startButton = document.createElement('button');
  startButton.className = 'w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors font-bold';
  startButton.textContent = translations[getCurrentLang()].StartGame || 'Start Game';
  startButton.addEventListener('click', () => {

    const settings: PongMultiplayerSettings = {
      ballColor: ballColorPicker.value,
      leftPaddleColor: leftPaddleColorPicker.value,
      rightPaddleColor: rightPaddleColorPicker.value,
      topPaddleColor: topPaddleColorPicker.value,
      bottomPaddleColor: bottomPaddleColorPicker.value,
      powerupsEnabled: (document.getElementById('powerups-toggle') as HTMLInputElement)?.checked || false
    };
    

    localStorage.setItem('pongMultiplayerSettings', JSON.stringify(settings));
    

    navigateTo('/pong_multiplayer/game');
  });
  
  menuModal.appendChild(startButton);
  element.appendChild(menuModal);
  
  return element;
}


export function PongMultiplayerGamePage(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'Parent p-5 flex flex-col items-center';
  

  let settings: PongMultiplayerSettings = {
    ballColor: '#FFFFFF',
    leftPaddleColor: '#FF0000',
    rightPaddleColor: '#00AAFF',
    topPaddleColor: '#00FF00',
    bottomPaddleColor: '#FFFF00',
    powerupsEnabled: false
  };
  
  try {
    const savedSettings = localStorage.getItem('pongMultiplayerSettings');
    if (savedSettings) {
      settings = JSON.parse(savedSettings);
    }
  } catch (error) {
    console.error('Failed to load game settings:', error);
  }
  

  const gameWrapper = document.createElement('div');
  gameWrapper.className = 'relative w-full max-w-[800px] mx-auto';
  

  const scoreBoard = createScoreBoard(
    settings.leftPaddleColor, 
    settings.rightPaddleColor,
    settings.topPaddleColor,
    settings.bottomPaddleColor
  );
  gameWrapper.appendChild(scoreBoard);
  

  const gameContainer = createGameContainer(
    settings.leftPaddleColor, 
    settings.rightPaddleColor,
    settings.topPaddleColor,
    settings.bottomPaddleColor
  );
  gameWrapper.appendChild(gameContainer);
  

  const gameOverMessage = document.createElement('div');
  gameOverMessage.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-90 p-6 rounded-lg text-center hidden';
  gameOverMessage.id = 'game-over-message';
  
  const gameOverText = document.createElement('h2');
  gameOverText.className = 'text-white text-2xl mb-4';
  gameOverText.id = 'winner-text';
  gameOverMessage.appendChild(gameOverText);
  
  gameWrapper.appendChild(gameOverMessage);
  
  const menuButton = document.createElement('button');
  menuButton.className = 'mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors';
  menuButton.textContent = translations[getCurrentLang()].BackToMenu || 'Back to Menu';
  menuButton.addEventListener('click', () => {
    if (typeof cleanup === 'function') {
      cleanup();
    }
    navigateTo('/pong_multiplayer');
  });
  
  element.appendChild(gameWrapper);
  element.appendChild(menuButton);
  
  let cleanup: (() => void) | undefined;
  setTimeout(() => {
    const ball = document.getElementById('ball');
    if (ball) ball.style.backgroundColor = settings.ballColor;
    const result = setupPaddleMovement(settings.powerupsEnabled);
    cleanup = result.cleanup;
    
    result.gameOverPromise.then(winner => {
      const gameOverMessage = document.getElementById('game-over-message');
      const winnerText = document.getElementById('winner-text');
      
      if (gameOverMessage && winnerText) {
        const winnerMessages: { [key: string]: string } = {
          'left': `${t('Player')} 1 ${t('Wins')}`,
          'right': `${t('Player')} 2 ${t('Wins')}`,
          'top': `${t('Player')} 3 ${t('Wins')}`,
          'bottom': `${t('Player')} 4 ${t('Wins')}`
        };
        
        winnerText.textContent = winnerMessages[winner];
        gameOverMessage.classList.remove('hidden');
      }
    });
  }, 100);
  
  return element;
}

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
  scoreBoard.className = 'flex flex-wrap justify-center items-center w-full max-w-[800px] mb-2 sm:mb-4 text-2xl sm:text-3xl font-bold';
  
  const leftGroup = document.createElement('div');
  leftGroup.className = 'flex items-center mx-2 sm:mx-4';
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
  rightGroup.className = 'flex items-center mx-2 sm:mx-4';
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
  topGroup.className = 'flex items-center mx-2 sm:mx-4';
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
  bottomGroup.className = 'flex items-center mx-2 sm:mx-4';
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
  border.className = 'border-2 border-solid border-green-500 w-full max-w-[800px] aspect-[4/3] bg-gray-900 relative overflow-hidden';
  border.id = 'game-container';
  
  const leftPaddle = document.createElement('div');
  leftPaddle.className = 'absolute left-[1.25%] top-0 w-[1.875%] h-[16.67%]';
  leftPaddle.id = 'left-paddle';
  leftPaddle.style.backgroundColor = leftColor;
  leftPaddle.style.willChange = 'transform';
  
  const rightPaddle = document.createElement('div');
  rightPaddle.className = 'absolute right-[1.25%] top-0 w-[1.875%] h-[16.67%]';
  rightPaddle.id = 'right-paddle';
  rightPaddle.style.backgroundColor = rightColor;
  rightPaddle.style.willChange = 'transform';

  const topPaddle = document.createElement('div');
  topPaddle.className = 'absolute top-[1.67%] left-0 h-[2.5%] w-[16.67%]';
  topPaddle.id = 'top-paddle';
  topPaddle.style.backgroundColor = topColor;
  topPaddle.style.willChange = 'transform';

  const bottomPaddle = document.createElement('div');
  bottomPaddle.className = 'absolute bottom-[1.67%] left-0 h-[2.5%] w-[16.67%]';
  bottomPaddle.id = 'bottom-paddle';
  bottomPaddle.style.backgroundColor = bottomColor;
  bottomPaddle.style.willChange = 'transform';

  const ball = document.createElement('div');
  ball.className = 'absolute w-[2.5%] h-[3.33%] rounded-full';
  ball.id = 'ball';
  ball.style.willChange = 'transform';

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
  
  let leftScore = 0;
  let rightScore = 0;
  let topScore = 0;
  let bottomScore = 0;
  const maxScore = 3;
  let gameOver = false;
  let gameOverResolve: (winner: string) => void;
  
  let lastPlayerTouched: 'left' | 'right' | 'top' | 'bottom' | '' = '';
  
  const gameOverPromise = new Promise<string>(resolve => {
    gameOverResolve = resolve;
  });
  
  const keys = {
    w: false,
    s: false,
    arrowup: false,
    arrowdown: false,
    o: false,
    p: false,
    c: false,
    v: false
  };
  
  const keyDownHandler = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (['w', 's', 'arrowup', 'arrowdown', 'o', 'p', 'c', 'v'].includes(key)) {
      event.preventDefault();
      (keys as any)[key] = true;
    }
  };
  
  const keyUpHandler = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (['w', 's', 'arrowup', 'arrowdown', 'o', 'p', 'c', 'v'].includes(key)) {
      (keys as any)[key] = false;
    }
  };
  
  document.addEventListener('keydown', keyDownHandler, { passive: false });
  document.addEventListener('keyup', keyUpHandler, { passive: true });
  
  let containerWidth = gameContainer.clientWidth;
  let containerHeight = gameContainer.clientHeight;
  
  const leftPaddleX = containerWidth * 0.0125;
  const rightPaddleX = containerWidth * 0.9688;
  const topPaddleY = containerHeight * 0.0167;
  const bottomPaddleY = containerHeight * 0.9583;
  
  let vPaddleHeight = containerHeight * 0.1667;
  let vPaddleWidth = containerWidth * 0.01875;
  let hPaddleWidth = containerWidth * 0.1667;
  let hPaddleHeight = containerHeight * 0.025;

  let normalVPaddleHeight = vPaddleHeight;
  let giantVPaddleHeight = vPaddleHeight * 2;
  let normalHPaddleWidth = hPaddleWidth;
  let giantHPaddleWidth = hPaddleWidth * 2;
  
  const normalVPaddleHeightPercent = 0.1667;
  const giantVPaddleHeightPercent = 0.3334;
  const normalHPaddleWidthPercent = 0.1667;
  const giantHPaddleWidthPercent = 0.3334;
  
  let leftPaddleY = (containerHeight - vPaddleHeight) / 2;
  let rightPaddleY = (containerHeight - vPaddleHeight) / 2;
  let topPaddleX = (containerWidth - hPaddleWidth) / 2;
  let bottomPaddleX = (containerWidth - hPaddleWidth) / 2;
  
  let paddleSpeed = containerWidth * 0.00625;
  
  let ballSize = Math.min(containerWidth * 0.025, containerHeight * 0.0333);
  let ballX = containerWidth / 2 - ballSize / 2;
  let ballY = containerHeight / 2 - ballSize / 2;
  let initialSpeed = containerWidth * 0.005;
  let ballSpeedX = initialSpeed;
  let ballSpeedY = initialSpeed * 0.3;
  const speedIncrement = initialSpeed * 0.125;
  let maxSpeed = initialSpeed * 2.5;
  
  let pendingLeftPaddleY = leftPaddleY;
  let pendingRightPaddleY = rightPaddleY;
  let pendingTopPaddleX = topPaddleX;
  let pendingBottomPaddleX = bottomPaddleX;
  let pendingBallX = ballX;
  let pendingBallY = ballY;
  
  let lastTime = performance.now();
  const fixedTimeStep = 1000 / 60;
  let accumulator = 0;
  let animationFrameId = 0;
  
  let powerupActive = false;
  let powerupAffectedPaddle: 'left' | 'right' | 'top' | 'bottom' | null = null;
  let powerupTimer: number | null = null;
  let powerupDuration = 5000;
  let lastPowerupTime = 0;
  let powerupCooldown = 500;

  let collectibleElement: HTMLDivElement | null = null;
  let collectibleX = 0;
  let collectibleY = 0;

  const collectibleSizePercent = 0.03;
  let collectibleSize = containerWidth * collectibleSizePercent;
  
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === gameContainer) {
        const oldWidth = containerWidth;
        const oldHeight = containerHeight;
        
        containerWidth = entry.contentRect.width;
        containerHeight = entry.contentRect.height;
        
        const widthRatio = containerWidth / oldWidth;
        const heightRatio = containerHeight / oldHeight;
        
        vPaddleHeight = containerHeight * 0.1667;
        vPaddleWidth = containerWidth * 0.01875;
        hPaddleWidth = containerWidth * 0.1667;
        hPaddleHeight = containerHeight * 0.025;
        ballSize = Math.min(containerWidth * 0.025, containerHeight * 0.0333);
        
        leftPaddleY *= heightRatio;
        rightPaddleY *= heightRatio;
        topPaddleX *= widthRatio;
        bottomPaddleX *= widthRatio;
        ballX *= widthRatio;
        ballY *= heightRatio;
        
        paddleSpeed = containerWidth * 0.00625;
        initialSpeed = containerWidth * 0.005;
        ballSpeedX *= widthRatio;
        ballSpeedY *= heightRatio;
        maxSpeed = initialSpeed * 2.5;
        
        collectibleSize = containerWidth * collectibleSizePercent;
        
        applyChanges();
      }
    }
  });
  
  resizeObserver.observe(gameContainer);
  
  function applyChanges() {
    if (leftPaddle && rightPaddle && topPaddle && bottomPaddle && ball) {
      ball.style.width = `${ballSize}px`;
      ball.style.height = `${ballSize}px`;
      ball.style.transform = `translate3d(${pendingBallX}px, ${pendingBallY}px, 0)`;
      
      if (powerupActive && powerupAffectedPaddle === 'left') {
        leftPaddle.style.height = `${giantVPaddleHeight}px`;
      } else {
        leftPaddle.style.height = `${normalVPaddleHeight}px`;
      }
      leftPaddle.style.transform = `translate3d(0, ${pendingLeftPaddleY}px, 0)`;
      
      if (powerupActive && powerupAffectedPaddle === 'right') {
        rightPaddle.style.height = `${giantVPaddleHeight}px`;
      } else {
        rightPaddle.style.height = `${normalVPaddleHeight}px`;
      }
      rightPaddle.style.transform = `translate3d(0, ${pendingRightPaddleY}px, 0)`;
      
      if (powerupActive && powerupAffectedPaddle === 'top') {
        topPaddle.style.width = `${giantHPaddleWidth}px`;
      } else {
        topPaddle.style.width = `${normalHPaddleWidth}px`;
      }
      topPaddle.style.transform = `translate3d(${pendingTopPaddleX}px, 0, 0)`;
      
      if (powerupActive && powerupAffectedPaddle === 'bottom') {
        bottomPaddle.style.width = `${giantHPaddleWidth}px`;
      } else {
        bottomPaddle.style.width = `${normalHPaddleWidth}px`;
      }
      bottomPaddle.style.transform = `translate3d(${pendingBottomPaddleX}px, 0, 0)`;
    }
  }
  
  const cleanup = () => {
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('keyup', keyUpHandler);
    resizeObserver.disconnect();
    cancelAnimationFrame(animationFrameId);
    gameOver = true;
    
    if (powerupTimer !== null) {
      clearTimeout(powerupTimer);
      powerupTimer = null;
    }
    
    if (collectibleElement && collectibleElement.parentNode) {
      gameContainer.removeChild(collectibleElement);
      collectibleElement = null;
    }
  };
  
  function updatePhysics() {
    if (keys.w) leftPaddleY = Math.max(0, leftPaddleY - paddleSpeed);
    if (keys.s) {
      const currentLeftPaddleHeightPercent = powerupActive && powerupAffectedPaddle === 'left' 
        ? giantVPaddleHeightPercent 
        : normalVPaddleHeightPercent;
      const currentLeftPaddleHeight = containerHeight * currentLeftPaddleHeightPercent;
      leftPaddleY = Math.min(containerHeight - currentLeftPaddleHeight, leftPaddleY + paddleSpeed);
    }
    
    if (keys.arrowup) rightPaddleY = Math.max(0, rightPaddleY - paddleSpeed);
    if (keys.arrowdown) {
      const currentRightPaddleHeightPercent = powerupActive && powerupAffectedPaddle === 'right' 
        ? giantVPaddleHeightPercent 
        : normalVPaddleHeightPercent;
      const currentRightPaddleHeight = containerHeight * currentRightPaddleHeightPercent;
      rightPaddleY = Math.min(containerHeight - currentRightPaddleHeight, rightPaddleY + paddleSpeed);
    }
    
    if (keys.o) topPaddleX = Math.max(0, topPaddleX - paddleSpeed);
    if (keys.p) {
      const currentTopPaddleWidthPercent = powerupActive && powerupAffectedPaddle === 'top' 
        ? giantHPaddleWidthPercent 
        : normalHPaddleWidthPercent;
      const currentTopPaddleWidth = containerWidth * currentTopPaddleWidthPercent;
      topPaddleX = Math.min(containerWidth - currentTopPaddleWidth, topPaddleX + paddleSpeed);
    }
    
    if (keys.c) bottomPaddleX = Math.max(0, bottomPaddleX - paddleSpeed);
    if (keys.v) {
      const currentBottomPaddleWidthPercent = powerupActive && powerupAffectedPaddle === 'bottom' 
        ? giantHPaddleWidthPercent 
        : normalHPaddleWidthPercent;
      const currentBottomPaddleWidth = containerWidth * currentBottomPaddleWidthPercent;
      bottomPaddleX = Math.min(containerWidth - currentBottomPaddleWidth, bottomPaddleX + paddleSpeed);
    }
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    if (ballY < 0) {
      ballY = 0;
      ballSpeedY = Math.abs(ballSpeedY);
    } else if (ballY + ballSize > containerHeight) {
      ballY = containerHeight - ballSize;
      ballSpeedY = -Math.abs(ballSpeedY);
    }

    if (ballX < 0) {
      if (lastPlayerTouched && lastPlayerTouched !== 'left') {
        scorePoint(lastPlayerTouched);
      }
      resetBall();
    } else if (ballX + ballSize > containerWidth) {
      if (lastPlayerTouched && lastPlayerTouched !== 'right') {
        scorePoint(lastPlayerTouched);
      }
      resetBall();
    }

    function scorePoint(player: 'left' | 'right' | 'top' | 'bottom') {
      switch (player) {
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
    
    if (ballSpeedX < 0) {
      const currentLeftPaddleHeight = powerupActive && powerupAffectedPaddle === 'left' 
        ? giantVPaddleHeight 
        : normalVPaddleHeight;
      
      if (
        ballX <= leftPaddleX + vPaddleWidth &&
        ballX + ballSize > leftPaddleX &&
        ballY + ballSize > leftPaddleY &&
        ballY < leftPaddleY + currentLeftPaddleHeight
      ) {
        const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
        const newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
        const speedRatio = newSpeed / currentSpeed;

        ballSpeedX = Math.abs(ballSpeedX) * speedRatio;
        const hitPosition = (ballY + ballSize/2 - (leftPaddleY + currentLeftPaddleHeight/2)) / (currentLeftPaddleHeight/2);
        ballSpeedY = newSpeed * hitPosition * 0.8;

        ballX = leftPaddleX + vPaddleWidth;

        lastPlayerTouched = 'left';
      }
    }

    if (ballSpeedX > 0) {
      const currentRightPaddleHeight = powerupActive && powerupAffectedPaddle === 'right' 
        ? giantVPaddleHeight 
        : normalVPaddleHeight;
      
      if (
        ballX + ballSize >= rightPaddleX &&
        ballX < rightPaddleX + vPaddleWidth &&
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

        lastPlayerTouched = 'right';
      }
    }
    
    if (ballSpeedY < 0) {
      const currentTopPaddleWidth = powerupActive && powerupAffectedPaddle === 'top' 
        ? giantHPaddleWidth 
        : normalHPaddleWidth;
      
      if (
        ballY <= topPaddleY + hPaddleHeight &&
        ballY >= topPaddleY &&
        ballX + ballSize > topPaddleX &&
        ballX < topPaddleX + currentTopPaddleWidth
      ) {
        const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
        const newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
        const speedRatio = newSpeed / currentSpeed;

        ballSpeedY = Math.abs(ballSpeedY) * speedRatio;
        const hitPosition = (ballX + ballSize/2 - (topPaddleX + currentTopPaddleWidth/2)) / (currentTopPaddleWidth/2);
        ballSpeedX = newSpeed * hitPosition * 0.8;

        ballY = topPaddleY + hPaddleHeight;

        lastPlayerTouched = 'top';
      }
    }

    if (ballSpeedY > 0) {
      const currentBottomPaddleWidth = powerupActive && powerupAffectedPaddle === 'bottom' 
        ? giantHPaddleWidth 
        : normalHPaddleWidth;
      
      if (
        ballY + ballSize >= bottomPaddleY &&
        ballY < bottomPaddleY + hPaddleHeight &&
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

        lastPlayerTouched = 'bottom';
      }
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
          if (lastPlayerTouched) {
            powerupActive = true;
            powerupAffectedPaddle = lastPlayerTouched;

            if (collectibleElement && collectibleElement.parentNode) {
              gameContainer.removeChild(collectibleElement);
              collectibleElement = null;
            }

            const notification = document.createElement('div');
            notification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-4 py-2 rounded-md z-50';
            
            let playerText = "";
            switch(powerupAffectedPaddle) {
              case 'left': playerText = "Player 1"; break;
              case 'right': playerText = "Player 2"; break;
              case 'top': playerText = "Player 3"; break;
              case 'bottom': playerText = "Player 4"; break;
            }
            
            notification.textContent = `Giant Paddle (${playerText})`;
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
      }
    } else if (collectibleElement && collectibleElement.parentNode && gameContainer) {
      gameContainer.removeChild(collectibleElement);
      collectibleElement = null;
    }
    
    if (ballX <= 0 || ballX + ballSize >= containerWidth || 
        ballY <= 0 || ballY + ballSize >= containerHeight) {
      
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
      
      resetBall();
      
      lastPlayerTouched = '';
    }
    
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
    
    ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * initialSpeed;
    ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * initialSpeed * 0.3;
  }
  
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
    
    if (leftPaddle && rightPaddle && topPaddle && bottomPaddle && ball) {
      if (powerupActive && powerupAffectedPaddle === 'left') {
        leftPaddle.style.height = `${giantVPaddleHeight}px`;
      } else {
        leftPaddle.style.height = `${normalVPaddleHeight}px`;
      }
      leftPaddle.style.transform = `translate3d(0, ${pendingLeftPaddleY}px, 0)`;
      
      if (powerupActive && powerupAffectedPaddle === 'right') {
        rightPaddle.style.height = `${giantVPaddleHeight}px`;
      } else {
        rightPaddle.style.height = `${normalVPaddleHeight}px`;
      }
      rightPaddle.style.transform = `translate3d(0, ${pendingRightPaddleY}px, 0)`;
      
      if (powerupActive && powerupAffectedPaddle === 'top') {
        topPaddle.style.width = `${giantHPaddleWidth}px`;
      } else {
        topPaddle.style.width = `${normalHPaddleWidth}px`;
      }
      topPaddle.style.transform = `translate3d(${pendingTopPaddleX}px, 0, 0)`;
      
      if (powerupActive && powerupAffectedPaddle === 'bottom') {
        bottomPaddle.style.width = `${giantHPaddleWidth}px`;
      } else {
        bottomPaddle.style.width = `${normalHPaddleWidth}px`;
      }
      bottomPaddle.style.transform = `translate3d(${pendingBottomPaddleX}px, 0, 0)`;
      
      ball.style.transform = `translate3d(${pendingBallX}px, ${pendingBallY}px, 0)`;
    }
    
    if (!gameOver) {
      animationFrameId = requestAnimationFrame(gameLoop);
    }
  }
  
  lastTime = performance.now();
  gameLoop(lastTime);
  
  return { cleanup, gameOverPromise };
}