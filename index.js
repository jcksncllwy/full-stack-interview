const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');
const Scheduler = require('Scheduler.js')

const patients = JSON.parse(fs.readFileSync('./sample-data/patients.json', 'utf8'));
const patientScheduler = new Scheduler(patients);


// The GraphQL schema in string form
const typeDefs = `
  type Query { patients: [Patient] }
  type Patient {
    id: String!,
    name: String,
    location: {
      latitude : String,
      longitude : String
    },
    age : Int,
    acceptedOffers : Int,
    canceledOffers : Int,
    averageReplyTime : Int,
  }
`;

// The resolvers
const resolvers = {
  Query: {
    patients: (_, { id }) => find(patients, {'id': id}),
    availablePatients: (_, { location }) => patientScheduler.findAvailablePatientsByLocation(location)
  },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
