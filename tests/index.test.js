const config = require('../config.js');
const tester = require('graphql-tester').tester;

describe('A patient query', function() {
  const self = this;

  beforeAll(() => {
   self.test = tester({
     url: `${config.APP_URL}:${config.APP_PORT}/${config.GQL_API_ENDPOINT}`,
     contentType: 'application/json'
   });
  });

  it('should return a valid patient', () => {
    self.test('{patient(id: "541d25c9-9500-4265-8967-240f44ecf723") { name } }')
    .then((response) => {
        expect(response.status).toBe(200);
        expect(response.success).toBe(true);
        expect(response.data.patient.name).toBe('Samir Pacocha');
    })
    .catch(err => {
      expect(err).toBe(null);
      done();
    });
  });

});
