var clock, reset, amplitude, fft;
var clockF, resetD;

function setup() {
  createCanvas(windowWidth, windowHeight);

  clock = new p5.Oscillator();
  clock.setType('square');

  reset = new p5.Oscillator();
  reset.setType('square');

  amplitude = new p5.Amplitude();
  amplitude.toggleNormalize(false);

  clockF = 2.0;
  resetD = 4;

  clock.freq(clockF);
  clock.pan(-1);
  clock.amp(1);

  reset.freq(clockF/resetD);
  reset.pan(1);
  reset.amp(1);

  clock.start();
  reset.start();

  fft = new p5.FFT();
}

function draw() {
  background(0,30);
  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
}
