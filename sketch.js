//Create variables here
var food
var gameState="hungry"
var bedroomImg,gardenImg,washroomImg
//var feed
function preload()
{
	//load images here
  dogHappy=loadImage("images/dogImg1.png");
  dogSad=loadImage("images/dogImg.png")
  bedroomImg=loadImage("images/Bed Room.png")
  gardenImg=loadImage("images/Garden.png")
  washroomImg=loadImage("images/Wash Room.png")
}

function setup() {
	createCanvas(800, 700);

  database=firebase.database()
  database.ref('food').on("value",readPosition)
  dog=createSprite(700,400,50,50)
  dog.addImage(dogSad)
  dog.scale=0.2

  milk1=new Food()
  milk1.getfeedtime()
  database.ref('gameState').on("value",(data)=>{
    gameState=data.val();
  });
  
}


function draw() {  
  background("blue")
  drawSprites();
  fill ("black")
  textSize(30)
  text("fedtime: " + milk1.feedtime,200,50) 
  milk1.buttons()
  milk1.milkImg()
  //add styles here
  currentTime=11
  if(currentTime == (milk1.feedtime +1)){
  milk1.updateState("playing")
  milk1.garden()
  }
  else if(currentTime == (milk1.feedtime +2)){
  milk1.updateState("sleeping")
  milk1.bedRoom()
  }
  else if(currentTime == (milk1.feedtime +3)){
  milk1.updateState("bathing")
  milk1.washRoom()
  }
  else{
  milk1.updateState("hungry")
  }

  if(gameState !== "hungry")
  {
    milk1.button1.hide();
    milk2.button2.hide();
    dog.remove();
  }
  else 
  {
    milk1.buttoon1.show ()
    milk1.buttoon2.show ()
    dog.addImage(dogSad)
    dog.scale=0.2
  }

if( food=== 0){
  dog.addImage(dogHappy)
  dog.scale=0.2

  push()
  fill ("red")
  textSize(40)
  text("Thank You",300,250)
  pop ()
}

}
function readPosition(data){
 food= data.val()
  
}

function writeStock(data){
 database.ref('/').set( {
 food:data,
 feedtime:hour()
})
}
     