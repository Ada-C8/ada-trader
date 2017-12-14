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
    // this.listenTo(this.bus, 'record_trade', this.render());
  },

  setModel(model) {
    console.log('setModel');
    console.log(model);
    this.model = model;
    this.render();
  },

  el: '.trade',

  render() {

    // this.$('.trades').empty();
    if (this.model) {
    console.log("rendering");
    console.log( this.model.get('symbol') );
    console.log( this.model.get('price') );
    console.log('Doing something i hope!!!');
    // console.log(this.model.get('symbol'));
  };
    return this;
  }


}) //end


export default TradeHistoryView;
