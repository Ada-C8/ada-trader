import Order from 'models/order';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';

  describe('model validations', () => {
    let quote;
    let buyAttributes;
    let sellAttributes;
    beforeEach(() => {
      quote = new Quote({
        symbol: 'HELLO',
        price: 100.00,
      });
      buyAttributes = {
      symbol: 'HELLO',
      targetPrice: 99.00,
      buy: true,
      activeQuote: quote,
      }
    });

    it('price cannot be blank', () => {
      buyAttributes['targetPrice'] = ''
      // const attributes = {
      // symbol: 'HELLO',
      // targetPrice: "",
      // buy: true,
      // activeQuote: quote,
      // }
      let newOrder = new Order(buyAttributes);
      expect(newOrder.isValid()).toEqual(false);
    });

    it('price cannot be less than zero', () => {
      buyAttributes['targetPrice'] = -10

      // const attributes = {
      // symbol: 'HELLO',
      // targetPrice: -10,
      // buy: true,
      // activeQuote: quote,
      // }
      let newOrder = new Order(buyAttributes);
      expect(newOrder.isValid()).toEqual(false);
    });

    it('symbol cannot be empty', () => {
      buyAttributes['symbol'] = ''
      // const attributes = {
      // symbol: 'HELLO',
      // targetPrice: -10,
      // buy: true,
      // activeQuote: quote,
      // }
      let newOrder = new Order(buyAttributes);
      expect(newOrder.isValid()).toEqual(false);
    });
  });
