import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**'],
  },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // These components legitimately call setState inside an effect to sync
      // with an external system after mount (reading consent/attribution from
      // localStorage or the URL, which is unavailable during SSR) or to reset
      // menu state on navigation. The React Hooks rule flags these
      // conservatively, so we surface them as warnings rather than errors.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];

export default eslintConfig;
