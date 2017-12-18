import Order from 'models/order';
import Quote from 'models/quote';
import OrderList from 'collections/order_list'

describe('Order spec', () => {
  let quote;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'HELLO',
      price: 100.00,
    });
  });

  let orderList;
  beforeEach(() => {
    orderList = new OrderList()
  })

  describe('Create a buy order', () => {
    it('Creates a buy order when given a valid symbol and price', () => {
      const order = new Order({
        buy: true,
        symbol: 'HELLO',
        targetPrice: 99.00,
        quote: quote,
      });

    //returning false means validaiton passed
    expect(order.invalid()).toEqual(false);

    })

    it('Creates a sell order when given a valid symbol and price', () => {
      expect(orderList.length).toEqual(0);

      const order = new Order({
        buy: false,
        symbol: 'HELLO',
        targetPrice: 101.00,
        quote: quote,
      });

      orderList.add(order)
      expect(orderList.length).toEqual(1);
    })
  })

  // describe('Buy function', () => {
  //   // it('increases the price by $1.00', () => {
  //   //   const startPrice = quote.get('price');
  //   //
  //   //   quote.buy();
  //   //
  //   //   expect(quote.get('price')).toEqual(startPrice + 1.00);
  //   // });
  // });
  //
  // describe('Sell function', () => {
  //   // it('decreases the price by $1.00', () => {
  //   //   const startPrice = quote.get('price');
  //   //
  //   //   quote.sell();
  //   //
  //   //   expect(quote.get('price')).toEqual(startPrice - 1.00);
  //   // });
  // });
});
