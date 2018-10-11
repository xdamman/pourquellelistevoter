import nextRoutes from 'next-routes';

const routes = nextRoutes();

routes
  .add('faq')
  .add('contribuer')
  .add('stats')
  .add('city', '/villes/:city', 'city')
  .add('list', '/villes/:city/:listname')
  .add('cityByZipCode', '/:zipcode', 'city')
  .add('index', '/')

export default routes;

export const { Link, Router } = routes;
