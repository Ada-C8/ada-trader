import BackBone from 'backbone';
import Quote from '../models/quote';

const QuoteView = BackBone.View.extend({

  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.bus, 'add_order_request', this.checkPriceTarget);
    this.listenTo(this.model, 'change:price', this.priceChange);
  },

  priceChange(){
    console.log('In priceChange!');

    const symbol = this.model.get('symbol');
    this.bus.trigger('price_change', this.model);
  },

  //TODO: pull some of this out into separate function?
  checkPriceTarget(orderData) {
    console.log('In checkPriceTarget');
    console.log(orderData);

    if (this.model.get('symbol') === orderData.symbol) {
      if (orderData.buy) {
        if (this.model.get('price') <= orderData.targetPrice) {
          const errorMessage = {
            order: 'New order not created. You must plan to buy at a price that is less than the current price!',
          };
          this.bus.trigger('price_check_response', errorMessage)
          return false;
        } else {
          this.bus.trigger('price_check_response', orderData)
          return true;
        }
      } else {
        if (this.model.get('price') >= orderData.targetPrice) {
          const errorMessage = {
            order: `New order not created. You must plan to sell at a price that is greater than the current price!`
          };
          this.bus.trigger('price_check_response', errorMessage)
          return false;
        } else {
          this.bus.trigger('price_check_response', orderData)
          return true;
        }
      }
    }
  },

  //TODO: This could use some more refactoring?
  buySellQuote(event){
    console.log('In buySellQuote');
    console.log(event.target.innerHTML);

    if (event.target.innerHTML === 'Buy') {
      const objectForTradeHistory = {
        model: this.model,
        buy: true,
        price: this.model.get('price'),
        symbol: this.model.get('symbol'),
      };
      this.bus.trigger('add_me_to_trade_hist', objectForTradeHistory);
      this.model.buy();

    } else if (event.target.innerHTML === 'Sell') {
      const objectForTradeHistory = {
        model: this.model,
        buy: false,
        price: this.model.get('price'),
        symbol: this.model.get('symbol'),
      };
      this.bus.trigger('add_me_to_trade_hist', objectForTradeHistory);
      this.model.sell();
    }
  },

  events: {
    'click button.btn-buy': 'buySellQuote',
    'click button.btn-sell': 'buySellQuote',
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);

    return this;
  },

});

export default QuoteView;
