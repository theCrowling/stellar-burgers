describe('Проверка конструктора бургера', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.viewport(1300, 800);

    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-card"]').should('exist');
  });

  it('Добавление булки и ингридиентов в конструктор', () => {
    cy.get('[data-cy="ingredient-card"]')
      .contains('булка')
      .parent()
      .find('[type="button"]')
      .click();

    cy.get('[data-cy="ingredient-card"]')
      .contains('Биокотлета')
      .parent()
      .find('[type="button"]')
      .click();

    cy.get('[data-cy="ingredient-card"]')
      .contains('Соус')
      .parent()
      .find('[type="button"]')
      .click();

    cy.get('[data-cy=constructor-bun]').should('contain.text', 'булка');
    cy.get('[data-cy=constructor-ingredient]').should(
      'contain.text',
      'Биокотлета'
    );
    cy.get('[data-cy=constructor-ingredient]').should('contain.text', 'Соус');
  });
});
