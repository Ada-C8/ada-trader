// import Backbone from 'backbone';
import Order from 'models/order';
import Quote from 'models/quote';

describe('Order spec', () => {
  // let order;
  // beforeEach(() => {
  //   order = new Order({
  //     symbol: 'HUMOR',
  //     targetPrice: 60,
  //     buy: true,
  //   });
  // });

  describe('Default values', () => {
    it('can be created with default values', () => {
      const emptyOrder = new Order();

      expect(emptyOrder.get('symbol')).toBe('UNDEF');
      expect(emptyOrder.get('targetPrice')).toBe(0.00);
      expect(emptyOrder.get('buy')).toBe(true);
    });
  });

  describe('Set attributes', () => {
    it('will set passed attributes to the model instance when created (buy)', () => {
      let order = new Order({
        symbol: 'HUMOR',
        targetPrice: 60,
        buy: true,
      });

      expect(order.get('symbol')).toBe('HUMOR');
      expect(order.get('targetPrice')).toBe(60);
      expect(order.get('buy')).toBe(true);
    });

    it('fires a custom event when the state changes.', () => {
      let spy = jasmine.createSpy('-change event callback-');
      let order = new Order();
      order.on('change', spy);
      order.set({symbol: 'CLOTH'});

      expect(spy).toHaveBeenCalled();
    });

    it('will set passed attributes to the model instance when created (sell)', () => {
      let order = new Order({
        symbol: 'CLOTH',
        targetPrice: 100,
        buy: false,
      });

      expect(order.get('symbol')).toBe('CLOTH');
      expect(order.get('targetPrice')).toBe(100);
      expect(order.get('buy')).toBe(false);
    });
  });

  describe('Validation errors', () => {
    it('buy has to be a boolean', () => {

      let order = new Order({
        symbol: 'CLOTH',
        targetPrice: 100,
        buy: 'not a boolean',
      });

      let quote = new Quote({
        symbol: 'CLOTH',
        price: 100.00,
      });

      order.legalQuotes = [quote]

      order.isValid();

      expect(order.validationError).toBeDefined();

      expect(order.validationError.buy).toBeDefined();

      expect(order.validationError.buy[0]).toBe('Invalid buy value (must be boolean)');
    });

    it('targetPrice has to be a number', () => {

      let order = new Order({
        symbol: 'CLOTH',
        targetPrice: 'not a number',
        buy: true,
      });

      let quote = new Quote({
        symbol: 'CLOTH',
        price: 100.00,
      });

      order.legalQuotes = [quote]

      order.isValid();

      expect(order.validationError).toBeDefined();

      expect(order.validationError.targetPrice).toBeDefined();

      expect(order.validationError.targetPrice[0]).toBe('Invalid target price');
    });

    it('symbol has to be one of the quotes\'s symbol', () => {

      let order = new Order({
        symbol: 'NOT A QUOTE SYMBOL',
        targetPrice: 50,
        buy: true,
      });

      let quote = new Quote({
        symbol: 'CLOTH',
        price: 100.00,
      });

      order.legalQuotes = [quote]

      order.isValid();

      expect(order.validationError).toBeDefined();

      expect(order.validationError.symbol).toBeDefined();

      expect(order.validationError.symbol[0]).toBe('Invalid symbol');
    });

    it('targetPrice as to be lower than the quote\'s price for buy', () => {

      let order = new Order({
        symbol: 'CLOTH',
        targetPrice: 500,
        buy: true,
      });

      let quote = new Quote({
        symbol: 'CLOTH',
        price: 100.00,
      });

      order.legalQuotes = [quote]
      order.currentQuotePrice = quote.attributes.price;

      order.isValid();

      expect(order.validationError).toBeDefined();

      expect(order.validationError.targetPrice).toBeDefined();

      expect(order.validationError.targetPrice[0]).toBe('Price higher than market price!');
    });

    it('targetPrice as to be higher than the quote\'s price for sell', () => {

      let order = new Order({
        symbol: 'CLOTH',
        targetPrice: 5,
        buy: false,
      });

      let quote = new Quote({
        symbol: 'CLOTH',
        price: 100.00,
      });

      order.legalQuotes = [quote]
      order.currentQuotePrice = quote.attributes.price;

      order.isValid();

      expect(order.validationError).toBeDefined();

      expect(order.validationError.targetPrice).toBeDefined();

      expect(order.validationError.targetPrice[0]).toBe('Price lower than market price!');
    });
  });

  describe('trade function', () => {
    // TO DO
  });

});
