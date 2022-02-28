function setup() {
  createCanvas(800, 1200);

  loadImage('./wf3.png', img => {
    image(img, mouseX, mouseY);
  });
}

function draw() {
  // background('teal');
  // fill('green');
  // ellipse(mouseX, mouseY, 100);
}
