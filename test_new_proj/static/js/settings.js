
const WIDTH = 1200;
const HEIGHT = 800;
const HALF_WIDTH = WIDTH // 2
const HALF_HEIGHT = HEIGHT // 2
const FPS = 60
const TILE = 100


const FOV = Math.PI / 3
const HALF_FOV = FOV / 2
const NUM_RAYS = 120
const MAX_DEPTH = 800
const DELTA_ANGLE = FOV / NUM_RAYS
const DIST = NUM_RAYS / (2 * Math.tan(HALF_FOV))
const PRO_CAFF = 3 * DIST * TILE
const SCALE = WIDTH // NUM_RAYS


const player_pos = [HALF_WIDTH, HALF_HEIGHT]
const player_angle = 0
const player_speed = 2
