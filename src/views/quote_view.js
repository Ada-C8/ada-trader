import Backbone from 'backbone';
import Quote from '../models/quote';
import Trade from '../models/trade';
import TRADESLIST from '../app';


const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, "change", this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-buy': 'buyStock',
    'click button.btn-sell': 'sellStock',
  },
  buyStock: function() {
    const stock = this.model;
    stock.buy();
    const trade = new Trade({
      symbol: stock.attributes.symbol,
      price: stock.attributes.price,
      buy: 'bought',
    });
    TRADESLIST.add(trade);
    console.log(trade);
  },
  sellStock: function() {
    this.model.sell();
  },

});

export default QuoteView;
