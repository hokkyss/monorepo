import type { Route } from '../../configs/route-map/route-map.config';

import MainPage from './main.page';

const mainRoute: Route = {
  Component: MainPage,
  children: [],
  index: false,
  name: 'main',
};

export default mainRoute;
