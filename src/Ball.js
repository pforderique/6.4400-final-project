/**
 * Ball class
 *
 * Holds internal position of the ball
 */
class Ball {
  static RADIUS = 15;
  static MASS = 1;

  position = null;

  /**
   *
   * @param {Vector} pos position vector
   * @param {Color} color ball color
   */
  constructor(pos, color = null, texture = null) {
    this.position = pos;
    this.color = color ? color : Colors.WHITE; // Defaults to white ball.
    // TODO: take in an optional texture to render instead of a plain color ?
    //  https://p5js.org/reference/#/p5/texture ?
  }

  /**
   * @returns {string | bool} "top", "bottom", "left", "right",
   *  or false depending on intersection.
   */
  intersectTable() {
    if (this.position.y - Ball.RADIUS < 0) return "top";
    if (this.position.y + Ball.RADIUS > Table.height) return "bottom";
    if (this.position.x - Ball.RADIUS < 0) return "left";
    if (this.position.x + Ball.RADIUS > Table.width) return "right";
    return false;
  }

  /**
   * Checks if there's an intersection with another ball.
   * @param {Ball} other other ball
   * @returns {bool} true if intersection exists, else false
   */
  intersectBall(other) {
    const centersDist = dist(
      this.position.x,
      this.position.y,
      other.position.x,
      other.position.y
    );
    return centersDist < 2 * Ball.RADIUS;
  }

  /**
   * Show ball at its current position.
   */
  show() {
    drawingContext.setLineDash([]); // Set line to solid line.
    fill(this.color);
    ellipse(this.position.x, this.position.y, Ball.RADIUS * 2);
  }
}
