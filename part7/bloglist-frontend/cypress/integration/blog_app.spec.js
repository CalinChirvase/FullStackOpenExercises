describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Carl',
      username: 'HelloMan',
      password: 'password123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('HelloMan')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('Wrong credentials')
    cy.get('html').should('not.contain', 'Carl logged-in')
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('HelloMan')
    cy.get('#password').type('password123')
    cy.get('#login-button').click()
    cy.contains('Carl logged-in')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'HelloMan', password: 'password123' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blog-title').type('a blog created by cypress')
      cy.get('#blog-author').type('cypress')
      cy.get('#blog-url').type('cypress-blog.ca')
      cy.contains('create').click()
      cy.contains('a blog created by cypress')
    })

    describe('When one blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'One Blog', author: 'One Author', url: 'One URL' })
      })

      it('like button increases likes by one', function() {
        cy.contains('view').click()
        cy.contains('0')
        cy.contains('like').click()
        cy.contains('1')
      })
    })
  })
})