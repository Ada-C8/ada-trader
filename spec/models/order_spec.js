import Order from 'models/order';
import Quote from 'models/quote';
// import QuoteList from 'collections/quote_list';

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
    });
    sellOrder = new Order({
      symbol: 'HELLO',
      targetPrice: 101.00,
      buy: false,
      activeQuote: quote,
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

  // it('symbol must be from quote list', () => {
  //   buyAttributes['symbol'] = ''
  //   let newOrder = new Order(buyAttributes);
  //   expect(newOrder.isValid()).toEqual(false);
  // });

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
