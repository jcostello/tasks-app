import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios';

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { removeJWT } from './../utils/userAuthentication'

const Home = ({history}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getTasks = async () => {
      const { data:tasks } = await axios.get('/api/tasks');
      dispatch({type: 'SET_TASKS', payload: tasks})
    }

    getTasks();
  });

  const logoutUser = async () => {
    await axios.post('/api/users/sign_out').catch()

    removeJWT()

    history.push('/sign_in')
  }

  return (
    <div>
      <div>
        <button onClick={logoutUser}>Logout</button>
      </div>
      <TaskForm />
      <TaskList />
    </div>
  )
}

export default withRouter(Home);