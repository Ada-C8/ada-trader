import Backbone from 'backbone';
import Order from '../models/order';

import _ from 'underscore';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.bus, 'cancelOrder', this.cancelOrder)
    this.listenTo(this.model.get('quote'), 'change', this.executeOrder);

  },
  render() {
    // console.log('render order_view');

    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate)

    return this;
  },
  events: {
    'click button.btn-cancel': 'cancelOrder'
  },
  cancelOrder() {
    console.log('i am in cancelOrder');
    console.log(this);
    this.model.destroy();

  },
  executeOrder() {
    console.log('I am inside execute order');
    let quote = this.model.get('quote');
    console.log('this.model = ');
    console.log(this.model);

    if (this.model.get('buy')) {
      if (this.model.get('targetPrice') >= quote.get('price')) {
        quote.buy();
        this.model.destroy();
        // After trying to add a trade to the tradeHistroyView I am still getting an error saying the 'buy' attribute is undefined despite a console.log(this.model) = a model with 'buy' defined as true. Any help is appreciated.
        this.bus.trigger('destroy', this)
        this.remove();
      }
    } else {
      if (this.model.get('targetPrice') <= quote.get('price')) {
        quote.sell();
        this.model.destroy();
        this.remove();
      }
    }
  },

})

export default OrderView;
