describe('Проверка работы модального окна', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.viewport(1300, 800);

    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-card"]').should('exist');
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    cy.get('[data-cy="ingredient-card"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal"]').find('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Закрытие модального окна ингредиента по оверлею', () => {
    cy.get('[data-cy="ingredient-card"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
