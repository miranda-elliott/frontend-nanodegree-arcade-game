// Constants
var LEFT_LIMIT = 0;
var RIGHT_LIMIT = 400;
var TOP_LIMIT = 60;
var BOTTOM_LIMIT = 380;
var PLAYER_INITIAL_X = 200;
var PLAYER_INITIAL_Y = 380;
var PLAYER_X_CHANGE = 100;
var PLAYER_Y_CHANGE = 80;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set initial location
    this.x = x;
    this.y = y;

    // Set speed
    this.resetSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Update enemy location
    this.x += this.speed * dt;

    // When enemy finishes moving across screen, move back to left of screen and update speed
    if (this.x > RIGHT_LIMIT + 100) {
        this.x = -100;
        this.resetSpeed();
    }

    // Handle collision with player
    if ((Math.abs(this.x - player.x) <= 50) && (Math.abs(this.y - player.y) <= 40)) {
        player.collision();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set speed to random number between 50 and 550
Enemy.prototype.resetSpeed = function() {
    this.speed = (50 + Math.floor(Math.random() * 500));
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Set image
    this.sprite = 'images/char-boy.png';

    // Set initial location
    this.x = PLAYER_INITIAL_X;
    this.y = PLAYER_INITIAL_Y;
};
Player.prototype.update = function() {
    // Updating player's location happens in handleInput - is this function necessary?
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.resetLocation = function() {
    this.x = PLAYER_INITIAL_X;
    this.y = PLAYER_INITIAL_Y;
};
Player.prototype.handleInput = function(direction) {
    // Move player in correction direction
    // Player can't move off screen
    switch (direction) {
      case 'left':
          if (this.x <= LEFT_LIMIT) {
              this.x = LEFT_LIMIT
          } else {
              this.x -= PLAYER_X_CHANGE;
          }
          break;
      case 'up':
          if ($('#game_won').is(':visible')) {
              // Don't do anything if already showing game won message
              break;
          } else if (this.y <= TOP_LIMIT) {
              // If player reaches the water, reset game by moving player back to initial location
              this.won();
          } else {
              this.y -= PLAYER_Y_CHANGE;
          }
          break;
      case 'right':
          if (this.x >= RIGHT_LIMIT) {
              this.x = RIGHT_LIMIT
          } else {
              this.x += PLAYER_X_CHANGE;
          }
          break;
      case 'down':
          if (this.y >= BOTTOM_LIMIT) {
              this.y = BOTTOM_LIMIT
          } else {
              this.y += PLAYER_Y_CHANGE;
          }
          break;
    }
};
Player.prototype.collision = function() {
    // Show collision message
    $('#collision').show();
    window.setTimeout(function() {
        $('#collision').fadeOut();
    }, 1000);

    // Move player back to initial location
    this.resetLocation();
};
Player.prototype.won = function() {
    // Move player into water
    this.y -= PLAYER_Y_CHANGE;

    // Show game won message
    $('#game_won').show();

    // Move player back to initial location
    var self = this;
    window.setTimeout(function() {
      self.resetLocation();
    }, 500);

    // Fade out message
    window.setTimeout(function() {
      $('#game_won').fadeOut();
    }, 1000);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(0, 60), new Enemy(0, 140), new Enemy(0, 220)];
// Place the player object in a variable called player
var player = new Player();

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
