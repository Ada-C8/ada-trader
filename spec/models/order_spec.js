import Order from 'models/order';
import Quote from 'models/quote';
import OrderList from 'collections/order_list'

describe('Order spec', () => {
  let quote;
  let order;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'HELLO',
      price: 100.00,
    });

    order = new Order({
        quote: quote,
        buy: true,
        symbol: 'HELLO',
        targetPrice: 100.00,
      })
  });

  describe('Create a valid order', () => {
    it('Creates a buy order when given a valid symbol and price', () => {

      order.set('targetPrice', 99.00)

      expect(order.invalid()).toEqual(false);
    });

    it('Creates a sell order when given a valid symbol and price', () => {

      order.set('buy', false);
      order.set('targetPrice', 101.00)

      expect(order.invalid()).toEqual(false);
    })
  })

  describe('Validating Orders', () => {
    describe('Invalid Orders', () => {
      it('Price must be a number', () => {
        order.set('targetPrice', 'cool')

        expect(order.invalid()).toEqual({price: [ 'Invalid Price!'] });
      });

      it('Price must be greater than 0', () => {
        order.set('targetPrice', 0)

        expect(order.invalid()).toEqual({price: [ 'Invalid Price!']});
      });


      it('Symbol must not be empty', () => {
        order.set('symbol', '')
        order.set('targetPrice', 99.00)

        expect(order.invalid()).toEqual({symbol: [ 'Invalid Symbol']});
      });
    })

    describe('Buy Orders', () => {
      it('targetPrice must be lower than market price', () => {

      expect(order.invalid()).toEqual({price: [ 'Target Price higher than Market Price!'] });

      });
    })

    describe('Sell Orders', () => {
      beforeEach(() => {
        order.set('buy', false)
      });

      it('targetPrice must be higher than marketPrice', () => {
        order.set('targetPrice', 99);
        expect(order.invalid()).toEqual({price: [ 'Target Price at or below Market Price!'] });
      });
    })

    describe('priceCheck', () => {
      describe('buyOrder', () => {
        it('executes a buy when quote price drops below targetPrice', () => {

        });

        it('does not execute order until price drops below target', () => {

        });
      });

      describe('sellOrder', () => {
        it('executes order when quote exceeds targetPrice', () => {
          
        });

        it('does not execute order until quote exceeds targetPrice', () => {

        })
      })
    });
  });
});
