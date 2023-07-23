describe("The Home Page", () => {
  beforeEach(() => {
    // Alias the network request for loading market data
    cy.intercept(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h%2C7d",
      {
        fixture: "market_data.json", // Use fixture to simulate CoinGecko API response data
      }
    ).as("fetchMarketData");
    cy.visit("/");
    cy.wait("@fetchMarketData", { timeout: 20000 })
      .its("response.statusCode")
      .should("eq", 200);
  });

  it("should display coins after data loads", () => {
    cy.contains('[data-test="market-table"]', "Bitcoin").should("be.visible");
  });

  it("searches for xrp and display text in search bar", () => {
    cy.get('[data-test="search-bar"]').type("xrp");
    cy.get('[data-test="search-bar"]').should("have.value", "xrp");
  });

  it("searches for xrp and display the results", () => {
    cy.contains('[data-test="market-table"]', "Bitcoin").should("be.visible");
    cy.get('[data-test="search-bar"]').type("xrp");
    cy.get('[data-test="coin"]')
      .eq(0)
      .within(() => {
        cy.get('[data-test="coin-name"]').should("contain", "XRP");
      });
  });

  it("searches for an invalid coin and display the no results message", () => {
    cy.get('[data-test="search-bar"]').type("abcde");
    cy.contains("No results for");
  });

  it("changes the active currency", () => {
    cy.get('[data-test="coin-price"]').should("contain", "$");
    cy.get('[data-test="currency-selector"]').click();
    cy.get('[data-test="currency-gbp"]').should("contain", "£ GBP").click();
    cy.get('[data-test="coin-price"]').should("contain", "£");
  });

  it("add a coin to watchlist", () => {
    cy.get('[data-test="coin"]')
      .eq(1)
      .within(() => {
        cy.get('[data-test="watchlist-chip"]').click();
      });
    cy.contains("has been added to your watchlist");
    cy.get('[data-test="nav-link-watchlist"]').click();
    cy.contains('[data-test="market-table"]', "Ethereum").should("be.visible");
  });

  it("add a coin to portfolio", () => {
    cy.get('[data-test="coin"]')
      .eq(1)
      .within(() => {
        cy.get('[data-test="portfolio-chip"]').click();
      });
    cy.get('[data-test="quantity-add-portfolio"]').type("2");
    cy.get('[data-test="submit-add-portfolio"]').click();
    cy.contains("has been added to your portfolio");
    cy.get('[data-test="nav-link-portfolio"]').click();
    cy.contains('[data-test="portfolio-table"]', "Ethereum").should(
      "be.visible"
    );
  });

  it("add an alert", () => {
    cy.get('[data-test="coin-alerts-field"]')
      .eq(1)
      .within(() => {
        cy.get('[data-test="alert-chip"]').click();
      });
    cy.get('[data-test="target-price-field"]').type("100");
    cy.get('[data-test="submit-alert"]').click();
    cy.contains("Alert created for ethereum");
    cy.get('[data-test="nav-link-alerts"]').click();
    cy.contains('[data-test="notifications-page"]', "Ethereum").should(
      "be.visible"
    );
  });

  it("create a username", () => {
    cy.get('[data-test="username-field"]').type("Satoshi Nakamoto");
    cy.get('[data-test="username-submit"]').click();
    cy.get('[data-test="username"]').should("contain", "Satoshi Nakamoto");
  });
});
