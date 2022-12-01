let game;
let last_tick_time;

function setup() {
  createCanvas(Table.width, Table.height);

  // Start the clock.
  last_tick_time = millis();

  let initialState = new ParticleState(
    [createVector(50, Table.height - 100), createVector(50, 300)],
    [createVector(0, 0), createVector(0, 0)]
  );
  let ballColors = [Colors.WHITE, Colors.BLUE];
  let stepSize = 0.25;
  game = new Game(initialState, ballColors, stepSize);

  game.poolSystem.applyForce(0, createVector(0, 64).mult(2));
}

function draw() {
  background(Table.color);
  let current_tick_time = millis();
  let delta_time = current_tick_time - last_tick_time;

  game.update(delta_time);
  game.render();

  last_tick_time = current_tick_time;
}
