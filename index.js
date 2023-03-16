// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000; // Make sure you have a background image that is 1000 x 1000 or something that matches the width and height set here.
document.body.appendChild(canvas);

var ninjaWin = "sounds/slashkutSound.mp3";
var ninjaCaught = "sounds/SlashSound.mp3";
let gameOver = "sounds/gameOver.wav";
var soundNoises = document.getElementById("soundNoise");


// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

// border image L-R
var blReady = false;
var blImage = new Image();
blImage.onload = function () {
    blReady = true;
}
blImage.src = "images/swordLeftRightBorder.jpg";

// border image T-B
var btReady = false;
var btImage = new Image();
btImage.onload = function () {
    btReady = true;
}
btImage.src = "images/BorderTopBottom.jpg";


// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.png"; // Image of the hero you move

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.png"; // image of the monster you chase/touch

// Shuriken image obstacle
var shurikenReady = false;
var shurikenImage = new Image();
shurikenImage.onload = function () {
    shurikenReady = true;
};
shurikenImage.src = "images/shuriken.png";


// Game objects
var hero = {
    speed: 256, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0  // where on the canvas are they?
};
var monster = {
// for this version, the monster does not move, so just and x and y
    x: 0,
    y: 0
};


// Shuriken objects that are the obstacles.

var shuriken1 = {
        x: 100,
        y: 100,
        direction: -1
    };

var shuriken2 = {
        x: 300,
        y: 300,
        direction: 1
    };

var shuriken3 = {
        x: 700,
        y: 700,
        direction: -1
    };

var monstersCaught = 0;
    



    // Handle keyboard controls
var keysDown = {}; //object were we properties when keys go down
                // and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the hero image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    //console.log(e.keyCode + " down")
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    //console.log(e.keyCode + " up")
    delete keysDown[e.keyCode];
}, false);



//========================================================================
// end of definitions
// ===========================================================================








//====================================================================
// looped part of app
//======================================================================
// draw everything in the main render function

// Update game objects
var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        hero.y -= hero.speed * modifier;
        if (hero.y < ( 32) ) {
            hero.y = 32;
        }

    }
    if (40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
        if (hero.y > (1000 - ( 125) )) {
            hero.y = 1000 	 -125;
        }
    }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
        if (hero.x < ( 28) ) {
            hero.x = 28;
        }
    }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
        if (hero.x > ( 1000 - (32 +50 ) ) ) {
            hero.x = 1000 - (32 +50 );
        }
    }

	shuriken1.x = shuriken1.x + (4 * shuriken1.direction);
	if(shuriken1.x > 885){
		shuriken1.direction = -1;
	}
	if(shuriken1.x < 35){
		shuriken1.direction = 1;
	}

    shuriken2.x = shuriken2.x + (4 * shuriken2.direction);
	if(shuriken2.x > 885){
		shuriken2.direction = -1;
	}
	if(shuriken2.x < 35){
		shuriken2.direction = 1;
	}

    shuriken3.x = shuriken3.x + (4 * shuriken3.direction);
	if(shuriken3.x > 885){
		shuriken3.direction = -1;
	}
	if(shuriken3.x < 35){
		shuriken3.direction = 1;
	}



    // after moving the hero (x and y)
        // Are they touching?
        if (
            hero.x <= (monster.x + 40)
            && monster.x <= (hero.x + 40)
            && hero.y <= (monster.y + 70)
            && monster.y <= (hero.y + 70)
        ) {
            soundNoises.src = ninjaCaught; // Plays this sound whenever the two sprites are touching.
            soundNoises.play();
            ++monstersCaught;       // keep track of our “score”
            reset();    // start a new cycle
        }
        //This is for when you get hit by the shuriken
        if (
            hero.x <= (shuriken1.x + 73)
            && shuriken1.x <= (hero.x + 40)
            && hero.y <= (shuriken1.y + 73)
            && shuriken1.y <= (hero.y + 80)
        ) {
            soundNoises.src = gameOver;
            soundNoises.play(); 
            alert('You made an oopsies. Try again?')
            keysDown = {}
            monstersCaught = 0;
            reset();
        }

        if (
            hero.x <= (shuriken2.x + 73)
            && shuriken2.x <= (hero.x + 40)
            && hero.y <= (shuriken2.y + 73)
            && shuriken2.y <= (hero.y + 80)
        ) {
            soundNoises.src = gameOver;
            soundNoises.play(); 
            alert('You made an oopsies. Try again?')
            keysDown = {};
            monstersCaught = 0;
            reset();
        }

        if (
            hero.x <= (shuriken3.x + 73)
            && shuriken3.x <= (hero.x + 40)
            && hero.y <= (shuriken3.y + 73)
            && shuriken3.y <= (hero.y + 80)
        ) {
            soundNoises.src = gameOver;
            soundNoises.play(); 
            alert('You made an oopsies. Try again?')
            keysDown = {}
            monstersCaught = 0;
            reset();
        }

};






// Draw everything in the main render function
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (btReady) {
		ctx.drawImage(btImage, 0, 0);
		ctx.drawImage(btImage, 0, 1000 - 32);
	}
	
	if (blReady) {
		ctx.drawImage(blImage, 0, 0);
		ctx.drawImage(blImage, 1000-32, 0);
	}

    if (heroReady) {
            ctx.drawImage(heroImage, hero.x, hero.y);
    }
    
    if (monsterReady) {
            ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    if (shurikenReady) {
        ctx.drawImage(shurikenImage, shuriken1.x, shuriken1.y);
        ctx.drawImage(shurikenImage, shuriken2.x, shuriken2.y);
        ctx.drawImage(shurikenImage, shuriken3.x, shuriken3.y);
    }
    // Score
    ctx.fillStyle = "white";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Ninjas defeated: " + monstersCaught, 32, 32);
    
        
}
    




//==============================================================================
// end of looped part of app
//===============================================================================


// The main game loop
// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    //  Request to do this again ASAP
    requestAnimationFrame(main);
};
    

    

// Reset the game when the player catches a monster
var reset = function () {
    if(monstersCaught === 0) {
    hero.x = (canvas.width / 2) - 16;
    hero.y = (canvas.height / 2) - 16;
    monster.x = 20 + (Math.random() * (canvas.width - 150));
    monster.y = 20 + (Math.random() * (canvas.height - 148));
    }
    if(monstersCaught > 0){
//Place the monster somewhere on the screen randomly
// but not in the hedges, Article in wrong, the 64 needs to be 
// hedge on left 32 + hedge 32 + char 32 = 96
    monster.x = 20 + (Math.random() * (canvas.width - 150));
    monster.y = 20 + (Math.random() * (canvas.height - 148));
    }
    if(monstersCaught === 3) {
        keysDown = {}
        hero.x = (canvas.width / 2) - 16;
        hero.y = (canvas.height / 2) - 16;
        soundNoises.src = ninjaWin;
        soundNoises.play(); // Plays the sound when you win.
        alert('Congrats! You won the game!');
        monstersCaught = 0;  
    }
};
 



// Let's play this game!

var then = Date.now();
reset();
main();  // call the main game loop.
