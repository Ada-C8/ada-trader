import Backbone from 'backbone';
// import QuoteView from './quote_view';
// import QuoteListView from './quote_list_view';
// import Quote from '../models/quote';

const TradeHistoryView = Backbone.View.extend({

  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;
    this.listenTo(this.bus, 'record_trade', this.setModel);
    // this.listenTo(this.bus, 'record_trade', this.render);
  },

  setModel(trade_data) {
    this.data = trade_data;
    this.render();
  },

  el: '.trade',

  render() {

    if (this.data) {
      const compiledTemplate =
      this.template(this.data);
      this.$el.prepend(compiledTemplate);
      console.log("Trade history view");
    };
    return this;
  }


}) //end


export default TradeHistoryView;
