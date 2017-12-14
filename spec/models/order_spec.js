import Order from 'models/order';
import Quote from 'models/quote';

describe('Order spec', () => {
  let quote;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'HELLO',
      price: 90.00,
    });
  });

  describe('validate', () => {
    it('validates there is a price', () => {
      const prices = ['', NaN, undefined, 0]

      prices.forEach((price)=> {
        const order = new Order({targetPrice: price});

        expect(order.isValid()).toBeFalsy();
      });

    });

    it('validates the buy price cant be higher than market', () => {
      const prices = [90,100,1000000];

      prices.forEach((price)=> {
        const order = new Order({targetPrice: price, buy: true, quote: quote});

        expect(order.isValid()).toBeFalsy();
      });
    });

    it('validates the buy price is lower than market', () => {
      const prices = [1,54.32, 89.99];

      prices.forEach((price)=> {
        const order = new Order({targetPrice: price, buy: true, quote: quote});

        expect(order.isValid()).toBeTruthy();
      });
    });

    it('validates the sell price cant be higher than market', () => {
      const prices = [90.00,100,1000000];

      prices.forEach((price)=> {
        const order = new Order({targetPrice: price, buy: true, quote: quote});

        expect(order.isValid()).toBeFalsy();
      });

      it('validates the sell price is lower than market', () => {
        const prices = [1,54.32, 89.99];

        prices.forEach((price)=> {
          const order = new Order({targetPrice: price, buy: true, quote: quote});

          expect(order.isValid()).toBeTruthy();
        });
      });
    });
  });

  describe('orderMe function', () => {

    it('buys if market price is below target price', () => {
      const startPrice = 90;
      const quote = new Quote({price: startPrice});
      const order = new Order({
        targetPrice: 95,
        buy: true,
        quote: quote,
      });
      console.log('call');
      order.orderMe();

      expect(quote.get('price')).toEqual(startPrice + 1.00);
    });

    it('doesnt buy if market price is above target', () => {
      const startPrice = 90;
      const quote = new Quote({price: startPrice});
      const order = new Order({
        targetPrice: 85,
        buy: true,
        quote: quote,
      });

      order.orderMe();

      expect(quote.get('price')).toEqual(startPrice);
    });

    it('sells if market price is above target', () => {
      const startPrice = 90;
      const quote2 = new Quote({price: startPrice, symbol: 'hi'});
      const order = new Order({
        targetPrice: 85,
        buy: false,
        quote: quote2,
      });
      console.log('call');
      order.orderMe();
      console.log('call');
      // console.log(quote2)
      expect(quote2.get('price')).toEqual(startPrice - 1.00);
    });

    it('doesnt sell if market is below target',() => {
      const startPrice = 90;
      const quote = new Quote({price: startPrice});
      const order = new Order({
        targetPrice: 95,
        buy: false,
        quote: quote,
      });

      order.orderMe();

      expect(quote.get('price')).toEqual(startPrice);
    });
  });
});
