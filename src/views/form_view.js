import Backbone from 'backbone';
import _ from 'underscore';

import QuoteView from '../views/quote_view';
import Quote from '../models/quote';
import Order from '../models/order';

const FormView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
  },
  render() {
    this.model.each((quote) => {
      const compiledTemplate = this.template(quote.attributes);
      this.$('select').append(compiledTemplate);
    });
  },
  events: {
    'click button.btn-buy': 'createBuyOrder',
    'click button.btn-sell' : 'createSellOrder'
  },
  createBuyOrder: function(e) {
    this.createOrder(e, true);
  },

  createSellOrder: function(e) {
    this.createOrder(e, false);
  },

  createOrder: function(e, type) {
    e.preventDefault();
    const formQuote = this.$('select option:selected').text();
    const formPrice = this.$('input').val();
    const quote = this.model.findWhere({
        symbol: formQuote
      });
    const order = new Order({
      quote: quote,
      buy: type,
      price: parseFloat(formPrice),
      symbol: quote.get('symbol'),
      targetPrice: parseFloat(formPrice),
    });
    if (order.isValid()) {
      this.bus.trigger('newOrder', order);
    }
  }
});

export default FormView;
