import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    triggered: false,
  },

  validate(params) {
    const errors = {};
    let error_message = '';

    if (!params.stockPrice) {
      error_message = 'Must enter a stock price';
      if (errors['stockPrice']) {
        errors['stockPrice'].push(error_message);
      } else {
        errors['stockPrice'] = [error_message];
      }
    }

    if (!params.targetPrice) {
      error_message = 'Must enter a price';
      if (errors['targetPrice']) {
        errors['targetPrice'].push(error_message);
      } else {
        errors['targetPrice'] = [error_message];
      }
    }

    if (params.buy) { // if it is a buy order
      if (params.targetPrice >= params.stockPrice) {
        error_message = 'Buy price must be lower than current stock price';
        if (errors['targetPrice']) {
          errors['targetPrice'].push(error_message);
        } else {
          errors['targetPrice'] = [error_message];
        }
      }
    } else { // if it is a sell order
      if (params.targetPrice <= params.stockPrice) {
        error_message = 'Sell price must be higher than current stock price';
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
