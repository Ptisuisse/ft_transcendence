import '../style.css';
import { navigateTo } from '../routes.ts';
import { translations } from '../i18n.ts';
import { getCurrentLang } from '../components/navbar.ts';
import { gameState } from '../gameState.ts';

function t(key: string): string {
  const lang = getCurrentLang();
  const langTranslations = translations[lang as keyof typeof translations] || translations.en;
  return langTranslations[key as keyof typeof langTranslations] || translations.en[key as keyof typeof translations.en] || key;
}

interface PongSettings {
  ballColor: string;
  leftPaddleColor: string;
  rightPaddleColor: string;
  aiEnabled: boolean;
  powerupsEnabled: boolean;
}

export function PongMenuPage(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'Parent p-5 flex flex-col items-center';
  
  const menuModal = document.createElement('div');
  menuModal.className = 'w-full max-w-[400px] bg-gray-800 border-2 border-purple-500 rounded-lg p-4 sm:p-6 shadow-xl mx-auto';

  const isTournamentMatch = localStorage.getItem('currentTournamentMatch') !== null;
  let currentMatch: any = null;
  
  if (isTournamentMatch) {
    try {
      currentMatch = JSON.parse(localStorage.getItem('currentTournamentMatch')!);
    } catch (e) {
      console.error('Failed to parse tournament match data');
    }
  }

  const menuTitle = document.createElement('h2');
  menuTitle.className = 'text-white text-2xl font-bold mb-6 text-center';
  menuTitle.textContent = isTournamentMatch ? t('TournamentMatch') : translations[getCurrentLang()].PongSettings;
  menuModal.appendChild(menuTitle);

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
  
  if (!isTournamentMatch) {
    const aiSection = document.createElement('div');
    aiSection.className = 'mb-6';
    
    const aiLabel = document.createElement('p');
    aiLabel.className = 'text-white mb-2';
    aiLabel.textContent = translations[getCurrentLang()].EnableIA;
    aiSection.appendChild(aiLabel);

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
  startButton.textContent = translations[getCurrentLang()].StartGame;
  startButton.addEventListener('click', () => {
    const settings: PongSettings = {
      ballColor: ballColorPicker.value,
      leftPaddleColor: leftPaddleColorPicker.value,
      rightPaddleColor: rightPaddleColorPicker.value,
      aiEnabled: isTournamentMatch ? false : (document.querySelector('input[type="checkbox"]') as HTMLInputElement)?.checked || false,
      powerupsEnabled: (document.getElementById('powerups-toggle') as HTMLInputElement)?.checked || false
    };
    
    localStorage.setItem('pongSettings', JSON.stringify(settings));
    
    navigateTo('/pong/game');
  });
  
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

export function PongGamePage(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'Parent p-5 flex flex-col items-center';
  
  const gameWrapper = document.createElement('div');
  gameWrapper.className = 'relative w-full max-w-[800px] mx-auto';
  
  let settings: PongSettings = {
    ballColor: '#FFFFFF',
    leftPaddleColor: '#FF0000',
    rightPaddleColor: '#00AAFF',
    aiEnabled: false,
    powerupsEnabled: false
  };
  
  try {
    const savedSettings = localStorage.getItem('pongSettings');
    if (savedSettings) {
      settings = JSON.parse(savedSettings);
    }
  } catch (error) {
    console.error('Failed to load game settings:', error);
  }
  
  const scoreBoard = createScoreBoard(settings.leftPaddleColor, settings.rightPaddleColor);
  gameWrapper.appendChild(scoreBoard);
  
  const gameContainer = createGameContainer(settings.leftPaddleColor, settings.rightPaddleColor);
  gameWrapper.appendChild(gameContainer);
  
  const gameOverMessage = document.createElement('div');
  gameOverMessage.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-90 p-6 rounded-lg text-center hidden';
  gameOverMessage.id = 'game-over-message';
  
  const gameOverText = document.createElement('h2');
  gameOverText.className = 'text-white text-2xl mb-4';
  gameOverText.id = 'winner-text';
  gameOverMessage.appendChild(gameOverText);
  
  gameWrapper.appendChild(gameOverMessage);
  
  let isTournamentMatch = false;
  let currentMatchData = localStorage.getItem('currentTournamentMatch');

  if (currentMatchData) {
    try {
      const currentMatch = JSON.parse(currentMatchData);
      isTournamentMatch = currentMatch && currentMatch.source === 'tournament';
      
      if (!isTournamentMatch) {
        localStorage.removeItem('currentTournamentMatch');
      }
    } catch (e) {
      localStorage.removeItem('currentTournamentMatch');
      console.error('Erreur lors de la vérification du match de tournoi', e);
    }
  }

  const menuButton = document.createElement('button');
  menuButton.className = 'mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors self-center';

  if (isTournamentMatch) {
    menuButton.textContent = 'Return to Tournament';
    menuButton.addEventListener('click', () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
      navigateTo('/pong/tournament');
    });
  } else {
    menuButton.textContent = translations[getCurrentLang()].BackToMenu;
    menuButton.addEventListener('click', () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
      navigateTo('/pong');
    });
  }
  
  element.appendChild(gameWrapper);
  element.appendChild(menuButton);

  let cleanup: (() => void) | undefined;
  let loadingOverlay: HTMLDivElement | null = null;
  if (isTournamentMatch) {
    loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.style.position = 'fixed';
    loadingOverlay.style.top = '0';
    loadingOverlay.style.left = '0';
    loadingOverlay.style.width = '100vw';
    loadingOverlay.style.height = '100vh';
    loadingOverlay.style.background = 'rgba(30, 30, 30, 0.7)';
    loadingOverlay.style.display = 'none';
    loadingOverlay.style.zIndex = '9999';
    loadingOverlay.style.justifyContent = 'center';
    loadingOverlay.style.alignItems = 'center';
    loadingOverlay.style.pointerEvents = 'auto';
    loadingOverlay.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;height:100vh;width:100vw;">
        <svg class="animate-spin" style="height:64px;width:64px;color:#a855f7;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      </div>
    `;
    document.body.appendChild(loadingOverlay);
  }

  setTimeout(() => {
    const ball = document.getElementById('ball');
    if (ball) ball.style.backgroundColor = settings.ballColor;
    const result = setupPaddleMovement(settings.aiEnabled, settings.powerupsEnabled);
    cleanup = result.cleanup;
    
    gameState.registerCleanup(result.cleanup);
    
    const handleNavigation = () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
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
    (element as any).__navigationObserver = observer;
    const handleBeforeUnload = () => {
      gameState.executeCleanup();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    (element as any).__cleanupHandler = handleBeforeUnload;

    result.gameOverPromise.then(async (winner) => {
      let winnerText = '';
      let winnerName = '';
      if (isTournamentMatch) {
        try {
          const matchData = localStorage.getItem('currentTournamentMatch');
          if (matchData) {
            const currentMatch = JSON.parse(matchData);
            if (winner === 'left') {
              winnerName = currentMatch.player1.nickname;
            } else if (winner === 'right') {
              winnerName = currentMatch.player2.nickname;
            }
          }
        } catch (e) {
          console.error('Erreur lors de la récupération du nom du gagnant du tournoi:', e);
        }
      }
      if (isTournamentMatch && winnerName) {
        winnerText = `${winnerName} ${t('Wins')}`;
      } else {
        if (winner === 'left') {
          winnerText = settings.aiEnabled ? t('YouWin') : t('Player') + ' 1 ' + t('Wins');
        } else if (winner === 'right') {
          winnerText = settings.aiEnabled ? t('IAWins') : t('Player') + ' 2 ' + t('Wins');
        } else {
          winnerText = t('GameOver');
        }
      }
      const gameOverMessage = document.getElementById('game-over-message');
      const gameOverText = document.getElementById('winner-text');
      if (gameOverMessage && gameOverText) {
        gameOverText.textContent = winnerText;
        gameOverMessage.classList.remove('hidden');
      }

      if (isTournamentMatch) {
        if (loadingOverlay) {
          loadingOverlay.style.display = 'flex';
          document.querySelectorAll('button, a, [tabindex]').forEach(el => {
            (el as HTMLElement).setAttribute('disabled', 'true');
            (el as HTMLElement).style.pointerEvents = 'none';
          });
          const navbar = document.querySelector('nav');
          if (navbar) {
            (navbar as HTMLElement).style.pointerEvents = 'none';
            (navbar as HTMLElement).style.opacity = '0.5';
          }
        }
        try {
          const matchData = localStorage.getItem('currentTournamentMatch');
          const tournamentConfigRaw = localStorage.getItem('tournamentConfig');
          if (matchData && tournamentConfigRaw) {
            const currentMatch = JSON.parse(matchData);
            const tournamentConfig = JSON.parse(tournamentConfigRaw);
            let winnerPlayer = null;
            if (winner === 'left') {
              winnerPlayer = currentMatch.player1;
            } else if (winner === 'right') {
              winnerPlayer = currentMatch.player2;
            }
            if (winnerPlayer) {
              const leftScoreElement = document.getElementById('left-score');
              const rightScoreElement = document.getElementById('right-score');
              let leftScore = 0;
              let rightScore = 0;
              if (leftScoreElement && rightScoreElement) {
                leftScore = parseInt(leftScoreElement.textContent || '0', 10);
                rightScore = parseInt(rightScoreElement.textContent || '0', 10);
              }
              const scoreValue = Math.max(leftScore, rightScore);
              const scoreText = `${leftScore}-${rightScore}`;
              await fetch('/api/score/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  winner: winnerName,
                  score: scoreValue,
                  scoreDetail: scoreText
                })
              })
                .then(async (res) => {
                  const data = await res.json().catch(() => ({}));
                  console.log('[SCORE SUBMIT]', res.status, data);
                  if (data && data.txHash) {
                    const snowtraceUrl = `https://testnet.snowtrace.io/tx/${data.txHash}`;
                    console.log(`[BLOCKCHAIN] Transaction hash: ${data.txHash}`);
                    console.log(`[BLOCKCHAIN] Voir sur SnowTrace: ${snowtraceUrl}`);
                  } else if (data && data.error) {
                    console.error('[BLOCKCHAIN] Erreur backend:', data.error);
                  } else {
                    console.warn('[BLOCKCHAIN] Réponse inattendue:', data);
                  }
                })
                .catch((err) => {
                  console.error('[SCORE SUBMIT ERROR]', err);
                });
              import('../pages/tournament').then(module => {
                module.updateTournamentWithWinner(
                  tournamentConfig,
                  currentMatch.roundIndex,
                  currentMatch.matchIndex,
                  winnerPlayer
                );
                localStorage.removeItem('currentTournamentMatch');
                if (loadingOverlay) {
                  loadingOverlay.style.display = 'none';
                  document.querySelectorAll('button, a, [tabindex]').forEach(el => {
                    (el as HTMLElement).removeAttribute('disabled');
                    (el as HTMLElement).style.pointerEvents = '';
                  });
                  const navbar = document.querySelector('nav');
                  if (navbar) {
                    (navbar as HTMLElement).style.pointerEvents = '';
                    (navbar as HTMLElement).style.opacity = '';
                  }
                }
                setTimeout(() => {
                  navigateTo('/pong/tournament');
                }, 2000);
              });
            }
          }
        } catch (e) {
          console.error('Erreur lors de la mise à jour du tournoi:', e);
          if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
            document.querySelectorAll('button, a, [tabindex]').forEach(el => {
              (el as HTMLElement).removeAttribute('disabled');
              (el as HTMLElement).style.pointerEvents = '';
            });
            const navbar = document.querySelector('nav');
            if (navbar) {
              (navbar as HTMLElement).style.pointerEvents = '';
              (navbar as HTMLElement).style.opacity = '';
            }
          }
        }
      }
    });
  }, 100);
  
  return element;
}

export function PongPage(): HTMLElement {
  return PongMenuPage();
}

function createScoreBoard(leftColor = '#FF0000', rightColor = '#00AAFF'): HTMLDivElement {
  const scoreBoard = document.createElement('div');
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
  border.className = 'border-2 border-solid border-green-500 w-full max-w-[800px] aspect-[4/3] bg-gray-900 relative overflow-hidden';
  border.id = 'game-container';
  
  const leftPaddle = document.createElement('div');
  leftPaddle.className = 'absolute';
  leftPaddle.id = 'left-paddle';
  leftPaddle.style.backgroundColor = leftColor;
  leftPaddle.style.willChange = 'transform, height';
  leftPaddle.style.transition = 'height 0.3s ease-in-out';
  
  const rightPaddle = document.createElement('div');
  rightPaddle.className = 'absolute';
  rightPaddle.id = 'right-paddle';
  rightPaddle.style.backgroundColor = rightColor;
  rightPaddle.style.willChange = 'transform, height';
  rightPaddle.style.transition = 'height 0.3s ease-in-out';

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

  let leftScore = 0;
  let rightScore = 0;
  const maxScore = 3;
  let gameOver = false;
  let gameOverResolve: (winner: string) => void;

  const gameOverPromise = new Promise<string>(resolve => {
    gameOverResolve = resolve;
  });

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
  let rightPaddleX = containerWidth * (1 - 0.0125 - paddleWidthPercent);
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
        rightPaddleX = containerWidth * (1 - 0.0125 - paddleWidthPercent);
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
      rightPaddle.style.transform = `translate3d(${rightPaddleX}px, ${pendingRightPaddleY}px, 0)`;
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
          collectibleX = Math.random() * (containerWidth - collectibleSize);
          collectibleY = Math.random() * (containerHeight - collectibleSize);
          
          collectibleElement = document.createElement('div');
          collectibleElement.className = 'absolute rounded-full animate-pulse z-10';
          collectibleElement.style.width = `${collectibleSize}px`;
          collectibleElement.style.height = `${collectibleSize}px`;
          collectibleElement.style.backgroundColor = '#00ff00';
          collectibleElement.style.boxShadow = '0 0 10px 5px rgba(0, 255, 0, 0.5)';
          collectibleElement.style.zIndex = '20';
          collectibleElement.style.pointerEvents = 'none';
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