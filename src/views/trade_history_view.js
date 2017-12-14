import Backbone from 'backbone';
// import QuoteView from './quote_view';
// import QuoteListView from './quote_list_view';
// import Quote from '../models/quote';

const TradeHistoryView = Backbone.View.extend({

  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;
    console.log("Im in the trade_history_view");
    this.listenTo(this.bus, 'record_trade', this.setModel);
    // this.listenTo(this.bus, 'record_trade', this.render);
  },

  setModel(trade_data) {
    console.log("In set model function");
    console.log('setModel');
    console.log(trade_data);
    this.data = trade_data;
    this.render();
  },

  el: '.trade',

  render() {

    // this.$el.html(compiledTemplate);
// this.$('.quotes').append(quoteView.render().$el);
    // this.$('.trades').empty();
    if (this.data) {
      const compiledTemplate =
      this.template(this.data);
      // this.$el.html(compiledTemplate);
      this.$el.prepend(compiledTemplate);

      //   console.log("rendering");
      console.log(this.data);

    };
    return this;
  }


}) //end


export default TradeHistoryView;
