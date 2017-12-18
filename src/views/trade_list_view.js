import Backbone from 'backbone';
import Quote from '../models/quote';

const TradeListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.bus, 'add_trade', this.render);
  },
  render(tradeObject) {
    const compiledTemplate= this.template(tradeObject)
    this.$('#trades').prepend(compiledTemplate);
  },
});

export default TradeListView;
