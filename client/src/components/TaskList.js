import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

function TaskList() {
  const tasks = useSelector((state) => state)
  const dispatch = useDispatch()

  const toggleTask = async (id) => {
    const task = tasks.find((task) => task._id === id)
    const { data:updatedTask } = await axios.patch(`/api/tasks/${id}`, { completed: !task.completed })
    dispatch({type: 'UPDATE_TASK', payload: updatedTask})
  }

  return (
    <ul className='task-list'>
      { 
        tasks.map((task) => {
          const styles = { textDecoration: task.completed ? 'line-through' : null }
          return <li style={styles} 
            key={task._id}
            onClick={() => toggleTask(task._id)}
          >{task.description}</li>
        })
      }
    </ul>
  )
}

export default TaskList
