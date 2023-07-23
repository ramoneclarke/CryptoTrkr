describe("The Portfolio Page", () => {
  beforeEach(() => {
    // Alias the network request for loading market data
    cy.intercept(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h%2C7d",
      {
        fixture: "market_data.json", // Use fixture to simulate CoinGecko API response data
      }
    ).as("fetchMarketData");
    cy.visit("/portfolio");
    cy.wait("@fetchMarketData", { timeout: 20000 })
      .its("response.statusCode")
      .should("eq", 200);
  });

  it("should display portfolio empty when no coins added to portfolio", () => {
    cy.contains('[data-test="portfolio-table"]', "Portfolio empty").should(
      "be.visible"
    );
  });

  it("adds a buy transaction to the portfolio from the selector", () => {
    cy.get('[data-test="portfolio-selector-button"]').click();
    cy.get('[data-test="search-bar"]').eq(1).type("ether");
    cy.contains('[data-test="portfolio-dialog-coin-symbol"]', "ETH").click();
    cy.get('[data-test="quantity-add-portfolio-form"]').type("2");
    cy.get('[data-test="submit-add-portfolio-form"]').click();
    cy.contains('[data-test="portfolio-table"]', "Ethereum").should(
      "be.visible"
    );
  });

  it("adds a sell transaction to the portfolio from the selector", () => {
    // first adds an eth transaction to provide eth to sell
    cy.get('[data-test="portfolio-selector-button"]').click();
    cy.get('[data-test="search-bar"]').eq(1).type("ether");
    cy.contains('[data-test="portfolio-dialog-coin-symbol"]', "ETH").click();
    cy.get('[data-test="quantity-add-portfolio-form"]').type("2");
    cy.get('[data-test="submit-add-portfolio-form"]').click();
    cy.contains('[data-test="portfolio-table"]', "Ethereum").should(
      "be.visible"
    );

    // sell the eth
    cy.get('[data-test="portfolio-selector-button"]').click();
    cy.get('[data-test="search-bar"]').eq(2).type("ether");
    cy.contains('[data-test="portfolio-dialog-coin-symbol"]', "ETH").click({
      force: true,
    });
    cy.get('[data-test="sell-toggle"]').eq(1).click();
    cy.get('[data-test="quantity-add-portfolio-form"]').eq(1).type("2");
    cy.get('[data-test="submit-add-portfolio-form"]').eq(1).click();
    cy.contains("Ethereum has been removed from your portfolio");
    cy.contains('[data-test="portfolio-table"]', "Ethereum").should(
      "not.exist"
    );
  });

  it("displays the total portfolio value", () => {
    cy.get('[data-test="portfolio-value"]').should("contain", "0.00");
    cy.get('[data-test="portfolio-selector-button"]').click();
    cy.get('[data-test="search-bar"]').eq(1).type("ether");
    cy.contains('[data-test="portfolio-dialog-coin-symbol"]', "ETH").click();
    cy.get('[data-test="quantity-add-portfolio-form"]').type("2");
    cy.get('[data-test="submit-add-portfolio-form"]').click();
    cy.contains('[data-test="portfolio-table"]', "Ethereum").should(
      "be.visible"
    );
    cy.get('[data-test="portfolio-value"]').then(($portfolioValue) => {
      const value = parseFloat($portfolioValue.text().replace("$", ""));
      expect(value).to.be.greaterThan(0);
    });
  });
});
