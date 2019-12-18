import TaskList from "../../components/TaskList"

const rootReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload

    case 'ADD_TASK':
      return state.concat(action.payload)

    case 'UPDATE_TASK':
      return state.map((task) => {
        if (task._id === action.payload._id) {
          return action.payload
        }

        return task
      })

    default:
      return state
  }
}

export default rootReducer