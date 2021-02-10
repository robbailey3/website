import { getGreeting } from '../support/app.po';

describe('site', () => {
  beforeEach(() => cy.visit('/'));
  it('should contain the navbar', () => {
    cy.get('rob-navbar').should('be.true');
  });
});
