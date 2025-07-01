
describe('Newsletter Sign-up Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081'); // Adjust the path to your HTML file
  });

  it('should display the main elements on the sign-up form page', () => {
    cy.get('.main').should('be.visible');
    cy.get('.sign-up-form').should('be.visible');
    cy.get('.footer').should('be.visible');
  });

  it('should fill out the sign-up form and navigate to success page with valid email', () => {
    const validEmail = 'test@example.com';
    cy.get('#email').type(validEmail);
    cy.get('.sub-btn').click();
    cy.url().should('include', 'success.html');
    cy.get('.thanks-for-sub').should('be.visible');
    cy.get('.success-text').should('contain', validEmail);
  });

  it('should display an error message with invalid email', () => {
    const invalidEmail = 'invalidemail';
    cy.get('#email').type(invalidEmail);
    cy.get('.sub-btn').click();
    cy.get('em').should('have.text', 'Valid email required.');
    cy.get('#email').should('have.css', 'border-color', 'rgb(255, 99, 71)'); // Assuming Tomato color
    cy.get('#email').should('have.css', 'color', 'rgb(255, 99, 71)'); // Assuming Tomato color
    cy.get('#email').should('have.css', 'background-color', 'rgba(255, 99, 71, 0.6)'); // Assuming hsla(4, 85%, 79%, 0.644) color
  });

  it('should dismiss success message and return to sign-up form page', () => {
    const validEmail = 'test@example.com';
    cy.get('#email').type(validEmail);
    cy.get('.sub-btn').click();
    cy.get('.dismiss-btn').click();
    cy.url().should('include', 'index.html');
    cy.get('.sign-up-form').should('be.visible');
  });

  it('should have the correct font family applied', () => {
    cy.get('body').should('have.css', 'font-family', 'Roboto, sans-serif');
  });
});
