// var x;
function setup(){
  createCanvas(window.innerWidth,window.innerHeight);
  var omniOsc = new Tone.OmniOscillator("C#4", "pwm").toMaster().start();
  // StartAudioContext(Tone.context, "#start")
  // x = document.createElement("BUTTON");

	//started


  // background(127,0);
}

function draw(){
  background(127);
  noStroke();
  fill(255,0,0);
  ellipse(width/2,height/2,300);
}

function mousePressed(){
  if(Tone.context.status != "running"){
    StartAudioContext(Tone.context);
  }
}
