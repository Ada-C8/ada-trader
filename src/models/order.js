import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
  },

  validate(params) {
    const errors = {};
    let error_message = '';

    if (!params.targetPrice) {
      error_message = 'must enter a price';
      if (errors['targetPrice']) {
        errors['targetPrice'].push(error_message);
      } else {
        errors['targetPrice'] = [error_message];
      }
    }

    if (params.buy) { // if it is a buy order
      if (params.targetPrice >= params.stockPrice) {
        error_message = 'must be lower than current price';
        if (errors['targetPrice']) {
          errors['targetPrice'].push(error_message);
        } else {
          errors['targetPrice'] = [error_message];
        }
      }
    } else { // if it is a sell order
      if (params.targetPrice <= params.stockPrice) {
        error_message = 'must be higher than current price';
        if (errors['targetPrice']) {
          errors['targetPrice'].push(error_message);
        } else {
          errors['targetPrice'] = [error_message];
        }
      }
    }

    return Object.keys(errors).length > 0 ? errors : false;
  },
});

export default Order;
