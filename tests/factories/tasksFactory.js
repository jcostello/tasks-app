const { Factory } = require('rosie');
const faker = require('faker');
const ObjectId = require("bson-objectid");

const factory = new Factory()
  .attr('_id', () => ObjectId.generate())
  .attr('ownerId', () => ObjectId.generate().id)
  .attr('id', ['_id'], (_id) => _id.id)
  .attrs({
    description: faker.lorem.sentence,
    completed: false
  })

module.exports = factory;