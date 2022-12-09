/**
 * class ParticleState
 *
 * A state vector for a the pool system
 */
class ParticleState {
  positions = [];
  velocities = [];

  /**
   *
   * @param {Vector[]} positionsArr array of positions as vectors
   * @param {Vector[]} velocitiesArr array of velocities
   */
  constructor(positionsArr, velocitiesArr) {
    if (positionsArr.length != velocitiesArr.length) {
      throw new Error("Position and velocity arrays must have same length.");
    }
    this.positions = positionsArr;
    this.velocities = velocitiesArr;
  }

  /**
   * Add state with another state.
   * @param {ParticleState} otherState the other particle state to add with.
   * @returns {ParticleState} resulting state
   */
  add(otherState) {
    if (
      this.positions.length !== otherState.positions.length ||
      this.velocities.length !== otherState.velocities.length
    ) {
      throw new Error("Particle states must be same size!");
    }
    for (let idx = 0; idx < this.positions.length; idx++) {
      this.positions[idx].add(otherState.positions[idx]);
      this.velocities[idx].add(otherState.velocities[idx]);
    }
    return this;
  }

  /**
   * Multiply state by a constant.
   * @param {float} constant the multiplication factor.
   * @returns {ParticleState} resulting state
   */
  multiply(k) {
    for (let idx = 0; idx < this.positions.length; idx++) {
      this.positions[idx].mult(k);
      this.velocities[idx].mult(k);
      Vec
    }
    return this;
  }

  /**
   * Returns a copy of the particle state.
   * @returns {ParticleState} new state.
   */
  copy() {
    // Create copies of the vectors in these arrays.
    return new ParticleState(
      this.positions.map((pos) => pos.copy()),
      this.velocities.map((vel) => vel.copy())
    );
  }

  toString() {
    return [
      'Particle State',
      'positions: ' + this.positions.toString(),
      'velocities: ' + this.velocities.toString()].join('\n');
  }
}
