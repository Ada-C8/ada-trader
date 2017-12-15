import Backbone from 'backbone';
import _ from 'underscore';

import Order from 'models/order';
import Quote from 'models/quote';

describe('model validations', () => {
  let quote;
  let buyOrder;
  let sellOrder;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'HELLO',
      price: 100.00,
    });
    buyOrder = new Order({
      symbol: 'HELLO',
      targetPrice: 99.00,
      buy: true,
      activeQuote: quote,
      symbolList: ['HELLO']
    });
    sellOrder = new Order({
      symbol: 'HELLO',
      targetPrice: 101.00,
      buy: false,
      activeQuote: quote,
      symbolList: ['HELLO']
    });
  });

  it('valid buy order will initialize', () => {
    expect(buyOrder.isValid()).toEqual(true);
  });

  it('valid sell order will initialize', () => {
    expect(sellOrder.isValid()).toEqual(true);
  });

  it('price cannot be blank', () => {
    buyOrder.set('targetPrice', '');
    expect(buyOrder.isValid()).toEqual(false);
  });

  it('price cannot be less than zero', () => {
    buyOrder.set('targetPrice', -10);
    expect(buyOrder.isValid()).toEqual(false);
  });

  it('symbol cannot be empty', () => {
    buyOrder.set('symbol', '');
    expect(buyOrder.isValid()).toEqual(false);
  });

  it('symbol must be from quote list', () => {
    buyOrder.set('symbol', 'GOODBYE');
    expect(buyOrder.isValid()).toEqual(false);
  });

  it('buy price cannot be higher than current price', () => {
    buyOrder.set('targetPrice', 101.00);
    expect(buyOrder.isValid()).toEqual(false);
  });

  it('buy price cannot be equal to current price', () => {
    buyOrder.set('targetPrice', 100.00);
    expect(buyOrder.isValid()).toEqual(false);
  });

  it('sell price cannot be lower than current price', () => {
    sellOrder.set('targetPrice', 100.00);
    expect(sellOrder.isValid()).toEqual(false);
  });

  it('sell price cannot be equal to current price', () => {
    sellOrder.set('targetPrice', 100.00);
    expect(sellOrder.isValid()).toEqual(false);
  });
});

describe('model custom methods', () => {
 let testOrder1;
 let testOrder2;
 let bus;
  beforeEach(() => {
  bus = {};
  bus = _.extend(bus, Backbone.Events);

  const quote = new Quote({
    symbol: 'HELLO',
    price: 100.00,
  });

  const buyOrderData = {
    symbol: 'HELLO',
    targetPrice: 99.00,
    buy: true,
    bus: bus,
    activeQuote: quote,
    symbolList: ['HELLO']
  }

  const sellOrderData = {
    symbol: 'HELLO',
    targetPrice: 99.00,
    buy: false,
    bus: bus,
    activeQuote: quote,
    symbolList: ['HELLO']
  }

  testOrder1 = new Order(buyOrderData);
  testOrder2 = new Order(sellOrderData);
});

  it('valid buy order triggers bus', () => {
    const spy = spyOn(bus, 'trigger');
    testOrder1.quote.set('price', 50.00);
    expect(spy).toHaveBeenCalled();
  });

  it('valid sell order triggers bus', () => {
    const spy = spyOn(bus, 'trigger');
    testOrder2.quote.set('price', 101.00);
    expect(spy).toHaveBeenCalled();
  });

});
