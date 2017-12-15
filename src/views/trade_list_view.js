import Backbone from 'backbone';
import _ from 'underscore';
import TradeView from 'views/trade_view';

const TradeListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model,'update', this.render);
    this.listenTo(this.bus, 'newTrade', this.addNewTrade);
  },
  render() {
    this.model.each((trade) => {
      const tradeView = new TradeView({
        model: trade,
        template: this.template,
        bus: this.bus,
        tagName: 'li',
        className: 'trade',
      });
      this.$('#trades').prepend(tradeView.render().$el);
    });
    return this;
  },
  addNewTrade(trade) {
    this.model.add(trade);
  }
});

export default TradeListView;
