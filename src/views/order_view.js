import Backbone from 'backbone';
import Order from '../models/order';

import _ from 'underscore';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
  },
  render() {
    console.log('render order_view');

    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate)

    return this;
  },

})

export default OrderView;
