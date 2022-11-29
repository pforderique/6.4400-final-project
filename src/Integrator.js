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
   * @param {float} start_time start time of integration
   * @param {float} dt stepsize
   *
   * @returns {ParticleState} new state
   */
  static Integrate(system, currentState, start_time, dt) {
    // TODO: later implement Rk4 instead of Euler.

    const deriv = system.computeTimeDerivative(currentState, start_time);
    return deriv.multiply(dt).add(currentState);
  }
}
