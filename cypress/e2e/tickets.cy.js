import logins from "../fixtures/login";
import seats from "../fixtures/seats";

describe("Booking tickets", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Main page", () => {
    cy.get(".page-nav__day").should("have.length", 7);
  });

  seats.forEach((test) => {
    it(test.name, () => {
      cy.get(".page-nav__day:nth-of-type(4)").click();
      cy.get(".movie").first().contains("12:00").click();
      test.data.forEach((seat) => {
        cy.get(
          `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
        ).click();
      });
      cy.get(".acceptin-button").click();
      cy.contains("Получить код бронирования").should("be.visible");
    });
  });
});

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
