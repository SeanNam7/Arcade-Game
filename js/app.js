"use strict";

// Character super-class
var Character = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

// Player class
var Player = function(x, y, sprite) {
    Character.call(this, x, y, sprite);
    this.width = 65;
    this.height = 75;
    this.lives = 5;
    this.score = 0;
};

// Enemy class
var Enemy = function(x, y, sprite, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    Character.call(this, x, y, sprite);
    this.width = 75;
    this.height = 65;
    this.speed = ((Math.floor(Math.random() * 200) + 100) + (75 * speed));
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // this.sprite = 'images/enemy-bug.png';
};

// x` the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);

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

// Resets the position of the player to the original location
Player.prototype.reset = function() {
    this.x = 303;
    this.y = 460;
};

// Restarts the game.
Player.prototype.restart = function() {
    this.lives = 5;
    this.score = 0;
    $("#lives").text("Lives: " + this.lives);
    $("#score").text("Score: " + this.score);
    var allEnemies = [
        new Enemy(30,60,4),
        new Enemy(200,60,1),
        new Enemy(30,140,2),
        new Enemy(220,140,1),
        new Enemy(370,225,2),
        new Enemy(290,310,1)
    ];
}

Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;
    this.lives = this.lives;
    this.score = this.score;

    if(this.x >= 700) {
        this.reset();
    }
    if(this.x <= -10) {
        this.reset();
    }
    if(this.y >= 500) {
        this.reset();
    }
    if(this.y <= 10) {
        this.scoreupdate();
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.scoreupdate = function() {
    this.score += 100;
    $("#score").text("Score: " + this.score);
    if(this.score === 1000) {
            alert("YOU WIN!!! Press OK to restart.");
            this.restart();
    }
}

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
    if (checkCollisions.call(this, allEnemies) === true) {
        this.lives -= 1;
        $("#lives").text("Lives: " + this.lives);
        if(this.lives == 0) {
            alert("Game Over. Click OK to restart");
            this.restart();
        }
    }
}

// Checks the player's collisions with other objects
function checkCollisions(targetArray) {
    for (var i = 0; i < targetArray.length; i++) {
        if (this.x < (targetArray[i].x + targetArray[i].width) &&
            (this.x + this.width) > targetArray[i].x &&
            this.y < (targetArray[i].y + targetArray[i].height) &&
            (this.y + this.height) > targetArray[i].y) {
                //to reset the player
                this.reset();
                return true;
            }
        }
    }

// Instantiate Player
var player = new Player(303, 460, 'images/char-boy.png');

// Instantiate Enemy
var allEnemies = [
    new Enemy(30,60,'images/enemy-bug.png',4),
    new Enemy(200,60,'images/enemy-bug.png',1),
    new Enemy(30,140,'images/enemy-bug.png',2),
    new Enemy(220,140,'images/enemy-bug.png',1),
    new Enemy(370,225,'images/enemy-bug.png',2),
    new Enemy(290,310,'images/enemy-bug.png',1)
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
