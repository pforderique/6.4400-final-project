/**
 * Ball class
 *
 * Holds internal position of the ball
 */
class Ball {
  static RADIUS = 10;
  static MASS = 1;

  position = null;

  /**
   * 
   * @param {Vector} pos position vector
   * @param {Colors} color ball color
   */
  constructor(pos, color = null) {
    this.position = pos;
    this.color = color ? color : Colors.WHITE; // Defaults to white ball.
  }

  /**
   * Show ball at its current position.
   */
  show() {
    fill(this.color);
    ellipse(this.position.x, this.position.y, RADIUS);
  }
}
