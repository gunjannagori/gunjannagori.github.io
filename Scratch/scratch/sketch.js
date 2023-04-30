let img;
let stamp;
let topLayer;

function preload() {
  img = loadImage("image.png");
  stamp = loadImage("stamp.png");
}

function setup() {
  createCanvas(600, 800);
  topLayer = createGraphics(width, height);
  
  topLayer.background(200);
  topLayer.textSize(50);
  topLayer.textAlign(CENTER);
  topLayer.text("SCRATCH ME", width/2, height/2);
    
  topLayer.imageMode(CENTER);
  topLayer.strokeWeight(40);
  topLayer.blendMode(REMOVE);  
}

function draw() {
  image(img, 0, 0, width, height);
  
  if(mouseIsPressed) {
    topLayer.line(pmouseX, pmouseY, mouseX, mouseY);
    // topLayer.image(stamp, mouseX, mouseY, stamp.width * 2, stamp.height*2);
  }
  
  image(topLayer, 0, 0);
}