import Backbone from 'backbone';

const TradesView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    // this listens to the bus for 'buyOrSell' which is emited from quote view, when it heads it will call addTradeHistory with the data that is sent on the bus and will create an instance of the trade history view
    this.listenTo(this.bus, 'buyOrSell', this.addTradeHistory);
  },

  addTradeHistory(tradeData) {
    console.log('inside addTradeHistory method');
    console.log('tradeData');
    console.log(tradeData);
    const compiledTemplate = this.template(tradeData);
    this.$el.prepend(compiledTemplate);
    return this;
  },
});

export default TradesView;
