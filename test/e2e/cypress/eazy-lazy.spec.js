describe('LazyLoad', () => {
    beforeEach(() => {
        cy.visit('/'); // Projenizin yerel sunucu adresine gidin
    });

    it('should lazy load images when scrolling into view', () => {
        cy.get('img[data-src]').should('have.length', 2);

        cy.scrollTo('bottom');

        cy.get('img[data-src]').should('have.length', 0);
        cy.get('img[src="image1.jpg"]').should('be.visible');
        cy.get('img[src="image2.jpg"]').should('be.visible');
    });

    it('should set placeholder images if provided', () => {
        cy.visit('/?placeholder=placeholder.jpg'); // Test URL'nizi uygun şekilde değiştirin

        cy.get('img').each($img => {
            cy.wrap($img).should('have.attr', 'src', 'placeholder.jpg');
        });
    });

    it('should call the callback function after loading an image', () => {
        const callback = cy.spy();
        cy.window().then(win => {
            win.callback = callback;
        });
        cy.visit('/?callback=window.callback'); // Test URL'nizi uygun şekilde değiştirin

        cy.scrollTo('bottom');

        cy.window().then(win => {
            expect(callback).to.be.called.twice;
        });
    });

    it('should handle image loading errors and set error image', () => {
        cy.visit('/?errorImage=error.jpg'); // Test URL'nizi uygun şekilde değiştirin

        cy.get('img[data-src]').each($img => {
            cy.wrap($img).invoke('attr', 'data-src', 'invalid.jpg');
        });

        cy.scrollTo('bottom');

        cy.get('img').each($img => {
            cy.wrap($img).should('have.attr', 'src', 'error.jpg');
        });
    });
});
