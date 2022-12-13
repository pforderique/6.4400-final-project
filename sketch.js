let game;
let last_tick_time;

function setup() {
  createCanvas(2*Table.edge + Table.width, 2*Table.edge + Table.height);

  // Start the clock.
  last_tick_time = millis();

  let ballNumbers = Array.from(Array(16).keys());;
  shuffle(ballNumbers, true);
  ballNumbers.splice(ballNumbers.indexOf(0), 1);
  ballNumbers.splice(ballNumbers.indexOf(8), 1);
  ballNumbers.splice(0, 0, 0);
  ballNumbers.splice(5, 0, 8);

  const width_half = Table.edge + Table.width / 2;
  const height_half = Table.edge + Table.height / 2;
  const balls_start_point = height_half * 0.7;
  const hOffset = 1.2;
  const vOffset = 2.2;
  const positions = [
    Vec(width_half, height_half * 1.5),

    // Row 1
    Vec(width_half, balls_start_point),

    // Row 2
    Vec(width_half - hOffset*Ball.RADIUS, balls_start_point - vOffset*Ball.RADIUS),
    Vec(width_half + hOffset*Ball.RADIUS, balls_start_point - vOffset*Ball.RADIUS),

    // Row 3
    Vec(width_half - 2*hOffset*Ball.RADIUS, balls_start_point - 2*vOffset*Ball.RADIUS),
    Vec(width_half, balls_start_point - 2*vOffset*Ball.RADIUS),
    Vec(width_half + 2*hOffset*Ball.RADIUS, balls_start_point - 2*vOffset*Ball.RADIUS),

    // Row 4
    Vec(width_half - 3*hOffset*Ball.RADIUS, balls_start_point - 3*vOffset*Ball.RADIUS),
    Vec(width_half - hOffset*Ball.RADIUS, balls_start_point - 3*vOffset*Ball.RADIUS),
    Vec(width_half + hOffset*Ball.RADIUS, balls_start_point - 3*vOffset*Ball.RADIUS),
    Vec(width_half + 3*hOffset*Ball.RADIUS, balls_start_point - 3*vOffset*Ball.RADIUS),

    // Row 5
    Vec(width_half - 4*hOffset*Ball.RADIUS, balls_start_point - 4*vOffset*Ball.RADIUS),
    Vec(width_half - 2*hOffset*Ball.RADIUS, balls_start_point - 4*vOffset*Ball.RADIUS),
    Vec(width_half, balls_start_point - 4*vOffset*Ball.RADIUS),
    Vec(width_half + 2*hOffset*Ball.RADIUS, balls_start_point - 4*vOffset*Ball.RADIUS),
    Vec(width_half + 4*hOffset*Ball.RADIUS, balls_start_point - 4*vOffset*Ball.RADIUS),
  ];
  let initialState = new ParticleState(
    positions,
    positions.map((pos) => Vec(0, 0))
  );
  const stepSize = 0.15;
  game = new Game(initialState, ballNumbers, stepSize);
}

function draw() {
  background(Table.edgeColor);
  noStroke();
  fill(Table.color)
  rect(Table.edge, Table.edge, Table.width, Table.height, 20);
  let current_tick_time = millis();
  let delta_time = current_tick_time - last_tick_time;

  game.update(delta_time);
  game.render();

  last_tick_time = current_tick_time;

  if (!game.needWhiteBall && game.cueStick.canShow(game.currentState, mouseX, mouseY)) {
    game.cueStick.showCueVector(game.currentState, mouseX, mouseY);
  }
  else if (game.needWhiteBall && game.canPlaceBall(mouseX, mouseY)) {
    game.showBallOutline(mouseX, mouseY);
  }
  
  const width_half = Table.edge + Table.width / 2;
  const height_half = Table.edge + Table.height / 2;
  fill(Colors.WHITE);
  ellipse(width_half, height_half * 1.5, 5, 5);
}

function mouseClicked(event) {
  if (game.needWhiteBall && game.canPlaceBall(mouseX, mouseY))
    game.placeWhiteBall(mouseX, mouseY);
  else if (!game.needWhiteBall && game.cueStick.canShow(game.currentState, mouseX, mouseY))
    game.cueStick.shoot(game.currentState, mouseX, mouseY);
}
