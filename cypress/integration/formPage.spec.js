// formPage.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('The Login Page', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:9000/login') // change URL to match your dev URL
    })
})

describe('Got to Forms', () => {
    it('form access', () => {
        cy.visit('http://localhost:9000/login') // change URL to match your dev URL
        cy.contains('Demander').click()
        cy.url().should('include', '/forms')
    })
    it('radio button 1 clicked', () => {
        cy.get('#radio1').eq(0).click()
    })
    it('radio button 2 clicked', () => {
        cy.get('#radio2').eq(0).click()
    })
    it('input nom', () => {
        cy.contains('Nom').type("Panchbaya")
    })
    it('input prenom', () => {
        cy.contains('Prénom').type("Sephora")
    })
    it('input age', () => {
        cy.contains('Âge').type("21")
    })
    it('input pro', () => {
        cy.contains('Profession').type("Etudiante")
    })
    it('input mail', () => {
        cy.contains('email').type("sp@mail.com")
    })
    it('input tel', () => {
        cy.contains('téléphone').type("0123456789")
    })
    it('input nb licence', () => {
        cy.contains('licence').type("55")
    })
    it('radio button abo 1 clicked', () => {
        cy.get('#radio3').eq(0).click()
    })
    it('radio button abo 2 clicked', () => {
        cy.get('#radio4').eq(0).click()
    })
    it('radio button 1 clicked', () => {
        cy.get('#radio1').eq(0).click()
    })
    it('envoie demande', () => {
        cy.contains('Envoyer').click()
        cy.url().should('include', '/validation')
        cy.wait(11000)
        cy.url().should('include', '/login')
    })
})



