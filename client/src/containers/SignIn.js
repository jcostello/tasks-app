import React, { useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'

import { saveJWT } from './../utils/userAuthentication'

const SignIn = ({history}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const signInUser = async () => {
    try {
      const { data } = await axios.post('/api/users/sign_in', { email, password })

      saveJWT(data.token)
      history.push('/')
    } catch (error) {
      setErrorMessage('Invalid email or password')
    }
  }

  return (
    <div>
      { errorMessage ? <p>{errorMessage}</p> : null }
      <label>Email</label>
      <input type='text' id='email' onChange={(event) => setEmail(event.target.value) }/>
      <label>Password</label>
      <input type='password' id='password' onChange={(event) => setPassword(event.target.value) }/>
      <button id='submit' onClick={signInUser}>Sign In</button>
    </div>
  )
}

export default withRouter(SignIn)
