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
  currentTime = 0;
  integrator = null;
  poolSystem = null;

  /**
   *
   * @param {ParticleState} initState initial state of all game balls.
   * @param {Colors[]}} ballcolors array of colors to paint the game balls.
   * @param {float} stepsize step size to use when integrating.
   */
  constructor(initState, ballcolors, stepsize) {
    if (initState.positions.length != ballcolors.length) {
      throw new Error("Ball color array size must match state vector sizes.");
    }
    this.initialState = initState.copy();
    this.currentState = initState.copy();
    this.ballColors = ballcolors;
    this.stepSize = stepsize;

    // Hardcoded settings.
    this.poolSystem = new PoolSystem();

    // Create a ball for every ball color we get.
    for (let idx = 0; idx < this.ballColors.length; idx++) {
      const pos = this.initialState.positions[idx];
      const color = this.ballColors[idx];

      this.balls.push(new Ball(pos, color));
    }
  }

  /**
   * Update Game state.
   * @param {float} deltaTime time elapsed
   */
  update(deltaTime) {
    // TODO: find next position of all balls and then handle collisions for each

    // Integrate each particle in the current state.
    let new_state = Integrator.integrate(
      this.poolSystem, this.currentState, this.stepSize);

    for (let idx = 0; idx < new_state.positions.length; idx++) {
      this.balls[idx].position = new_state.positions[idx];
    }
    this.currentState = new_state;
  
  }

  render() {
    this.balls.forEach(ball => ball.show());
  }
}
