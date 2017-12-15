import Order from 'models/order';
import _ from 'underscore';
import Backbone from 'backbone';

describe('Order spec', () => {
  let order;
  let eventBus;
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

    it('Will not allow a blank or NaN targetPrice', () => {
      order.set('targetPrice', '');

      expect(order.isValid()).toEqual(false);
      expect(order.validationError).toEqual({price: ['Invalid target price']});
    });
  });
});
