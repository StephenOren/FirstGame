function startGame() {
//This get rids of the start screen
document.getElementById('titleScreen').style.display = 'none';

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
heroImage.src = "images/ninja2.png"; // Image of the hero you move

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/hero.png"; // image of the monster you chase/touch

// Shuriken image obstacle
var shurikenReady = false;
var shurikenImage = new Image();
shurikenImage.onload = function () {
    shurikenReady = true;
};
shurikenImage.src = "images/shuriken.png";

//Fire image obstacle
let flamesReady = false;
let flamesImage = new Image();
flamesImage.onload = function () {
    flamesReady = true;
}
flamesImage.src = 'images/flame.png';


var rows = 4;
var cols = 4;

var trackRight = 2; 
var trackLeft = 1;   

var trackDown = 0;
var trackUp = 3;

var spriteSheetWidth = 128;
var spriteSheetHeight = 192;

var oneSpriteWidth = spriteSheetWidth / cols;
var oneSpriteHeight = spriteSheetHeight / rows;

var curXFrame = 0; // Start on left side of the sprite sheet
var framesPerRowCount = 4; // There are 4 frames per row

var UpperLeftXpointOnSpriteSHeet = 0;
var UpperLeftYpointOnSpriteSHeet = 0; 

var left = false;
var right = true;
var up = false;
var down = false;


let counter = 0;

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

//These are going to be stationary flame objects

var flame1 = {
    x: 0,
    y: 0
};

var flame2 = {
    x: 0,
    y: 0
};

var flame3 = {
    x: 0,
    y: 0
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

    // This will clear the last hero image position when moved that is not shown becuse of background image.
    ctx.clearRect(hero.x, hero.y, oneSpriteWidth, oneSpriteHeight);
    left = false;
    right = false;
    up = false;
    down = false;



    if (38 in keysDown) { // Player holding up
        hero.y -= hero.speed * modifier;
        if (hero.y < ( 25) ) {
            hero.y = 25;
        }
        left = false;
        right = false;
        up = true;
        down = false;
    }
    if (40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
        if (hero.y > (1000 - ( 80) )) {
            hero.y = 1000 	 -80;
        }
        left = false;
        right = false;
        up = false;
        down = true;
    }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
        if (hero.x < ( 28) ) {
            hero.x = 28;
        }
        left = true;
        right = false;
        up = false;
        down = false;
    }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
        if (hero.x > ( 1000 - (10 +50 ) ) ) {
            hero.x = 1000 - (10 +50 );
        }
        left = false;
        right = true;
        up = false;
        down = false;
    }

	shuriken1.x = shuriken1.x + (2.5 * shuriken1.direction);
	if(shuriken1.x > 885){
		shuriken1.direction = -1;
	}
	if(shuriken1.x < 35){
		shuriken1.direction = 1;
	}

    shuriken2.x = shuriken2.x + (2.5 * shuriken2.direction);
	if(shuriken2.x > 885){
		shuriken2.direction = -1;
	}
	if(shuriken2.x < 35){
		shuriken2.direction = 1;
	}

    shuriken3.x = shuriken3.x + (2.5 * shuriken3.direction);
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
            && monster.x <= (hero.x + 20)
            && hero.y <= (monster.y + 90)
            && monster.y <= (hero.y + 35)
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
            && shuriken1.y <= (hero.y + 30)
        ) {
            soundNoises.src = gameOver;
            soundNoises.play(); 
            alert('You made an oopsies. Try again?')
            keysDown = {}
            monstersCaught = 0;
            reset();
        }

        if (
            hero.x <= (shuriken2.x + 65)
            && shuriken2.x <= (hero.x + 22)
            && hero.y <= (shuriken2.y + 73)
            && shuriken2.y <= (hero.y + 25)
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
            && shuriken3.y <= (hero.y + 30)
        ) {
            soundNoises.src = gameOver;
            soundNoises.play(); 
            alert('You made an oopsies. Try again?')
            keysDown = {}
            monstersCaught = 0;
            reset();
        }
        if (
            hero.x <= (flame1.x + 100)
            && flame1.x <= (hero.x + -20)
            && hero.y <= (flame1.y + 95)
            && flame1.y <= (hero.y + 25)
        ) {
            soundNoises.src = gameOver;
            soundNoises.play(); 
            alert('You made an oopsies. Try again?')
            keysDown = {}
            monstersCaught = 0;
            reset();
        }

        if (
            hero.x <= (flame2.x + 100)
            && flame2.x <= (hero.x + -20)
            && hero.y <= (flame2.y + 95)
            && flame2.y <= (hero.y + 25)
        ) {
            soundNoises.src = gameOver;
            soundNoises.play(); 
            alert('You made an oopsies. Try again?')
            keysDown = {}
            monstersCaught = 0;
            reset();
        }

        if (
            hero.x <= (flame3.x + 100)
            && flame3.x <= (hero.x + -20)
            && hero.y <= (flame3.y + 95)
            && flame3.y <= (hero.y + 25)
        ) {
            soundNoises.src = gameOver;
            soundNoises.play(); 
            alert('You made an oopsies. Try again?')
            keysDown = {}
            monstersCaught = 0;
            reset();
        }

        if (counter == 10) { // adjust this to change "walking speed" of animation
            curXFrame = ++curXFrame % framesPerRowCount; //Updating the sprite frame index
            // it will count 0,1,2,0,1,2,0, etc
            counter = 0;
        } else {
            counter++;
        }

        srcX = curXFrame * oneSpriteWidth; //Calculating the x coordinate for
        //if left is true, pick Y dim of the correct row
        if (left) {
            //calculate srcY
            srcY = trackLeft * oneSpriteHeight;
        }
        //if the right is true, pick Y dim of the correct row
        if (right) {
            //calculating y coordinate for spritesheet
            srcY = trackRight * oneSpriteHeight;   
        }
        if (up) {
            //calculate srcY
            srcY = trackUp * oneSpriteHeight;
        }
        //if the right is true, pick Y dim of the correct row
        if (down) {
            //calculating y coordinate for spritesheet
            srcY = trackDown * oneSpriteHeight;
        }
        if (left == false && right == false && up == false && down == false) {
            srcX = 0 * oneSpriteWidth;
            srcY = 0 * oneSpriteHeight;
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

    // if (heroReady) {
    //         ctx.drawImage(heroImage, hero.x, hero.y);
    // }

    if (heroReady) {
        //ctx.drawImage(heroImage, hero.x, hero.y);
        ctx.drawImage(heroImage, srcX, srcY, oneSpriteWidth, oneSpriteHeight, hero.x, hero.y, oneSpriteWidth, oneSpriteHeight);
    }
    
    if (monsterReady) {
            ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    if (shurikenReady) {
        ctx.drawImage(shurikenImage, shuriken1.x, shuriken1.y);
        ctx.drawImage(shurikenImage, shuriken2.x, shuriken2.y);
        ctx.drawImage(shurikenImage, shuriken3.x, shuriken3.y);
    }

    if (flamesReady) {
        ctx.drawImage(flamesImage, flame1.x, flame1.y);
        ctx.drawImage(flamesImage, flame2.x, flame2.y);
        ctx.drawImage(flamesImage, flame3.x, flame3.y);
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

    flame1.x = 20 + (Math.random() * (canvas.width - 150));
    flame1.y = 20 + (Math.random() * (canvas.height - 148));

    flame2.x = 20 + (Math.random() * (canvas.width - 150));
    flame2.y = 20 + (Math.random() * (canvas.height - 148));

    flame3.x = 20 + (Math.random() * (canvas.width - 150));
    flame3.y = 20 + (Math.random() * (canvas.height - 148));
    }
    if(monstersCaught > 0){
//Place the monster somewhere on the screen randomly
// but not in the hedges, Article in wrong, the 64 needs to be 
// hedge on left 32 + hedge 32 + char 32 = 96
    monster.x = 20 + (Math.random() * (canvas.width - 150));
    monster.y = 20 + (Math.random() * (canvas.height - 148));

    flame1.x = 20 + (Math.random() * (canvas.width - 150));
    flame1.y = 20 + (Math.random() * (canvas.height - 148));

    flame2.x = 20 + (Math.random() * (canvas.width - 150));
    flame2.y = 20 + (Math.random() * (canvas.height - 148));

    flame3.x = 20 + (Math.random() * (canvas.width - 150));
    flame3.y = 20 + (Math.random() * (canvas.height - 148));
    
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
}