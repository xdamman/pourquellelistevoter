import '../env';

import path from 'path';

import express from 'express';
import favicon from 'serve-favicon';
import next from 'next';
import { get } from 'lodash';
import * as api from './api';
import routes from '../routes';
import logger from '../logger';

import { registerToNewsletter } from '../lib/mailchimp';

const {
  PORT,
} = process.env;


const port = parseInt(PORT, 10) || 3000;

const nextApp = next({
  dir: path.dirname(__dirname),
  dev: process.env.NODE_ENV !== 'production',
});

const handler = routes.getRequestHandler(nextApp);

nextApp.prepare().then(() => {
  const server = express();

  server.use(
    favicon(path.join(path.dirname(__dirname), 'static', 'favicon.ico')),
  );

  server.use(express.json());

  server.post('/api/newsletter/register', (req, res) => {
    const email = get(req, 'body.email');
    const newsletter = get(req, 'body.newsletter');
    registerToNewsletter(email, newsletter).then(data => res.json(data));
  });

  server.get('/api/data/:csvfile', api.getDataFromCSV);
  server.get('/:zipcode/:firstname/:lastname', async (req, res, next) => {
      const {
        zipcode,
        firstname,
        lastname
      } = req.params;
      const csv = await api.getJSONFromCSVFile('candidats');
      const data = csv.find(r =>
        r['zipcode'] === zipcode
          && r['lastname'].toLowerCase() === lastname.toLowerCase()
          && r['firstname'].toLowerCase() === firstname.toLowerCase()
      );
      if (data) {
        const cumuleoCSV = await api.getJSONFromCSVFile('cumuleo');
        data.cumuleo = cumuleoCSV.find(r => r.firstname.toLowerCase() === firstname.toLowerCase() && r.lastname.toLowerCase() === lastname.toLowerCase() && r.zipcode === zipcode);
      }
      req.data = data;
      next();
  });
  server.get('/:zipcode', async (req, res, next) => {
      const {
        zipcode,
        firstname,
        lastname
      } = req.params;
      const csv = await api.getJSONFromCSVFile('candidats');
      const data = csv.filter(r => {
        if (req.query.gender) {
          return r.gender.toLowerCase() === req.query.gender.toLowerCase() && r.zipcode === zipcode;
        }
        return r.zipcode === zipcode;
      });
      req.data = data;
      next();
  });

  server.use('/static', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    next();
  });

  server.use('/_next/static', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    next();
  });

  server.get('*', handler);

  server.listen(port, err => {
    if (err) {
      throw err;
    }
    logger.info(`> Ready on http://localhost:${port}`);
  });
});