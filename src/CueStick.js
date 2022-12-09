/**
 * CueStick class.
 *
 * Represents the cue stick in the game.
 */
class CueStick {
  static LENGTH = 500;

  /**
   * 
   * @param {PoolSystem} poolSys the system
   * @param {int} whiteBallIdx index that the white ball occurs in (should be 0!)
   */
  constructor(poolSys, whiteBallIdx = 0) {
    this.sys = poolSys;
    this.whiteBallIdx = whiteBallIdx;
  }

  /**
   * Displays the cue stick and hit vector.
   * @param {ParticleState} currentState current state vector of game
   * @param {float} mX mouseX
   * @param {float} mY mouseY
   */
  showCueVector(currentState, mX, mY) {
    const whiteBallPos = currentState.positions[this.whiteBallIdx];

    // Draw the dashed line in front of white ball.
    push();
    drawingContext.setLineDash([5, 15]);
    stroke(Colors.BLACK);
    strokeWeight(1);
    line(whiteBallPos.x, whiteBallPos.y, mX, mY);
    pop();

    // Draw the cue stick behind the white ball.
    push();
    const xDist = mX - whiteBallPos.x;
    const yDist = mY - whiteBallPos.y;
    const ballOffset = Vec(-xDist, -yDist).setMag(1.2 * Ball.RADIUS);
    const cue = Vec(xDist, yDist).setMag(CueStick.LENGTH);
    stroke(Colors.WOOD);
    strokeWeight(8);
    line(
      whiteBallPos.x + ballOffset.x,
      whiteBallPos.y + ballOffset.y,
      whiteBallPos.x - cue.x,
      whiteBallPos.y - cue.y
    );
    pop();
  }

  /**
   * Check if cue stick can be displayed.
   * @param {ParticleState} currentState current state vector of game
   * @param {float} mX mouseX
   * @param {float} mY mouseY
   * @returns {bool} true if cue can be shown, else false.
   */
  canShow(currentState, mX, mY) {
    const whiteBallVel = currentState.velocities[this.whiteBallIdx];
    const stationaryEpsilon = 0.05;
    return (
      // Ball is stationary.
      abs(whiteBallVel.x) < stationaryEpsilon &&
      abs(whiteBallVel.y) < stationaryEpsilon &&
      // Mouse within screen.
      0 < mX &&
      mX < Table.width &&
      0 < mY &&
      mY < Table.height
    );
  }

  /**
   * Calculates hit force and applies it to white ball.
   * @param {ParticleState} currentState current state vector of game
   * @param {float} mX mouseX
   * @param {float} mY mouseY
   */
  shoot(currentState, mX, mY) {
    const whiteBallPos = currentState.positions[this.whiteBallIdx];
    const xDist = mX - whiteBallPos.x;
    const yDist = mY - whiteBallPos.y;

    const force = Vec(xDist, yDist);
    this.sys.applyForce(this.whiteBallIdx, force);
  }
}
