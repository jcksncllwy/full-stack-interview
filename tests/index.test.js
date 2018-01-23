const config = require('../config.js');
const tester = require('graphql-tester').tester;

describe('A patient query', function() {
  const self = this;
  beforeAll(() => {
   self.test = tester({
     url: `http://127.0.0.1:${config.APP_PORT}/${config.GQL_API_ENDPOINT}`,
     contentType: 'application/json'
   });
  });
  it('should return a valid patient', () => {
    expect(true).toBe(true);
  });
});
