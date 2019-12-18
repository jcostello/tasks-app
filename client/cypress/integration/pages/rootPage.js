class RootPage {
  tasks = []

  constructor() {
    cy.server()
  }

  visit = () => {
    cy.visit('/')
  }

  givenIHaveATaskList = (customTasks = []) => {
    this.tasks = customTasks

    cy.route({
      url: '/api/tasks',
      method: 'GET',
      status: 200,
      response: this.tasks
    })
  }

  clickOnTask = (description) => {
    const task = this.tasks.find((task) => task.description === description)
    cy.route({
      url: `/api/tasks/${task._id}`,
      method: 'PATCH',
      status: 200,
      response: { ...task, completed: !task.completed }
    })

    this.taskList().contains(description).click()
  }

  typeTaskAndSubmit = (description) => {
    cy.route({
      url: '/api/tasks',
      method: 'POST',
      status: 200,
      response: { id: 1, description, completed: false }
    })

    cy.get('#task-description').type(`${description} {enter}`)
  }

  taskList = () => {
    return cy.get('.task-list li')
  }
}

module.exports = RootPage