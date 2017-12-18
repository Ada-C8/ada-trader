import Backbone from 'backbone';

const TradeHistoryView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.listenTo(this.bus, 'add_me_to_trade_hist', this.render);
    this.template = params.template;
  },

  render(data) {
    console.log('In TradeHistoryView render');

    const compiledTemplate =
      this.template(data);

    this.$('#trades').prepend(compiledTemplate);

    return this;
  }

});

export default TradeHistoryView;
