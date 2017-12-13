import Backbone from 'backbone';
import Quote from '../models/quote';
import _ from 'underscore';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.bus, 'buyOrder', this.buyOrder);
    this.listenTo(this.bus, 'sellOrder', this.sellOrder);
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
  buyShare: function() {
    this.model.set('buy', true);
    this.trigger('showTrade', this);
    this.model.buy();
  },
  sellShare: function() {
    this.model.set('buy', false);
    this.trigger('showTrade', this);
    this.model.sell();
  },
  buyOrder: function(orderView) {
    if (orderView.quote == this.model) {
      this.buyShare();
    }
  },
  sellOrder: function(orderView) {
    if (orderView.quote == this.model) {
      this.sellShare();
    }
  },
})

export default QuoteView;
