import Backbone from 'backbone';
import TradeView from './trade_view';
import Trade from '../models/trade';

const TradeListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render)
    this.listenTo(this.bus, 'bought_quote', this.buyTrade)
    this.listenTo(this.bus, 'sold_quote', this.sellTrade)
    this.listenTo(this.bus, 'automatic_buy', this.buyTrade)
    this.listenTo(this.bus, 'automatic_sell', this.sellTrade)

  },
  render(model) {
    this.$('#trades').empty()
    this.model.each((trade) => {
      const tradeView = new TradeView({
        model: trade,
        template: this.template,
        tagName: 'li',
        className: 'trade',
        bus: this.bus,
      });
      this.$('#trades').prepend(tradeView.render().$el)
    })
    return this
  },

  //combine into addTrade
  buyTrade(model) {
    const newTrade = new Trade({symbol: model.attributes.symbol, price: model.attributes.price})
    if(newTrade.isValid()) {
      this.model.add(newTrade);
    } else {
      newTrade.destroy();
    }
    // this.render();
  },
  sellTrade(model) {
    console.log('getting into sell trade!');
    const newTrade = new Trade({symbol: model.attributes.symbol, price: model.attributes.price, buy: false})
    if(newTrade.isValid()) {
      this.model.add(newTrade);
    } else {
      newTrade.destroy();
    }
  }
  })

  export default TradeListView
