const capturer = new CCapture({
  framerate: 60,
  format: "webm",
  name: "flowField",
  quality: 100,
  verbose: true,
});

var points = [];
var speed;

var colors = [];
var makeCirc = "F";

let p5Canvas;

function setup() {
  p5Canvas = createCanvas(900, 900);
  frameRate(60);
  background(30);
  angleMode(DEGREES);
  noiseDetail(1);

  var density = 100;
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

  //speed = random(0.005, 0.01);
  speed = 0.02;
}

function draw() {
  if (frameCount === 1) capturer.start();
  noStroke();
  fill(255);

  if (frameCount * 2 <= points.length) {
    var max = frameCount * 2;
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

    fill(r, g, b, alpha);

    var angle = map(
      noise(points[i].x * speed, points[i].y * speed),
      0,
      1,
      0,
      720
    );

    points[i].add(createVector(cos(angle), sin(angle)));

    if (makeCirc == "F") {
      ellipse(points[i].x, points[i].y, 1);
    } else {
      if (dist(width / 2, height / 2, points[i].x, points[i].y) < width / 2) {
        ellipse(points[i].x, points[i].y, 1);
      }
    }
  }

  capturer.capture(p5Canvas.canvas);
  if (frameCount === 1000) {
    noLoop();
    capturer.stop();
    capturer.save();
  }
}

/* function mouseClicked() {
  title = "flowField" + str(frameCount);
  saveCanvas(title, "png");
} */
