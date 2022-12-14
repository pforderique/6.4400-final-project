let game;
let last_tick_time;

function setup() {
  createCanvas(2*Table.edge + Table.width + UI.side, 2*Table.edge + Table.height + UI.bottom);

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
  const balls_start_point = Table.edge + Table.height / 4;
  const hOffset = 1.5;
  const vOffset = 2.5;
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
  background(Colors.WHITE);
  noStroke();

  // Display for the dead balls
  fill(UI.color);
  const width = 2 * Ball.RADIUS * UI.ball_offset;
  const len = 14 * Ball.RADIUS * UI.ball_offset;
  rect(UI.edge, UI.solid_start, width, len, 15); // For the solid balls
  rect(UI.edge, UI.stripe_start - len, width, len, 15); // For the solid balls
  
  // Table edges
  fill(Table.edgeColor);
  rect(0, 0, Table.width + 2*Table.edge, Table.height + 2*Table.edge, 20);
  
  // Inside the table
  fill(Table.color)
  rect(Table.edge, Table.edge, Table.width, Table.height, 20);
  let current_tick_time = millis();
  let delta_time = current_tick_time - last_tick_time;

  // Diamonds
  const width_half = Table.edge + Table.width / 2;
  const height_half = Table.edge + Table.height / 2;
  fill(Colors.WHITE);
  for (let i = 1; i <= 3; i++) {
    ellipse(Table.edge / 2, height_half - Table.height * i / 8, 5, 5);
    ellipse(Table.edge / 2, height_half + Table.height * i / 8, 5, 5);
    ellipse(Table.width + Table.edge * 1.5, height_half - Table.height * i / 8, 5, 5);
    ellipse(Table.width + Table.edge * 1.5, height_half + Table.height * i / 8, 5, 5);
    ellipse(Table.edge + Table.width * i / 4, Table.edge / 2, 5, 5);
    ellipse(Table.edge + Table.width * i / 4, Table.height + Table.edge * 1.5, 5, 5);
  }
  ellipse(width_half, height_half * 1.5, 5, 5);

  game.update(delta_time);
  game.render();

  last_tick_time = current_tick_time;

  if (game.timer == 0 && !game.needWhiteBall && game.cueStick.canShow(game.currentState, mouseX, mouseY)) {
    game.cueStick.showCueVector(game.currentState, mouseX, mouseY);
  }
  else if (game.needWhiteBall && game.canPlaceBall(mouseX, mouseY)) {
    game.showBallOutline(mouseX, mouseY);
  }

  if (game.switch != null && game.timer == 0)
    game.switchTurn();

  // Display text
  fill(color(0, 0, 0));
  textSize(20);
  textAlign(CENTER, CENTER);
  
  if (game.timer == 0) {
    if (game.winner != null) {
      text("Player " + game.winner + " wins!", UI.text_pos.x, UI.text_pos.y);
    }
    else {
      text("Player " + game.turn + "'s turn!", UI.text_pos.x, UI.text_pos.y);
    }
  }
  
}

function mouseClicked(event) {
  if (game.timer == 0 && game.needWhiteBall && game.canPlaceBall(mouseX, mouseY))
    game.placeWhiteBall(mouseX, mouseY);
  else if (game.timer == 0 && !game.needWhiteBall && game.cueStick.canShow(game.currentState, mouseX, mouseY)) {
    game.cueStick.shoot(game.currentState, mouseX, mouseY);
    game.timer = 4;
    game.switch = true;
  }
}
