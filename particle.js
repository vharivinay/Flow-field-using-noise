 
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = random(1, 4 * sizeSlider.value());
    this.speed = random(-speedSlider.value(), speedSlider.value());
    this.color = color;
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
