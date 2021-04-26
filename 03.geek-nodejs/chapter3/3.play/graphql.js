const {graphql, buildSchema} = require('graphql');

// Construct a schema, using  GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
   }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello World!';
  },
};

// Run the GraphQL query '{hello}' and print out the response
module.exports = function (query) {
  return graphql(schema, query, root).then((response) => {
    return response;
  });
}