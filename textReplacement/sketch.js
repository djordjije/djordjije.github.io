let source_text = 'Hello, it\'s me \nI was wondering if after all these years you\'d like to meet \nTo go over everything \nThey say that time\'s supposed to heal ya \nBut I ain\'t done much healing \nHello, can you hear me? \nI\'m in California dreaming about who we used to be \nWhen we were younger and free \nI\'ve forgotten how it felt before the world fell at our feet \nThere\'s such a difference between us \nAnd a million miles \nHello from the other side \nI must\'ve called a thousand times \nTo tell you I\'m sorry for everything that I\'ve done \nBut when I call, you never seem to be home';
let search_word = "Hello"
let replace_word = "Goodbye"

function setup() {
  createCanvas(640, 600);
  fill(240, 130, 50);
  textSize(24);
  textFont("Helvetica");
  //source_text = source_text.toUpperCase();
}

// My group decided to take the Adele lyrics for the "Hello" song.
// We thought it was cool to change the word Hello to Goodbye which 
// would make the song a bit interesting as the word doesn't match the
// lyrics. We also changed the font and color.

function draw() {
  background(255);
  var new_text = source_text.replaceAll(search_word, replace_word);
  var show_text; 

  if(mouseIsPressed){
    show_text = new_text;
  } else {
    show_text = source_text; 
  }
  text(show_text, 10, 10, width * 0.9);
}