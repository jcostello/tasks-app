const RootPage = require('./pages/rootPage')
const TaskFactory = require('../../../tests/factories/tasksFactory')

describe('Clicking on a incomplete task', function () {
  it('Sets to complete and crossed the description', () => {
    localStorage.setItem('jwt', 'token')

    const page = new RootPage()
    const customTasks = TaskFactory.buildList(3)
      .concat(TaskFactory.build({ description: 'New Task' }));
    page.givenIHaveATaskList(customTasks)

    page.visit()
    page.clickOnTask('New Task')

    page.taskList()
      .contains('New Task')
      .should('have.css', 'text-decoration: line-through')
  })
})