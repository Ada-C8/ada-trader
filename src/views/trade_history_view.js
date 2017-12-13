import Backbone from 'backbone';
// import Quote from '../models/quote';

const TradeHistoryView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template; //how to get the template?
    this.bus = params.bus;
    // this.attributes = params.attributes;
    this.listenTo(this.bus, 'buy_sell_quote', this.render);
  },
  render(attributes) {
    const compiledTemplate = this.template(attributes);

    this.$el.prepend(compiledTemplate);

    return this
  },
});


export default TradeHistoryView;
