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
    this.model.buy();
    console.log(event);
    // console.log(`HTML VALUE: ${event.target.value}`);
    console.log(event.target.firstChild.data);
    const objectForTradeHistory = {
      model: this.model,
      type: 'bought',
    };
    this.bus.trigger('add_me_to_trade_hist', objectForTradeHistory);
  },

  sellQuote(event) {
    console.log('In sellQuote');
    this.model.sell();
    const objectForTradeHistory = {
      model: this.model,
      type: 'sold',
    };
    this.bus.trigger('add_me_to_trade_hist', objectForTradeHistory);
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
