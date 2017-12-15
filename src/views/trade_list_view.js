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
    // renders the entire collection after each update, so must clear the existing list. otherwise, can use addNewTrade to prepend one instance of TradeView, but then code is repetitive
    const currentTradeListView = this.$('#trades');
    currentTradeListView.empty();
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
    // const tradeView = new TradeView({
    //   model: trade,
    //   template: this.template,
    //   bus: this.bus,
    //   tagName: 'li',
    //   className: 'trade',
    // });
    // this.$('#trades').prepend(tradeView.render().$el);
  }
});

export default TradeListView;
