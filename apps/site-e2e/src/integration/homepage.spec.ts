import { getGreeting } from '../support/app.po';

describe('[PAGE]: Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Overall UI', () => {
    it('should contain a header', () => {
      cy.get('rob-header').should('exist');
    });

    it('should contain a navbar', () => {
      cy.get('rob-navigation').should('exist');
    });

    it('should contain a main landmark', () => {
      cy.get('main#main-content').should('exist');
    });

    it('should contain a footer', () => {
      cy.get('rob-footer').should('exist');
    });
  });

  describe('[SECTION]: Banner', () => {
    it('should contain a banner', () => {
      cy.get('rob-homepage-banner').should('exist');
    });

    it('should contain a h1 title element with my name', () => {
      cy.get('h1#title')
        .should('exist')
        .and('contain.text', 'Rob Bailey Software Engineer');
    });

    it('should contain some introductory text', () => {
      cy.get('[data-cy="introduction-text"]')
        .should('exist')
        .and('contain.text', 'TODO: introduction-text');
    });
  });

  describe('[SECTION]: Introduction', () => {
    it('should contain a grotesque image of myself', () => {
      cy.get('[data-cy="selfie-image"]')
        .should('exist')
        .children()
        .find('img')
        .should('exist');
    });

    it('should contain some more introductory text', () => {
      cy.get('[data-cy="intro-text"]')
        .should('exist')
        .and('contain.text', 'TODO: More intro text');
    });

    it('should contain a link to the about page', () => {
      cy.get('[data-cy="intro-cta"]')
        .find('a')
        .should('have.attr', 'href', '/about');
    });
  });
});
