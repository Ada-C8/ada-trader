import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Order from '../models/order';
import Simulator from '../models/simulator';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;
    this.quote = this.model.get('quote');
    this.listenTo(this.quote, 'change', this.evaluateOrder);
    this.listenTo(this.model,'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },
  events: {
    'click .btn-cancel': 'cancelOrder'
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    // this.$('#quotes').html(compiledTemplate);
    return this;
  },
  cancelOrder: function(event) {
    // console.log('Cancelled order');
    this.stopListening(this.model.get('quote'), 'change');
    this.model.destroy();
  },
  evaluateOrder: function(event) {
    // console.log('in OrderView: evaluateOrder');
    if (this.quote.get('buy')) {
      if(this.quote.get('price') <= this.model.get('targetPrice')) {
        // console.log('im ready to tradeMe (buying)');
        this.bus.trigger('tradeMe', this.quote);
        this.cancelOrder();
      }
    }
    else if (!this.quote.get('buy')) {
      // console.log('in else if statement')
      if(this.quote.get('price') >= this.model.get('targetPrice')) {
        // console.log('im ready to tradeMe (selling)');
        this.bus.trigger('tradeMe', this.quote);
        this.cancelOrder();
      }
    }
  }
});

export default OrderView;
