import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios';

const TaskForm = () => {
  const input = React.createRef();
  const dispatch = useDispatch()

  const submitForm = async (event) => {
    event.preventDefault()

    const { data:task } = await axios.post('/api/tasks', { description: input.current.value })

    dispatch({type: 'ADD_TASK', payload: task })

    input.current.value = '';
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <input type='text' placeholder='task' id='task-description' ref={input}/>
      </form>
    </div>
  )
}

export default TaskForm
