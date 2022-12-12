/**
 * Game class
 *
 * Holds the current state of the game and responsible for calling integrator on
 * the poolSystem and updating the physical balls positions and handling
 * ball on ball and ball on table collisions.
 */
class Game {
  // game variables
  initialState = null;
  currentState = null;
  ballColors = null;
  stepSize = null;

  balls = [];
  holes = [];
  whiteBallIdx = 0;
  currentTime = 0;
  integrator = null;
  poolSystem = null;
  cueStick = null;
  needWhiteBall = null;

  /**
   *
   * @param {ParticleState} initState initial state of all game balls.
   * @param {Colors[]} ballcolors array of colors to paint the game balls.
   *  White ball MUST be the first color.
   * @param {float} stepsize step size to use when integrating.
   */
  constructor(initState, ballcolors, stepsize) {
    if (initState.positions.length != ballcolors.length)
      throw new Error("Ball color array size must match state vector sizes.");

    if (!ballcolors.length || ballcolors[0] !== Colors.WHITE)
      throw new Error("White ball MUST be the first color in `ballColors`.");

    this.initialState = initState.copy();
    this.currentState = initState.copy();
    this.ballColors = ballcolors;
    this.stepSize = stepsize;

    // Create a ball for every ball color we get.
    for (let idx = 0; idx < this.ballColors.length; idx++) {
      const pos = this.initialState.positions[idx];
      const color = this.ballColors[idx];

      this.balls.push(new Ball(pos, color));
    }
    
    // A boolean to keep track if we need a white ball.
    this.needWhiteBall = false;

    // Hardcoding the holes to where they should be.
    this.addHoles();

    // Hardcoded settings.
    this.poolSystem = new PoolSystem(this.ballColors.length);
    this.cueStick = new CueStick(this.poolSystem, 0);
  }

  /**
   * Update Game state.
   * @param {float} deltaTime time elapsed
   */
  update(deltaTime) {
    // Integrate each particle in the current state.
    let new_state = Integrator.integrate(
      this.poolSystem,
      this.currentState,
      this.stepSize
    );

    // Handle table intersection.
    const hitDamp = 0.8; // How much energy is "retained" after collision [0, 1]
    for (let idx = 0; idx < this.balls.length; idx++) {
      const ball = this.balls[idx];
      const pos = new_state.positions[idx];
      const vel = new_state.velocities[idx];
      const tableIntersection = ball.intersectTable();

      if (!tableIntersection) continue;

      if (tableIntersection === "left") {
        pos.x = Ball.RADIUS; // Clamp the x position.
        vel.x *= -hitDamp; // Negate x dir for perfect reflection.
      } else if (tableIntersection === "right") {
        pos.x = Table.width - Ball.RADIUS;
        vel.x *= -hitDamp;
      } else if (tableIntersection === "top") {
        pos.y = Ball.RADIUS; // Clamp the y position.
        vel.y *= -hitDamp; // Negate y dir for perfect reflection.
      } else if (tableIntersection === "bottom") {
        pos.y = Table.height - Ball.RADIUS;
        vel.y *= -hitDamp;
      }
    }

    // Handle ball on ball intersection.
    for (let i = 0; i < this.balls.length; i++) {
      const ball1 = this.balls[i];
      const x1 = new_state.positions[i];
      const v1 = new_state.velocities[i];
      for (let j = i + 1; j < this.balls.length; j++) {
        const ball2 = this.balls[j];
        const x2 = new_state.positions[j];
        const v2 = new_state.velocities[j];

        if (ball1.intersectBall(ball2)) {
          const normal = ball2.position.copy().sub(ball1.position).normalize();
          const tangent = Vec(-normal.y, normal.x).normalize();

          const v1_final = normal
            .copy()
            .mult(normal.copy().dot(v2.copy()))
            .add(tangent.copy().mult(tangent.copy().dot(v1.copy())));

          const v2_final = normal
            .copy()
            .mult(normal.copy().dot(v1.copy()))
            .add(tangent.copy().mult(tangent.copy().dot(v2.copy())));

          [v1.x, v1.y] = [v1_final.x, v1_final.y];
          [v2.x, v2.y] = [v2_final.x, v2_final.y];

          // Forward update the positions so there's not a duplicate collision.
          x1.x += v1.x;
          x1.y += v1.y;
          x2.x += v2.x;
          x2.y += v2.y;
        }
      }
    }

    // Handle collisions with holes.
    for (let i = 0; i < this.balls.length; i++) {
      const ball = this.balls[i];
      for (let j = 0; j < this.holes.length; j++) {
        const hole = this.holes[j];
        if (hole.intersectBall(ball)) {
          this.balls.splice(i, 1);
          new_state.positions.splice(i, 1);
          new_state.velocities.splice(i, 1);
          this.poolSystem.appliedForces.splice(i, 1);

          if (i === this.whiteBallIdx) {
            // 0th ball index is alway the white ball.
            // Handles what happens when the white ball falls
            this.needWhiteBall = true;
            // TODO: General, but add user interface to give update on game state
            
            // TODO: Trigger some game mechanic.
            print("in hole!");
          }
          break;
        }
      }
    }

    for (let idx = new_state.positions.length - 1; idx >= 0; idx--) {
      this.balls[idx].position = new_state.positions[idx];
    }
    this.currentState = new_state;
  }

  /**
   * Shows the outline of the white ball to be placed.
   * @param {float} mX mouseX
   * @param {float} mY mouseY
   */
  showBallOutline(mX, mY) {
    drawingContext.setLineDash([5, 5]); // Set line to dotted line.
    noFill();
    ellipse(mX, mY, Ball.RADIUS * 2);
  }

  /**
   * Check to see if the ball can be placed without intersecting other balls.
   * @param {float} mX mouseX
   * @param {float} mY mouseY
   * @returns {bool} true if the ball can be placed, else false.
  */
  canPlaceBall(mX, mY) {
    // Handle collisions with holes.
    if (0 < mX &&
        mX < Table.width &&
        0 < mY &&
        mY < Table.height){
        for (let i = 0; i < this.balls.length; i++) {
          const centersDist = dist(mX, mY, this.balls[i].position.x, this.balls[i].position.y);
          if (centersDist < 2 * Ball.RADIUS)
            return false;
        }
        for (let i = 0; i < this.holes.length; i++) {
          const centersDist = dist(mX, mY, this.holes[i].position.x, this.holes[i].position.y);
          if (centersDist < 2 * Hole.RADIUS)
            return false;
        }
        return true;
    }
    return false;
  }

  /**
   * Replace the missing white ball at the correct location.
   * @param {float} mX mouseX
   * @param {float} mY mouseY
   */
  placeWhiteBall(mX, mY) {
    const pos = Vec(mX, mY);
    const color = this.ballColors[this.whiteBallIdx];
  
    // Place the new white ball back to where the original ball was in the array.
    this.balls.splice(this.whiteBallIdx, 0, new Ball(pos, color));
    this.currentState.positions.splice(this.whiteBallIdx, 0, pos);
    this.currentState.velocities.splice(this.whiteBallIdx, 0, Vec(0, 0));
    this.poolSystem.appliedForces.splice(this.whiteBallIdx, 0, Vec(0, 0));
    this.cueStick = new CueStick(this.poolSystem, this.whiteBallIdx);

    this.needWhiteBall = false; // Reset the boolean so the game can unfreeze.
  }

  addHoles() {
    // TODO: Make this dynamic.
    const holeOffset = 5;
    this.holes.push(new Hole(Vec(0 + holeOffset, 0 + holeOffset))); // Top left
    this.holes.push(new Hole(Vec(Table.width - holeOffset, 0 + holeOffset))); // Top right
    this.holes.push(new Hole(Vec(0 - holeOffset, Table.height / 2))); // Middle Left
    this.holes.push(new Hole(Vec(Table.width, Table.height / 2))); // Middle Right
    this.holes.push(new Hole(Vec(0 + holeOffset, Table.height - holeOffset))); // Bottom Left
    this.holes.push(
      new Hole(Vec(Table.width - holeOffset, Table.height - holeOffset))
    ); // Bottom Right
  }

  render() {
    this.holes.forEach((hole) => hole.show());
    this.balls.forEach((ball) => ball.show());
  }
}
