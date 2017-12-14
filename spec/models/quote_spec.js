import Quote from 'models/quote';

describe('Quote', () => {
  let quote;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'HELLO',
       price: 100.00,
    });
  });

  describe('Defaults', () => {
    it('has a default symbol of UNDEF', () => {
      quote = new Quote();
      expect(quote.get('symbol')).toEqual('UNDEF');
    });

    it('has a default price of 0.00', () => {
      quote = new Quote();
      expect(quote.get('price')).toEqual(0.00);
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
