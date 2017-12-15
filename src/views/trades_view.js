import Backbone from 'backbone';
import QuoteView from '../views/quote_view';

const TradesView = Backbone.View.extend ({
  initialize(params) {
    this.template = params.template;
    this.quotesView = params.quotesView;
    this.ordersView = params.ordersView;
    this.listenTo(this.quotesView, 'add_trade', this.addTrade);
    this.listenTo(this.ordersView, 'add_trade', this.addTrade);
  },

  addTrade(quote) {
    console.log('adding new trade');

    const compiledTemplate = this.template(quote);

    this.$('#trades').prepend(compiledTemplate);
  },


});

export default TradesView;
