window.GT_SETTINGS = {
  BASE_PATH: "growtopia-test",
  LOG_VIEWER_USERNAMES: ["isxt"],
  ADMIN_USERNAMES: ["isxt"],
  ADMIN_ROLE_BY_USERNAME: {
    isxt: "owner"
  },
  ADMIN_COMMAND_COOLDOWNS_MS: {
    owner: {},
    manager: { tempban: 2000, permban: 2000, unban: 1000, kick: 700, givex: 600, tp: 300, bring: 700, summon: 700, setrole: 2000 },
    admin: { kick: 900, givex: 900, tp: 400, bring: 900, summon: 900 },
    moderator: { kick: 1200, tp: 600, bring: 1200, summon: 1200 },
    none: {}
  },
  TILE_SIZE: 32,
  WORLD_WIDTH_TILES: 140,
  WORLD_HEIGHT_TILES: 30,
  PLAYER_WIDTH: 22,
  PLAYER_HEIGHT: 30,
  GRAVITY: 0.32,
  FRICTION_GROUND: 0.86,
  FRICTION_AIR: 0.94,
  AIR_CONTROL: 0.6,
  MOVE_ACCEL: 0.46,
  MAX_MOVE_SPEED: 3.7,
  JUMP_VELOCITY: -7.2,
  MAX_FALL_SPEED: 10,
  JUMP_COOLDOWN_MS: 200
};
