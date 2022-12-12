/**
 * Hole class
 *
 * Represents a hole on the table
 */
class Hole {
  static RADIUS = 25;

  position = null;

  /**
   *
   * @param {Vector} pos position vector
   */
  constructor(pos, color = null) {
    this.position = pos;
    this.color = color ? color : Colors.BLACK; // Defaults to a black color.
  }

  /**
   * Checks if there's an intersection with a ball.
   * @param {Ball} ball ball
   * @returns {bool} true if intersection exists, else false
   */
  intersectBall(ball) {
    const centersDist = dist(
      this.position.x,
      this.position.y,
      ball.position.x,
      ball.position.y
    );
    return centersDist < 2 * Ball.RADIUS;
  }

  /**
   * Show hole at its current position.
   */
  show() {
    drawingContext.setLineDash([]); // Set line to solid line.
    fill(this.color);
    ellipse(this.position.x, this.position.y, Hole.RADIUS * 2);
  }
}
