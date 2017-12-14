import Order from 'models/order';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';

describe('Order spec', () => {
  let order;
  let quotes;
  beforeEach(() => {
    quotes = new QuoteList([
      {
        symbol: 'HELLO',
        price: 100.00,
      },
      {
        symbol: 'HUMOR',
        price: 85.00,
      }
    ])
    order = new Order({
      quotes: quotes,
      symbol: 'HELLO',
      buy: true,
      targetPrice: 90.00,
    });
  });

  describe('getCurrentPrice function', () => {
    it ('gets the current (market) price of the quote', () => {
      const mktPrice = quotes.findWhere({symbol: 'HELLO'}).get('price');

      expect(mktPrice).toEqual(100.00);
      expect(order.getCurrentPrice()).toEqual(mktPrice);
    });
  });
  // describe('Buy function', () => {
  //   it('increases the price by $1.00', () => {
  //     const startPrice = quote.get('price');
  //
  //     quote.buy();
  //
  //     expect(quote.get('price')).toEqual(startPrice + 1.00);
  //   });
  // });
  //
  // describe('Sell function', () => {
  //   it('decreases the price by $1.00', () => {
  //     const startPrice = quote.get('price');
  //
  //     quote.sell();
  //
  //     expect(quote.get('price')).toEqual(startPrice - 1.00);
  //   });
  // });
});
