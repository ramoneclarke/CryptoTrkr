describe("The Alerts Page", () => {
  beforeEach(() => {
    // Alias the network request for loading market data
    cy.intercept(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h%2C7d",
      {
        fixture: "market_data.json", // Use fixture to simulate CoinGecko API response
      }
    ).as("fetchMarketData");
    cy.visit("/alerts");
    cy.wait("@fetchMarketData", { timeout: 20000 })
      .its("response.statusCode")
      .should("eq", 200);
  });

  it("should display no notifications when no alerts have been activated", () => {
    cy.contains('[data-test="notifications-page"]', "No Notifications").should(
      "be.visible"
    );
  });

  it("Selects a coin and add a higher alert", () => {
    cy.get('[data-test="alert-coin-select"]').click();
    cy.get('[data-test="search-bar"]').type("ether");
    cy.contains('[data-test="alerts-dialog-coin-symbol"]', "ETH").click();
    cy.get('[data-test="alert-target-price"]').type("20000");
    cy.get('[data-test="alerts-save"]').click();
    cy.get('[data-test="alerts-manage-toggle"]').click();
    cy.get('[data-test="manage-alerts-page"]').within(() => {
      cy.get('[data-test="alerts-table-row"]')
        .eq(0)
        .within(() => {
          cy.get('[data-test="alerts-coin-cell"]').should(
            "contain",
            "Ethereum"
          );
          cy.get('[data-test="alerts-type-cell"]').should("contain", "Higher");
          cy.get('[data-test="alerts-target-price-cell"]').should(
            "contain",
            "$20,000.00"
          );
        });
    });
  });

  it("Selects a coin and add a lower alert", () => {
    cy.get('[data-test="alert-coin-select"]').click();
    cy.get('[data-test="search-bar"]').type("ether");
    cy.contains('[data-test="alerts-dialog-coin-symbol"]', "ETH").click();
    cy.get('[data-test="alert-target-price"]').type("300");
    cy.get('[data-test="alerts-type-select"]').click();
    cy.get('[data-test="alerts-lower-type"]').click();
    cy.get('[data-test="alerts-save"]').click();
    cy.get('[data-test="alerts-manage-toggle"]').click();
    cy.get('[data-test="manage-alerts-page"]').within(() => {
      cy.get('[data-test="alerts-table-row"]')
        .eq(0)
        .within(() => {
          cy.get('[data-test="alerts-coin-cell"]').should(
            "contain",
            "Ethereum"
          );
          cy.get('[data-test="alerts-type-cell"]').should("contain", "Lower");
          cy.get('[data-test="alerts-target-price-cell"]').should(
            "contain",
            "$300.00"
          );
        });
    });
  });

  it("Deletes an alert", () => {
    cy.get('[data-test="alert-coin-select"]').click();
    cy.get('[data-test="search-bar"]').type("ether");
    cy.contains('[data-test="alerts-dialog-coin-symbol"]', "ETH").click();
    cy.get('[data-test="alert-target-price"]').type("20000");
    cy.get('[data-test="alerts-save"]').click();
    cy.get('[data-test="alerts-manage-toggle"]').click();
    cy.get('[data-test="manage-alerts-page"]').within(() => {
      cy.get('[data-test="alerts-table-row"]')
        .eq(0)
        .within(() => {
          cy.get('[data-test="alerts-coin-cell"]').should(
            "contain",
            "Ethereum"
          );
          cy.get('[data-test="alerts-type-cell"]').should("contain", "Higher");
          cy.get('[data-test="alerts-target-price-cell"]').should(
            "contain",
            "$20,000.00"
          );
          cy.get('[data-test="delete-alert-icon"]').click();
        });
      cy.contains('[data-test="manage-alerts-page"]', "Ethereum").should(
        "not.exist"
      );
    });
  });

  it("alerts the user when a target price is met", () => {
    cy.get('[data-test="alert-coin-select"]').click();
    cy.get('[data-test="search-bar"]').type("ether");
    cy.contains('[data-test="alerts-dialog-coin-symbol"]', "ETH").click();
    cy.get('[data-test="alert-target-price"]').type("300");
    cy.get('[data-test="alerts-save"]').click();
    cy.get('[data-test="notifications-page"]').within(() => {
      cy.get('[data-test="activated-alert"]').within(() => {
        cy.get('[data-test="activated-alert-message"]').should(
          "contain",
          "Ethereum is now Higher than $300.00."
        );
        cy.get('[data-test="close-activated-alert"]').click();
      });
    });
    cy.contains(
      '[data-test="notifications-page"]',
      "Ethereum is now Higher than $300.00."
    );
    cy.contains(
      '[data-test="notifications-page"]',
      "Ethereum is now Higher than $300.00."
    );
    cy.contains(
      '[data-test="notifications-page"]',
      "Ethereum is now Higher than $300.00."
    ).should("not.exist");
  });
});
