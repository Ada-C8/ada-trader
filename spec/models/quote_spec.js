import Quote from 'models/quote';

describe('Quote spec', () => {
  let quote;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'HELLO',
      price: 100.00,
    });
  });

  describe('Buy function', () => {
    it('increases the price by $1.00', () => {
      const startPrice = quote.get('price');

      quote.buy();

      expect(quote.get('price')).toEqual(startPrice + 1.00);
    });
  });

  describe('Sell function', () => {
    it('decreases the price by $1.00', () => {
      const startPrice = quote.get('price');

      quote.sell();

      expect(quote.get('price')).toEqual(startPrice - 1.00);
    });
  });

  describe('makeTradeData', () => {
    it('creates and returns object with the data from the model', () => {
      let tradeData = {
        symbol: 'HELLO',
        price: 100.00,
        buy: true
      };

      let returnData = quote.makeTradeData(quote, true);
      
      expect(returnData).toEqual(tradeData);
    });
  });
});
