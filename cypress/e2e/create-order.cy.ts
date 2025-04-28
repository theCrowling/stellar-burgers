const fakeAccessToken = 'fake-access-token';
const fakeRefreshToken = 'fake-refresh-token';

describe('Проверка создания заказа', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.viewport(1300, 800);

    cy.setCookie('accessToken', fakeAccessToken);
    window.localStorage.setItem('refreshToken', fakeRefreshToken);

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.wait(['@getUser', '@getIngredients']);
    cy.get('[data-cy="ingredient-card"]').should('exist');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  it('Добавление ингридиентов в конструктор и создание заказа', () => {
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

    cy.get('[data-cy=constructor-bun]').should('contain.text', 'булка');
    cy.get('[data-cy=constructor-ingredient]').should(
      'contain.text',
      'Биокотлета'
    );

    cy.intercept('POST', '**/api/orders', {
      fixture: 'orders.json'
    }).as('createOrder');
    cy.get('[data-cy=constructor-order-button]').click();
    cy.wait('@createOrder').then(({ response }) => {
      const orderNumber = response?.body.order.number;
      cy.get('[data-cy="modal"]').should('exist');
      cy.get('[data-cy="order-number"]').should('contain', orderNumber);
    });

    cy.get('[data-cy="modal"]').find('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy=constructor-bun]').should(
      'contain.text',
      'Выберите булки'
    );
    cy.get('[data-cy=constructor-ingredient]').should(
      'contain.text',
      'Выберите начинку'
    );
  });
});
