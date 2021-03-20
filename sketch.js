//Create variables here
var dog, dogImage1, dogImage2, bones;
var database, foodS, foodStock;

function preload() {
  dogImage1 = loadImage("images/dogImg.png");
  dogImage2 = loadImage("images/dogImg1.png");
  bones = loadImage("images/download.png");
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database(); 
  dog = createSprite(250, 300);
  dog.addImage(dogImage2);
  dog.scale = 0.15;
  // reading the database
  foodStock = database.ref('foodS');
  foodStock.on("value", readStock);
  
  
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(bones);
  }
  if(keyWentUp(UP_ARROW)) {
    dog.addImage(dogImage1);
  }

  for(var i = 0; i < foodS; i++) {
    var food = createSprite((i*50)+30, 400);
    food.addImage(bones);
    food.scale = 0.15;
  }
  
  drawSprites();
  //add styles here
  textSize(30);
  fill("black");
  text("Food Remaining: " + foodS, 160, 200);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x <= 0) {
    x = 0;
    /*textSize(20);
    fill("red");
    text("There is no more food left", 180,200);*/
  }
  else {
    x = x - 1;
  }
  database.ref("/").update({
    foodS: x
  });

}




