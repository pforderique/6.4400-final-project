/**
 * CueStick class.
 *
 * Represents the cue stick in the game.
 */
class CueStick {
  constructor(poolSys, whiteBallIdx) {
    this.sys = poolSys;
    this.whiteBallIdx = whiteBallIdx;
  }

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
    const ballOffset = createVector(-xDist, -yDist).setMag(1.2 * Ball.RADIUS);
    const cue = createVector(xDist, yDist).setMag(Table.cueLength);
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

  shoot(currentState, mX, mY) {
    const whiteBallPos = currentState.positions[this.whiteBallIdx];
    const xDist = mX - whiteBallPos.x;
    const yDist = mY - whiteBallPos.y;

    const force = createVector(xDist, yDist);
    this.sys.applyForce(this.whiteBallIdx, force);
  }
}
