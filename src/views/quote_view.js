import Backbone from 'backbone';
import Quote from '../models/quote';
import _ from 'underscore';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click .btn-buy': 'buyShare',
    'click .btn-sell': 'sellShare'
  },
  buyShare: function(event) {
    event.preventDefault();
    this.model.set('buy', true);
    this.trigger('showTrade', this);
    this.model.buy();
  },
  sellShare: function(event) {
    event.preventDefault();
    this.model.set('buy', false);
    this.trigger('showTrade', this);
    this.model.sell();
  }
})

export default QuoteView;
