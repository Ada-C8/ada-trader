// import Order from '../src/models/order';
import Order from 'models/order';

describe('Order spec', () => {

  describe('Initialize function', () => {
    it('should exhibit attibutes', () => {
      const order = new Order({
        targetPrice: 88.60,
        buy: true,
        symbol: 'HUMOR',
      });

      expect(order.get('targetPrice'))
        .toEqual(88.60);
      expect(order.get('buy'))
        .toEqual(true);
      expect(order.get('symbol'))
        .toEqual('HUMOR');
    });
  });

  describe('Validate function', () => {
    it('returns an object with correct message if missing targetPrice', () => {
      // const order = new Order({
      //     // targetPrice: 88.60,
      //     buy: true,
      //     symbol: 'HUMOR',
      //   });
      // });
      //
      // // const startPrice = order.get('price');
      // expect(order.validationError).toEqual(['A price is required']);

      // expect(order).toThrow(new Error('model is required'));
      const order = new Order({
        targetPrice: 88.60,
        buy: true,
        symbol: 'HUMOR',
      });


      eventSpy = sinon.spy();
        this.order.bind("error", eventSpy);
        this.order.save({"targetPrice": '0'});
        expect(this.eventSpy.calledOnce).toBeTruthy();
        expect(this.eventSpy.calledWith(
          this.todo,
          'A price is required'
        )).toBeTruthy();
    });
  });
});
//   describe('Sell function', () => {
//     it('decreases the price by $1.00', () => {
//       const startPrice = quote.get('price');
//
//       quote.sell();
//
//       expect(quote.get('price')).toEqual(startPrice - 1.00);
//     });
//   });
// });
