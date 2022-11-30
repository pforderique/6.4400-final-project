const TABLE_WIDTH = 400;
const TABLE_HEIGHT = 2 * TABLE_WIDTH;
let game;

function setup() {
  createCanvas(TABLE_WIDTH, TABLE_HEIGHT);

  // TODO: create game with initial positions and velocities
  let initialState = new ParticleState(
    [createVector(50, 50)],
    [createVector(0, 0)]
  );
  let ballColors = [Colors.WHITE];
  let stepSize = 0.01;
  game = new Game(initialState, ballColors, stepSize);
}

function draw() {
  background(Colors.GREEN);
  // TODO: call game.update()
  game.render();
}
