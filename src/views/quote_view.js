import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.listenTo(this.model, "change", this.render);
    ("I am initializing a view")
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    console.log("I am rendering a new quoteView");
    console.log(compiledTemplate);
    // return compiledTemplate;
    return this;
  },

  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote'
  },

  sellQuote(event){
    console.log('the sell button has been clicked');
    this.model.sell();
  },

  buyQuote(event){
    console.log('the buy button has been clicked');
    this.model.buy();
  },




});

export default QuoteView;
