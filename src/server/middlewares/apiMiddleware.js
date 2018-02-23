/* eslint-disable */
import bodyParser from 'body-parser';
import express from 'express';
// import proxy from 'express-http-proxy';
import proxy from 'http-proxy-middleware';

const API_URL = '/api';

const app = express.Router();

// Parse application/json bodys
app.use(bodyParser.json());
// Parse application/x-www-form-urlencoded bodys
app.use(bodyParser.urlencoded({ extended: true }));
// create restful routes

app.use(`${API_URL}`, proxy({target: 'http://localhost:4000/mkstore/v1', changeOrigin: true}));


export default app;
