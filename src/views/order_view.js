import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
// import Order from 'models/order'

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.orderTemplate = _.template($('#order-template').html());
    this.listenTo(this.model, 'orderMe', this.deleteOrder);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-cancel': 'deleteOrder',
  },
  deleteOrder() {
    this.model.destroy();
    this.remove();
  },
});

export default OrderView;
