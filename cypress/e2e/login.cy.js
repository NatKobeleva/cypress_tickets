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
