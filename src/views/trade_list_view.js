import Backbone from 'backbone';
import TradeView from './trade_view';

const TradeListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    const list = this.$('#trades');
    list.empty();
    this.model.each((trade) => {
      const tradeView = new TradeView({
        model: trade,
        template: this.template,
        tagName: 'li',
        className: 'trade',
      });
      list.prepend(tradeView.render().$el);
    });
    return this;
  },
});

export default TradeListView;
