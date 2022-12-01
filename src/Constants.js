new p5();

const Colors = {
  BLUE: color(30, 50, 100),
  GREEN: color(50, 80, 30),
  RED: color(120, 50, 30),
  // TODO: add more color constants for the other balls.
  WHITE: color(255),
  BLACK: color(0),
  WOOD: color(150, 111, 51),
};

const Table = {
  color: color(50, 80, 30),
  width: 400,
  height: 800,
  mu: 1, // Coefficient of friction of the table.
};

const Physics = {
  gravityMag: 0.13,
};
