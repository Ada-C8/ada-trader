import Backbone from 'backbone';

const TradeHistoryView = Backbone.View.extend({

  initialize(params) {
    this.bus = params.bus;
    this.listenTo(this.bus, 'add_me_to_trade_hist', this.render);
  },

  render(data) {
    console.log('In TradeHistoryView render');
    console.log(data);
    console.log(data.model.attributes.symbol);
    console.log(data.model.get('price'));

    const symbol = data.model.get('symbol');
    const price = data.model.get('price');
    const formattedPrice = price.toFixed(2)
    const type = data.type;
    this.$('#trades').prepend(`<li>You ${type} ${symbol} at $${formattedPrice}</li>`)
    return this;
  }

});

export default TradeHistoryView;
//
// createTradeHistory(model){
//   console.log('In createTradeHistory');
//   console.log(model);
//   console.log(model.attributes.symbol);
//   console.log(model.get('price'));
//
//   const symbol = model.get('symbol');
//   const price = model.get('price');
//
//   this.render();
// },
