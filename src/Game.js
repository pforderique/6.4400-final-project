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
    this.integrator = new Integrator();

    // Create a ball for every ball color we get.
    for (let idx = 0; idx < this.ballColors.length; idx++) {
      const pos = this.initialState.positions[idx];
      const color = this.ballColors[idx];

      this.balls.push(new Ball(pos, color));
    }
    print(this.balls);
    this.balls[0].show();
  }

  /**
   * Update Game state.
   * @param {float} deltaTime time elapsed
   */
  update(deltaTime) {
    // TODO: find next position of all balls and then handle collisions for each
    // int num_integrations = (int) (delta_time / step_size_);
    // if (num_integrations == 0) num_integrations = 1; // want to update at least once, imo
  
    // ParticleState new_state;
    // for (int count = 0; count < num_integrations; count++) {
    //   // Integrate each particle in the current_state_
    //   new_state = integrator_->Integrate(
    //     *system_, current_state_, current_time_, step_size_);
  
    //   for (int idx = 0; idx < new_state.positions.size(); idx++) {
    //     particle_node_ptrs_[idx]->GetTransform()
    //       .SetPosition(new_state.positions[idx]);
    //   }
    //   current_state_ = new_state;
    // }
  
    // current_time_ += (float) delta_time; // necessary? YES. (just not for simple.)
    throw new Error("Not Implemented.");
  }

  render() {
    this.balls.forEach(ball => ball.show());
  }
}
