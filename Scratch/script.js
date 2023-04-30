
//declare variables
var bgcolor = 'black';

function setup() {

  //define canvas properties
  createCanvas(600, 900);
  background(bgcolor);
  setupCanvas();
}

function setupCanvas() {
  noStroke();

  //CREATE ELEMENTS:

  colorPicker = createColorPicker('#fff');
  colorPicker.position(10, 50);

  //create a dropdown menu
  sel = createSelect();
  sel.position(150, 50);
  sel.option("Normal Paint Brush (press 'N')");
  sel.option("Splatter Brush (press 'S')");
  sel.option("Eraser (press 'E')");
  sel.option("Draw Rectangle (press 'Q')");
  sel.option("Draw Triangle (press 'T')");

  //create a slider
  slider = createSlider(1, 100, 20, 1);
  slider.position(370, 50);
  slider.style('width', '180px');

  //create a button
  button = createButton("Scratch p5js");
  button.position(650, 100);
  button.mousePressed(Scratch);


  //create a button
  button = createButton("Erase Canvas (press 'R')");
  button.position(650, 50);
  button.mousePressed(clearBG);

  
  //create a button
  button = createButton("Save Canvas as Image (press 'I')");
  button.position(650, 10);
  button.mousePressed(SaveImage);


}

function draw() {

  //Take advantage of the fact that elements in p5js are always on top, so you can always draw the menu bars to prevent the user from drawing in the menu bar
  noStroke();

  //draw a menu bar
  fill('#808080');
  rect(0, 0, width, 100);
  

  //create text
  fill('black');
  textSize(16);
  text("Thickness :)", 370, 20);

  //create text
  fill('black');
  textSize(16);
  text("Brush Type/Eraser", 150, 30);

  fill('black');
  textSize(12);
  text("Color :)", 10, 15);

  //Check if mouse is pressed and draw the lines and stuff
  if (mouseIsPressed && mouseY > 100) {
    if (sel.value() == "Normal Paint Brush (press 'N')") {
      //normal paint brush

      //draw a line with the correct color
      stroke(colorPicker.color());
      strokeWeight(slider.value());
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
    if (sel.value() == "Splatter Brush (press 'S')") {
      //splatter brush

      //draw ellipses with the correct thickness at random locations a random amount of times

      for (i = 0; i < random(1, 10); i++) {
        //draw the ellipse
        noStroke();

        fill(colorPicker.color());

        ellipse(mouseX + random(-100, 100), mouseY + random(-100, 100), slider.value(), slider.value());
      }
    }
    if (sel.value() == "Eraser (press 'E')") {
      //eraser

      //draw a line in background color
      stroke(bgcolor);
      strokeWeight(slider.value());
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
    if (sel.value() == "Draw Rectangle (press 'Q')") {
      //draw rectangle with brush thickness at mousex and y
      fill(colorPicker.color());
      rect(mouseX, mouseY, slider.value(), slider.value());
    }
    if (sel.value() == "Draw Triangle (press 'T')") {
      //draw triangle with brush thickness at mousex and y
      fill(colorPicker.color());
      triangle(mouseX, mouseY, mouseX + slider.value(), mouseY + slider.value(), mouseX - slider.value(), mouseY + slider.value());
    }
  }
}



function Scratch() {
  //adding a popup to show your skills about function for scratch project
  createA('./scratch/index.html', 'scratch','_blank');
}


function clearBG() {
  //clear the background by filling everything with white
  fill(bgcolor);
  noStroke();
  rect(0, 100, width, height - 100);
  
}

function SaveImage() {
  var to_save = get(0, 100, width, height - 100);
  to_save.save("canvas.png");
}

//check for key press
function keyPressed() {

  //check for the correct key
  if (key == 'n' || key == 'N') {
    //change brush type to normal brush
    sel.selected("Normal Paint Brush (press 'N')");
  } else if (key == 's' || key == 'S') {
    //change bbrush type to splatter brush
    sel.selected("Splatter Brush (press 'S')");
  } else if (key == 'e' || key == 'E') {
    //change brush type to eraser
    sel.selected("Eraser (press 'E')");
  } else if (key == '+') {
    //increase brush thickness
    slider.value(slider.value() + 1);
  } else if (key == '-') {
    //reduce brush thickness
    slider.value(slider.value() - 1);
  } else if (key == 'r' || key == 'R') {
    //clear the background by calling clearBG() function
    clearBG();
  } else if (key == 'c' || key == 'C') {
    //generate a random hex code, and set that as the colorpicker color
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colorPicker = createColorPicker(randomColor);
    colorPicker.position(10, 50);
  } else if (key == 'i' || key == 'I') {
    //save the canvas as an image by calling saveImage()
    SaveImage()
  } else if (key == 'q'|| key == 'Q'){
    //switch brush type to rectangle
    sel.selected("Draw Rectangle (press 'Q')");
  }else if (key == 't'|| key == 'T'){
    //switch brush type totriangle
    sel.selected("Draw Triangle (press 'T')");
  }

}