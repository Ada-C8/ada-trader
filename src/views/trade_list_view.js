import Backbone from 'backbone';
import _ from 'underscore';
import TradeView from './trade_view';

const TradeListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'newTrade', this.newTrade);
  },
  newTrade(trade) {
    this.model.add(trade);
  },
  render() {
    this.$('#trades').empty();
    this.model.each((trade) => {
      const tradeView = new TradeView({
        model: trade,
        template: this.template,
        tagName: 'li',
        className: 'trade',
        bus: this.bus,
      });
      this.$('#trades').prepend(tradeView.render().$el);
    });
  return this;
  }
});

export default TradeListView;
