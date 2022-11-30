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
    // TODO: later implement Rk4 instead of Euler.

    const deriv = system.computeTimeDerivative(currentState);
    return deriv.multiply(dt).add(currentState);
  }
}
