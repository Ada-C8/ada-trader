import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({

  initialize(params) {
    // use #quote-template
    this.template = params.template;
    // any time the stock "changes" change event on model
    this.listenTo(this.model, 'change', this.render);
  },
  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },
  buyQuote() {
    console.log('buying quote');
    console.log(this.model.get('price'));
    // $()
    let newPrice = this.model.get('price') + 1;
    this.model.set({price: newPrice});
    console.log(this.model.get('price'));

  },
  sellQuote() {
    console.log('selling quote');
    console.log(this.model.get('price'));
    let newPrice = this.model.get('price') - 1;
    this.model.set({price: newPrice});
    console.log(this.model.get('price'));

  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

//   Click the Buy button for a quote:
// That quote's market price increases by $1.00
// Click the Sell button for a quote:
// That quote's market price decreases by $1.00


});

export default QuoteView;
