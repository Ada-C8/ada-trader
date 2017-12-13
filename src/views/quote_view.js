import Backbone from 'backbone';
import Quote from '../models/quote';
import Simulator from '../models/simulator';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model,'change', this.render);
  },
  events: {
    'click .btn-buy': 'buyQuote',
    'click .btn-sell': 'sellQuote',
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    // this.$('#quotes').html(compiledTemplate);
    return this;
  },
  buyQuote: function(e) {
    console.log('clicked Buy button');
    this.model.set('price', this.model.buy());
    //Shauna triggers an event that the quotelistview is listening for
    // console.log(this.$el);
    // console.log(this.model.get('symbol'));
    // const quoteStored = new Quote({symbol: this.model.get('symbol'), price: this.model.get('price')})
    // console.log(quoteStored);
    this.model.set('buy', true);
    // this.trigger('addMe', quoteStored);
    this.trigger('addBuy', this);
  },
  sellQuote: function(e) {
    this.model.set('price', this.model.sell());
  }
});

export default QuoteView;
