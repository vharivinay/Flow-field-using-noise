const capturer = new CCapture({
  framerate: 30,
  format: "gif",
  workersPath: "/libraries/",
  name: "flowField",
  quality: 100,
  verbose: true,
});

let points;
let speed;

let colors;
var makeCirc = "T";
var particle = true;
var size = 2;

let p5Canvas;

function setup() {
  p5Canvas = createCanvas(1280, 720);
  frameRate(60);
  background(30);
  angleMode(DEGREES);
  noiseDetail(random(1, 1000));
  translate(width / 2, height / 2);

  [points, colors, speed] = genPoints();
}

function draw() {
  // uncomment below for video capture
  if (frameCount === 1) capturer.start();
  if (particle) {
    background(30);
  }
  noStroke();
  fill(255);
  translate(width / 2, height / 2);

  if (frameCount * 10 <= points.length) {
    var max = frameCount * 10;
  } else {
    var max = points.length;
  }

  for (var i = 0; i < max; i++) {
    var r = map(
      points[i].x * (1 - cos(i)),
      -width / 2,
      width / 2,
      colors[0],
      colors[1]
    );
    var g = map(
      points[i].y * sin(i),
      -height / 2,
      height / 2,
      colors[2],
      colors[3]
    );
    var b = map(
      points[i].y * cos(i),
      -width / 2,
      width / 2,
      colors[4],
      colors[5]
    );
    var alpha = map(
      dist(width / 2, height / 2, points[i].x, points[i].y),
      0,
      350,
      255,
      100
    );

    fill(r, g, b);

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
      if (dist(0, 0, points[i].x, points[i].y) > width / 6.1) {
        ellipse(points[i].x, points[i].y, size);
      }
    }
  }

  // uncomment below for video capture
  capturer.capture(p5Canvas.canvas);
  if (frameCount % 100 === 0) {
    if (frameCount === 1800) {
      noLoop();
      // uncomment below for video capture
      capturer.stop();
      capturer.save();
    }
    [points, colors, speed] = genPoints(random(1, 10));
    noiseDetail(random(1, 1000));
    if (frameCount > 600) {
      particle = false;
      size = 1;
      background(30);
    }
    if (frameCount > 1200) {
      makeCirc = "F";
    }

    redraw();
  }
  console.log(frameCount);
}
function genPoints(seed) {
  randomSeed(seed);
  points = [];
  colors = [];

  var density = 500;
  var space = width / density;

  for (var x = -width / 2; x < width / 2; x += space) {
    for (var y = -height / 2; y < height / 2; y += space) {
      distance = abs(dist(0, 0, x, y));
      if (distance < width / 6 && distance > width / 6.1) {
        var p = createVector(x + random(-10, 10), y + random(-10, 10));
        points.push(p);
      }
    }
  }
  shuffle(points, true);

  for (var c = 0; c < 6; c++) {
    colors.push(random(255));
  }

  speed = random(0.01, 0.05);
  return [points, colors, speed];
}
