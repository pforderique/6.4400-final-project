new p5();

const Colors = {
  WHITE: color(255),
  BLACK: color(0),
  WOOD: color(150, 111, 51),
  REDWOOD: color(87, 49, 33),
  RED: color(234, 35, 5),
  GREEN: color(30, 110, 68),
  BLUE: color(30, 50, 100),
  YELLOW: color(244, 228, 24),
  ORANGE: color(233, 127, 0),
  PURPLE: color(82, 0, 121),
  MAROON: color(128, 0, 0),
};

const BallTypes = {
  CUE: "cue",
  SOLID: "solid",
  STRIPE: "stripe",
  EIGHT: "eight",
};

const BallNumbers = {
  0: [Colors.WHITE, BallTypes.CUE],
  1: [Colors.YELLOW, BallTypes.SOLID],
  2: [Colors.BLUE, BallTypes.SOLID],
  3: [Colors.RED, BallTypes.SOLID],
  4: [Colors.PURPLE, BallTypes.SOLID],
  5: [Colors.ORANGE, BallTypes.SOLID],
  6: [Colors.GREEN, BallTypes.SOLID],
  7: [Colors.MAROON, BallTypes.SOLID],
  8: [Colors.BLACK, BallTypes.EIGHT],
  9: [Colors.YELLOW, BallTypes.STRIPE],
  10: [Colors.BLUE, BallTypes.STRIPE],
  11: [Colors.RED, BallTypes.STRIPE],
  12: [Colors.PURPLE, BallTypes.STRIPE],
  13: [Colors.ORANGE, BallTypes.STRIPE],
  14: [Colors.GREEN, BallTypes.STRIPE],
  15: [Colors.MAROON, BallTypes.STRIPE],
}

const Table = {
  color: color(75, 117, 47),
  width: 450,
  height: 900,
  edge: 40,
  edgeColor: Colors.REDWOOD,
  mu: 1, // Coefficient of friction of the table.
};

const UI = {
  color: color(100, 100, 100),
  bottom: 100,
  side: 50,
  ball_offset: 1.3,
  edge: Table.width + 2*Table.edge + 5,
  solid_start: 0,
  stripe_start: Table.height + 2*Table.edge,
  width: 10 + 2 * Ball.RADIUS,
  length: 7 * 2 * Ball.RADIUS + 8 * 5,
}

const Physics = {
  gravityMag: 0.13,
  dragC: 0.001,
};

const Vec = createVector;