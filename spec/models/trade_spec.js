import Trade from 'models/trade';

describe('Trade spec', () => {
  let trade;
  beforeEach(() => {
    quote = new Trade({
      symbol: 'HELLO',
      price: 100.00,
    });
  });

  describe('defaults', () => {
    it('increases the price by $1.00', () => {
      const startPrice = quote.get('price');

      quote.buy();

      expect(quote.get('price')).toEqual(startPrice + 1.00);
    });
  });

  describe('Sell function', () => {
    it('decreases the price by $1.00', () => {
      const startPrice = quote.get('price');

      trade.sell();

      expect(trade.get('price')).toEqual(startPrice - 1.00);
    });
  });
});
