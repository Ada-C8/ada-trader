import Order from 'models/order';
import Quote from 'models/quote';

describe('Order spec', () => {
  let order;
  let quote;

  beforeEach(() => {
    quote = new Quote({
      symbol: 'HELLO',
      price: 101.00,
    });

    order = new Order({
      symbol: 'HELLO',
      targetPrice: 100.00,
      matchedQuote: quote,
      buy: true,
    });

    // can add a collection here too if nec.
  });

  describe('the validate function', () => {
    it ('creates a valid order', () => {
      expect(order.isValid()).toBeTruthy();
    });
    it ('symbol cannot be blank', () => {
      order.set('symbol', null);
      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({ ['symbol']: [ 'symbol cannot be blank' ] });
    });

    it ('price cannot be blank', () => {
      order.set('targetPrice', null);
      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({ ['price-target']: [ 'price-target cannot be blank or less than 1' ] });
    });
    it ('creates a valid order', () => {

    });


  });

  describe('the comparePrice function', () => {
    it ('does this', () => {

    });
  });


});
