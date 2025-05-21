import '../style.css';

export function PongPage(): HTMLElement {
  const element = document.createElement('div');
  
  // Create game container with proper centering
  element.className = 'Parent p-5';
  
  // Create game border with relative positioning
  const border = document.createElement('div');
  border.className = 'border-2 border-solid border-green-500 w-[800px] h-[600px] relative';
  border.id = 'game-container';
  
  // Create left paddle with absolute positioning
  const leftPaddle = document.createElement('div');
  leftPaddle.className = 'absolute left-[10px] top-0 w-[15px] h-[100px] bg-red-500';
  leftPaddle.id = 'left-paddle';
  leftPaddle.style.willChange = 'transform';
  leftPaddle.style.transform = 'translateY(250px)';
  
  const rightPaddle = document.createElement('div');
  rightPaddle.className = 'absolute right-[10px] top-0 w-[15px] h-[100px] bg-blue-500';
  rightPaddle.id = 'right-paddle';
  rightPaddle.style.willChange = 'transform';
  rightPaddle.style.transform = 'translateY(250px)';

  const ball = document.createElement('div');
  ball.className = 'absolute w-[20px] h-[20px] bg-white rounded-full';
  ball.id = 'ball';
  ball.style.left = '390px';  // Centre horizontalement (800/2 - 20/2)
  ball.style.top = '290px';   // Centre verticalement (600/2 - 20/2)

  border.appendChild(leftPaddle);
  border.appendChild(rightPaddle);
  border.appendChild(ball);
  
  // Add border to main element
  element.appendChild(border);
  
  // Set up paddle movement after the component is mounted
  setTimeout(() => {
    setupPaddleMovement();
  }, 100);
  
  return element;
}

function setupPaddleMovement() {
  const leftPaddle = document.getElementById('left-paddle');
  const rightPaddle = document.getElementById('right-paddle');
  const ball = document.getElementById('ball');

  if (!leftPaddle || !rightPaddle || !ball) return;
  
  let leftPaddleY = 250; // Initial Y position in pixels
  let rightPaddleY = 250;
  const paddleSpeed = 4; // Speed of paddle movement in pixels
  
  // Ball properties
  let ballX = 390;
  let ballY = 290;
  let ballSpeedX = 2; // Vitesse horizontale initiale
  let ballSpeedY = 2; // Vitesse verticale initiale
  const ballSize = 20;
  
  // Track pressed keys
  const keys = {
    w: false,
    s: false,
    arrowup: false,
    arrowdown: false
  };
  
  // // Handle key down
  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key in keys) {
      keys[key] = true;
      event.preventDefault();
    }
  });
  
  // Handle key up
  document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if (key in keys) {
      keys[key] = false;
    }
  });
  
  // Game loop to continuously update positions
  function gameLoop() {
    const gameContainer = document.getElementById('game-container');
    if (!leftPaddle || !rightPaddle || !ball || !gameContainer) return;
    
    const containerRect = gameContainer.getBoundingClientRect();
    const leftPaddleRect = leftPaddle.getBoundingClientRect();
    const rightPaddleRect = rightPaddle.getBoundingClientRect();
    
    // Move paddles (keeping existing code)
    if (keys.w && leftPaddleRect.top > containerRect.top) {
      leftPaddleY -= paddleSpeed;
    }
    if (keys.s && leftPaddleRect.bottom < containerRect.bottom) {
      leftPaddleY += paddleSpeed;
    }
    if (keys.arrowup && rightPaddleRect.top > containerRect.top) {
      rightPaddleY -= paddleSpeed;
    }
    if (keys.arrowdown && rightPaddleRect.bottom < containerRect.bottom) {
      rightPaddleY += paddleSpeed;
    }
    
    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Collision with top and bottom walls
    if (ballY <= 0 || ballY + ballSize >= containerRect.height) {
      ballSpeedY = -ballSpeedY; // Inverse vertical direction
      
      // Adjust position to prevent sticking to the wall
      if (ballY <= 0) ballY = 0;
      if (ballY + ballSize >= containerRect.height) ballY = containerRect.height - ballSize;
    }
    
    // Collision with left paddle
    if (
      ballX <= 25 && // 10px (left padding) + 15px (paddle width)
      ballY + ballSize >= leftPaddleY && 
      ballY <= leftPaddleY + 100 // Paddle height is 100px
    ) {
      ballSpeedX = Math.abs(ballSpeedX); // Ensure ball moves right
      
      // Add slight vertical variation based on where the ball hits the paddle
      const hitPosition = (ballY + ballSize/2) - (leftPaddleY + 50);
      ballSpeedY = hitPosition * 0.1;
    }
    
    // Collision with right paddle
    if (
      ballX + ballSize >= containerRect.width - 25 && // 10px padding + 15px paddle width
      ballY + ballSize >= rightPaddleY && 
      ballY <= rightPaddleY + 100 // Paddle height is 100px
    ) {
      ballSpeedX = -Math.abs(ballSpeedX); // Ensure ball moves left
      
      // Add slight vertical variation based on where the ball hits the paddle
      const hitPosition = (ballY + ballSize/2) - (rightPaddleY + 50);
      ballSpeedY = hitPosition * 0.1;
    }
    
    // Ball out of bounds (left or right) - Reset position
    if (ballX <= -ballSize || ballX >= containerRect.width) {
      // Reset ball to center
      ballX = 390;
      ballY = 290;
      // Randomize initial direction on reset
      ballSpeedX = (Math.random() > 0.5 ? 4 : -4);
      ballSpeedY = (Math.random() * 6) - 3; // Random value between -3 and 3
    }
    
    // Apply positions
    leftPaddleY = Math.max(0, Math.min(containerRect.height - leftPaddleRect.height - 4, leftPaddleY));
    leftPaddle.style.transform = `translateY(${leftPaddleY}px)`;
    
    rightPaddleY = Math.max(0, Math.min(containerRect.height - rightPaddleRect.height - 4, rightPaddleY));
    rightPaddle.style.transform = `translateY(${rightPaddleY}px)`;
    
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
    
    // Continue the game loop
    requestAnimationFrame(gameLoop);
  }
  
  // Start the game loop
  gameLoop();
}