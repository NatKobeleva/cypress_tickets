import logins from "../fixtures/login";

describe("Login to admin", () => {
  beforeEach(() => {
    cy.visit("https://qamid.tmweb.ru/admin/");
  });

  logins.forEach((login) => {
    it(login.name, () => {
      login.data.forEach((userData) => {
        cy.get('[for="email"] > .login__input').type(userData.email);
        cy.get('[for="pwd"] > .login__input').type(userData.password);
        cy.contains("Авторизоваться").click();
        if (login.name === "Successful login") {
          cy.contains("Управление залами").should("be.visible");
        } else {
          cy.contains("Ошибка авторизации!").should("be.visible");
        }
      });
    });
  });
});
