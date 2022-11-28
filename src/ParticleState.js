/**
 * class ParticleState
 *
 * A state vector for a the pool system
 */
class ParticleState {
  positions = [];
  velocities = [];

  constructor(positionsArr, velocitiesArr) {
    if (positionsArr.length != velocitiesArr.length) {
      throw new Error("Position and velocity arrays must have same length.");
    }
    this.positions = positionsArr.copy();
    this.velocities = velocitiesArr.copy();
  }

  /**
   * Add state with another state.
   * @param {ParticleState} otherState the other particle state to add with.
   * @returns {ParticleState} resulting state
   */
  add(otherState) {
    // TODO
    throw new Error("Not Implemented.");
  }

  /**
   * Multiply state by a constant.
   * @param {float} constant the multiplication factor.
   * @returns {ParticleState} resulting state
   */
  multiply(constant) {
    // TODO
    throw new Error("Not Implemented.");
  }
}
