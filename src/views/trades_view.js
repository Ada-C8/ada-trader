import Backbone from 'backbone';
import QuoteView from '../views/quote_view';

const TradesView = Backbone.View.extend ({
  initialize(params) {
    this.template = params.template;
    this.view = params.view
    this.listenTo(this.view, 'add_trade', this.addTrade);
  },

  addTrade() {
    console.log('adding new trade');
    // this.$('#trades').append('<li>something</li>');
    this.$('#trades').append('<li>something</li>');

  },


});

export default TradesView;
