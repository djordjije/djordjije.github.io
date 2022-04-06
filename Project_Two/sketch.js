var angle = 0;
var speed = 0.05;

var btnSelection = 0;
var btnTopMargin = 20;
var btnHeight = 40;
var btnWidth = 120;

var canvasHeight = 600;
var canvasWidth = 700;

let customFont;
let treeImg;
let coalImg;
let mixedEnergyImg;
let renewableImg;
function preload() {
  customFont = loadFont('contender.otf');
  treeImg = loadImage('images/islandTrees.jpg');
  coalImg = loadImage('images/coalPlants.jpg');
  mixedEnergyImg = loadImage('images/mixedEnergy.jpg');
  renewableImg = loadImage('images/renewableEnergy.jpg');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  textFont(customFont);
  background(220);
  
  // Royalty Free Music from Bensound
  song = loadSound('bensound-ukulele.mp3');

  let button1 = createButton('RCP 2.6');
  button1.size(btnWidth, btnHeight);
  button1.style('background-color', 'green');
  button1.style('color', 'white');
  button1.style('font-weight', 'bold');
  button1.style('border-radius', '20px');
  button1.position(20, btnTopMargin);
  button1.mousePressed(() => {
    btnSelection = 1;
    redraw();
  });

  let button2 = createButton('RCP 4.5-6.0');
  button2.size(btnWidth, btnHeight);
  button2.style('background-color', 'orange');
  button2.style('font-weight', 'bold');
  button2.style('border-radius', '20px');
  button2.position((20+btnWidth)+20, btnTopMargin);
  button2.mousePressed(() => {
    btnSelection = 2;
    redraw();
  });
  
  let button3 = createButton('RCP 8.5');
  button3.size(btnWidth, btnHeight);
  button3.style('background-color', 'red');
  button3.style('color', 'white');
  button3.style('font-weight', 'bold');
  button3.style('border-radius', '20px');
  button3.position((20+btnWidth)*2+20, btnTopMargin);
  button3.mousePressed(() => {
    btnSelection = 3;
    redraw();
  });
  
  let button4 = createButton('Ukulele');
  button4.size(btnWidth, btnHeight);
  button4.style('background-color', 'aqua');
  button4.style('color', 'white');
  button4.style('font-weight', 'bold');
  button4.style('border-radius', '20px');
  button4.position((20+btnWidth)*3+20, btnTopMargin);
  button4.mousePressed(() => {
    if (song.isPlaying()) {
      song.stop();
    } else {
      song.play();
    }
  });
  
  
}

function draw() {
  if (btnSelection <= 1) {
    background('#FFCBCB');
    effortText();
    drawBattery();
    drawSun(550, 150, 50, 40, 15, 'yellow');
    drawIsland();
    // The sea water
    fill('aqua');
    quad(0, 600, 100, 550, 600, 550, 700, 600);
    image(renewableImg, 160, 180, 320, 200);
  } 
  else if (btnSelection == 2) {
    background('#FC7676');
    effortText();
    drawBattery();
    drawSun(550, 150, 60, 50, 25, '#FFA500');
    drawIsland();
    // The sea water
    fill('aqua');
    quad(0, 600, 120, 525, 580, 525, 700, 600);
    image(mixedEnergyImg, 160, 180, 320, 200);
  }
  else if (btnSelection == 3) {
    background('#D9381E');
    effortText();
    drawBattery();
    drawSun(550, 150, 70, 65, 30, '#FF2400');
    drawIsland();
    // The sea water
    fill('aqua');
    quad(0, 600, 130, 500, 540, 500, 700, 600);
    image(coalImg, 160, 180, 320, 200);
  }
  
}

function drawBattery() {
  stroke('black');
  fill('black');
  strokeWeight(7);
  rect(60, 180, 40, 20);
  rect(30, 200, 100, 200);
  fill('lime');
  rect(30, 200+200/3*2, 100, 200/3);
  if (btnSelection <=2) {
    fill('#ff8C00');
    rect(30, 200+200/3, 100, 200/3);
  }
  if (btnSelection <= 1) {
    fill('#FF4F00');
    rect(30, 200, 100, 200/3);
  }
}

function effortText() {
  fill('purple');
  textSize(45);
  text('Effort', 30, 110);
  text('Required', 30, 150);
}

function drawIsland() {
  fill('#C2B280');
  quad(100, 550, 200, 450, 400, 450, 600, 550);
  image(treeImg, 160, 400, 320, 90);
}



function drawSun(centerX, centerY, sunSize, radius, raySize, color) {
  noStroke();
  fill(color);
  ellipse(centerX, centerY, sunSize, sunSize);
  // Circles around the sun for shine. 
  noStroke();
  fill(color);
  
  for (let i=0; i<6; i++) {
    var x = centerX + radius * cos(angle+(PI*i/3));
    var y = centerY + radius * sin(angle+(PI*i/3));
    ellipse(x, y, raySize, raySize);
  }
  
  angle = angle + speed;

}