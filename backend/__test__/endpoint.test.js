/* eslint-disable import/extensions */
/* eslint-disable no-undef */
// endpoint.test.js
const supertest = require('supertest');
const app = require('../app.js');

const request = supertest(app);

describe('Эндпоинты откликаются на запросы', () => {
  it('Возвращает данные и 401-й ответ по запросу без авторизации к "/"', () => request.get('/').then((response) => {
    expect(response.status).toBe(401);
  }));
});
