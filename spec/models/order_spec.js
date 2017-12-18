import Order from 'models/order';
import Quote from 'models/quote';
import OrderList from 'collections/order_list'

describe('Order spec', () => {
  let order;
  let quote;
  let tempOrder;

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

    tempOrder = new Order({
      symbol: 'HELLO',
      targetPrice: 80.00,
      matchedQuote: quote,
      buy: true,
    });
    // can add a collection here too if nec.
    // ...listenTo(whatever you're destroying, 'destroy', () =>{
      // })
  });

  describe('the validate function', () => {
    it ('creates a valid order', () => {
      expect(order.isValid()).toBeTruthy();
    });

    it ('cannot have a blank symbol', () => {
      order.set('symbol', null);
      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({ ['symbol']: [ 'symbol cannot be blank' ] });
    });

    it ('cannot have a blank price', () => {
      order.set('targetPrice', null);
      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({ ['price-target']: [ 'price-target cannot be blank or less than 1'] });
    });

    it ('cannot have a negative price', () => {
      order.set('targetPrice', -1);
      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({ ['price-target']: [ 'price-target cannot be blank or less than 1'] });
    });

    it ('cannot create a buy order above market value', () => {
      order.set('targetPrice', 102);
      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({ ['price-target']: [ 'buy price cannot be above market value'] });
    });
    it ('cannot create a sell order below market value', () => {
      order.set('buy', false);
      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({ ['price-target']: [ 'sell price cannot be below market value'] });
    });

  });

  describe('the comparePrice function', () => {
    it ('removes an open buy order from the orders collection when quote price is equal to or below targetPrice ', () => {
      const tempOrder = new Order({
        symbol: 'HELLO',
        targetPrice: 80.00,
        matchedQuote: quote,
        buy: true,
      });
      const orders = new OrderList([order, tempOrder]);
      expect(orders.length).toEqual(2);
      quote.set('price', 99);
      order.comparePrice();
      expect(orders.length).toEqual(1);
    });

    it ('removes an open sell order from the orders collection when quote price is equal to or above targetPrice', () => {
      order.set('buy', false);
      order.set('targetPrice', 102)
      const orders = new OrderList([order, tempOrder]);
      expect(order.isValid()).toBeTruthy();
      expect(tempOrder.isValid()).toBeTruthy();
      expect(orders.length).toEqual(2);
      quote.set('price', 103);
      order.comparePrice();
      expect(orders.length).toEqual(1);
    });

    // it ('does this', () => {
    // });
  });


});
