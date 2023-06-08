/* eslint-disable radix */
import http from 'http';
import url from 'url';
import * as dotenv from 'dotenv';
import { calculator } from './calculator.js';

dotenv.config();

const PORT = process.env.PORT || 7777;

const server = http.createServer((req, res) => {
  if (!req.url) {
    server.emit('error', new Error('No url in the request'));
    return;
  }

  const { pathname, query } = url.parse(req.url, true);

  if (req.method !== 'GET') {
    server.emit('error', new Error('Invalid method'));
    return;
  }

  if (pathname !== '/calculator') {
    res.statusCode = 404;
    res.end('Error. Not found.');
    return;
  }

  const paramA = parseInt(query.paramA as string);
  const paramB = parseInt(query.paramB as string);

  res.write(`<h1>Calculadora</h1>`);
  res.write(`<p>${calculator(paramA, paramB)}</p>`);
  res.write(req.method);
  res.write(req.url);
  res.end();
});

server.listen(PORT);

server.on('listening', () => {
  console.log('Listening on port ' + PORT);
});

server.on('error', (error) => {
  console.log(error.message);
});
