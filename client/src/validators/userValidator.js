import Schema from 'validate'
 
const userValidator = new Schema({
  name: {
    type: String,
    required: true,
    length: { min: 3, max: 32 }
  },
  age: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

export default userValidator