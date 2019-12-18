import React, { useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'

import { saveJWT } from './../utils/userAuthentication'
import userValidator from './../validators/userValidator'

const SignUp = ({history}) => {
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const signUpUser = async () => {
    try {
      const newUser = { name, age, email, password }
      const errors = userValidator.validate(newUser)

      if (errors.length) {
        setErrorMessage('Please fill all fields')
      } else {
        const { data } = await axios.post('/api/users/sign_up', { name, age, email, password })
        saveJWT(data.token)
        history.push('/')
      }

    } catch (error) {
      setErrorMessage('Something went wrong')
    }
  }

  return (
    <div>
      { errorMessage ? <p>{errorMessage}</p> : null }
      <label>Name</label>
      <input type='text' id='name' onChange={(event) => setName(event.target.value) }/>
      <label>Age</label>
      <input type='number' id='age' onChange={(event) => setAge(event.target.value) }/>
      <label>Email</label>
      <input type='text' id='email' onChange={(event) => setEmail(event.target.value) }/>
      <label>Password</label>
      <input type='password' id='password' onChange={(event) => setPassword(event.target.value) }/>
      <button id='submit' onClick={signUpUser}>Sign In</button>
    </div>
  )
}

export default withRouter(SignUp)
