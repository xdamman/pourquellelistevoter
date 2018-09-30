import nextRoutes from 'next-routes';

const routes = nextRoutes();

routes
  .add('faq')
  .add('contributing')
  .add('index', '/')
  .add('city', '/:zipcode')
  .add('profile', '/:zipcode/:firstname/:lastname');

export default routes;

export const { Link, Router } = routes;
