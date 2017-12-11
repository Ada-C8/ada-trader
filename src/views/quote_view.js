// views/quote_view

import Backbone from 'backbone';
import Quote from '../models/quote';

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
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },
  buyQuote: function(e) {
    console.log('clicked the buy button');
    console.log(this.model);
    this.model.buy();
  },
  sellQuote: function(e) {
    console.log('clicked the sell button');
    this.model.sell();
  }

});

export default QuoteView;
