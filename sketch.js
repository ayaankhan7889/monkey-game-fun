
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var survivaltime = 0;
var ground;
var gamestate = "play"
var g1 = 0.7

 function preload(){
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png", "sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

  function setup() {
  createCanvas(600,200)

  monkey = createSprite(50,150,10,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale = 0.1


  ground = createSprite(200,195,800,5)
  ground.velocityX = -4
  ground.x = ground.width/2
  
  foodgroup = new Group()
  obstaclegroup = new Group()
  
}

function draw() {
 background("lightblue")
 textSize(20)
 text("survival time: "+score,400,30);
  
  monkey.collide(ground);
  monkey.velocityY = monkey.velocityY + g1;
  
  
   if(gamestate === "play"){
   monk();
   obstacle();
    
  score=Math.ceil(frameCount/frameRate());
      
   if(keyDown("space")&& monkey.y>151){
      monkey.velocityY = -10;  
   }  
   if(ground.x <200){
      ground.x = ground.width/2
   }
   if(keyDown("space")){
      monkey.velocityY = -10;  
  }
  if(obstaclegroup.isTouching(monkey)){
      gamestate = "end"
    
  } 
  }

  else if(gamestate === "end"){
    ground.velocityX = 0;
    
    obstaclegroup.setVelocityXEach(0);
    foodgroup.setVelocityXEach(0);
    
    obstaclegroup.setLifetimeEach(-1);
    foodgroup.setLifetimeEach(-1);
    
    monkey.velocityY = 0;
    }
  
  drawSprites();
 }

  function monk(){
  if(frameCount%70===0){
    banana=createSprite(650,250,20,10)
    banana.velocityX = -3
    banana.addImage(bananaImage)
    banana.y = Math.round(random(20,80))
    banana.scale = 0.1
    banana.depth = monkey.depth
    monkey.depth = monkey.depth+1
    banana.lifetime = 230;
    foodgroup.add(banana)
}}

  function obstacle(){
    if(frameCount%200===0){ 
    obs = createSprite(800,165,10,40);
    obs.velocityX = -6;
    //add image to the obstacle 
    obs.addImage(obstaceImage);
    obs.scale=0.15;
    //lifetime to the obstacle     
    obs.lifetime = 300;
    //add each obstacle to the group
    obstaclegroup.add(obs);
}}



