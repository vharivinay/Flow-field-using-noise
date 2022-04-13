let button, record, clr;
let path, sizeSlider, densitySlider, angleSlider, noiseControl;

function setupUI() {
  // Normal Buttons
  button = select('#toggleLoop');
  button.mousePressed(toggleLoop);
  record = select('#record');
  record.mousePressed(toggleRecord);
  snap = select('#saveFrame');
  snap.mousePressed(saveImage);

  // Radio Buttons
  path = document.getElementsByName('path');
  coloring = document.getElementsByName('coloring');

  // Sliders
  numParticles = select('#numParticles');
  numParticles.changed(initSketch);
  sizeSlider = select('#size');
  sizeSlider.changed(initSketch);
  speedSlider = select('#speed');
  speedSlider.changed(initSketch);
  noiseScale = select('#noiseScale');
  noiseScale.changed(initSketch);
  noiseStrength = select('#noiseStrength');
  noiseStrength.changed(initSketch);
}

function toggleLoop() {
  if (isLoop) {
    noLoop();
    isLoop = false;
  } else {
    loop();
    isLoop = true;
  }
}

function toggleRecord() {
  if (isRecording) {
    isRecording = false;
    save = true;
  } else {
    isRecording = true;
    save = false;
  }
}

function clearCanvas() {
  clear();
  background(51);
}

function numOfParticles() {
  let diff;
  if (points.length > numParticles.value()) {
    diff = points.length - numParticles.value();
    points.splice(0, diff);
  } else if (points.length < numParticles.value()) {
    diff = numParticles.value() - points.length;
    for (let i = 0; i < diff; i++) {
      var x = random(width);
      var y = random(height);
      var color = coloringMethod(x, y);
      points.push(new Particle(x, y, color));
    }
  }
}

function saveImage() {
  if (!isLoop) {
    toggleLoop();
    captureFrame();
    toggleLoop();
  } else {
    captureFrame();
  }
}

function captureFrame() {
  filename =
    'flowField_' + str(year()) + str(month() + day() + hour() + minute() + second());
  saveCanvas(filename, 'PNG');
}
 
