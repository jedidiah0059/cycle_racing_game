var path,mainCyclist,opponents,cyclist_1, cyclist_2, cyclist_3, opponentsGroup;
var pathImg,mainRacerImg1,mainRacerImg2;

var winner;

var END =0;
var PLAY =1;
var WIN = 2;
var gameState = PLAY;

var distance=0;

var score = 0;

var obstacles1_image, obstacles2_image, obstaclesGroup;

var bellSound;

var opponents;

var obstacles;

var wincup, wincup_image;

var go, go_image;

function preload(){
  pathImg = loadImage("images/Road.png");                           
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  obstacles1_image = loadImage("obstacle1.png");
  obstacles2_image = loadImage("obstacle2.png");
  obstacles3_image = loadImage("obstacle3.png");
  cyclist_1 = loadAnimation("opponent11.png","opponent12.png");
  c1 = loadAnimation("opponent13.png");
  cyclist_2 = loadAnimation("opponent21.png","opponent22.png");
  c2 = loadAnimation("opponent23.png");
  cyclist_3 = loadAnimation("opponent31.png","opponent32.png");
  c3 = loadAnimation("opponent33.png");
  bellSound = loadSound("sound/bell.mp3");
  winner = loadAnimation("images/mainPlayer1.png");
  wincup_image = loadImage("trophy.png");
  go_image = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(500,300);
  
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -6 -(3*score/100);

mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("cyclist_anim",mainRacerImg1);
mainCyclist.addAnimation("stopii",mainRacerImg2);
mainCyclist.addAnimation("winner",winner);
mainCyclist.scale=0.07;
mainCyclist.setCollider("rectangle",50,0,1100,1300);
  
go = createSprite(250,150,10,10);
go.addImage("gameO", go_image);
  
obstaclesGroup = new Group();
opponentsGroup = new Group();
}

function draw() {
  background(0);
  
  
  
  drawSprites();
  textSize(20);
  fill("white");
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
    
    go.visible = false;
    
    path.velocityX = -6 -(3*distance/100);
    
    distance = distance + Math.round(getFrameRate()/60);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist.collide(edges);

  if(path.x < 0 ){
    path.x = path.width/2;
  }
   
    spawnobstacles();
    spawnOpponents();
    
    if(obstaclesGroup.isTouching(mainCyclist)){
      opponentsGroup.setVelocityXEach(+7);
      gameState = END;
    }
    
    if(distance === 1000){
      gameState = WIN;
      distance = 1000;
      path.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);  
    }
    
    if(keyWentDown("space")){
      bellSound.play();
    }
      
    }
    
  else if (gameState === END){
   
    path.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    mainCyclist.changeAnimation("stopii",mainRacerImg2);
    go.visible = true;
    
    if(keyDown("r")){
      reset();
      
    }
    
    
  }
      if(gameState === END){
    fill("white"); 
    textSize(30);
    text("PRESS 'R' TO RESTART", 95,95);
      }
else if(gameState === WIN){
  
  fill("white"); 
    textSize(15);
      text("CONGRATULATIONS YOU ARE THROUGH TO THE NEXT ROUND",10,110);
      text("PLEASE PRESS 'R' TO GET TO THE NEXT ROUND", 30, 130)
  wincup = createSprite(250,200,10,10);
  wincup.addImage(wincup_image);
  wincup.scale = 0.09
  mainCyclist.changeAnimation("winner",winner);
  if(keyDown("r")){
      reset();
      
    }

}
    
}

function spawnobstacles(){
  if (frameCount % 60 === 0 && frameCount !== 0 && frameCount !==60){
    obstacles = createSprite(600,165,10,40);
   obstacles.velocityX = -6 -(3*distance/100);
   obstacles.y = Math.round(random(10,250));
   
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacles.addImage(obstacles1_image);
              obstacles.setCollider("rectangle",0,0,300,500);
              break;
      case 2: obstacles.addImage(obstacles2_image);
              obstacles.setCollider("rectangle",0,0,600,300);
              break;
      case 3: obstacles.addImage(obstacles3_image);
              obstacles.setCollider("rectangle",0,0,300,300);
              break;
      default: 
              break;
    }
          
    obstacles.scale = 0.5;
    obstacles.lifetime = 300;
    obstacles.scale = 0.1;

    obstaclesGroup.add(obstacles);
 }
}
function spawnOpponents(){
  if(frameCount % 500 === 0 && frameCount !== 0){
    opponents = createSprite(600,165,10,40);
    opponents.velocityX = -2 - (3*distance/100);
    opponents.y = Math.round(random(10,250));
    var rand1 = Math.round(random(1,3));
    switch(rand1) {
      case 1: opponents.addAnimation("one",cyclist_1);
              opponents.addAnimation("c1",c1);
              if(obstaclesGroup.isTouching(opponents)){
              opponents.changeAnimation("c1",c1);
              opponents.velocityX = path.velocityX;
              opponents.lifetime = 1;
              opponents.setCollider("rectangle",0,0,10,10);
              }
              break;
      case 2: opponents.addAnimation("two",cyclist_2);
              opponents.addAnimation("c2",c2);
              if(obstaclesGroup.isTouching(opponents)){
              opponents.changeAnimation("c2",c2);
              opponents.velocityX = path.velocityX;
              opponents.lifetime = 1;
              opponents.setCollider("rectangle",0,0,10,10);
              }
              break;
      case 3: opponents.addAnimation("three",cyclist_3);
              opponents.addAnimation("c3",c3);
              if(obstaclesGroup.isTouching(opponents)){
              opponents.changeAnimation("c3",c3);
              opponents.velocityX = path.velocityX;
              opponents.lifetime = 1;
              opponents.setCollider("rectangle",0,0,10,10);
              }
              break;
      default: 
              break;
    }
    
    opponents.lifetime = 600;
    opponents.scale = 0.07;
    opponentsGroup.add(opponents);
    
  }
}

function reset(){
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  opponentsGroup.destroyEach();
  distance = 0;
  mainCyclist.changeAnimation("cyclist_anim",mainRacerImg1);
}
