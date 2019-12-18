const { Factory } = require('rosie');
const faker = require('faker');
const ObjectId = require("bson-objectid");

const factory = new Factory()
  .attr('_id', () => ObjectId.generate())
  .attr('id', ['_id'], (_id) => _id.id)
  .attrs({
    name: faker.name.firstName,
    age: faker.random.number,
    email: faker.internet.email,
    password: faker.internet.password
  })

module.exports = factory;