import OpenOrder from 'models/open_order';
import Quote from 'models/quote';
import TradeList from 'collections/trade_list';
import OpenOrderList from 'collections/open_order_list';
import _ from 'underscore'
import Backbone from 'backbone'


describe('OpenOrder spec', () => {
  let buyOpenOrder;
  let sellOpenOrder;
  let bogusOpenOrder
  let validOpenOrder;
  beforeEach(() => {

    buyOpenOrder = new OpenOrder({
      symbol: 'HELLO',
      targetPrice: 100.00,
      quote: new Quote({symbol: 'HELLO', price: 102.00 }),
      buy: true,
    });

    sellOpenOrder = new OpenOrder({
      symbol: 'HELLO',
      targetPrice: 100.00,
      quote: new Quote({symbol: 'HELLO', price: 98.00 }),
      buy: false,
    });

  });

  describe('Validation function', () =>{
    it('will fail an openOrder whose buy price is too high', ()=> {
      const bogusOpenOrder = new OpenOrder({
        symbol: 'HI',
        targetPrice: 100.00,
        quote: new Quote({symbol: 'HELLO', price: 98.00 }),
        buy: true
      });
      let result = bogusOpenOrder.isValid()
      expect(result).toEqual(false)
    });

    it('will fail an openOrder whose sell price is too high', ()=> {
      const bogusOpenOrder = new OpenOrder({
        symbol: 'HI',
        targetPrice: 98.00,
        quote: new Quote({symbol: 'HELLO', price: 100.00 }),
        buy: false
      });
      let result = bogusOpenOrder.isValid()
      expect(result).toEqual(false)
    });

    it('will pass an openOrder whose buy price is not too high', ()=> {
      const validOpenOrder = new OpenOrder({
        symbol: 'HI',
        targetPrice: 98.00,
        quote: new Quote({symbol: 'HELLO', price: 100.00 }),
        buy: true
      });
      let result = validOpenOrder.isValid()
      expect(result).toEqual(true)
    });

    it('will pass an openOrder whose sell price is not too low', ()=> {
      const validOpenOrder = new OpenOrder({
        symbol: 'HI',
        targetPrice: 100.00,
        quote: new Quote({symbol: 'HELLO', price: 98.00 }),
        buy: false
      });
      let result = validOpenOrder.isValid()
      expect(result).toEqual(true)
    });

    it('will fail a buy openOrder whose price is not a number', ()=> {
      const bogusOpenOrder = new OpenOrder({
        symbol: 'HI',
        targetPrice: 'e',
        quote: new Quote({symbol: 'HELLO', price: 98.00 }),
        buy: true
      });
      let result = bogusOpenOrder.isValid()
      expect(result).toEqual(false)
    });

    it('will fail a sell openOrder whose price is not a number', ()=> {
      const bogusOpenOrder = new OpenOrder({
        symbol: 'HI',
        targetPrice: 'e',
        quote: new Quote({symbol: 'HELLO', price: 98.00 }),
        buy: true
      });
      let result = bogusOpenOrder.isValid()
      expect(result).toEqual(false)
    });


  }); //end of describe validate

  describe('Check function', () => {
    it('buys the quote and destroys the openOrder if the quotes is less than or equal to the openOrder targetPrice', () => {

      let bus = {}
      bus = _.extend(bus, Backbone.Events)
      const tradeList = new TradeList(bus);
      const openOrderList = new OpenOrderList();

      let tradeListLength = tradeList.length
      let openOrderListLength = openOrderList.length

      const validOpenOrder = new OpenOrder({
        symbol: 'HI',
        targetPrice: 100.00,
        quote: new Quote({symbol: 'HELLO', price: 100.00 }),
        buy: true,
        bus: bus,
      });

      openOrderList.add(validOpenOrder)

      expect(openOrderList.length).toEqual(openOrderListLength + 1)

      validOpenOrder.check(validOpenOrder.quote)

      let endTradeListLength = tradeList.length

      expect(openOrderList.length).toEqual(openOrderListLength)

      expect(endTradeListLength).toEqual(1)

    });

    it('sells the quote and destroys the openOrder if the quotes is greater than or equal to the openOrder targetPrice', () => {
      let bus = {}
      bus = _.extend(bus, Backbone.Events)
      const tradeList = new TradeList(bus);
      const openOrderList = new OpenOrderList();

      let tradeListLength = tradeList.length
      let openOrderListLength = openOrderList.length

      const validOpenOrder = new OpenOrder({
        symbol: 'HI',
        targetPrice: 100.00,
        quote: new Quote({symbol: 'HELLO', price: 100.00 }),
        buy: false,
        bus: bus,
      });

      openOrderList.add(validOpenOrder)

      expect(openOrderList.length).toEqual(openOrderListLength + 1)

      validOpenOrder.check(validOpenOrder.quote)

      let endTradeListLength = tradeList.length

      expect(openOrderList.length).toEqual(openOrderListLength)

      expect(endTradeListLength).toEqual(1)
    });


  });
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
