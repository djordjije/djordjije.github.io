// Project 1
// George Vojvodic
// USED THIS LINK FOR CREATING WATER
// https://p5js.org/examples/math-noise-wave.html
// TODO: Finish adding text so it flows up with the water.

let yoff = 0.0; // 2nd dimension of perlin noise

// Variables for the circles around the sun.
var radius = 40;
var angle = 0;
var speed = 0.05;
var centerX = 600;
var centerY = 70;

function setup() {
  createCanvas(710, 400);
}

function draw() {
  background(168,255,255); // Light blue sky.
  
  // Sand Beach
  fill(220, 192, 139);
  triangle(0,250, 0, 400, 800, 400);
  
  drawSun();
  
  drawPalmStem();
  
  
  strokeWeight(1);
  fill(47,86,233); // Dark blue water.
  // We are going to draw a polygon out of the wave points
  beginShape();

  let xoff = 0; // Option #1: 2D Noise

  // Iterate over horizontal pixels
  for (let x = 0; x <= width; x += 10) {

    let y = map(noise(xoff, yoff), 0, 1, 350-(frameCount/40), 400-(frameCount/40));
    
    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  drawPalmLeaves();
  
}

function drawPalmStem() {
  let yoffset=(frameCount < 4000 ? 0 : (frameCount-4000)/40);
  noStroke();
  fill(128,96,77);
  rect(66,150-yoffset,20,200);
  fill(200,82,45);
  stroke(128,0,0);
  ellipse(100,200-yoffset,30,30);
  ellipse(52,200-yoffset,30,30);
  ellipse(75,195-yoffset,28,28);
}

function drawPalmLeaves() {
  let yoffset = (frameCount < 4000 ? 0 : (frameCount-4000)/40);
  fill(0,100,0);
  translate(80, 150-yoffset);
  strokeWeight(2.2);
  stroke(11, 58, 16);
  for (var i = 0; i < 10; i ++) {
    ellipse(0, 30, 20, 80);
    rotate(PI/5);
  }
}

function drawSun() {
  noStroke();
  fill('yellow');
  ellipse(600, 70, 50, 50);
  // Circles around the sun for shine. 
  noStroke();
  fill('yellow');
  
  for (let i=0; i<6; i++) {
    var x = centerX + radius * cos(angle+(PI*i/3));
    var y = centerY + radius * sin(angle+(PI*i/3));
    ellipse(x, y, 15, 15);
  }
  
  angle = angle + speed;

}
