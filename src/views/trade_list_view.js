import Backbone from 'backbone';
import _ from 'underscore';
import Quote from '../models/quote';
import TradeView from '../views/trade_view';

const TradeListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    // this.$('#trades').empty();

    this.model.each((trade) => {
      const tradeView = new TradeView({
        model: trade,
        template: this.template,
        tagName: 'li',
        className: 'trade',
      });
      this.$('#trades').prepend(tradeView.render().$el);
    });
    return this;
  },
});

export default TradeListView;
