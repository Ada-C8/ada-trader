import BackBone from 'backbone';
import Quote from '../models/quote';

const QuoteView = BackBone.View.extend({

  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.model, 'change', this.render);

    //TODO: how to make each quote listens selectively to their symbol?
    // if (this.model.symbol  === 'HUMOR') {
    //   this.listenTo(this.bus, 'add_order_request', this.checkPriceTarget)
    // }
    // this.listenTo(this.bus, 'add_humor_order_request', this.checkPriceTarget)

    this.listenTo(this.bus, 'add_order_request', this.checkPriceTarget)
  },

  checkPriceTarget(orderData) {
    console.log('In checkPriceTarget');
    console.log(orderData);
    console.log(this.model.get('symbol'));
    console.log(this.model.get('price'));

    if (this.model.get('symbol') === orderData.symbol) {
      if (orderData.buy) {
        if (this.model.get('price') <= orderData.targetPrice) {
          console.log('targetPrice is too high');
          this.bus.trigger('price_check_response', false)
          return false;
        } else {
          console.log('targetPrice is good');
          this.bus.trigger('price_check_response', orderData)
          return true;
        }
      } else {
        if (this.model.get('price') >= orderData.targetPrice) {
          this.bus.trigger('price_check_response', false)
          return false;
        } else {
          console.log('targetPrice is good');
          this.bus.trigger('price_check_response', orderData)
          return true;
        }
      }
    }
  },

  buyQuote(event) {
    console.log('In buyQuote');
    console.log(event);

    const objectForTradeHistory = {
      model: this.model,
      buy: true,
      price: this.model.get('price'),
      symbol: this.model.get('symbol'),
    };
    this.bus.trigger('add_me_to_trade_hist', objectForTradeHistory);

    this.model.buy();
  },

  sellQuote(event) {
    console.log('In sellQuote');

    const objectForTradeHistory = {
      model: this.model,
      buy: false,
      price: this.model.get('price'),
      symbol: this.model.get('symbol'),
    };
    this.bus.trigger('add_me_to_trade_hist', objectForTradeHistory);

    this.model.sell();
  },

  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);

    return this;
  },

});

export default QuoteView;
