import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('layout.tsx', [
    layout('features/option/index.tsx', [
      index('features/home/index.tsx'),
      route('/wheel-of-names', 'features/wheel-of-names/index.tsx'),
      route('/grouping', 'features/grouping/index.tsx'),
      route('/picking', 'features/picking/index.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
