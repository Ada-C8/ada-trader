import OpenOrder from 'models/open_order';
import Quote from 'models/quote';


describe('openOrder spec', () => {
  let quote90;
  let quote100;
  let quote110;
  beforeEach(() => {
    quote100 = new Quote({
      symbol: 'HELLO',
      price: 100.00,
    });

    quote90 = new Quote({
      symbol: 'HELLO',
      price: 90.00,
    });

    quote110 = new Quote({
      symbol: 'HELLO',
      price: 110.00,
    });
  });

  describe('validate', () => {
    it('an openOrder must have a symbol', () => {
      let openOrder = {}
      openOrder = new OpenOrder({
        targetPrice: 95.00,
        quote: quote100,
        buy: true
      });

      expect(openOrder.isValid()).toEqual(false)
      expect(openOrder.validationError['Symbol']).toEqual(['Validate failed: Symbol is required'])
    });

    it('an openOrder must have a targetPrice', () => {
      let openOrder = {}
      openOrder = new OpenOrder({
        symbol: 'HELLO',
        quote: quote100,
        buy: true
      });

      expect(openOrder.isValid()).toEqual(false)
      expect(openOrder.validationError['targetPrice']).toEqual(['Validate failed: Price is required'])
    });

    it('FOR A BUY ORDER: targetPrice must be less than the current price', () => {
      let openOrder = {}
      openOrder = new OpenOrder({
        symbol: 'HELLO',
        quote: quote100,
        targetPrice: 110.00,
        buy: true
      });

      expect(openOrder.isValid()).toEqual(false)
      expect(openOrder.validationError['buyPrice']).toEqual(['Validate failed: Target price is greater than the current price'])
    });

    it('FOR A SELL ORDER: targetPrice must be greater than the current price', () => {
      let openOrder = {}
      openOrder = new OpenOrder({
        symbol: 'HELLO',
        quote: quote100,
        targetPrice: 90.00,
        buy: false
      });

      expect(openOrder.isValid()).toEqual(false)
      expect(openOrder.validationError['sellPrice']).toEqual(['Validate failed: Target price is less than than the current price'])
    });
  });

  describe('validTransaction', () => {
    it('FOR A BUY ORDER: a buy message is returned if the targetPrice is less than the current price', () => {
      let openOrder = {}
      openOrder = new OpenOrder({
        symbol: 'HELLO',
        targetPrice: 95.00,
        quote: quote90,
        buy: true,
      });

      expect(openOrder.validTransaction()).toEqual('buy')
    });

    it('FOR A BUY ORDER: a hold message is returned if the targetPrice is more than the current price', () => {
      let openOrder = {}
      openOrder = new OpenOrder({
        symbol: 'HELLO',
        targetPrice: 95.00,
        quote: quote100,
        buy: true,
      });

      expect(openOrder.validTransaction()).toEqual('hold')
    });

    it('FOR A SELL ORDER: a hold message is returned if the targetPrice is less than the current price', () => {
      let openOrder = {}
      openOrder = new OpenOrder({
        symbol: 'HELLO',
        targetPrice: 95.00,
        quote: quote90,
        buy: false,
      });

      expect(openOrder.validTransaction()).toEqual('hold')
    });

    it('FOR A SELL ORDER: a sell message is returned if the targetPrice is more than the current price', () => {
      let openOrder = {}
      openOrder = new OpenOrder({
        symbol: 'HELLO',
        targetPrice: 95.00,
        quote: quote100,
        buy: false,
      });
      
      expect(openOrder.validTransaction()).toEqual('sell')
    });
  });



  // describe('deleteOrder', () => {
  //   it('destorys a model', () => {
  //   let openOrder = {}
  //   openOrder = new OpenOrder({
  //     symbol: 'HELLO',
  //     targetPrice: 95.00,
  //     quote: quote100,
  //     buy: false
  //   });
  //   // // openOrder.deleteOrder()
  //   // expect(openOrder.deleteOrder()).toBeFalsy()
  //
  //   expect(openOrder).not.toHaveBeenDestroyed();
  //   openOrder.deleteOrder()
  //   expect(openOrder).toHaveBeenDestroyed();;
  // });
  // });
});
