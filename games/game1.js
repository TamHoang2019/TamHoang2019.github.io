var nenden = document.querySelector('.nenden'),
    nenden1 = document.querySelector('.nenden1'),
    result = document.getElementById('result'),
    score = document.getElementById('score'),
    play = document.getElementById('play'),
    replay = document.getElementById('replay'),
    isReplay = false;
    
var canvas = document.getElementById('game1'),
    context = canvas.getContext('2d'),
    width = canvas.width;
    height = canvas.height;
var ball = {
  x: randomX(420),
  y: randomX(80),
  dx: 5,
  dy: 2,
  radius: 10
}
console.log(ball.x, 'y', ball.y);
function randomX(x){
  return Math.floor(Math.random() * x) + 20;
}

var paddle = {
  width: 220,
  height: 10,
  x: 0,
  y: canvas.height - 10,
  speed: 15,
  isMovingLeft: false,
  isMovingRight: false
};

var BrickConfig = {
  offsetX: 110,
  offsetY: 50,
  marginRow: 35,
  marginCol: 15,
  width: 55,
  height: 15,
  totalRow: 4,
  totalCol: 8
};

var isGameOver = false;
var isGameWin = false;
var UserScore = 0;
var MaxScrore = BrickConfig.totalCol * BrickConfig.totalRow;

var BrickList = [];
//khoi tao cac vien gach
for(var i=0; i < BrickConfig.totalRow; i++){
  for(var j=0; j < BrickConfig.totalCol; j++){
    BrickList.push({
      x: BrickConfig.offsetX + j * (BrickConfig.width + BrickConfig.marginCol),
      y: BrickConfig.offsetY + i * (BrickConfig.height + BrickConfig.marginRow),
      isBroken: false
    })
  }
}

// ve hinh tron
function drawBall(){
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  context.fillStyle = '#f311f7';
  context.fill();
  context.closePath();
}
//ve thanh chan
function drawPaddle(){
  context.beginPath();
  context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  context.fillStyle = 'darkorange';
  context.fill();
  context.closePath();
}
//ve vien gach
///2 * OFFSET + 5 * WIDTH + 4 * MARGIN = 500PX
// OFFSET = MARGIN = 25
// -> WIDTH = 70PX;
//ROW = 3, COL = 5;
function drawBricks(){
  BrickList.forEach(function(b){
    if(!b.isBroken){
      context.beginPath();
      context.rect(b.x, b.y, BrickConfig.width, BrickConfig.height);
      context.fill();
      context.closePath();
    };
  });
}
// xu ly bat xu kien de dieu khien paddle bang ban phim
// phai: keyCode 39
// trai: keyCode 37
document.addEventListener('keydown', function(event){
  if(event.keyCode == 37){
    paddle.isMovingLeft = true;
  } else if(event.keyCode == 39) {
    paddle.isMovingRight = true;
  }
});
document.addEventListener('keyup', function(event){
  if(event.keyCode == 37){
    paddle.isMovingLeft = false;
  } else if(event.keyCode == 39) {
    paddle.isMovingRight = false;
  }
});

function handleCollideBounds(){
  // thay doi gia tri dx, dy: xu ly va cham
  if( ball.x < ball.radius || ball.x > (canvas.width - ball.radius)) {
    ball.dx = -ball.dx;
  }
  if( ball.y < ball.radius ) {
    ball.dy = -ball.dy;
  }
}
function handleCollidePaddle(){
  if(ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= paddle.x + paddle.width && ball.y + ball.radius >= canvas.height - paddle.height) {
    ball.dy = -ball.dy;
  }
}
function handleCollideBrick(){
  BrickList.forEach(function(b){
    if(!b.isBroken){
      if(ball.x >= b.x && ball.x <= b.x + BrickConfig.width && ball.y + ball.radius >= b.y && ball.y - ball.radius <= b.y + BrickConfig.height) {
        ball.dy = -ball.dy;
        b.isBroken = true;
        UserScore += 1;
        if(UserScore >= MaxScrore) {
          isGameOver = true;
          isGameWin = true;
        }
      }
    }
  });
}
function updatePaddlePosition(){
    //xu ly ve paddle muot hon
    if(paddle.isMovingLeft) {
    paddle.x -= paddle.speed;
  } else if(paddle.isMovingRight) {
    paddle.x += paddle.speed;
  }
    //xu ly cho paddle va cham voi 2 ben duong bien 
  if(paddle.x < 0) {
    paddle.x = 0;
  } 
  else if(paddle.x > canvas.width - paddle.width) {
    paddle.x = canvas.width - paddle.width;
  }
}
function updateBallPosition(){
  // thay doi toa do qua bong, gia tri cang lon thi di chuyen cang nhanh: xu ly toa do
  ball.x += ball.dx;
  ball.y += ball.dy;
}
function checkGameOver(){
  if(ball.y > canvas.height - ball.radius){
    isGameOver = true;
  }
}
function handleGameOver(){
  nenden.style.display = "block";
  score.textContent = `Your score is: ${UserScore}`;

  if(isGameWin){
    result.textContent = 'YOU WIN!';
  } else {
    result.textContent = 'LOSS!';
  }
}
//ham tong the xu ly toan bo logic ve
function draw(){
  if(!isGameOver){
    // xoa man hinh
    context.clearRect(0  , 0, canvas.width, canvas.height);
    // ve qua bong
    drawBall();
    //ve thanh chan
    drawPaddle();
    //ve vien gach
    drawBricks();
    // 
    updatePaddlePosition();
    // xu ly va cham voi duong bien
    handleCollideBounds();
    //xu ly va cham voi paddle
    handleCollidePaddle();
    //xu ly va cham voi bricks
    handleCollideBrick();
    // update toa do
    updateBallPosition();

    // vuot qua duong bien duoi thi game over
    checkGameOver();
    // ham de quy requestAnimationFrame()
    requestAnimationFrame(draw);
  } else {
    handleGameOver();
  }
};

play.addEventListener('click', function(){
  nenden1.style.display = "none";
  draw();
});

function restart(){
  ball.x = randomX(420);
  ball.y = randomX(80);
  paddle.x = 0;
  paddle.y = canvas.height - 10;
  isGameOver = false;
  isGameWin = false;
  UserScore = 0;
  BrickList = [];
  //khoi tao cac vien gach
  for(var i=0; i < BrickConfig.totalRow; i++){
    for(var j=0; j < BrickConfig.totalCol; j++){
      BrickList.push({
        x: BrickConfig.offsetX + j * (BrickConfig.width + BrickConfig.marginCol),
        y: BrickConfig.offsetY + i * (BrickConfig.height + BrickConfig.marginRow),
        isBroken: false
      })
    }
  }

}
replay.addEventListener('click', function(){
  restart();
  draw();
  nenden.style.display = "none";
  
});