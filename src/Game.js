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
  integrator = null;
  poolSystem = null;
  stepSize = null;

  /**
   *
   * @param {ParticleState} state initial state of all game balls.
   * @param {Colors[]}} ballcolors array of colors to paint the game balls.
   * @param {float} stepsize step size to use when integrating.
   */
  constructor(state, ballcolors, stepsize) {
    if (state.positions.length != ballcolors.length) this.currentState = state;
    this.stepSize = stepsize;
  }

  /**
   * Update Game state.
   * @param {float} deltaTime time elapsed
   */
  update(deltaTime) {
    // TODO: find next position of all balls and then handle collisions for each
    throw new Error("Not Implemented.");
  }
}
