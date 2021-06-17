const request = require('supertest');

const server = 'http://localhost:3001';

describe('Route integration for settings', () => {
  describe('/settings/all', () => {
    describe('GET', () => {
      it('responds with 200 status, application/json content type, and all data from DB', () => {
        return request(server)
          .get('/settings/all')
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((response) => {
            expect(Array.isArray(response.body.settings)).toEqual(true);
            response.body.settings.forEach((setting) => {
              expect(typeof setting).toEqual('object');
            });
          });
      });
    });
  });

  describe('/settings/new', () => {
    describe('POST', () => {
      it('respond with status 200, application/json content type, and settings info with new setting added', () => {
        return request(server)
          .post('/settings/new')
          .send({
            name: 'Test',
            ipAddress: '1.2.3.4.5',
            port: 1234,
          })
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((response) => {
            expect(response.body.settings[response.body.settings.length - 1].name).toEqual('Test');
          });
      });
    });
  });

  describe('/settings/:name', () => {
    describe('PUT', () => {
      it('responds with status 200, application/json content type, and settings info with particular setting updated', () => {
        return request(server)
          .put('/settings/Test')
          .send({
            name: 'otherTest',
            ipAddress: '1.2.3.4.5',
            port: 1234,
          })
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((response) => {
            expect(response.body.settings[response.body.settings.length - 1].name).toEqual('otherTest');
          });
      });
    });
  });

  describe('/settings/:name/delete', () => {
    describe('DELETE', () => {
      it('responds with status 200, application/json content type, and settings info with particular setting deleted', () => {
        return request(server)
          .delete('/settings/otherTest/delete')
          .send({
            name: 'otherTest',
            ipAddress: '1.2.3.4.5',
            port: 1234,
          })
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((response) => {
            expect(response.body.settings[response.body.settings.length - 1].name).not.toEqual('otherTest');
          });
      });
    });
  });
});
