// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 200;
    this.startingPointX = [-100, -200, -300];
    this.maxSpeedIncrease = 200;
    this.speedIncrease;
    this.rightCollision;

    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
  //Reset bug when it goes off screen, set the speed randomly, detect collisions on the player
    if(this.x <= 510) {
      this.x = this.x + ((this.speed + this.speedIncrease) * dt);
    }
    else {
      this.speedIncrease = Math.floor(Math.random() * Math.floor(this.maxSpeedIncrease));
      this.x = this.startingPointX[Math.floor(Math.random() * Math.floor(this.startingPointX.length))];
    }
    this.detectCollision();
};

//Detect collisions with player
Enemy.prototype.detectCollision = function() {
  if(this.x >= player.x && this.x <= player.rightCollision) {
    if(this.y === player.y) {
      player.resetPlayer('lose');
    }
  }
  else if(this.rightCollision >= player.x && this.rightCollision <= player.rightCollision) {
    if(this.y === player.y) {
      player.resetPlayer('lose');
    }
  }
  this.rightCollision = this.x + 80;
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
  this.rightCollision;
  this.score = 0;
  this.scoreBoard = document.getElementById('score');
}

Player.prototype.update = function() {
  if(this.y === -25) {
    player.victory();
  }
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction) {
  if(direction === 'left' && this.x >= 100) {
    this.x -= 100;
  }
  else if(direction === 'right' && this.x <= 300) {
    this.x += 100;
  }
  else if(direction === 'up' && this.y >= 55) {
    this.y -= 80;
  }
  else if(direction === 'down' && this.y <= 295) {
    this.y += 80;
  }
  this.rightCollision = this.x + 80;
}

//If a collision is detected then the lose conidition is passed and points are taken off the board
Player.prototype.resetPlayer = function(condition) {
  this.x = 200;
  this.y = 375;
  if(condition === 'lose') {
    this.score = 0;
    this.scoreBoard.innerHTML = this.score;
  }
}

//Victory! You get more points and have to restart
Player.prototype.victory = function() {
  this.score += 100;
  this.scoreBoard.innerHTML = this.score;
  this.resetPlayer();
}

var enemy1 = new Enemy(0, 215);
var enemy2 = new Enemy(0, 135);
var enemy3 = new Enemy(0, 55);
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

var player = new Player(200, 375);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
