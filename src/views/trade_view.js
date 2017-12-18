import Backbone from 'backbone';
import Quote from '../models/quote';

const TradeView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;
    this.listenTo(this.bus, 'boughtOrSold', this.render);
  },

  render(tradeData) {
    const compiledTemplate = this.template(tradeData);
    this.$('#trades').prepend(compiledTemplate);
  },
});

export default TradeView;
