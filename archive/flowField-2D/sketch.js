const capturer = new CCapture({
  framerate: 60,
  format: 'webm',
  name: 'flowField',
  quality: 100,
  verbose: true,
});

var points = [];
var speed;

var colors = [];
var makeCirc = 'F';
var particle = true;
var size = 4;
var full_canvas = true;

let p5Canvas;

function setup() {
  p5Canvas = createCanvas(1920, 1080);
  frameRate(60);
  background(30);
  angleMode(DEGREES);
  noiseDetail(1);

  [points, colors, speed] = genPoints();
}

function draw() {
  if (particle) {
    background(51);
  }
  // uncomment below for video capture
  //if (frameCount === 1) capturer.start();
  noStroke();
  fill(255);

  if (frameCount * 5 <= points.length) {
    var max = frameCount * 5;
  } else {
    var max = points.length;
  }

  for (var i = 0; i < max; i++) {
    var r = map(points[i].x * (1 - cos(i)), 0, width, colors[0], colors[1]);
    var g = map(points[i].y * sin(i), 0, height, colors[2], colors[3]);
    var b = map(points[i].y * cos(i), 0, width, colors[4], colors[5]);
    var alpha = map(
      dist(width / 2, height / 2, points[i].x, points[i].y),
      0,
      350,
      255,
      100
    );

    fill(r, g, b);

    var angle = map(noise(points[i].x * speed, points[i].y * speed), 0, 1, 0, 720);

    points[i].add(createVector(cos(angle), sin(angle)));

    if (makeCirc == 'F') {
      ellipse(points[i].x, points[i].y, size);
    } else {
      if (dist(width / 2, height / 2, points[i].x, points[i].y) < width / 2) {
        ellipse(points[i].x, points[i].y, size);
      }
    }
  }

  // uncomment below for video capture
  //capturer.capture(p5Canvas.canvas);
  if (frameCount === 1500) {
    noLoop();
    // uncomment below for video capture
    /* capturer.stop();
    capturer.save(); */
  }
}

function genPoints(seed) {
  randomSeed(seed);
  points = [];
  colors = [];

  var density = 500;
  var space = width / density;

  for (var x = 0; x < width; x += space) {
    for (var y = 0; y < height; y += space) {
      var p = createVector(x + random(-10, 10), y + random(-10, 10));
      points.push(p);
    }
  }

  shuffle(points, true);

  for (var c = 0; c < 6; c++) {
    colors.push(random(255));
  }

  speed = random(0.01, 0.05);
  return [points, colors, speed];
}
