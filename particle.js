class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = random(1, 4 * sizeSlider.value());
    this.speed = random(-speedSlider.value(), speedSlider.value());
    this.color = color;
    this.len = 64;
  }

  updateStatic() {
    var theta =
      noise(this.x / noiseScale.value(), this.y / noiseScale.value()) *
      noiseStrength.value();
    this.x += cos(theta) * this.speed;
    this.y += sin(theta) * this.speed;
    vertex(this.x, this.y);
  }

  displayStatic() {
    noFill();
    strokeWeight(this.size);
    stroke(this.color);
    beginShape();
    for (let i = 0; i < this.len * speedSlider.value(); i++) {
      var theta =
        noise(this.x / noiseScale.value(), this.y / noiseScale.value()) *
        noiseStrength.value();
      this.x += cos(theta) * this.speed;
      this.y += sin(theta) * this.speed;
      vertex(this.x, this.y);
    }
    endShape();
  }

  show() {
    strokeWeight(this.size);
    stroke(this.color);
    point(this.x, this.y);
  }

  update() {
    var theta =
      noise(this.x / noiseScale.value(), this.y / noiseScale.value()) *
      noiseStrength.value();
    this.x += cos(theta) * this.speed;
    this.y += sin(theta) * this.speed;
  }
}
