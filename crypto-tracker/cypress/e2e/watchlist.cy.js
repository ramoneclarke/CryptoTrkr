describe("The Watchlist Page", () => {
  beforeEach(() => {
    // Alias the network request for loading market data
    cy.intercept(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h%2C7d",
      {
        fixture: "market_data.json", // Use fixture to simulate CoinGecko API response data
      }
    ).as("fetchMarketData");
    cy.visit("/watchlist");
    cy.wait("@fetchMarketData", { timeout: 20000 })
      .its("response.statusCode")
      .should("eq", 200);
  });

  it("should display watchlist empty when no coins added to watchlist", () => {
    cy.contains('[data-test="market-table"]', "Watchlist empty").should(
      "be.visible"
    );
  });

  it("adds a coin to the watchlist from the selector", () => {
    cy.get('[data-test="watchlist-selector-button"]').click();
    cy.get('[data-test="search-bar"]').eq(1).type("ether");
    cy.contains('[data-test="watchlist-dialog-coin-symbol"]', "ETH").click();
    cy.contains('[data-test="market-table"]', "Ethereum").should("be.visible");
  });

  it("removes a coin from the watchlist upon clicking the watchlist chip", () => {
    cy.get('[data-test="watchlist-selector-button"]').click();
    cy.get('[data-test="search-bar"]').eq(1).type("ether");
    cy.contains('[data-test="watchlist-dialog-coin-symbol"]', "ETH").click();
    cy.contains('[data-test="market-table"]', "Ethereum")
      .should("be.visible")
      .within(() => {
        cy.get('[data-test="watchlist-chip"]').click();
      });
    cy.contains("Ethereum has been removed from your watchlist");
    cy.contains('[data-test="market-table"]', "Ethereum").should("not.exist");
  });
});
