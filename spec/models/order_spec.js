import Order from 'models/order';
import Quote from 'models/quote';

describe('Order spec', () => {
  let order;
  beforeEach(() => {
    order = new Order({
      symbol: 'HELLO',
      price: 100.00,
    });
  });

  describe('initialize', () => {

  });

  describe('validate', () => {

  });
});
