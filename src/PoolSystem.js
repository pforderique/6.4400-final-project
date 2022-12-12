/**
 * PoolSystem class
 *
 * Contains the method for calculting the Time Derivative given the system.
 */
class PoolSystem {
  static WIND_FORCE = Vec(0, 0);
  appliedForces = [];

  /**
   *
   * @param {int} numBalls the number of balls in the system.
   */
  constructor(numBalls) {
    for (let _ = 0; _ < numBalls; _++) {
      this.appliedForces.push(Vec(0, 0));
    }
  }
  /**
   * Computes the dertivative (with all the forces) of the system.
   * Does not take into account collisions - just finds next state given forces.
   *
   * @param {ParticleState} state current state vector
   * @returns {ParticleState} new state vector after time derivative
   */
  computeTimeDerivative(state) {
    if (state.positions.length != this.appliedForces.length) {
      throw new Error("The given applied forces array is not the same size.");
    }
    state = state.copy();
    const newPositions = state.velocities;
    const newVelocities = [];

    for (let idx = 0; idx < state.positions.length; idx++) {
      // Calculate frictional force.
      const vel = state.velocities[idx];
      const frictionForce = vel
        .copy()
        .rotate(PI)
        .setMag(Table.mu * Ball.MASS * Physics.gravityMag);

      // Calculate wind resistance force = Cv^2
      const windForce = vel
        .copy()
        .rotate(PI)
        .setMag(Physics.dragC * vel.mag() * vel.mag());

      // Get the applied force on this ball by user (if any).
      const appliedForce = this.appliedForces[idx]; // Vector
      this.appliedForces[idx] = Vec(0, 0); // Reset once force is applied.

      // Sum all forces to find final acceleration.
      const net_force = appliedForce.add(frictionForce).add(windForce);
      const acceleration_i = net_force.mult(1.0 / Ball.MASS);

      newVelocities.push(acceleration_i);
    }
    return new ParticleState(newPositions, newVelocities);
  }

  /**
   * Applies a force to ith ball.
   * @param {int} idx index of ball to apply force to
   * @param {Vector} force force to apply
   */
  applyForce(idx, force) {
    this.appliedForces[idx] = force;
  }
}
