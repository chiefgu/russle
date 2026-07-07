import * as migration_20260605_113948_initial from './20260605_113948_initial';
import * as migration_20260707_095700_posts_faq from './20260707_095700_posts_faq';

export const migrations = [
  {
    up: migration_20260605_113948_initial.up,
    down: migration_20260605_113948_initial.down,
    name: '20260605_113948_initial',
  },
  {
    up: migration_20260707_095700_posts_faq.up,
    down: migration_20260707_095700_posts_faq.down,
    name: '20260707_095700_posts_faq'
  },
];
