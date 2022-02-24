function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('cyan');
  fill(mouseX%256, mouseY%256, mouseX%256);
  rect(175, 125, 50, 50);
  ellipse(200, 200, 50);
  rect(175, 225, 50, 50);
  rect(125, 175, 50, 50);
  rect(225, 175, 50, 50);
}
