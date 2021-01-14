//let img;
const W =900;
const H= 800;
let playerSprite1;
let playerUp;
let playerDown;
let playerRight;
let playerLeft;
let playerUp1;
let playerDown1;
let playerRight1;
let playerLeft1;
let direction;
let bullet;
let bulletUp;
let bulletDown;
let bulletLeft;
let bulletRight;
let bricks;
let steelBricks;
let life;
let bricks1;
let bullets1 ;
let wp;
let shipU;
let shipL;
let shipD;
let shipR;
let shipSprite;
let MENU=0;
let startW = 260
let startH = 70
let startA = 0
let scoreA=0;

function preload(){
    // Preload JSON
    topscores = loadJSON('highscore.json');
    
    //players
      playerUp     = loadImage('images/tank_player1_up_c0_t1.png');
      playerUp1    = loadImage('images/tank_player1_up_c0_t2.png');
      playerDown   = loadImage('images/tank_player1_down_c0_t1.png');
      playerDown1  = loadImage('images/tank_player1_down_c0_t2.png');
      playerRight  = loadImage('images/tank_player1_right_c0_t1.png');
      playerRight1 = loadImage('images/tank_player1_right_c0_t2.png');
      playerLeft   = loadImage('images/tank_player1_left_c0_t1.png');
      playerLeft1  = loadImage('images/tank_player1_left_c0_t2.png');
               wp  = loadImage('images/t.gif')
             life  = loadImage('images/flag.png')
             shipU  = loadImage('images/shipU.png')
             shipL  = loadImage('images/shipL.png')
             shipD  = loadImage('images/shipD.png')
             shipR  = loadImage('images/shipR.png')

    //bricks
    bricks = loadImage('images/wall_brick.png')


    //Steel bricks
    steelBricks = loadImage('images/wall_steel.png')
    
    //bullet
    
    bulletDown  = loadImage('images/bullet_down.png');
    bulletUp    = loadImage('images/bullet_Up.png');
    bulletLeft  = loadImage('images/bullet_Left.png');
    bulletRight = loadImage('images/bullet_Right.png');
    
    }


function setup() {

createCanvas(W,H);
//play (tank)
playerSprite1 = createSprite(W/5,H/2,50,50);
playerSprite1.scale = 1.3
playerSprite1.addImage(playerUp);
playerSprite1.addAnimation('down', playerDown, playerDown1);
    
//movement animations
playerSprite1.addAnimation('up', playerUp, playerUp1);
playerSprite1.addAnimation('right', playerRight, playerRight1); 
playerSprite1.addAnimation('left', playerLeft, playerLeft1);
playerSprite1.addAnimation('down', playerDown, playerDown1);

//stop    
playerSprite1.addAnimation('downStop', playerDown, playerDown);
playerSprite1.addAnimation('upStop', playerUp, playerUp); 
playerSprite1.addAnimation('rightStop', playerRight, playerRight); 
playerSprite1.addAnimation('leftStop', playerLeft, playerLeft);
    
//play enemy
//play
shipSprite = createSprite(W-200,H/2,50,50);
shipSprite.scale = 0.13
shipSprite.addImage(shipU);
playerSprite1.addAnimation('down', playerDown, playerDown1);
    
//movement animations
shipSprite.addAnimation('up', shipU, shipU);
shipSprite.addAnimation('right', shipR, shipR); 
shipSprite.addAnimation('left', shipL, shipL);
shipSprite.addAnimation('down', shipD, shipD);

//stop    
shipSprite.addAnimation('downStop1', shipD, shipD);
shipSprite.addAnimation('upStop1', shipU, shipU); 
shipSprite.addAnimation('rightStop1', shipR, shipR); 
shipSprite.addAnimation('leftStop1', shipL, shipL);

//create empty groups for walls and bullets
    
        bricks1 = new Group();
        bullets1= new Group();
    
    for(var i=0; i<9; i++){ 
        var newBricks1= createSprite(400,300+48*i,1,1)
        newBricks1.scale = 3;
        newBricks1.addImage(bricks);
        bricks1.add(newBricks1);
    }

 
    for(var i=0; i<6; i++){
        var newbullet1= createSprite();
        newbullet1.addImage(bulletDown);
         bullets1.add(newbullet1);
        
        }
}
function removeWall(){
    console.log('bullet Hit Bricks');
    
}

function draw() {
  background('black')
  strokeWeight(0);
if (MENU==1) {
    
    borders();
    controls();
  
 //drawSprites(bullets1);
// drawSprites(bricks1);    
 drawSprites();
 shoot();

//bricks1.collide()
//bullets1.collide(bricks1,removeWall);
bricks1.collide(bullets1,removeWall);

}
    
if (MENU==2) {
drawHighScoreScreen()
    if (mouseButton == RIGHT) {
      MENU = 0
    }
}
    
else {
    startPage(0,0,255,0.75)
}
}

function borders() {
fill('grey')
rect(0,0,60,800)
rect(0,0,900,30)
rect(0,770,900,30)
rect(800,0,120,800)
image(life,840,550)

}

       
function controls() {
//leftkey=37
    if(keyIsDown(37) && !keyIsDown(39) && !keyIsDown(38) && !keyIsDown(40)){
    playerSprite1.changeAnimation('left')  
    playerSprite1.velocity.y = 0
    playerSprite1.velocity.x = -2
    direction = "leftStop"
    }


//rightkey=39
    else if(keyIsDown(39) && !keyIsDown(37) && !keyIsDown(38) && !keyIsDown(40)){
    playerSprite1.changeAnimation('right')
    playerSprite1.velocity.y = 0
    playerSprite1.velocity.x = 2
    direction = "rightStop"

    }

//downKey=40
    else if(keyIsDown(40) && !keyIsDown(37) && !keyIsDown(38) && !keyIsDown(39)){
    playerSprite1.changeAnimation('down')
    playerSprite1.velocity.y = 2
    playerSprite1.velocity.x = 0
    direction = "downStop"

    }


//upKey=38
    else if(keyIsDown(38) && !keyIsDown(37) && !keyIsDown(39) && !keyIsDown(40)){
    playerSprite1.changeAnimation('up')
    playerSprite1.velocity.y = -2
    playerSprite1.velocity.x = 0
    direction = "upStop"

    }

    else{
    playerSprite1.changeAnimation(direction)
    playerSprite1.velocity.y = 0
    playerSprite1.velocity.x = 0
    }

//leftkey=65
    if(keyIsDown(65) && !keyIsDown(68) && !keyIsDown(83) && !keyIsDown(87)){
    shipSprite.changeAnimation('left')  
    shipSprite.velocity.y = 0
    shipSprite.velocity.x = -2
    direction = "leftStop1"
    }


//rightkey=68
    else if(keyIsDown(68) && !keyIsDown(65) && !keyIsDown(83) && !keyIsDown(87)){
    shipSprite.changeAnimation('right')
    shipSprite.velocity.y = 0
    shipSprite.velocity.x = 2
    direction = "rightStop1"

    }

//downKey=83
    else if(keyIsDown(83) && !keyIsDown(65) && !keyIsDown(68) && !keyIsDown(87)){
    shipSprite.changeAnimation('down')
    shipSprite.velocity.y = 2
    shipSprite.velocity.x = 0
    direction = "downStop1"

    }


//upKey=87
    else if(keyIsDown(87) && !keyIsDown(65) && !keyIsDown(68) && !keyIsDown(83)){
    shipSprite.changeAnimation('up')
    shipSprite.velocity.y = -2
    shipSprite.velocity.x = 0
    direction = "upStop1"

    }

    else{
    shipSprite.changeAnimation(direction)
    shipSprite.velocity.y = 0
    shipSprite.velocity.x = 0
    }    
    
}

function shoot(){
    //17=RCtrl
    if(keyWentDown(17) && direction == 'leftStop') {
        bullet = createSprite(playerSprite1.position.x,playerSprite1.position.y,50,50);

        bullet.addImage(bulletLeft);
        bullet.velocity.x = -4
        bullet.velocity.y = 0
        bullets1.add(bullet);
    }
    else if(keyWentDown(17) && direction == 'rightStop') {
        bullet = createSprite(playerSprite1.position.x,playerSprite1.position.y,50,50);

        bullet.addImage(bulletRight);
        bullet.velocity.x = 4
        bullet.velocity.y = 0.
        bullets1.add(bullet);
    }
     else if(keyWentDown(17) && direction == 'downStop') {
        bullet = createSprite(playerSprite1.position.x,playerSprite1.position.y,50,50);

        bullet.addImage(bulletDown);
        bullet.velocity.x = 0
        bullet.velocity.y = 4
         bullets1.add(bullet);
}
    else if(keyWentDown(17) && direction == 'upStop') {
        bullet = createSprite(playerSprite1.position.x,playerSprite1.position.y,50,50);

        bullet.addImage(bulletUp);
        bullet.velocity.x = 0
        bullet.velocity.y = -4
        bullets1.add(bullet);
        
}
    
    //32=space
    if(keyWentDown(32) && direction == 'leftStop1') {
        bullet = createSprite(shipSprite.position.x,shipSprite.position.y,50,50);

        bullet.addImage(bulletLeft);
        bullet.velocity.x = -4
        bullet.velocity.y = 0
        bullets1.add(bullet);
    }
    else if(keyWentDown(32) && direction == 'rightStop1') {
        bullet = createSprite(shipSprite.position.x,shipSprite.position.y,50,50);

        bullet.addImage(bulletRight);
        bullet.velocity.x = 4
        bullet.velocity.y = 0.
        bullets1.add(bullet);
    }
     else if(keyWentDown(32) && direction == 'downStop1') {
        bullet = createSprite(shipSprite.position.x,shipSprite.position.y,50,50);

        bullet.addImage(bulletDown);
        bullet.velocity.x = 0
        bullet.velocity.y = 4
         bullets1.add(bullet);
}
    else if(keyWentDown(32) && direction == 'upStop1') {
        bullet = createSprite(shipSprite.position.x,shipSprite.position.y,50,50);

        bullet.addImage(bulletUp);
        bullet.velocity.x = 0
        bullet.velocity.y = -4
        bullets1.add(bullet);
        
}
}

function drawHighScoreScreen() {
    push()
    background('Black');
    fill('White');
    noStroke();
    textSize(75);
    textAlign('center');
    text("High Scores", 500, 100);
    textSize(25);
    
    let x = 200;
    // Lists out the Highscores saved in the highscore JSON file
    for (i=0; i < topscores.scores.length; i++) {
        let playerscore = topscores.scores[i];
        text(i+1 + " " + playerscore.name + " " + playerscore.score + " " + playerscore.date, 500, x);
        x += 100;
    }
    
    text("Press Enter to Return to Main Menu", 500, 900);
    pop()
}

function finalResults(a,b,c,d) {
  if (score <= a) {
    result = 'Your Score'
    sticker = '💩'
  }

  if (score > a && score <= b) {
    result = 'Not bad, try again'
    sticker = '😌'
  }

  if (score > b && score <= c) {
    result = 'Amazing !'
    sticker = '👽'
  }

  if (score == d) {
    result = 'YOU WIN !!!'
    sticker = '🎉'
  }

  if (YPos > 900 || score == d) {
    endPage();
    for (let i = 0; i < emojiPlay.length; i++) {
      emojiPlay[i].display();
    }
  }

 if (YPos > 900 || score == d) {
    backgroundColor = backgroundColor + 20
  } else {
    backgroundColor = 0
  }
}

function startPage(r,g,b,x) {
    
  push()
    background('black')
  fill(255)
  strokeWeight(x)
  stroke(255)
  fill(r, g, b, startA)
  rect(320,370, startW, startH)
  if (mouseX > 320 && mouseX < 580 && mouseY > 370 && mouseY < 440) {
  startA = startA + 10
  } else {
    startW = 260, startH = 70, startA = 0
  }

  pop()

  push()
  fill(255)
  textSize(29)
  textAlign(CENTER);
  text('High Score', 445, 415)
  pop()
    
    push()
  fill(255)
  strokeWeight(x)
  stroke(255)
  fill(r, g, b, scoreA)
  rect(320,270, startW, startH)
  if (mouseX > 320 && mouseX < 580 && mouseY > 270 && mouseY < 340) {
  scoreA = scoreA + 10
  } else {
    startW = 260, startH = 70, scoreA = 0
  }

  pop()

  push()
  fill(255)
  textSize(29)
  textAlign(CENTER);
  text('Start ☄️ Game', 445, 315)
  pop()

    
}
function mouseClicked() {
  if (MENU == 0) {
    if (mouseX < 580 && mouseX > 320) {
      if (mouseY > 270 && mouseY < 340) {
        MENU = 1
      }
      if (mouseY > 370 && mouseY < 440) {
        MENU = 2
      }

    }
  }
}