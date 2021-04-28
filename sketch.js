var horse,horseImage;
var backgroundImage,BG;
var gameState="PLAY";
var Rock,RockImage;
var Hurdle,HurdleImage;
var Diamond,DiamondImage;
var Treasure,TreasureImage;
var Bird,BirdImage;
var food,foodImage;
var score=0
var Energy=500
var number
var number1
var number2
var edge
var life=3
var gameOver,reset,resetImage,gameOverImage;
var tryAgainSound,gameOverSound,after100pointsSound;

function preload(){
  horseImage=loadAnimation("horse 5.png","horse 6.png");
  backgroundImage=loadImage("track images.png");
  RockImage=loadImage("rock.png");
  HurdleImage=loadImage("hurdle.png");
  DiamondImage=loadImage("diamond.png");
  TreasureImage=loadImage("treasure.png");
  BirdImage=loadImage("bird.png");
  foodImage=loadImage("horseFood.png")
  gameOverImage=loadImage("gameOverImage.png")
  resetImage=loadImage("reset.png")
  tryAgainSound=loadSound("tryAgain.mp3");
  gameOverSound=loadSound("gameOver sound.mp3");
  after100pointsSound=loadSound("after100points.mp3");
}

function setup(){
  edge=createEdgeSprites()
  createCanvas(600,600)
  BG=createSprite(300,300)
  BG.addImage(backgroundImage)
  BG.scale=2.5;
  
  horse=createSprite(100,300)
  horse.addAnimation("horse",horseImage)
  //horse.debug=true;
  horse.setCollider("rectangle",0,0,300,200)
  horse.scale=0.5;

  gameOver=createSprite(300,250,10,10)
  gameOver.addImage(gameOverImage)
  gameOver.scale=0.3

  reset=createSprite(300,300,10,10)
  reset.addImage(resetImage)
  reset.scale=0.4;

  

  rockGroup=createGroup()
  hurdleGroup=createGroup()
  diamondGroup=createGroup()
  treasureGroup=createGroup()
  birdGroup=createGroup()
  foodGroup=createGroup()
}

function draw(){
  background("grey")
  
  if(gameState==="PLAY"){
    BG.velocity.x=-2

    
   
    
    
   
    
    if(BG.x<0){
      BG.x=300;
    }
    if(keyDown("UP_ARROW")){
      horse.y=horse.y-10;
    }
  
    if(keyDown("DOWN_ARROW")){
      horse.y=horse.y+10;
    }

    if(horse.isTouching(hurdleGroup)||horse.isTouching(rockGroup)||horse.isTouching(birdGroup)||Energy<0){
      gameState="RESTART"
      life=life-1;
    }
    
    if(gameState==="RESTART"){
      
      

    }
    

    if(life===0){
      gameState="END"
    }

    if(horse.isTouching(diamondGroup)){
      score=score+20;
      diamondGroup.destroyEach()
    }

    if(horse.isTouching(treasureGroup)){
      score=score+10;
      treasureGroup.destroyEach()
    }

    if(horse.isTouching(foodGroup)){
      Energy=Energy+40;
      foodGroup.destroyEach()
    }
    if(frameCount%100===0){
      Energy=Energy-20;
    }
    number=Math.round(random(1,2))
    if(number===1){
      creatediamond();

    }else{
      createhurdle();
    }

    number1=Math.round(random(3,4))
    if(number1===3){

      createtreasure();
    }else{
      createrock();
    }

    number2=Math.round(random(5,6))
    if(number2===5){
      createFood();

    }
    else{
      createbird();
    }

    gameOver.visible=false;
    reset.visible=false;
  }
  if(gameState==="RESTART"){
   
      tryAgainSound.play()
      reset.visible=true;
      BG.velocityX=0
      hurdleGroup.setVelocityXEach(0);
      rockGroup.setVelocityXEach(0);
      diamondGroup.setVelocityXEach(0);
      treasureGroup.setVelocityXEach(0);
      birdGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0)
      if(mousePressedOver(reset)){
        gameState="PLAY"
        hurdleGroup.destroyEach()
        rockGroup.destroyEach()
        foodGroup.destroyEach()
        birdGroup.destroyEach()
        diamondGroup.destroyEach()
        treasureGroup.destroyEach()
      }
  }

    if(gameState==="END"){
      BG.velocityX=0;
      hurdleGroup.setVelocityXEach(0);
      rockGroup.setVelocityXEach(0);
      diamondGroup.setVelocityXEach(0);
      treasureGroup.setVelocityXEach(0);
      birdGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0)
      gameOver.visible=true;
      reset.visible=true;
      hurdleGroup.destroyEach()
      rockGroup.destroyEach()
      foodGroup.destroyEach()
      birdGroup.destroyEach()
      diamondGroup.destroyEach()
      treasureGroup.destroyEach()
      
      
      gameOverSound.play()
      if(mousePressedOver(reset)){
        Energy=500;
        score=0;
        life=3
        gameState="PLAY"
      }

    }
    horse.collide(edge)

  drawSprites()
  textSize(25)
  fill("white")
  text("SCORE : "+score,50,50)

  textSize(25)
  fill("white")
  text("Energy : "+Energy,350,50)

  textSize(25)
  fill("white")
  text("LIFE : "+life,230,50)

}

function createrock(){
  if(frameCount%200===0){
    Rock=createSprite(600,Math.round(random(50,600)))
    Rock.addImage(RockImage)
    //Rock.debug=true;
    Rock.setCollider("circle",0,0,40)
    Rock.velocityX=-(3+score/100);
    Rock.scale=0.4;
    rockGroup.add(Rock);
  }

 
}

function createhurdle(){
  if(frameCount%150===0){
    Hurdle=createSprite(600,Math.round(random(50,580)))
    Hurdle.addImage(HurdleImage)
    //Hurdle.debug=true;
    Hurdle.setCollider("rectangle",0,0,300,300)
    Hurdle.velocityX=-(2+score/100);
    Hurdle.scale=0.4;
    hurdleGroup.add(Hurdle);
  }
}

function creatediamond(){
  if(frameCount%150===0){
    Diamond=createSprite(600,Math.round(random(50,550)))
    Diamond.addImage(DiamondImage)
    //Diamond.debug=true;
    Diamond.setCollider("circle",0,0,100)
    Diamond.velocityX=-(2+score/100);
    Diamond.scale=0.2;
    diamondGroup.add(Diamond);
  }
}

function createtreasure(){
  if(frameCount%200===0){
    Treasure=createSprite(600,Math.round(random(50,550)))
    Treasure.addImage(TreasureImage)
    //Treasure.debug=true;
    Treasure.setCollider("rectangle",0,0,300,200)
    Treasure.velocityX=-(2+score/100);
    Treasure.scale=0.2;
    treasureGroup.add(Treasure);
  }
}

function createbird(){
  if(frameCount%250===0){
    Bird=createSprite(600,Math.round(random(50,550)))
    Bird.addImage(BirdImage)
    //Bird.debug=true;
    Bird.setCollider("circle",0,-10,70)
    Bird.velocityX=-(2+score/100)
    Bird.scale=0.3;
    birdGroup.add(Bird);
}
}

function createFood(){
  if(frameCount%250===0){
    food=createSprite(600,Math.round(random(50,550)))
    food.addImage(foodImage)
    //food.debug=true;
    food.setCollider("circle",0,0,100)
    food.velocityX=-(2+score/100);
    food.scale=0.2;
    foodGroup.add(food)
}
}

