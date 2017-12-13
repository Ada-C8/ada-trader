import Backbone from 'backbone';
import QuoteView from '../views/quote_view';

const TradesView = Backbone.View.extend ({
  initialize(params) {
    this.template = params.template;
    this.view = params.view
    this.listenTo(this.view, 'add_trade', this.addTrade);
  },

  addTrade(quote) {
    console.log('adding new trade');

    const compiledTemplate = this.template(quote);

    this.$('#trades').prepend(compiledTemplate);
  },


});

export default TradesView;
