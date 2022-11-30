const TABLE_WIDTH = 400;
const TABLE_HEIGHT = 2 * TABLE_WIDTH;
let game;
let last_tick_time;

function setup() {
  createCanvas(TABLE_WIDTH, TABLE_HEIGHT);

  // Start the clock.
  last_tick_time = millis();

  let initialState = new ParticleState(
    [createVector(50, 50)],
    [createVector(0, 0)]
  );
  let ballColors = [Colors.WHITE];
  let stepSize = 0.03;
  game = new Game(initialState, ballColors, stepSize);
}

function draw() {
  background(Colors.GREEN);
  let current_tick_time = millis();
  let delta_time = current_tick_time - last_tick_time;

  push();
  translate(width/2, height/2);
  game.update(delta_time);
  game.render();
  pop();

  last_tick_time = current_tick_time;
}
