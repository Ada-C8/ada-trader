import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
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
    this.model.set('price', this.model.buy());
    this.model.set('buy', true);
    //triggers an event that the quotelistview is listening for:
    this.trigger('addTrade', this);
  },
  sellQuote: function(e) {
    this.model.set('price', this.model.sell());
    this.model.set('buy', false);
    this.trigger('addTrade', this);
  }
});

export default QuoteView;
