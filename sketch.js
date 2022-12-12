let game;
let last_tick_time;

function setup() {
  createCanvas(Table.width, Table.height);

  // Start the clock.
  last_tick_time = millis();

  const ballColors = [
    Colors.WHITE,
    Colors.YELLOW,
    Colors.RED,
    Colors.BLUE,
    Colors.GREEN,
    Colors.ORANGE,
    Colors.PURPLE,
  ];
  const positions = [
    Vec(200, Table.height - 150),
    Vec(200, 250),
    Vec(200 - 1.5*Ball.RADIUS, 250 - 2.5*Ball.RADIUS),
    Vec(200 + 1.5*Ball.RADIUS, 250 - 2.5*Ball.RADIUS),
    Vec(200 - 3*Ball.RADIUS, 250 - 2*2.5*Ball.RADIUS),
    Vec(200, 250 - 2*2.5*Ball.RADIUS),
    Vec(200 + 3*Ball.RADIUS, 250 - 2*2.5*Ball.RADIUS),
  ];
  let initialState = new ParticleState(
    positions,
    positions.map((pos) => Vec(0, 0))
  );
  const stepSize = 0.15;
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

  if (!game.showWhiteOutline(mouseX, mouseY) && game.cueStick.canShow(game.currentState, mouseX, mouseY)) {
    game.cueStick.showCueVector(game.currentState, mouseX, mouseY);
  }
}

function mouseClicked(event) {
  if (game.showWhiteOutline(mouseX, mouseY))
    game.placeWhiteBall(mouseX, mouseY);
  else if (game.cueStick.canShow(game.currentState, mouseX, mouseY))
    game.cueStick.shoot(game.currentState, mouseX, mouseY);
}
