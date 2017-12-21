import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Quote from '../models/quote';
import Simulator from '../models/simulator';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    // this.listenTo(this.model,'change', this.quoteModelChange);
    this.listenTo(this.model,'change', this.render);
  },
  events: {
    'click .btn-buy': 'buyQuote',
    'click .btn-sell': 'sellQuote',
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  buyQuote: function(e) {
    // console.log('You pressed the buy button in the Quote view')
    this.model.set('buy', true);
    this.model.set('price', this.model.buy());
    //triggers an event that the quotelistview is listening for:
    this.trigger('addTrade', this);
    // console.log('trade added');
  },
  sellQuote: function(e) {
    this.model.set('buy', false);
    this.model.set('price', this.model.sell());
    this.trigger('addTrade', this);
    // console.log('sold trade added');
  }
});

export default QuoteView;
