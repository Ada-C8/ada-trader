import BackBone from 'backbone';
import Quote from '../models/quote';

const QuoteView = BackBone.View.extend({

  initialize(params) {
    this.template = params.template;

    this.listenTo(this.model, 'change', this.render);
  },

  buyQuote(event) {
    console.log('In buyQuote');
    this.model.buy();
  },

  sellQuote(event) {
    console.log('In sellQuote');
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
