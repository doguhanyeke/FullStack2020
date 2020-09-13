
describe('Blog app', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('blogs')
    }),
    it('login form check', function() {
        cy.get('#login-visible-button').click()
        cy.get('#username').type('dogu')
        cy.get('#password').type('123')
        cy.get('#login-button').click()
        cy.contains('doguhan logged in')
    })
})