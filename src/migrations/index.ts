import * as migration_20260605_113948_initial from './20260605_113948_initial';

export const migrations = [
  {
    up: migration_20260605_113948_initial.up,
    down: migration_20260605_113948_initial.down,
    name: '20260605_113948_initial'
  },
];
