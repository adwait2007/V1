var dog,happyDog,dogImg;
var database;
var foodS,foodStock;

function preload(){
dogImg = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
var dog = createSprite(250,300,150,150);
 dog.addImage(dogImg);
 dog.scale = 0.15;
  foodStock = database.ref('Food');
    foodStock.on("value",readStock);
    foodStock.set(20);
    
}


function draw() {  
background("pink")
if(foodS!== undefined){
  textSize(20);
  fill("black");
  text("food remaning :"+foodS,170,200);
  text("note : press up_arrow key to feed milk to tom",130,10,300,20);

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  if(keyDown(RIGHT_ARROW)){
    dog.addImage(dogImg);
  }


  if(foodS === 0){
    foodS = 20
  }
  drawSprites();
}

}
  
  
function readStock(data){
  foodS = data.val();
  }
 
  
 


  
  function writeStock(x){
    if(x <= 0){
      x = 0;
    }
    else{
      x = x-1;
    }
      database.ref("/").update({
        Food : x,
      })
    }
