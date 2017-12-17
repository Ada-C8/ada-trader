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
      const quote = new Quote();

      expect(quote.get('price')).toEqual(0);
      expect(quote.get('symbol')).toEqual('UNDEF');
    });
  });

  describe('Quote validations', () => {
    it('returns no errors for valid submitted parameters', () => {
      const quote = new Quote({
        symbol: 'UNDEF',
        price: 15.00,
        buy: true,
      });

      expect(quote.isValid()).toBeTruthy();
      expect(quote.validationError).toBeNull();
    });

    it('returns an error if a symbol is blank', () => {
      const quote = new Quote({
        symbol: '',
        price: 15.00,
        buy: true,
      });

      expect(quote.isValid()).toBeFalsy();
      expect(quote.validationError).toEqual({symbol: "Symbol cannot be blank!"});
    });

    it('returns an error if a price is blank', () => {
      const quote = new Quote({
        symbol: 'HUMOR',
        price: '', // Blank evaluates to blank
        buy: true,
      });

      expect(quote.isValid()).toBeFalsy();
      expect(quote.validationError).toEqual({price: "Your starting quote price cannot be blank!"});
    });

    it('returns an error if a price is zero', () => {
      const quote = new Quote({
        symbol: 'HUMOR',
        price: 0,
        buy: true,
      });

      expect(quote.isValid()).toBeFalsy();
      expect(quote.validationError).toEqual({price: "Market price must be greater than 0!"});
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
