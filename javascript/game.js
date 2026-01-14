const ball = {
  x: 400,
  y: 300,
  dx: 5,
  dy: 1,
  width: 20,
  height: 20,
  background: 'white',
}

const player1 = {
  x: 100,
  y: 300,
  width: 5,
  height: 50,
  background: 'green',
}

const player2 = {
  x: 700,
  y: 300,
  width: 5,
  height: 50,
  background: 'blue',
}

const score = {
  player1: 0,
  player2: 0,
}

let gameRunning = true;
const ballAngle = ball.dy;
const moveSpeed = 10;
let ballStartSpeed = 10;
let ballSpeed = ballStartSpeed;

const onkeydown = (event) => {
  if (event.keyCode == 87)
  player1.y -= moveSpeed;
  if (event.keyCode == 83)
  player1.y += moveSpeed;
  if (event.keyCode == 38)
  player2.y -= moveSpeed;
  if (event.keyCode == 40)
  player2.y += moveSpeed;
  if (event.keyCode == 32)
  gameRunning = !(gameRunning);
}

const centerY = (entity) => {
  return (entity.y + (entity.height / 2));
}
const draw = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d", {alpha: false}); // 2d context for painting
if (gameRunning) {
  // canvas background fill color
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ball
  ctx.fillStyle = ball.background;
  ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

  // player1
  ctx.fillStyle = player1.background;
  ctx.fillRect(player1.x, player1.y, player1.width, player1.height);

  // player2
  ctx.fillStyle = player2.background;
  ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
  
  // move squares
  ball.x = ball.x + ballSpeed;
  ball.y = ball.y + ball.dy;

  // ball-paddle collission
  if ( (ball.x <= player1.x + player1.width && ball.x + ball.width >= player1.x + ballSpeed / 1.1 && (ball.y >= player1.y || ball.y + ball.height >= player1.y) && (ball.y + ball.height <= player1.y + player1.height || ball.y <= player1.y + player1.height)) || ( ball.x + ball.width >= player2.x && ball.x <= player2.x + player2.width + ballSpeed / 1.1 && (ball.y >= player2.y || ball.y + ball.height >= player2.y) && (ball.y + ball.height <= player2.y + player2.height || ball.y <= player2.y + player2.height)))
  {
	ballSpeed = -(ballSpeed)
	ballStartSpeed = -(ballStartSpeed)
	ball.dx = -(ball.dx)
	  if (ballSpeed <= 45 && ballSpeed >= -45) {
		ballSpeed = ballSpeed + ball.dx;
	  }

	// ball y angle change for right paddle
	  if ( ball.x > canvas.width / 2 )
	  {
		  ball.x = player2.x - ball.width;
		  ball.dy = ballAngle * -(((centerY(player2) - centerY(ball))) / 5);
	  }
	// ball y angle change for left paddle
	  if ( ball.x < canvas.width / 2)
	  {
		  ball.x = player1.x + player1.width;
		  ball.dy = ballAngle * -(((centerY(player1) - centerY(ball))) / 5);
	  }
  }

  // ball out of bounds left half
  if (ball.x >= canvas.width || (ball.x + ball.width >= player2.x + player2.width && (ball.y + ball.height >= canvas.height || ball.y <= 0 )))
  {
    ball.x = 400;
    ball.y = 300;
	ball.dy = ballAngle;
	ballSpeed = ballStartSpeed;
    score.player1 ++;
  }

  // ball out of bounds right half
  if (ball.x + ball.width <= 0 || (ball.x <= player1.x && (ball.y + ball.height >= canvas.height || ball.y <= 0 )))
  {
    ball.x = 400;
    ball.y = 300;
	 ball.dy = -ballAngle;
  	ballSpeed = ballStartSpeed;
    score.player2 ++;
  }

  // ball collides with top or bottom of canvas in playfield
  if ((ball.x > (player1.x + player1.width) || ball.x < player2.x) && (ball.y <= 0 || (ball.y + ball.height) >= canvas.height))
  {
    ball.dy = -ball.dy;
  }
  
  ctx.font = "20px Georgia";
  ctx.strokeStyle = "green";
  ctx.strokeText(`Player1: ${score.player1}`, 0, 20);
  ctx.strokeStyle = "blue";
  ctx.strokeText(`Player2: ${score.player2}`, 685, 20);
	}
}

window.addEventListener("mousedown", onmousedown); // call `onmousedown` when the mouse is clicked
window.addEventListener("keydown", onkeydown);  // call `onkeydown` when a key is pressed
setInterval(draw, 100); // call `drawCanvas` every 100 ms
