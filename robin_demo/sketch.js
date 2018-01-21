var input,but,mainDiv;
var q_idx = 1;
var dance_gif;


var data = {
    "Questions": {
        "1": "What is your favourite colour?",
        "2": "What is your dream job?",
        "3": "To get the password, perform this dance for the whole cafe",
        "4": "--EMPTY--",
        "5": "--EMPTY--"
    }
};

function preload(){

  // data = loadJSON('data/data.JSON');

  dance_gif = createImg("https://media.giphy.com/media/xUNda2WPq6to9fmyIM/giphy.gif");
  dance_gif.hide();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);

  input = createInput();
  input.style('font-size', '36');
  input.size(width/2,height/16);
  input.position(width/2 - input.width/2, windowHeight/2 - windowHeight/10);

  but = createButton("Submit");
  but.size(width/6,height/16);
  but.style('font-size', '36');
  but.position(windowWidth/2 - but.width/2, windowHeight/2);
  but.mousePressed(update);
}

function draw() {
  background(3, 24, 141);
  if(dance_gif && q_idx == 3){
    dance_gif.show();
    input.position(width/2 - input.width/2, windowHeight - height/4.2);
    dance_gif.position(width/2 - dance_gif.width/2,windowHeight/3);
    but.position(width/2 - but.width/2, height - height/8);
    but.elt.innerHTML = "Password";
  }

  fill(255);
  textSize(windowWidth/22);

  noStroke();
  if(data){
    textAlign(CENTER);
    textLeading(60);
    text(data.Questions[q_idx], width/2, 1/16*height, width,  height);
  }
}

function update(){
  if(input.elt.value == ''){
    noStroke();
    textAlign(CENTER);
    textSize(24);
    text("You must answer the question before continuing",width/2,height/1.195);
    noLoop();
    return false;
  }
  else{

    loop();
    if(q_idx < 3) q_idx++;
    // else if(q_idx >=3 && input.elt.value != "mentos") text("Enter password",width/2,height/1.195);
    else if(q_idx >=3 && input.elt.value == "mentos") window.open("https://www.google.com");
    input.elt.value = '';
    noLoop();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if(q_idx>=3){
  input.position(width/2 - input.width/2, windowHeight - height/4.2);
  input.size(width/2,height/16);
  but.position(width/2 - but.width/2, height - height/8);
  but.size(width/6,height/16);
  but.style('font-size', width/36);
  }
  else{

    input.size(width/2,height/16);
    input.position(width/2 - input.width/2, windowHeight/2 - windowHeight/10);

    but.size(width/6,height/12);
    but.style('font-size', width/36);
    but.position(windowWidth/2 - but.width/2, windowHeight/2);
  }
}
