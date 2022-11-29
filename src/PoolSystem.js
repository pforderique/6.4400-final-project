const { Vector } = require("../../../../../../.vscode/extensions/samplavigne.p5-vscode-1.2.12/p5types");

/**
 * PoolSystem class
 *
 * Contains the method for calculting the Time Derivative given the system.
 */
class PoolSystem {
  /**
   * Computes the dertivative (with all the forces) of the system.
   * Does not take into account collisions - just finds next state given forces.
   *
   * @param {ParticleState} state current state vector
   * @param {float} time time elapsed
   * @returns {ParticleState} new state vector after time derivative
   */
  computeTimeDerivative(state, time) {
    // TODO: Change this to actually take into to account forces.
    const newPositions = [];
    const newVelocities = [];

    for (const pos of state.positions) {
      newPositions.push(createVector(-pos.y, pos.x));
      newVelocities.push(0); // garbage for simple system
    }
    return new ParticleState(newPositions, newVelocities);
  }
}
