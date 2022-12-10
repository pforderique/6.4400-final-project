new p5();

const Colors = {
  WHITE: color(255),
  BLACK: color(0),
  WOOD: color(150, 111, 51),

  RED: color(234, 35, 5),
  GREEN: color(30, 110, 68),
  BLUE: color(30, 50, 100),
  YELLOW: color(244, 228, 24),
  ORANGE: color(233, 127, 0),
  PURPLE: color(82, 0, 121),
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

const Vec = createVector;