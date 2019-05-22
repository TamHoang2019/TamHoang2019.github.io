var wrapper = document.querySelector('#game01 .wrapper'),
    nenReplay = document.querySelector('#game01 .nenReplay'),
    nenPlay = document.querySelector('#game01 .nenPlay'),
    result = document.querySelector('#game01 #result'),
    score = document.querySelector('#game01 #score'),
    play = document.querySelector('#game01 #play'),
    replay = document.querySelector('#game01 #replay'),
    count = document.querySelector('#game01 .count'),
    control = document.querySelector('#game01 .control'),
    btnLeft = document.querySelector('#game01 .control .left'),
    btnRight = document.querySelector('#game01 .control .right'),
    btnPause = document.querySelector('#game01 .control .pause'),
    img = document.getElementById('brick');

   control.style.display="none"; 
var canvas = document.getElementById('game1'),
    context = canvas.getContext('2d');
    // width = window.outerWidth;
    // height = window.outerHeight;
    // canvas.width = 90*width/100;
    // canvas.height = 55*height/100;
  canvas.width = wrapper.offsetWidth;
  canvas.height = wrapper.offsetHeight;
  var pat = context.createPattern(img, "repeat");
  
//random ra gia tri giua x va y
function randomX(x, y){
  return Math.floor(Math.random() * (x - y + 1)) + y;
}
var ball = {
  x: randomX(0.8*canvas.width, 20),
  y: randomX(0.3*canvas.height, 20),
  dx: 5,
  dy: 2,
  radius: 10
}

var paddle = {
  width: 0.2*canvas.width,
  height: 10,
  x: 0,
  y: canvas.height - 10,
  speed: 15,
  isMovingLeft: false,
  isMovingRight: false
};

var BrickConfig = {
  offsetX: 50,
  offsetY: 30,
  marginRow: 20,
  marginCol: 5,
  width: 50,
  height: 15,
  totalRow: 4,
  totalCol: 8
};
var BrickList = [];

var isGameOver,isGameWin, isPause, UserScore, MaxScrore;
khoiTaoViTri();
function khoiTaoViTri(){
  isGameOver = false;
  isGameWin = false;
  isPause = false;
  UserScore = 0;

  ball.x = randomX(0.8*canvas.width, 20); 
  ball.y = randomX(0.3*canvas.height, 20); 
  paddle.width = 0.2*canvas.width;
  paddle.x = 0;
  paddle.y = canvas.height - 10;
  // BrickConfig.offsetX = 0.05 * canvas.width;
  // BrickConfig.offsetY = 0.1 * canvas.height;
  if(canvas.height/canvas.width >= 1/2){
    BrickConfig.totalRow = Math.floor((0.6*canvas.height - BrickConfig.offsetY) / (BrickConfig.height + BrickConfig.marginRow));
  } else {
    BrickConfig.totalRow = Math.floor((0.5*canvas.height - BrickConfig.offsetY) / (BrickConfig.height + BrickConfig.marginRow));
  }
  console.log(BrickConfig.totalRow, 'row');
  BrickConfig.totalCol = Math.floor((canvas.width - BrickConfig.offsetX) / (BrickConfig.width + BrickConfig.marginCol));
  console.log(BrickConfig.totalCol, 'col');

  BrickList = [];
  for(var i=0; i < BrickConfig.totalRow; i++){
    for(var j=0; j < BrickConfig.totalCol; j++){
     
      BrickList.push({
        x: BrickConfig.offsetX + j * (BrickConfig.width + BrickConfig.marginCol),
        y: BrickConfig.offsetY + i * (BrickConfig.height + BrickConfig.marginRow),
        isBroken: false
      });
    }
  }
  MaxScrore = BrickConfig.totalCol * BrickConfig.totalRow;
  console.log(MaxScrore, 'col', BrickConfig.totalCol, 'row', BrickConfig.totalRow);
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
      context.fillStyle = pat;
      context.fill();
      context.closePath();
    };
  });
}
//xu ly bat su kien dieu khien paddle bang button
btnLeft.addEventListener('click', function(){
  paddle.isMovingLeft = true;
});
btnRight.addEventListener('click', function(){
  paddle.isMovingRight = true;
});
btnLeft.addEventListener('mouseout', function(){
  paddle.isMovingLeft = false;
});
btnRight.addEventListener('mouseout', function(){
  paddle.isMovingRight = false;
});
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
//xu ly pause game cho desktop
document.addEventListener('keypress', function(e){
  if(e.keyCode == 32){
    if(isPause) {
      isPause = false;
    } else {
      isPause = true;
    }
  }
  draw();
});
//xu ly pause game cho mobile
btnPause.addEventListener('click', function(e){
  if(isPause) {
    isPause = false;
  } else {
    isPause = true;
  }
  draw();
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
        count.textContent = UserScore;
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
    //xu ly bat su kien dieu khien paddle bang chuot
  canvas.addEventListener('mousemove', function(event){
    toadoX = event.clientX;
    paddle.x = toadoX - paddle.width/2;
    if(paddle.x < 0) {
      paddle.x = 0;
    } 
    else if(paddle.x > canvas.width - paddle.width) {
      paddle.x = canvas.width - paddle.width;
    }
  });  
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
  nenReplay.style.display = "block";
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
    if(!isPause) {
      requestAnimationFrame(draw);
    }
  } else {
    handleGameOver();
  }
};

play.addEventListener('click', function(){
  nenPlay.style.display = "none";
  if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  ){
    control.style.display = "block";
  }
  // control.style.display = "block";
  draw();
});

replay.addEventListener('click', function(){
  khoiTaoViTri();
  draw();
  nenReplay.style.display = "none";
});