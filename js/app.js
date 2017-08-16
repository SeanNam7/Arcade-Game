// Enemies our player must avoid
var Enemy = function(x, y, speed, direction) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';


};

// x` the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (50 * dt);

    if (this.x >= 600) {
        this.x = 0;
    }

    /* Multiply speed(distance/time) by dt(time), so (distance/time * dt = distance)
    will give a distance of how far to move the enemy bugs on each update */
    /* This helped me figure out how to setup the enemy speed correctly */
};

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
};

Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;

    if(this.x >= 600) {
        this.x = 203;
        this.y = 380;
    }
    if(this.x <= 0) {
        this.x = 203;
        this.y = 380;
    }
    if(this.y >= 500) {
        this.x = 203;
        this.y = 380;
    }
    if(this.y <= 10) {
        this.x = 203;
        this.y = 380;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(movement) {

    if(movement === 'up') {
        this.y -= 83;
    }
    if(movement === 'right') {
        this.x += 101;
    }
    if(movement === 'down') {
        this.y += 83;
    }
    if(movement === 'left') {
        this.x -= 101;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(203, 380);
var allEnemies = [
    new Enemy(30, 140,1),
    new Enemy(200,60,1),
    new Enemy(370,225,1),
    new Enemy(290,310,1)
    ];


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
