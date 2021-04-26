const React = require('react');
const Container = require('../components/container');

module.exports = function (data) {
  return <Container
    column={data}
    filter={() => {
    }}
    sort={() => {
    }}
  />
}