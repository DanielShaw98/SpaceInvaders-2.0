const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_SPACE = 32;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const STATE = {
  x_pos : 0,
  y_pos : 0,
  move_right : false,
  move_left : false,
  shoot : false,
  lasers : [],
  spaceship_width : 50
};

// General Purpose Functions

function setPosition($element, x, y) {
  $element.style.transform = `translate(${x}px, ${y}px)`;
};

function setSize($element, width) {
  $element.style.width = `${width}px`;
  $element.style.height = "auto";
};

function bound(x) {
  if (x >= GAME_WIDTH - STATE.spaceship_width) {
    STATE.x_pos = GAME_WIDTH - STATE.spaceship_width;
    return STATE.x_pos;
  } if (x <= 0) {
    STATE.x_pos = 0;
    return STATE.x_pos;
  } else {
    return x;
  };
};

// Player

function createPlayer($container) {
  STATE.x_pos = GAME_WIDTH / 2;
  STATE.y_pos = GAME_HEIGHT - 50;
  const $player = document.createElement("img");
  $player.src = "img/Spaceship.png";
  $player.className = "player";
  $container.appendChild($player);
  setPosition($player, STATE.x_pos, STATE.y_pos);
  setSize($player, STATE.spaceship_width);
};

function updatePlayer() {
  if (STATE.move_left) {
    STATE.x_pos -= 3;
  } if (STATE.move_right) {
    STATE.x_pos += 3;
  } if (STATE.shoot) {
    createLaser($container, STATE.x_pos - STATE.spaceship_width / 2, STATE.y_pos);
  };
  const $player = document.querySelector(".player");
  setPosition($player, bound(STATE.x_pos), STATE.y_pos);
};

// Player Laser

function createLaser($container, x, y) {
  const $laser = document.createElement("img");
  $laser.src = "img/Laser.png";
  $laser.className = "laser";
  $container.appendChild($laser);
  const laser = {x, y, $laser};
  STATE.lasers.push(laser);
  setPosition($laser, x, y);
};

function updateLaser($container) {
  const lasers = STATE.lasers;
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y -= 2;
    setPosition(laser.$laser, laser.x, laser.y);
  };
};

// Key Presses

function keyPress(event) {
  if (event.keyCode === KEY_RIGHT) {
    STATE.move_right = true;
  } else if (event.keyCode === KEY_LEFT) {
    STATE.move_left = true;
  } else if (event.keyCode === KEY_SPACE) {
    STATE.shoot = true;
  }
};

function keyRelease(event) {
  if (event.keyCode === KEY_RIGHT) {
    STATE.move_right = false;
  } else if (event.keyCode === KEY_LEFT) {
    STATE.move_left = false;
  } else if (event.keyCode === KEY_SPACE) {
    STATE.shoot = false;
  }
};

// Main Update Function

function update() {
  updatePlayer();
  updateLaser($container);

  window.requestAnimationFrame(update);
};

// Init. Game

const $container = document.querySelector(".main");
createPlayer($container);

// Event Listeners

window.addEventListener("keydown", keyPress);
window.addEventListener("keyup", keyRelease);

update();
