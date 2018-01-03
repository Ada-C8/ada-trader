import Order from 'models/order';

describe('Order', () => {
  let order;
  beforeEach(() => {
    order = new Order({
           symbol: 'HUMOR',
              buy: true,
       stockPrice: 50.00,
      targetPrice: 40.00,
    });
  });

  describe('defaults', () => {
    it('has a default symbol of UNDEF', () => {
      order = new Order();
      expect(order.get('symbol')).toEqual('UNDEF');
    });
    it('initializes triggered as false', () => {
      order = new Order();
      expect(order.get('triggered')).toBe(false);
    });
  });

  describe('validates', () => {
    it('valid data', () => {
      expect(order.isValid()).toBe(true);
    });

    describe('stockPrice', () => {
      it('exists', () => {
        order.unset('stockPrice');
        expect(order.isValid()).toBe(false);
      });
    });

    describe('targetPrice', () => {
      it('exists', () => {
        order.unset('targetPrice');
        expect(order.isValid()).toBe(false);
      });

      it('is not equal to stockPrice', () => {
        order.set('stockPrice', 40.00);
        expect(order.isValid()).toBe(false);
      });

      it('isnt higher than stockPrice, if a buy', () => {
        order.set('stockPrice', 30.00);
        expect(order.isValid()).toBe(false);
      });

      it('isnt lower than stockPrice, if a sell', () => {
        order.set('buy', false);
        expect(order.isValid()).toBe(false);
      });
    });
  });
});
