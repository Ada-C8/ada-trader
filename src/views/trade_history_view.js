import Backbone from 'backbone';
import _ from 'underscore';

const TradeHistoryView = Backbone.View.extend({

  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;
    this.listenTo(this.bus, 'record_trade', this.setModel);
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
    };
    return this;
  }


}) //end


export default TradeHistoryView;
