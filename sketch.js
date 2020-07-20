//Global Variables
var monk,monkimg;
var banana,bananaimg;
var rock,rockimg;
var obstaclesGroup;
var bananaGroup;
var backGround,backGroundImg;
var ground,groundimg;
var restart, restartimg;


var score = 0;

var PLAY=0;
var END=1;
var gamestate=PLAY;

function preload(){
  monkimg = loadAnimation("Monkey01.png","Monkey02.png","Monkey03.png","Monkey04.png","Monkey05.png","Monkey06.png","Monkey07.png","Monkey08.png","Monkey09.png","Monkey10.png");

  bananaimg = loadImage("Banana.png");
  backGroundImg = loadImage("jungle.jpg");
  rockimg = loadImage("stone.png");
  groundimg = loadImage("ground.jpg");
  restartimg= loadImage("restart.png");
  
}

function setup() {
  createCanvas(300, 200);
  
  monk = createSprite(50,180,20,50);
  monk.addAnimation("running", monkimg);
  monk.scale = 0.1;
  
  ground = createSprite(180,150,400,20);
  ground.addImage("ground.png",groundimg);
  ground.scale=0.1
  ground.depth=monk.depth-1;
  //ground.x = ground.width /2;
  //ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  bananaGroup = new Group();
  obstaclesGroup=new Group();
  
}

function draw() {
  background(180);
  
  if(gamestate==PLAY){
  
  if(keyDown("space") && monk.isTouching(ground)) {
    monk.velocityY = -10;
  }
  
  monk.velocityY = monk.velocityY + 0.8
  
  spawnClouds();
  spawnObstacles();
    
  if(bananaGroup.isTouching(monk)){
     score=score+2;
    bananaGroup.destroyEach();
     }
  text("Score: "+ score, 200, 50);
    if(score==10){
       monk.scale=0.15
       }
    if(score==20){
       monk.scale=0.20
       }
    if(score==30){
       monk.scale=0.25
       }
       
    if(obstaclesGroup.isTouching(monk)){
       gamestate=END;
       }
  
 //if (ground.x < 0){
  //  ground.x = ground.width/2;
  //}
} else if(gamestate==END){
    
  bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
  
  
  if(keyDown("r")||mousePressedOver(restart)){
      bananaGroup.destroyEach();
      obstaclesGroup.destroyEach();
      
      score=0;
      gamestate=PLAY;
       }
  
  }
  
  monk.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round (random(80,120));
    banana.addImage(bananaimg);
    banana.scale = 0.05;
    banana.velocityX = -3;
    bananaGroup.add(banana);
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monk.depth;
    monk.depth = monk.depth + 1;
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var rock = createSprite(600,165,10,40);
    rock.velocityX = -6;
    rock.addImage(rockimg)
    //assign scale and lifetime to the obstacle           
    rock.scale = 0.1;
    rock.lifetime = 300;
    obstaclesGroup.add(rock);
  }
}