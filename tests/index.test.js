const config = require('../config.js');
const tester = require('graphql-tester').tester;

describe('A query', function() {
  const self = this;

  beforeAll(() => {
   self.test = tester({
     url: `${config.APP_URL}:${config.APP_PORT}/${config.GQL_API_ENDPOINT}`,
     contentType: 'application/json'
   });
  });

  it('should return a valid patient by ID', (done) => {
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

  it('should return valid patients by location', (done) => {
    self.test('{patients(lat:"46.7110",long:"-63.1150") { name } }')
    .then((response) => {
        expect(response.status).toBe(200);
        expect(response.success).toBe(true);
        console.log(response.data.patients);
        expect(response.data.patients).toContain({name:'Samir Pacocha'});
    })
    .catch(err => {
      expect(err).toBe(null);
      done();
    });
  });

});
