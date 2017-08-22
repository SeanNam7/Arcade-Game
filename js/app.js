// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 65;
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
    this.x = this.x + (Math.random() * 400 * dt);

    if (this.x >= 707) {
        this.x = -50;
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
    this.width = 65;
    this.height = 75;
    this.lives = 5;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};


// Resets the position of the player to the original location
Player.prototype.reset = function() {
    this.x = 303;
    this.y = 460;
};

// Restarts the game.
Player.prototype.restart = function() {
    player.lives = 5;
    player.score = 0;
    $("#lives").text("Lives: " + player.lives);
    $("#score").text("Score: " + player.score);
}
// Implemented the Score mechanism within update vs. separate prototype
Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;
    this.lives = this.lives;
    this.score = this.score;

    if(this.x >= 700) {
        player.reset();
    }
    if(this.x <= -10) {
        player.reset();
    }
    if(this.y >= 500) {
        player.reset();
    }
    if(this.y <= 10) {
        player.score += 100;
        $("#score").text("Score: " + player.score);
        player.reset();
        if(player.score === 1000) {
            alert("YOU WIN!!! Press OK to restart.");
            player.restart();
        }
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

// Enemy collision function
Player.prototype.enemyCollision = function() {
    if (checkCollisions(allEnemies) === true) {
        player.lives -= 1;
        $("#lives").text("Lives: " + player.lives);
        if(player.lives == 0) {
            alert("Game Over. Click OK to restart");
            player.restart();
        }
    }
}

// Checks the player's collisions with other objects
var checkCollisions = function(targetArray) {
    for (var i = 0; i < targetArray.length; i++) {
        if (player.x < (targetArray[i].x + targetArray[i].width) &&
            (player.x + player.width) > targetArray[i].x &&
            player.y < (targetArray[i].y + targetArray[i].height) &&
            (player.y + player.height) > targetArray[i].y) {
                //to reset the player
                player.reset();
                return true;
            }
        }
    }

// Instantiate Player
var player = new Player(303, 460);

// Instantiate Enemy
var allEnemies = [
    new Enemy(30,60,2),
    new Enemy(200,60,1),
    new Enemy(30,140,1),
    new Enemy(220,140,1),
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
