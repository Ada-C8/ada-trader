import Order from 'models/order';
import _ from 'underscore';
import Backbone from 'backbone';

describe('Order spec', () => {
  let order;
  let eventBus;
  const higherPrice = '150';
  const lowerPrice = '50';
  beforeEach(() => {
    eventBus = {};
    eventBus = _.extend(eventBus, Backbone.Events);
    order = new Order({
      symbol: 'VALID',
      buy: true,
      targetPrice: '100',
      bus: eventBus,
    });
  });

  describe('Validations', () => {
    it('Will not allow a blank symbol', () => {
      order.set('symbol', '');

      expect(order.isValid()).toEqual(false);
      expect(order.validationError).toEqual({symbol: ['Symbol is required']});
    });

    it('Will not allow a blank targetPrice', () => {
      order.set('targetPrice', '');

      expect(order.isValid()).toEqual(false);
      expect(order.validationError).toEqual({price: ['Invalid target price']});
    });

    it('Will not allow a NaN targetPrice', () => {
      order.set('targetPrice', NaN);

      expect(order.isValid()).toEqual(false);
      expect(order.validationError).toEqual({price: ['Invalid target price']});
    });
  });

  // TODO: @Chris and @dee, not sure why the below tests do not work and I believe it's related to using an eventbus?
  describe('Order responds to priceChange events', () => {
    describe('buy orders', () => {
      it('will trigger an addTrade event if the price is lower than the target price', () => {
        const spy = spyOn(eventBus, 'trigger');
        eventBus.trigger(`priceChange${order.get('symbol')}`, lowerPrice)

        expect(spy).toHaveBeenCalledWith('addTrade', {
          symbol: order.get('symbol'),
          buy: order.get('buy'),
          price: parseFloat(lowerPrice),
        });
      });

      xit('will not trigger addTrade event if the price is higher than the target price', () => {
        // const spy = spyOn(eventBus, 'trigger');
        eventBus.trigger(`priceChange${order.get('symbol')}`, higherPrice);

        expect(spy).not.toHaveBeenCalledWith('addTrade', {
        symbol: order.get('symbol'),
        buy: order.get('buy'),
        price: parseFloat(lowerPrice),
      });
      });
    });

    describe('sell orders', () => {
      // xit('will not trigger addTrade event if the price is lower than the target price', () => {
      //
      // });
    });
  });
});
