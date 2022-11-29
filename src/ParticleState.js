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
    if (this.positions.length !== otherState.positions.length
     || this.velocities.length !== otherState.velocities.length) {
       throw new Error("Particle states must be same size!");
     }
    for (idx = 0; idx < this.positions.length; idx++) {
      this.positions[idx] += otherState.positions[idx];
      this.velocities[idx] += otherState.velocities[idx];
    }
    return this;
  }

  /**
   * Multiply state by a constant.
   * @param {float} constant the multiplication factor.
   * @returns {ParticleState} resulting state
   */
  multiply(constant) {
    for (idx = 0; idx < this.positions.length; idx++) {
      this.positions[idx] *= constant;
      this.velocities[idx] *= constant;
    }
    return this;
  }
}
