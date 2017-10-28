var buttonArray;
var audioArray;

var playing;


function preload(){
  audioArray = [];
  loadFiles();

}

function loadFiles(){
  for(var i = 0; i<6; i++){
    mySound = loadSound('audio/'+ (i+1) +'.mp3');
    mySound.setVolume(0.1);
    mySound.playMode('restart');
    if(i<4)
      mySound.canPause = false;
    else {
      mySound.canPause = true;
    }
    audioArray.push(mySound);
  }


}
function setup() {

buttonArray = [];
var col = color(0,0);

createCanvas(windowWidth,windowHeight);

for(var i = 0; i<6; i++){

  var button = createButton("Sound "+(i+1));
  button.style("background-color", col);
  button.id(i);
  button.position(i * width/6 , height/2);
  button.mousePressed(function(i){
  var id = this.elt.id;

  playSound(id);

  });

  buttonArray.push(button);
}
// audioArray[0].setVolume(0.1);
// audioArray[0].play();
background(127);
}

function playSound(i){

  // playing = true;

  for(var j = 0; j<6 ; j++){
      // console.log(audioArray[j].isPlaying(),playing);
      if(audioArray[j].isPlaying()){
        playing = true;
        if(audioArray[j].canPause || j == 2) audioArray[j].pause();
        break;

      }
      else playing = false;

  }
  if(playing==false){
    audioArray[i].play();
    playing = true;
    }
}

function draw(){

}

function keyPressed() {
  // console.log(keyCode);
  switch(keyCode){

    case 90:
    playSound(0);
    break;

    case 88:
    playSound(1);
    break;

    case 67:
    playSound(2);
    break;

    case 86:
    playSound(3);
    break;

    case 66:
    playSound(4);
    break;

    case 78:
    playSound(5);
    break;


  }
}
