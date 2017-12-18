import Order from 'models/order';
import Quote from 'models/quote';


describe('Order spec', () => {
  let quote;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'RADISH',
      price: 100.00,
    });
  });

  describe('Validate function', () => {
    it ('validates that a symbol is present for an order', () => {
      const invalidSymbols = [undefined, ' ', ''];
      const validSymbol = 'NICEJOB';

      invalidSymbols.forEach((symbol) => {
        const order = new Order({symbol: symbol, targetPrice: 100.00});

        expect(order.isValid()).toBeFalsy();
      });

      const validOrder = new Order({symbol: validSymbol, targetPrice: 100.00 });

      expect(validOrder.isValid()).toBeTruthy();
    });

    it('validates there is an integer price for an order', () => {
      const invalidPrices = [0,undefined,' ','', NaN];
      const validPrices = [0, 50, 1000.00];
      const validSymbol = 'DAIKON';

      invalidPrices.forEach((price)=> {
        const order = new Order({symbol: validSymbol, targetPrice: price});

        expect(order.isValid()).toBeFalsy();
      });

      validPrices.forEach((price)=> {
        const validOrder = new Order({symbol: validSymbol, targetPrice: price});

        expect(validOrder.isValid()).toBeTruthy();
      });

    });

  })


});
