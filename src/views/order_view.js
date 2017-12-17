import Backbone from 'backbone';
import Order from '../models/order';

import _ from 'underscore';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.bus, 'cancelOrder', this.cancelOrder)
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

  }

})

export default OrderView;
