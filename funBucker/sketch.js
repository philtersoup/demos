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
    mySound.setVolume(0.5);
    mySound.playMode('restart');
    mySound.state = 0;
    if(i<2)
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

    // button.doubleClicked(function(){
    //
    // console.log(id);
    // // playSound(id);
    // });

    button.mousePressed(function(){
    var id = this.elt.id;
    playSound(id);
    });
    buttonArray.push(button);
  }
// audioArray[0].setVolume(0.1);
// audioArray[0].play();
background(127);
}

function playSound(id){
  if(id>999) {
    i = id-1000;
    console.log(i)
    audioArray[i].jump(0,0.1);
    audioArray[i].play();
  }
  else {
    i = id;
    console.log(i)
    if(audioArray[i].isPlaying()){
      if(audioArray[i].canPause){
        audioArray[i].pause();
      }
      else {
        audioArray[i].stop();
      }
    }
    else {
      for(var j=0; j<6; j++){
        if (audioArray[j].isPlaying())
          audioArray[j].stop();
      }
      audioArray[i].play();
    }
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

function doubleClicked(){
  console.log('wha');
}
