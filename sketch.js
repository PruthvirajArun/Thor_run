var PLAY = 1;
var END = 0;
var gameState = PLAY;

var thor, thorImg;
var hela, helaImg;
var bifrost, bifrostImg;
var knife, knifeImg, knivesGroup;
var score;
var lightning, lightningImg, lightningGroup;
var gameover, gameoverImg;
var restart, restartImg;


function preload(){
thorImg = loadImage("thor.png");
helaImg = loadImage("hela.png");
bifrostImg = loadImage("bifrost.png");
knifeImg = loadImage("knife.png");
lightningImg = loadImage("lightning.png")
gameoverImg = loadImage("gameover.png")
restartImg = loadImage("restart.png")
}

function setup() {
    createCanvas(600, 600);
    bifrost = createSprite(300,300);
    bifrost.addImage("bifrost",bifrostImg);
    

    knivesGroup = new Group();
    lightningGroup = new Group();
    
    thor = createSprite(200, 500, 50, 50);
    thor.scale = 0.3;
    thor.addImage("thor", thorImg);

    hela = createSprite(200, 70, 50, 50);
    hela.scale = 0.17;
    hela.addImage("hela", helaImg);

gameover = createSprite(300, 270, 100, 100);
gameover.addImage("gameover", gameoverImg);
gameover.visible = false;

restart = createSprite(300,350,100,100);
restart.addImage("restart", restartImg);
restart.scale = 0.25;
restart.visible = false;

    score  = 0;

    thor.setCollider("rectangle",0,0,100,350);
}

function draw() {
    background(200);

    drawSprites();  
    textSize(20);
    fill(255);
    text("Score: "+ score, 470,30);

    if (gameState===PLAY){
     
      score = score + Math.round(getFrameRate()/60);


      bifrost.velocityY = 1;
      if(bifrost.y > 400){
          bifrost.y = 300
        }
  
        if(keyDown("left_arrow")){
          thor.x = thor.x - 5;
          }
      
          if(keyDown("right_arrow")){
            thor.x = thor.x + 5;
            }
  
            if(knivesGroup.isTouching(thor)){
             gameState = END;

            }    
              
            if(lightningGroup.isTouching(thor)){
              score = score + 250;
              lightningGroup.destroyEach();
            }
          
            hela.x = thor.x;
  
      
      
      spawnKnives();
      spawnLightning();
  
    }

    else if (gameState === END){
      knife.velocityY = 0;
      lightning.velocityY = 0;
      bifrost.velocityY  = 0;
      gameover.visible = true;
      restart.visible  = true;

      if(mousePressedOver(restart)) {
        reset();
      }
    }


             
    
}

function spawnKnives() {
if(frameCount % 200 == 0){
    knife = createSprite(240, 140);
    knife.addImage("knife", knifeImg);
    knife.scale = 0.55;
    knife.x = Math.round(random(50, 550));
    knife.velocityY = 3;
    knife.lifetime = 800;
    knivesGroup.add(knife);
    

}

}

function spawnLightning() {
  if(frameCount % 250 == 0){
      lightning = createSprite(200, -55);
      lightning.addImage("lightning", lightningImg);
      lightning.scale = 0.35;
      lightning.x = Math.round(random(50, 550));
      lightning.velocityY = 3;
      lightning.lifetime = 800;
      lightningGroup.add(lightning);
  }
  
  }

  function reset(){
    gameState = PLAY;
    gameover.visible = false;
    restart.visible = false;
    
    knivesGroup.destroyEach();
    lightningGroup.destroyEach();
        
    score = 0;
    
  }