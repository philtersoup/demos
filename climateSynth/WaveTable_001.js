// var real = new Float32Array(128);
// var img = new Float32Array(128);
var dataset = {};
var globalTemp_wavTB = [];
var scaleNo = 2;
var scales = [
  [0, 2, 4, 5, 7, 9, 11],
  [0,2,4,7,11,12],
  [0,2,3,5,7,8,10]

];

var counter = 5;

var ac,waveOsc1,waveOsc2,waveOsc3,lpf,verb,delay;
var analyser, bufferLength, dataArray;
var part;

function setup() {
  createCanvas(windowWidth,windowHeight);
  ac = getAudioContext();
  analyser = ac.createAnalyser();
  //analyser.connect(ac.destination);
  analyser.fftSize = 2048;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  lpf = new p5.LowPass();
  lpf.freq(500);
  lpf.amp(0.21);
  lpf.disconnect();
  lpf.connect(analyser);

  verb = new p5.Reverb();

  verb.process(lpf,3,1);
  verb.drywet(0.75);

  delay = new p5.Delay();
  delay.setType('pingpong');
  delay.process(lpf,0.7,0.5);
  delay.drywet(0.5);

  part = new p5.Part(16);
  part.onStep(randomise);
  part.setBPM(70);

  waveOsc1 = new wtOscillator('JSON/globalTemperature.json',32);
  waveOsc2 = new wtOscillator('JSON/CO2.json',64);
  waveOsc3 = new wtOscillator('JSON/seaIce.json',64);
  // waveOsc3 = new wtOscillator('/JSON/Antarctic_Ice.json');

  waveOsc1.gain.gain.setvalue = 0.1;

  waveOsc2.gain.disconnect();
  waveOsc2.gain.connect(waveOsc1.osc.frequency);
  waveOsc2.osc.connect(lpf.biquad.frequency);
  // waveOsc2.osc.frequency.value = 1;
  // waveOsc2.gain.gain.value = 1500;

  // waveOsc3.gain.disconnect();
  // waveOsc2.gain.connect(waveOsc3.osc.frequency);
  // waveOsc3.gain.connect(waveOsc1.gain.gain);
  waveOsc3.gain.gain.setValue = 5;
  waveOsc3.gain.connect(waveOsc2.osc.frequency);

  // waveOsc3.gain.connect(waveOsc3.gain.gain);


}

function draw() {


  // fill(255);
  textSize(40);
  text('WaveTable Demo',width/2,height/2);


  analyser.getByteFrequencyData(dataArray);

  background(dataArray[40]/5,20);
  // noFill();
  // beginShape();
  // stroke(255,0,0); // waveform is red
  // strokeWeight(1);
  // for (var i = 0; i< dataArray.length; i++){
  //   var x = map(i, 0, dataArray.length, 0, width*8);
  //   var y = map( dataArray[i], 0, 128, height, height/3);
  //   vertex(x,y);
  //   // fill(dataArray[i]);
  //   // rect(x,y,width/dataArray.length,height);
  // }
  // endShape();

  for(var i = 0; i < 15; i++){
    noStroke();
    fill(dataArray[(i)*40]/2)
    rect(0,height/(i),width,height/i);
  }

  var index = floor((2.71828/3* mouseX/width * scales[scaleNo].length));
  var note = 12 + 12 * floor(2 + (mouseY/height))+scales[scaleNo][index];

  waveOsc2.gain.gain.value = 3000 * (mouseY+1)/height;
  waveOsc1.update(midiToFreq(note + 12));
  waveOsc2.update(midiToFreq( + note + 7 )*counter);
  // waveOsc3.update(midiToFreq(note -24 ));
  // waveOsc2.gain.gain.value = 2000 * mouseX/width;
  // waveOsc3.update(midiToFreq(-12 + note + 7));
  part.start();

}


function wtOscillator(dataSource,len){

  //create a new Oscillator & dataSet
  this.osc = ac.createOscillator();
  this.gain = ac.createGain();
  this.buflen = len;
  this.gain.connect(lpf);

  // this.osc.connect(this.gain);

  this.data = [];

  var that = this;  //for scope issues

  loadJSON(dataSource,function(data){
      for(var k in data) {
      //  globalTemp_wavTB.push(dataset.global_temp[k].normz)

      that.data.push(data[k].val2);
      // console.log(data[k].normz);
      }
    // console.log(that.data.length)
    var real = new Float32Array(that.buflen), img = new Float32Array(that.buflen);
    // console.log(real,img);
    for(var i = 0; i < that.buflen; i++){
        real[i] = that.data[i];
        img[i] = 0;
        // console.log(that.data[i]);
      }
      console.log(real,img);
    var wave = ac.createPeriodicWave(real,img,{disableNormalization: true});
    that.osc.setPeriodicWave(wave);
    that.osc.connect(that.gain);
    // that.gain.connect(lpf);
    // waveOsc1.connect(analyser);
    //waveOsc1.amp(0.35);
    // that.osc.frequency.value = 120;
    that.osc.start();
   }
  );
}

wtOscillator.prototype.update = function(freq){
    this.osc.frequency.value = freq;
}

function randomise(){
  counter = Math.floor(random(1,5));
  // console.log(counter);

}
