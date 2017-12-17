import Quote from 'models/quote';

describe('Quote spec', () => {
  let quote;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'HELLO',
      price: 100.00,
    });
  });

  describe('Quote defaults', () => {
    it('is created with a default symbol and price', () => {
      const order = new Quote();

      expect(order.get('price')).toEqual(0);
      expect(order.get('symbol')).toEqual('UNDEF');
      expect(order.get('buy')).toEqual(false);
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
});
