var myScore;
var myMusic;
var mySound;
var myBird;
var myObstacles = [];

function startGame(){
  myBird = new component(40, 30, "../../images/flappy.png", 10, 120, "image");
  myBackground = new component(1000, 380, "../../images/flappy_bg.png", 0, 0 , "background");
  myScore = new component("40px", "Consolas", "white", 360, 40, "text");
  mySound = new sound("../../sounds/Screen_Door_Close.mp3");
  myMusic = new sound("../../sounds/Splashing_Around.mp3");
  myMusic.play();
  myGameArea.start();
};

var myGameArea = {
  canvas: document.createElement('canvas'),
  start: function(){
    this.canvas.width = 568;
    this.canvas.height = 320;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function(e){
      myGameArea.key = e.keyCode;
    });
    window.addEventListener('keyup', function(e){
      myGameArea.key = false;
    });
  },
  clear: function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function(){
    clearInterval(this.interval);
  }
};

function component(width, height, color, x, y, type){
  this.type = type;
  if(type == "image" || type == "background"){
    this.image = new Image();
    this.image.src = color;
  };
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = myGameArea.context;
    if(type == "image" || type == "background"){
      // this.onload = function(){
      //   ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      // }
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else if(this.type == "text"){
      ctx.font = this.width + "" + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.type == "background"){
      this.x -= 1;
      if(this.x == -(this.width/2.5)){
        this.x = 0;
      };
    };
  };
  this.crashWith = function(otherObj){
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherObj.x;
    var otherright = otherObj.x + (otherObj.width);
    var othertop = otherObj.y;
    var otherbottom = otherObj.y + (otherObj.height);
    var crash = true;
    if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)){
      crash = false;
    }
    return crash;
  };
}

function sound(src){
  this.sound = document.createElement("audio");
  this.sound.src= src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.setAttribute("allow", "autoplay");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  };
  this.stop = function(){
    this.sound.pause();
  }
}

function updateGameArea(){
  var x, y;
  for (var i=0; i < myObstacles.length; i++){
    if(myBird.crashWith(myObstacles[i])){
      mySound.play();
      myMusic.stop();
      myGameArea.stop();
      return;
    };
  };
  myGameArea.clear();
  myBackground.newPos();
  myBackground.update();
  myGameArea.frameNo++;
  if(myGameArea.frameNo == 1 || everyinterval(150)){
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(Math.random()*(maxHeight - minHeight + 1) + minHeight);
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random()*(maxGap - minGap + 1) + minGap);
    myObstacles.push(new component(10, height, "green", x, 0));
    myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
  }
  for(var i = 0; i < myObstacles.length; i++){
    myObstacles[i].x -= 1;
    myObstacles[i].update();
  };
  // if(myGameArea.key && myGameArea.key == 37){
  //   myBird.speedX -= 2;
  // };
  // if(myGameArea.key && myGameArea.key == 39){
  //   myBird.speedX = 2;
  // };
  // if(myGameArea.key && myGameArea.key == 38){
  //   myBird.speedY -= 2;
  // };
  // if(myGameArea.key && myGameArea.key == 40){
  //   myBird.speedY = 2;
  // };

  // if(myGameArea.key){
  //   if(myGameArea.key == 37){
  //     myBird.speedX -= 1;
  //   } else if(myGameArea.key == 39){
  //     myBird.speedX = 1;
  //   } else if(myGameArea.key == 38){
  //     myBird.speedY -= 1;
  //   } else if(myGameArea.key == 40){
  //     myBird.speedY = 1;
  //   }
  // };
  // if(!myGameArea.key){
  //   clearmove();
  // }

  myBird.newPos();
  myBird.update();
  myScore.text = "SCORE: " + myGameArea.frameNo;
  myScore.update();
}

function everyinterval(n){
  if((myGameArea.frameNo / n) % 1 == 0){
    return true;
  };
  return false;
}

function clearmove(){
  myBird.image.src = "../../images/flappy.png";
  myBird.speedX = 0;
  myBird.speedY = 0;
}
//change image
function move(dir){
  myBird.image.src = "../../images/angry.jpg";
  if(dir == "up"){ myBird.speedY -= 2;}
  if(dir == "down"){ myBird.speedY += 2;}
  if(dir == "left"){ myBird.speedX -= 2;}
  if(dir == "right"){ myBird.speedX += 2;}
}