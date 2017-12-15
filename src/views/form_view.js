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
    const formQuote = this.$('select option:selected').text();
    const formPrice = this.$('input').val();
    console.log(formQuote);
    console.log(formPrice);
    const quote = this.model.findWhere({
        symbol: formQuote
      });
    const order = new Order({
      quote: quote,
      buy: true,
      price: formPrice
    });
    if (order.isValid()) {
      this.bus.trigger('newOrder', order);
    }
  }

});

export default FormView;
