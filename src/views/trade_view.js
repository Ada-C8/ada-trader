import Backbone from 'backbone';
import Trade from '../models/trade';

const TradeView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;

    this.listenTo(this.bus, 'boughtOrSold', this.addTrade);
  },
  addTrade(tradeData) {
    const compiledTemplate = this.template(tradeData);
    this.$('#trades').prepend(compiledTemplate);
  },

  render() {
  },
});

export default TradeView;
