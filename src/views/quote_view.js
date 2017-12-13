import BackBone from 'backbone';
import Quote from '../models/quote';

const QuoteView = BackBone.View.extend({

  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.model, 'change', this.render);
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

    ////some other stuff here?

    return this;
  },

});

export default QuoteView;
