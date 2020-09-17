
describe('Blog app', function() {
    beforeEach(function() {
        cy.request('post', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'doguhan',
            password: '123',
            username: 'dogu'
        }
        cy.request('post', 'http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3000')
    }),
    it('login is shown by default', () => {
        cy.get('.loginForm').should('contain', 'Log in to application')
    }),
    it('front page can be opened', function() {
        cy.contains('blogs')
    }),
    it('login form check', function() {
        cy.get('#username').type('dogu')
        cy.get('#password').type('123')
        cy.get('#login-button').click()
        cy.contains('doguhan logged in')
    }),
    it('new blog can be created', function() {
        cy.get('#username').type('dogu')
        cy.get('#password').type('123')
        cy.get('#login-button').click()

        cy.contains('create blog').click()
        cy.get('#titleId').type('magic title')
        cy.get('#authorId').type('magic author')
        cy.get('#urlId').type('magic url')
        cy.get('#createButtonId').click()
        cy.contains('a new blog magic title added')
    })
})