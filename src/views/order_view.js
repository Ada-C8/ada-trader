import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import Order from '../models/order';


const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "update", this.render);

    // this.listenTo(this.listView, 'quoteChanged', this.checkQuotes);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-cancel': 'cancelOrder',
  },
  // checkQuotes(){
  //   console.log('checkin quotes in the order view booyah');
  // },
  cancelOrder() {
    this.trigger('cancelMe', this);
  },
  // destroy() {
  //   console.log('destroy got called');
  //   this.trigger('cancelMe', this);
  // },
  orderBuy: function() {


  },
  orderSell: function() {

  },

});

export default OrderView;
