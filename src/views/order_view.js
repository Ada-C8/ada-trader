import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import Order from '../models/order';


const OrderView = Backbone.View.extend({
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
    'click button.btn-cancel': 'cancelOrder',
  },
  cancelOrder(e) {
    this.trigger('cancelMe', this);
  },
  orderBuy: function() {


  },
  orderSell: function() {

  },

});

export default OrderView;
