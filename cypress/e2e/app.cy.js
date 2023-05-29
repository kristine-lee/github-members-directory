describe("App", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.github.com/users?per_page=10&since=0", (req) => {
      req.reply((res) => {
        res.send({ fixture: "initial-response/users.json", headers: {"Link": "<https://api.github.com/users?per_page=10&since=19>; rel='next', <https://api.github.com/users{?since}>; rel='first'"}})
      });
    }).as("initialFetch");

    cy.intercept("GET", "https://api.github.com/users/foo", {
      fixture: "initial-response/foo.json",
    });
    cy.intercept("GET", "https://api.github.com/users/bar", {
      fixture: "initial-response/bar.json",
    });
    cy.intercept("GET", "https://api.github.com/users/baz", {
      fixture: "initial-response/baz.json",
    });
    cy.intercept("GET", "https://api.github.com/users/qux", {
      fixture: "initial-response/qux.json",
    });
    cy.intercept("GET", "https://api.github.com/users/fred", {
      fixture: "initial-response/fred.json",
    });
    cy.intercept("GET", "https://api.github.com/users/bob", {
      fixture: "initial-response/bob.json",
    });
    cy.intercept("GET", "https://api.github.com/users/mary", {
      fixture: "initial-response/mary.json",
    });
    cy.intercept("GET", "https://api.github.com/users/corgie", {
      fixture: "initial-response/corgie.json",
    });
    cy.intercept("GET", "https://api.github.com/users/wayne", {
      fixture: "initial-response/wayne.json",
    });
    cy.intercept("GET", "https://api.github.com/users/plugh", {
      fixture: "initial-response/plugh.json",
    });
    cy.visit("http://localhost:3000");
  });

  it("displays the first page of users and necessary details in the cards", () => {
    cy.wait("@initialFetch");

    cy.get("[data-cy='card']").should("have.length", 10);

    cy.get("[data-cy='card']")
      .first()
      .within(() => {
        cy.get("[data-cy='avatar']").should("exist");
        cy.contains("h3", "Foo").should("exist");
        cy.contains("p", "San Francisco").should("exist");
        cy.contains("p", "65 public repos").should("exist");
        cy.contains("p", "foo@email.com").should("exist");
        cy.get("[data-cy='github-link']").should("exist");
      });
  });

  it("should display the next page of users when the 'Next' button is clicked", () => {
    cy.wait("@initialFetch");

    cy.intercept("GET", "https://api.github.com/users?per_page=10&since=19", (req) => {
      req.reply((res) => {
        res.send({ fixture: "second-response/users.json", headers: {"Link": "<https://api.github.com/users?per_page=10&since=30>; rel='next', <https://api.github.com/users{?since}>; rel='first'"}})
      });
    }).as("nextPageFetch");

    cy.intercept("GET", "https://api.github.com/users/grace", {
      fixture: "second-response/grace.json",
    });
    cy.intercept("GET", "https://api.github.com/users/cool", {
      fixture: "second-response/cool.json",
    });
    cy.intercept("GET", "https://api.github.com/users/burt", {
      fixture: "second-response/burt.json",
    });
    cy.intercept("GET", "https://api.github.com/users/snek", {
      fixture: "second-response/snek.json",
    });
    cy.intercept("GET", "https://api.github.com/users/bee", {
      fixture: "second-response/bee.json",
    });
    cy.intercept("GET", "https://api.github.com/users/candle", {
      fixture: "second-response/candle.json",
    });
    cy.intercept("GET", "https://api.github.com/users/eye", {
      fixture: "second-response/eye.json",
    });
    cy.intercept("GET", "https://api.github.com/users/bridge", {
      fixture: "second-response/bridge.json",
    });
    cy.intercept("GET", "https://api.github.com/users/luka", {
      fixture: "second-response/luka.json",
    });
    cy.intercept("GET", "https://api.github.com/users/magic", {
      fixture: "second-response/magic.json",
    });

    cy.get("[data-cy='button-Next']").click();

    cy.wait("@nextPageFetch");

    cy.get("[data-cy='card']").should("have.length", 10);

    cy.get("[data-cy='card']")
    .last()
    .within(() => {
      cy.get("[data-cy='avatar']").should("exist");
      cy.contains("h3", "magic").should("exist");
      cy.contains("p", "No location given").should("exist");
      cy.contains("p", "24 public repos").should("exist");
      cy.contains("p", "Email not available").should("exist");
      cy.get("[data-cy='github-link']").should("exist");
    });
  });
});
