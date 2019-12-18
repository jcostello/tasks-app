const RootPage = require('./pages/rootPage')

describe('Creating Tasks', function() {
  it('Create a task', () => {
    localStorage.setItem('jwt', 'token')

    const page = new RootPage()

    page.givenIHaveATaskList()

    page.visit()
    page.typeTaskAndSubmit('New Task')
    page.taskList()
      .should('contain', 'New Task')
  })
})