/**
 * @jest-environment jsdom
 */

const { LazyLoad } = require('./LazyLoad');

describe('LazyLoad', () => {
    beforeEach(() => {
      cy.visit('/'); // Projenizin yerel sunucu adresine gidin
    });
  
    it('should lazy load images when scrolling into view', () => {
      // Cypress komutları burada
      cy.scrollTo('bottom');
      cy.get('img[data-src]').should('have.length', 0); // Tüm img etiketlerinin data-src özelliği kaldırılmış olmalı
    });
  
    it('should set placeholder images if provided', () => {
      // Cypress komutları burada
      cy.get('img').each(($el) => {
        cy.wrap($el).should('have.attr', 'src', 'placeholder.jpg');
      });
    });
  
    it('should call the callback function after loading an image', () => {
      // Callback işlevini test etmek için Cypress komutları burada
      cy.window().then((win) => {
        const spy = cy.spy(win.console, 'log');
        cy.scrollTo('bottom');
        cy.wrap(spy).should('be.calledWithMatch', /Loaded:/);
      });
    });
  
    it('should handle image loading errors and set error image', () => {
      // Hata durumlarını test etmek için Cypress komutları burada
      cy.get('img').each(($el) => {
        cy.wrap($el).invoke('attr', 'src', 'invalid.jpg');
        cy.wrap($el).should('have.attr', 'src', 'error.jpg');
      });
    });
  });
  