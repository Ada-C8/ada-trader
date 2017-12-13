import Backbone from 'backbone';
import QuoteView from './quote_view';
//import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradeTemplate = params.tradeTemplate;
    this.orderList = params.orderList;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#quotes').empty();
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tradeTemplate: this.tradeTemplate,
        tagName: 'li',
        className: 'quote',
      });
      this.listenTo(quoteView, 'buy', this.displayBuy);

      this.listenTo(quoteView, 'sell', this.displaySell);

      this.$('#quotes').append(quoteView.render().$el);

    });
    return this;
  },
  displayBuy(quoteView) {
    this.$('#trades').prepend(this.tradeTemplate({buy: true, symbol: quoteView.model.get('symbol'), price: quoteView.model.get('price')}))
  },
  displaySell(quoteView) {
    this.$('#trades').prepend(this.tradeTemplate({buy: false, symbol: quoteView.model.get('symbol'), price: quoteView.model.get('price')}))
  },
  events: {
    'click .btn-buy': 'makeBuyOrder',
    'click .btn-sell': 'makeSellOrder'
  },
  makeBuyOrder: function(event) {
    event.preventDefault();
    // validate? when you create a new order?
    const orderData = { buy: true };
    orderData['symbol'] = this.$('select :selected').text();
    orderData['targetPrice'] = this.$(`input[name=price-target]`).val();
    //const newOrder = new Order(orderData);
    this.orderList.add(orderData);
    console.log(this.orderList);
  },
  makeSellOrder() {
    // validate? when you create a new order?
  }
});

export default QuoteListView;
