import Backbone from 'backbone';

const TradeHistoryView = Backbone.View.extend({

  initialize(params) {
    this.bus = params.bus;
    this.listenTo(this.bus, 'add_me_to_trade_hist', this.render);
  },

  render() {
    console.log('In TradeHistoryView render');
    this.$('#trades').prepend(`<li>HELLO</li>`)
    return this;
  }

});

export default TradeHistoryView;
