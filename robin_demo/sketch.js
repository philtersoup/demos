var data,input,but;
var q_idx = 1;
var dance_gif;

function preload(){

  data = loadJSON("/data.JSON");
  console.log(data);
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

  but = createButton("Next");
  but.size(width/8,height/16);
  but.style('font-size', '36');
  but.position(windowWidth/2 - but.width/2, windowHeight/2);
  but.mousePressed(update);
}

function draw() {
  background(42, 169, 217);
  if(dance_gif && q_idx == 3){
    dance_gif.show();
    input.hide();
    dance_gif.position(width/2 - dance_gif.width/2,windowHeight/2.5);
    but.position(width/2 - but.width/2, dance_gif.height+dance_gif.y*1.1);
    but.elt.innerHTML = "Finish";
  }
  for(var i = 0; i < 25; i++){
    for(var j = 0; j < 25; j++){
      noStroke();
      fill(160,100);
      ellipse(i * width/25, j * height/25, random(15,25),random(15,25));
    }
  }

  fill(255);
  textSize(48);

  noStroke();
  if(data){
    textAlign(CENTER);
    text(data.Questions[q_idx], width/2, height/3);
  }
}

function update(){
  input.elt.value = '';
  if(q_idx < 3) q_idx++;
  else window.open("https://www.google.com");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  input.size(250,50);
  input.position(width/2 - input.width/2, windowHeight/2 - 70);

  but.position(windowWidth/2 - but.width/2, windowHeight/2);
  but.size(100,25);
}
