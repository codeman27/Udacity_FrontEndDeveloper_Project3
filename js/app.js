// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 20;
    this.startingPointX = [-100, -200, -300];
    this.maxSpeedIncrease = 2;
    this.speedIncrease;
    this.rightCollision;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x <= 510) {
      this.x = this.x + ((this.speed + this.speedIncrease) * dt);
    }
    else {
      this.speedIncrease = Math.floor(Math.random() * Math.floor(this.maxSpeedIncrease));
      this.x = this.startingPointX[Math.floor(Math.random() * Math.floor(this.startingPointX.length))];
    }
    this.detectCollision();
};

Enemy.prototype.detectCollision = function() {
  if(this.x >= player.x && this.x <= player.rightCollision) {
    if(this.y === player.y) {
      console.log('COLLISION!!!');
    }
  }
  else if(this.rightCollision >= player.x && this.rightCollision <= player.rightCollision) {
    if(this.y === player.y) {
      console.log('COLLISION!!!');
    }
  }
  this.rightCollision = this.x + 80;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
  this.rightCollision;
}

Player.prototype.update = function() {

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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(0, 215);
var enemy2 = new Enemy(0, 135);
var enemy3 = new Enemy(0, 55);
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
// Place the player object in a variable called player
var player = new Player(200, 375);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
