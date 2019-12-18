const RootPage = require('./pages/rootPage')
const TaskFactory = require('../../../tests/factories/tasksFactory')

describe('Listing Tasks', function() {
  it('List all my tasks', () => {
    localStorage.setItem('jwt', 'token')

    const page = new RootPage()

    const customTasks = TaskFactory.buildList(3)
      .concat(TaskFactory.build({ description: 'Todo Task' }));

    page.givenIHaveATaskList(customTasks)

    page.visit()

    page.taskList()
      .should('contain', 'Todo Task')
  })
})