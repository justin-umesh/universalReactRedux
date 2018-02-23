import Home from './home';
import Product from './product';

const route = [{
  ...Home,
  path: '/',
  exact: true,
}, {
  ...Product,
  path: '/product',
  exact: true,
}];

export default route;
