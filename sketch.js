var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaImg;
var stone,stoneImg;
var score = 0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg=loadImage("banana.png");
  obstacleImg=loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  
  }
  spawnFood();
  spawnObstacle();
  
  
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    

    if(bananaGroup.isTouching(player)){
      bananaGroup.destroyEach();
      score = score+5;
      player.scale+= +0.1
    }

    if(obstacleGroup.isTouching(player)){
      gameState = END;
    }
  }else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();

    
  }

  

  drawSprites();

  textSize(20);
  fill("black");
  text("SCORE:"+score,700,15);
  if(gameState === END){
    textSize(30);
    fill(255);
    text("GAME OVER!",300,226);
  }
}


function spawnFood()
{
    if(frameCount % 80 === 0)
    {
      var banana= createSprite(600,250,40,40);
      banana.y = random(100,300);
      banana.addImage(bananaImg);
      banana.scale = 0.05;
      banana.velocityX = -4;

      banana.lifetime  = 300;
      player.depth = banana.depth+1;
      bananaGroup.add(banana);
    }
}

function spawnObstacle()
{
  if(frameCount%150 === 0)
  {
    obstacle=createSprite(700,320,10,10);
    // obstacle.x= random(100,200);
    obstacle.addImage(obstacleImg);
     obstacle.scale=0.2;
    obstacle.velocityX=-2

    obstacle.lifetime = 700;
    obstacleGroup.add(obstacle);

  
  }
}