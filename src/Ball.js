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
   * @param {BallTypes} ball_type type of ball
   */
  constructor(pos, number, color = null, ball_type = null) {
    this.position = pos;
    this.number = number;
    this.color = color ? color : Colors.WHITE; // Defaults to white ball.
    this.ball_type = ball_type ? ball_type : BallTypes.CUE; // Defaults to white ball.
  }

  /**
   * @returns {string | bool} "top", "bottom", "left", "right",
   *  or false depending on intersection.
   */
  intersectTable() {
    if (this.position.y - Ball.RADIUS < 0 + Table.edge) return "top";
    if (this.position.y + Ball.RADIUS > Table.height + Table.edge) return "bottom";
    if (this.position.x - Ball.RADIUS < 0 + Table.edge) return "left";
    if (this.position.x + Ball.RADIUS > Table.width + Table.edge) return "right";
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
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, Ball.RADIUS * 2);
    
    if (this.number == 0)
      return;

    fill(Colors.WHITE);
    if (this.ball_type == BallTypes.STRIPE) {
      arc(this.position.x, this.position.y, Ball.RADIUS * 2, Ball.RADIUS * 2, PI + (PI / 4), PI + (3 * PI / 4), CHORD);
      arc(this.position.x, this.position.y, Ball.RADIUS * 2, Ball.RADIUS * 2, PI / 4, 3 * PI / 4, CHORD);
    }
    ellipse(this.position.x, this.position.y, Ball.RADIUS);
  
    fill(Colors.BLACK);
    textSize(10);
    textAlign(CENTER, CENTER);
    text(this.number, this.position.x, this.position.y);
  }
}
