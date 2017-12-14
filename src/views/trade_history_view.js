import Backbone from 'backbone';

const TradeHistoryView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.bus, 'buy_sell_quote', this.render);
  },
  render(attributes) {
    const compiledTemplate = this.template(attributes);

    this.$('#trades').prepend(compiledTemplate);

    return this
  },
});


export default TradeHistoryView;
