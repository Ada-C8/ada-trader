import Backbone from 'backbone';
import _ from 'underscore';

import QuoteView from '../views/quote_view';
import TradeView from '../views/trade_view';
import Quote from '../models/quote';

const TradeListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.bus, 'tradeMe', (model) => {
      if (model) {
        this.render(model);
      }
    });
  },
  render(params) {
    console.log('in trade list render');
    const tradeView = new TradeView({
      model: params,
      template: this.template,
      bus: this.bus,
      tagName: 'li',
      className: 'trade',
    });
    this.$('#trades').prepend(tradeView.render().$el);
  }
});

export default TradeListView;
