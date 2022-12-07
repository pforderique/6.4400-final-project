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

    // Hardcoding the holes to where they should be.
    // TODO: Make this dynamic.
    this.holes.push(new Hole(createVector(0, 0)));
    this.holes.push(new Hole(createVector(Table.width, 0)));
    this.holes.push(new Hole(createVector(0, Table.height / 2)));
    this.holes.push(new Hole(createVector(Table.width, Table.height / 2)));
    this.holes.push(new Hole(createVector(0, Table.height)));
    this.holes.push(new Hole(createVector(Table.width, Table.height)));


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
      for (let j = i + 1; j < this.balls.length; j++) {
        const ball2 = this.balls[j];
        if (ball1.intersectBall(ball2)) {
          // TODO: Calculate new velocity vectors for both balls.
          //  https://www.gamedeveloper.com/programming/physics-on-the-back-of-a-cocktail-napkin
          //  http://www.physics.usyd.edu.au/~cross/Billiards.htm
          print("intersection!");
        }
      }
    }

    // Handle collisions with holes.
    for (let i = 0; i < this.balls.length; i++) {
      const ball = this.balls[i];
      for (let j = 0; j < this.holes.length; j++) {
        const hole = this.holes[j];
        if (hole.intersectBall(ball)) {
          // TODO: Correct the removal logic and handle what happens when the white ball falls
          // this.balls.splice(i, 1);
          // new_state.positions.splice(i, 1);
          // new_state.velocities.splice(i, 1);

          // TODO: Trigger some game mechanic.
          print("in hole!");
          break;
        }
      }
    }

    for (let idx = 0; idx < new_state.positions.length; idx++) {
      this.balls[idx].position = new_state.positions[idx];
    }
    this.currentState = new_state;
  }

  render() {
    this.holes.forEach((hole) => hole.show());
    this.balls.forEach((ball) => ball.show());
  }
}
