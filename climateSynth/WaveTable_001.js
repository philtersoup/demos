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

var ac,waveOsc1,waveOsc2,waveOsc3,lpf;
var analyser, bufferLength, dataArray;

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
  lpf.connect(analyser);

  waveOsc1 = new wtOscillator('/libraries/Global_Temperature.json');
  waveOsc2 = new wtOscillator('/libraries/CO2_Emissions.json');
  // waveOsc3 = new wtOscillator('/JSON/Antarctic_Ice.json');

  waveOsc2.gain.disconnect();
  waveOsc2.gain.connect(waveOsc1.osc.frequency);
  waveOsc2.osc.frequency.value = 1;
  waveOsc2.gain.gain.value = 15000;


}

function draw() {
  background(0,20);

  // fill(255);
  textSize(40);
  text('WaveTable Demo',width/2,height/2);


  analyser.getByteFrequencyData(dataArray);

  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< dataArray.length; i++){
    var x = map(i, 0, dataArray.length, 0, width*8);
    var y = map( dataArray[i], 0, 128, height/2, height/4);
    vertex(x,y);
  }
  endShape();

  var index = floor((2.71828/3* mouseX/width * scales[scaleNo].length));
  var note = 12 + 12 * floor(2 + (mouseY/height))+scales[scaleNo][index];

  waveOsc2.gain.gain.value = 15000 * mouseY/height;
  waveOsc1.update(midiToFreq(note + 12));
  waveOsc2.update(midiToFreq(note + 7 ));
  // waveOsc3.update(midiToFreq(-12 + note + 7));

}


function wtOscillator(dataSource){

  //create a new Oscillator & dataSet
  this.osc = ac.createOscillator();
  this.gain = ac.createGain();
  this.gain.connect(lpf);

  // this.osc.connect(this.gain);

  this.data = [];

  var that = this;  //for scope issues

  loadJSON(dataSource,function(data){
  // dataset.global_temp = data;

    for(var k in data) {
      //  globalTemp_wavTB.push(dataset.global_temp[k].normz)

      that.data.push(data[k].normz);
      // console.log(data[k].normz);
      }
    var real = [], img = [];
    for(var i = 0; i < 32; i++){
        real[i] = that.data[i];
        img[i] = 0;
      }
    var wave = ac.createPeriodicWave(real,img);
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
