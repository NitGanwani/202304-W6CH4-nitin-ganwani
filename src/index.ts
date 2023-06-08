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

  if (isNaN(paramA) || isNaN(paramB)) {
    res.statusCode = 400;
    res.end('Error. Invalid numbers');
    return;
  }

  const results = calculator(paramA, paramB);

  res.write(`<h1>Calculadora</h1>`);
  res.write(`<p>${paramA} + ${paramB} = ${results.add}</p>`);
  res.write(`<p>${paramA} - ${paramB} = ${results.substract}</p>`);
  res.write(`<p>${paramA} * ${paramB} = ${results.multiply}</p>`);
  res.write(`<p>${paramA} / ${paramB} = ${results.divide}</p>`);
  res.end();
});

server.listen(PORT);

server.on('listening', () => {
  console.log('Listening on port ' + PORT);
});

server.on('error', (error) => {
  console.log(error.message);
});
