describe('Profile', () => {
  let testCode: string
  let adminEmail: string

  beforeEach(() => {
    cy.fixture('userData').then((data) => {
      testCode = data.testCode
      adminEmail = data.adminEmail

      cy.visit('/')
      cy.url().should('include', '/login', { timeout: 10000 })

      cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(adminEmail)
      cy.get('[data-cy=email-btn]', { timeout: 10000 }).click()
      cy.get('[data-cy=code-input]', { timeout: 10000 }).type(testCode)
    })
  })

  it('visit', () => {
    cy.visit('/users')
    cy.url().should('include', '/admin/users', { timeout: 10000 })

    cy.get('[data-cy=user-0]', { timeout: 10000 }).click()

    cy.url().should('include', '/admin/users/', { timeout: 10000 })
  })
  it('visit', () => {
    cy.visit('/users')
    cy.url().should('include', '/admin/users', { timeout: 10000 })

    cy.get('[data-cy=user-0]', { timeout: 10000 }).click()

    cy.url().should('include', '/admin/users/', { timeout: 10000 })
  })
})
