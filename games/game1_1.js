var canvas = document.getElementById('game1');
var context = canvas.getContext('2d');

// context.arc(0, 0, 20, 0, Math.PI * 2);
// context.fill();
context.strokeStyle= 'blue';

context.moveTo(0,0);
context.lineTo(100, 0);
context.lineTo(100, 50);
context.lineTo(0, 50);
context.lineTo(0,0);
context.stroke();

context.rect(0, 100, 100, 50);
context.rect(100, 50, 100, 50);
context.rect(105, 0, 50, 50);
context.stroke();
// context.fillStyle='#ff00ee';

// context.fill();
context.moveTo(50,50);
context.arc(50, 50, 20, 0, Math.PI, false);
context.stroke();

context.moveTo(200,0);
context.arc(200, 0, 20, 0, Math.PI, false);
context.stroke();

context.moveTo(25, 130);
context.arc(25, 130, 20, 0, 2 * Math.PI, false);
context.stroke();

context.moveTo(130, 25);
context.arc(130, 25, 20, 0, Math.PI / 2, true);
context.stroke();