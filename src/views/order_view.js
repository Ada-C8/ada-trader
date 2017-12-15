import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Order from '../models/order';
import Simulator from '../models/simulator';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model,'change', this.render);
    // this.listenTo(this.model, 'destroy', this.remove);
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
  // cancelOrder: function(event) {
  //   console.log('You pressed the Cancel button');
  //   this.model.destroy();
  // },
});

export default OrderView;
