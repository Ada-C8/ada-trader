import $ from 'jquery';
import _ from 'underscore';

import Backbone from 'backbone';

import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.orderTemplate = params.orderTemplate;
    this.listenTo(this.model, "change", this.render);
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

  events: {
    'click button.btn-cancel': 'cancelOrder',
  },

  cancelOrder(){
    this.model.destroy();
  },
});

export default OrderView;
