let game;
let last_tick_time;

function setup() {
  createCanvas(Table.width, Table.height);

  // Start the clock.
  last_tick_time = millis();

  let initialState = new ParticleState(
    [Vec(200, Table.height - 400), Vec(200, 200)],
    [Vec(0, 0), Vec(0, 0)]
  );
  let ballColors = [Colors.WHITE, Colors.BLUE];
  let stepSize = 0.15;
  game = new Game(initialState, ballColors, stepSize);

  // game.poolSystem.applyForce(0, createVector(16, 64).mult(2));
}

function draw() {
  background(Table.color);
  let current_tick_time = millis();
  let delta_time = current_tick_time - last_tick_time;

  game.update(delta_time);
  game.render();

  last_tick_time = current_tick_time;

  if (game.cueStick.canShow(game.currentState, mouseX, mouseY))
    game.cueStick.showCueVector(game.currentState, mouseX, mouseY);
}

function mouseClicked(event) {
  if (game.cueStick.canShow(game.currentState, mouseX, mouseY))
    game.cueStick.shoot(game.currentState, mouseX, mouseY);
  // print(mouseX, mouseY);
}
