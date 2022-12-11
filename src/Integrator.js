/**
 * Integrator class
 *
 * Contains implementation of Euclid/RK4 Integrator.
 */
class Integrator {
  /**
   * Returns new state of the system after performing integration.
   * @param {PoolSystem} system the pool system containing computeTimeDerivative
   * @param {ParticleState} currentState the current state vector of the system
   * @param {float} dt stepsize
   *
   * @returns {ParticleState} new state
   */
  static integrate(system, currentState, dt) {
    // Implemented RK4 integration.
    const k1 = system.computeTimeDerivative(currentState);
    const k2 = system.computeTimeDerivative(currentState.add(k1.multiply(dt / 2)));
    const k3 = system.computeTimeDerivative(currentState.add(k2.multiply(dt / 2)));
    const k4 = system.computeTimeDerivative(currentState.add(k3.multiply(k3)));
    
    return currentState.add((k1.add((k2.multiply(2))).add((k3.multiply(2))).add(k4)).multiply(dt / 6));
  }
}
