const mongoose = require('mongoose');

const mongoseHelper = {
  connect: async (mongodb_url) => {
    return await mongoose.connect(mongodb_url || process.env.MONGODB_URL,
      { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      }
    );
  },
  disconnect: async () => await mongoose.disconnect(),
  dropAllCollection: async () => {
    collections = Object.keys(mongoose.connection.collections)

    collections.forEach(async (collection) => {
      await mongoose.connection.collection(collection).deleteMany()
    })
  }
}

module.exports = mongoseHelper;